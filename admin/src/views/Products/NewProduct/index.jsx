/*!

=========================================================
* Purity UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/purity-ui-dashboard-pro
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design by Creative Tim & Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Tooltip,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import avatar4 from "@/assets/img/avatars/avatar4.png";
import ProfileBgImage from "@/assets/img/ProfileBackground.png";
import Card from "@/components/Card/Card";
import CardBody from "@/components/Card/CardBody";
import CardHeader from "@/components/Card/CardHeader";
// Custom components
import Editor from "@/components/Editor/Editor";
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { BsCircleFill } from "react-icons/bs";
import Header from "@/views/Pages/Account/Settings/components/Header";
import { Form, Formik, Field } from "formik";
import * as yup from "yup";
import { toSlug, uploadToCDN } from "@/utils";
import { useDispatch } from "react-redux";
import { getAllCategory } from "@/views/Categories/store";
import { useSelector } from "react-redux";
import { MultiSelect } from "react-multi-select-component";
import APIService from "@/helper/api";
import { CloseButton } from '@chakra-ui/react'
import { Editor as TinyEditor } from '@tinymce/tinymce-react';
import { getAllUnit } from "@/views/Ecommerce/Products/Unit/store";
import { AddIcon } from '@chakra-ui/icons'


const reducer = (state, action) => {
  if (action.type === "SWITCH_ACTIVE") {
    if (action.payload === "overview") {
      const newState = {
        overview: true,
        teams: false,
        projects: false,
      };
      return newState;
    } else if (action.payload === "teams") {
      const newState = {
        overview: false,
        teams: true,
        projects: false,
      };
      return newState;
    } else if (action.payload === "projects") {
      const newState = {
        overview: false,
        teams: false,
        projects: true,
      };
      return newState;
    }
  }
  return state;
};

function NewProduct() {
  const dispatch = useDispatch();
  const [skills, setSkills] = useState([
    {
      name: "chakra-ui",
      id: 1,
    },
    {
      name: "react",
      id: 2,
    },
    {
      name: "javascript",
      id: 3,
    },
  ]);

  const [activeBullets, setActiveBullets] = useState({
    productInfo: true,
    media: false,
    socials: false,
    pricing: false,
  });
  const editorRef = useRef();
  const productInfoTab = useRef();
  const mediaTab = useRef();
  const socialsTab = useRef();
  const pricingTab = useRef();

  const [files, setFiles] = useState([])
  const [priceList, setPirceList] = useState([{ price: 0, fakePrice: 0, unit: '', quantity: 0, warehouse: "" }])

  const toast = useToast()

  const onDropFile = useCallback(async (acceptedFiles) => {
    try {
      const file = acceptedFiles?.[0];
      const type = file?.type;
      const acceptFileType = ["image/jpeg", "image/svg+xml"];
      const acceptFileSize = 5;
      const fileSize = (file?.size / (1024 * 1024)).toFixed(2);
      if (!acceptFileType.includes(type)) {
        toast({
          status: "error",
          title: "File không phải là hình ảnh",
          position: "top",
        });
        return;
      }

      if (fileSize > acceptFileSize) {
        toast({
          status: "error",
          title: "Kích thước file quá lớn",
          position: "top",
        });
        return;
      }

      const result = await uploadToCDN(file);
      setFiles((files) => [...files, { image: result.data, type: "image" }]);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const uploadFile = async (fileUpload) => {
    try {
      const file = fileUpload;
      const type = file?.type;
      const acceptFileType = ["image/jpeg", "image/svg+xml"];
      const acceptFileSize = 5;
      const fileSize = (file?.size / (1024 * 1024)).toFixed(2);
      if (!acceptFileType.includes(type)) {
        toast({
          status: "error",
          title: "File không phải là hình ảnh",
          position: "top",
        });
        return;
      }

      if (fileSize > acceptFileSize) {
        toast({
          status: "error",
          title: "Kích thước file quá lớn",
          position: "top",
        });
        return;
      }

      const result = await uploadToCDN(file);

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveImage = (name) => {
    setFiles(files.filter((file) => file.image != name));
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop: onDropFile });

  const createProductSchema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên sản phẩm"),
    slug: yup.string().required("Slug là bắt buộc"),
    description: yup.string().required("Mô tả là bắt buộc"),
    category: yup
      .array()
      .min(1, "Ít nhất phải có một danh mục")
      .required("Ít nhất phải có một danh mục"),
  });

  const onSubmit = () => { };

  const initialValue = {
    name: "",
    slug: "",
    description: "",
    category: [],
    content: "",
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      setSkills([
        ...skills,
        {
          name: e.target.value,
          id: skills.length === 0 ? 1 : skills[skills.length - 1].id + 1,
        },
      ]);
      e.target.value = "";
    }
  };

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgPrevButton = useColorModeValue("gray.100", "gray.100");
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );

  const { allCategory } = useSelector(state => state.categories)
  const { allUnit } = useSelector(state => state.units)


  const handleChangeImageOption = (value, image) => {
    setFiles(files.map(file => {
      if (file.image == image) {
        file.type = value
      }
      return file
    }))
  }

  const handleAddNewPrice = () => {
    setPirceList([...priceList, { price: 0, fakePrice: 0, unit: "" }])
  }

  useEffect(() => {
    dispatch(getAllCategory())
    dispatch(getAllUnit())
  }, [])
  return (
    <Formik
      initialValues={initialValue}
      validationSchema={createProductSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form>
          <Flex direction="column">
            <Tabs
              variant="unstyled"
              mt="64px"
              alignSelf="center"
              w={"full"}
              p={"32px"}
            >
              <TabList display="flex" align="center" justifyContent={"center"}>
                <Tab
                  ref={productInfoTab}
                  _focus="none"
                  w={{ sm: "80px", md: "200px" }}
                  onClick={() =>
                    setActiveBullets({
                      productInfo: true,
                      media: false,
                      socials: false,
                      pricing: false,
                    })
                  }
                >
                  <Flex
                    direction="column"
                    justify="center"
                    align="center"
                    position="relative"
                    _before={{
                      content: "''",
                      width: { sm: "80px", md: "200px" },
                      height: "3px",
                      bg: activeBullets.media ? textColor : "gray.200",
                      left: { sm: "12px", md: "85px" },
                      top: {
                        sm: activeBullets.productInfo ? "6px" : "4px",
                        md: null,
                      },
                      position: "absolute",
                      bottom: activeBullets.productInfo ? "40px" : "38px",
                      zIndex: -1,
                      transition: "all .3s ease",
                    }}
                  >
                    <Icon
                      as={BsCircleFill}
                      color={activeBullets.productInfo ? textColor : "gray.300"}
                      w={activeBullets.productInfo ? "16px" : "12px"}
                      h={activeBullets.productInfo ? "16px" : "12px"}
                      mb="8px"
                    />
                    <Text
                      color={
                        activeBullets.productInfo ? { textColor } : "gray.300"
                      }
                      fontWeight={activeBullets.productInfo ? "bold" : "normal"}
                      display={{ sm: "none", md: "block" }}
                    >
                      1. Thông tin sản phẩm
                    </Text>
                  </Flex>
                </Tab>
                <Tab
                  ref={mediaTab}
                  _focus="none"
                  w={{ sm: "80px", md: "200px" }}
                  onClick={() =>
                    setActiveBullets({
                      productInfo: true,
                      media: true,
                      socials: false,
                      pricing: false,
                    })
                  }
                >
                  <Flex
                    direction="column"
                    justify="center"
                    align="center"
                    position="relative"
                    _before={{
                      content: "''",
                      width: { sm: "80px", md: "200px" },
                      height: "3px",
                      bg: activeBullets.socials ? textColor : "gray.200",
                      left: { sm: "12px", md: "32px" },
                      top: {
                        sm: activeBullets.media ? "6px" : "4px",
                        md: null,
                      },
                      position: "absolute",
                      bottom: activeBullets.media ? "40px" : "38px",
                      zIndex: -1,
                      transition: "all .3s ease",
                    }}
                  >
                    <Icon
                      as={BsCircleFill}
                      color={activeBullets.media ? textColor : "gray.300"}
                      w={activeBullets.media ? "16px" : "12px"}
                      h={activeBullets.media ? "16px" : "12px"}
                      mb="8px"
                    />
                    <Text
                      color={activeBullets.media ? { textColor } : "gray.300"}
                      fontWeight={activeBullets.media ? "bold" : "normal"}
                      transition="all .3s ease"
                      _hover={{ color: textColor }}
                      display={{ sm: "none", md: "block" }}
                    >
                      2. Media
                    </Text>
                  </Flex>
                </Tab>
                <Tab
                  ref={socialsTab}
                  _focus="none"
                  w={{ sm: "80px", md: "200px" }}
                  onClick={() =>
                    setActiveBullets({
                      productInfo: true,
                      media: true,
                      socials: true,
                      pricing: false,
                    })
                  }
                >
                  <Flex
                    direction="column"
                    justify="center"
                    align="center"
                    position="relative"
                    _before={{
                      content: "''",
                      width: { sm: "80px", md: "200px" },
                      height: "3px",
                      bg: activeBullets.pricing ? textColor : "gray.200",
                      left: { sm: "12px", md: "32px" },
                      top: {
                        sm: activeBullets.socials ? "6px" : "4px",
                        md: null,
                      },
                      position: "absolute",
                      bottom: activeBullets.socials ? "40px" : "38px",
                      zIndex: -1,
                      transition: "all .3s ease",
                    }}
                  >
                    <Icon
                      as={BsCircleFill}
                      color={activeBullets.socials ? textColor : "gray.300"}
                      w={activeBullets.socials ? "16px" : "12px"}
                      h={activeBullets.socials ? "16px" : "12px"}
                      mb="8px"
                    />
                    <Text
                      color={activeBullets.socials ? { textColor } : "gray.300"}
                      fontWeight={activeBullets.socials ? "bold" : "normal"}
                      transition="all .3s ease"
                      _hover={{ color: textColor }}
                      display={{ sm: "none", md: "block" }}
                    >
                      3. Nội dung sản phẩm
                    </Text>
                  </Flex>
                </Tab>
                <Tab
                  ref={pricingTab}
                  _focus="none"
                  w={{ sm: "80px", md: "200px" }}
                  onClick={() =>
                    setActiveBullets({
                      productInfo: true,
                      media: true,
                      socials: true,
                      pricing: true,
                    })
                  }
                >
                  <Flex direction="column" justify="center" align="center">
                    <Icon
                      as={BsCircleFill}
                      color={activeBullets.pricing ? textColor : "gray.300"}
                      w={activeBullets.pricing ? "16px" : "12px"}
                      h={activeBullets.pricing ? "16px" : "12px"}
                      mb="8px"
                    />
                    <Text
                      color={activeBullets.pricing ? { textColor } : "gray.300"}
                      fontWeight={activeBullets.pricing ? "bold" : "normal"}
                      transition="all .3s ease"
                      _hover={{ color: textColor }}
                      display={{ sm: "none", md: "block" }}
                    >
                      4. Giá và số lượng
                    </Text>
                  </Flex>
                </Tab>
              </TabList>

              <TabPanels mt="24px" maxW={{ md: "90%", lg: "100%" }} mx="auto">
                <TabPanel>
                  <Card>
                    <CardHeader mb="22px">
                      <Text color={textColor} fontSize="lg" fontWeight="bold">
                        Thông tin sản phẩm
                      </Text>
                    </CardHeader>
                    <CardBody>
                      <Stack direction="column" spacing="20px" w="100%">
                        <Stack
                          direction={{ sm: "column", md: "row" }}
                          spacing="30px"
                        >
                          <Field name="name">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.name && form.touched.name
                                }
                              >
                                {console.log(form.errors)}
                                <FormLabel
                                  fontSize="xs"
                                  fontWeight="bold"
                                  mb="10px"
                                >
                                  Tên sản phẩm
                                </FormLabel>
                                <Input
                                  {...field}
                                  borderRadius="15px"
                                  placeholder="eg. Cua Từ Nham"
                                  fontSize="xs"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "slug",
                                      toSlug(e.target.value)
                                    );
                                    setFieldValue("name", e.target.value);
                                  }}
                                />
                                <FormErrorMessage>
                                  {form.errors.name}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="slug">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.slug && form.touched.slug
                                }
                              >
                                <FormLabel
                                  fontSize="xs"
                                  fontWeight="bold"
                                  mb="10px"
                                >
                                  Slug
                                </FormLabel>
                                <Input
                                  borderRadius="15px"
                                  placeholder="eg. 42"
                                  fontSize="xs"
                                  value={values.slug}
                                  disabled
                                />
                                <FormErrorMessage>
                                  {form.errors.slug}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Stack>
                        <Stack
                          direction={{ sm: "column", lg: "row" }}
                          spacing="30px"
                        >
                          <Field name="description">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.description &&
                                  form.touched.description
                                }
                              >
                                <FormLabel
                                  fontSize="xs"
                                  fontWeight="bold"
                                  mb="10px"
                                >
                                  Mô tả
                                </FormLabel>
                                <Editor
                                  onChange={(value) => {
                                    setFieldValue("description", value);
                                    console.log(value);
                                  }}
                                />
                                <FormErrorMessage>
                                  {form.errors.description}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Stack direction="column" spacing="20px" w="100%">
                            <Field name="category">
                              {({ field, form }) => (
                                <FormControl
                                  isInvalid={
                                    form.errors.category &&
                                    form.touched.category
                                  }
                                >
                                  <FormLabel
                                    fontSize="xs"
                                    fontWeight="bold"
                                    mb="10px"
                                  >
                                    Danh mục
                                  </FormLabel>
                                  <MultiSelect
                                    options={allCategory ? allCategory?.map(item => { return { label: item.name, value: item.id } }) : []}
                                    onChange={(value) => setFieldValue("category", value)}
                                    value={values.category}
                                  />
                                  <FormErrorMessage>
                                    {form.errors.category}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          </Stack>
                        </Stack>
                        <Button
                          variant="no-hover"
                          bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                          alignSelf="flex-end"
                          mt="24px"
                          w="100px"
                          h="35px"
                          onClick={() => mediaTab.current.click()}
                        >
                          <Text fontSize="xs" color="#fff" fontWeight="bold">
                            NEXT
                          </Text>
                        </Button>
                      </Stack>
                    </CardBody>
                  </Card>
                </TabPanel>
                <TabPanel>
                  <Card>
                    <CardHeader mb="40px">
                      <Text
                        color={textColor}
                        fontSize="xl"
                        fontWeight="bold"
                        mb="3px"
                      >
                        Media
                      </Text>
                    </CardHeader>
                    <CardBody>
                      <Flex direction="column" w="100%">
                        <Text
                          color={textColor}
                          fontSize="sm"
                          fontWeight="bold"
                          mb="12px"
                        >
                          Hình ảnh sản phẩm
                        </Text>
                        <Flex
                          align="center"
                          justify="center"
                          border="1px dashed #E2E8F0"
                          borderRadius="15px"
                          w="100%"
                          minH="130px"
                          cursor="pointer"
                          {...getRootProps({ className: "dropzone" })}
                        >
                          <Input {...getInputProps()} />
                          <Button variant="no-hover">
                            <Text color="gray.400" fontWeight="normal">
                              Drop files here to upload
                            </Text>
                          </Button>
                        </Flex>
                        <Stack>
                          {files.map(file => <Flex><div style={{ position: 'relative' }}><Image src={file.image} width={250} style={{ marginTop: '20px' }} />
                            <div style={{ position: "absolute", top: '6%', left: `calc(0% + 232px)` }}>
                              <CloseButton onClick={() => handleRemoveImage(file.image)} width={6} height={6} style={{ background: 'white', boxShadow: '0px 0px 4px 1px #bdbdbd' }} _hover={{ background: "unset" }} />
                            </div>
                          </div><div style={{ marginTop: '20px', marginLeft: '20px' }}>
                              <FormLabel fontSize="xs" fontWeight="bold" mb="10px">Chọn kiểu hình ảnh: </FormLabel>
                              <Select onChange={(e) => handleChangeImageOption(e.target.value, file.image)} defaultValue={`image`}>
                                <option value={'thumbnail'}>Thumbnail</option>
                                <option value={'mainImage'}>Hình ảnh chính</option>
                                <option value={'image'}>Hình ảnh giới thiệu</option>
                              </Select>
                            </div></Flex>)}
                        </Stack>
                        <Flex justify="space-between">
                          <Button
                            variant="no-hover"
                            bg={bgPrevButton}
                            alignSelf="flex-end"
                            mt="24px"
                            w="100px"
                            h="35px"
                            onClick={() => productInfoTab.current.click()}
                          >
                            <Text
                              fontSize="xs"
                              color="gray.700"
                              fontWeight="bold"
                            >
                              PREV
                            </Text>
                          </Button>
                          <Button
                            variant="no-hover"
                            bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                            alignSelf="flex-end"
                            mt="24px"
                            w="100px"
                            h="35px"
                            onClick={() => socialsTab.current.click()}
                          >
                            <Text fontSize="xs" color="#fff" fontWeight="bold">
                              NEXT
                            </Text>
                          </Button>
                        </Flex>
                      </Flex>
                    </CardBody>
                  </Card>
                </TabPanel>
                <TabPanel>
                  <Card>
                    <CardHeader mb="32px">
                      <Text fontSize="lg" color={textColor} fontWeight="bold">
                        Nội dung sản phẩm
                      </Text>
                    </CardHeader>
                    <CardBody>
                      <Flex direction="column" w="100%">
                        <Stack direction="column" spacing="20px" w="100%">
                          <FormControl>
                            <FormLabel
                              fontSize="xs"
                              fontWeight="bold"
                              mb="10px"
                            >
                              Nội dung
                            </FormLabel>
                            <TinyEditor
                              onEditorChange={(value) =>
                                setFieldValue("content", value)
                              }
                              apiKey="tkh8od44lm307q03zsyrhul0yn5rqeuuvyzxomm2s82dwsh2"
                              onInit={(evt, editor) =>
                                (editorRef.current = editor)
                              }
                              initialValue="<p>This is the initial content of the editor.</p>"
                              init={{
                                height: 500,
                                menubar: false,
                                plugins:
                                  "advlist autolink lists link image charmap print preview anchor" +
                                  "searchreplace visualblocks code fullscreen" +
                                  "insertdatetime media table paste code help wordcount",
                                toolbar:
                                  "undo redo | formatselect | " +
                                  "bold italic backcolor | alignleft aligncenter " +
                                  "alignright alignjustify | bullist numlist outdent indent | " +
                                  "removeformat | help | image",
                                content_style:
                                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                file_picker_callback: async function (
                                  callback,
                                  value,
                                  meta
                                ) {
                                  if (meta.filetype == "image") {
                                    var input = document.getElementById(
                                      "my-file"
                                    );
                                    input.click();
                                    input.onchange = async function () {
                                      var file = input.files[0];
                                      try {
                                        const result = await uploadFile(file);
                                        callback(result.data, {
                                          alt: file.name,
                                        });
                                      } catch (error) { }
                                    };
                                  }
                                },
                                paste_data_images: true,
                              }}
                              value={values.content}
                            />
                            <input
                              id="my-file"
                              type="file"
                              name="my-file"
                              style={{ display: "none" }}
                            />
                          </FormControl>
                        </Stack>
                        <Flex justify="space-between">
                          <Button
                            variant="no-hover"
                            bg={bgPrevButton}
                            alignSelf="flex-end"
                            mt="24px"
                            w="100px"
                            h="35px"
                            onClick={() => mediaTab.current.click()}
                          >
                            <Text
                              fontSize="xs"
                              color="gray.700"
                              fontWeight="bold"
                            >
                              PREV
                            </Text>
                          </Button>
                          <Button
                            variant="no-hover"
                            bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                            alignSelf="flex-end"
                            mt="24px"
                            w="100px"
                            h="35px"
                            onClick={() => pricingTab.current.click()}
                          >
                            <Text fontSize="xs" color="#fff" fontWeight="bold">
                              NEXT
                            </Text>
                          </Button>
                        </Flex>
                      </Flex>
                    </CardBody>
                  </Card>
                </TabPanel>
                <TabPanel>
                  <Card>
                    <CardHeader mb="32px">
                      <Text fontSize="lg" color={textColor} fontWeight="bold">
                        Giá sản phẩm
                      </Text>
                    </CardHeader>
                    <CardBody>
                      <Flex direction="column" w="100%" >
                        <Stack direction="column" spacing="20px" w="100%">
                          {priceList.map((item, index) => {
                            return (
                              <Stack direction="row" spacing="24px" alignItems={"end"}>
                                <Field name="unit">
                                  {({ field, form }) => (
                                    <FormControl>

                                      <FormLabel fontSize="xs" fontWeight="bold" mb="10px">Chọn đơn vị tính: </FormLabel>
                                      <Select defaultValue={`image`} placeholder="Chọn đơn vị tính">
                                        {allUnit && allUnit?.map(item => <option value={item.id}>{item?.name}</option>)}
                                      </Select>
                                    </FormControl>)}
                                </Field>
                                <Field name="base_price">
                                  {({ field, form }) => (
                                    <FormControl>
                                      <FormLabel fontSize="xs" fontWeight="bold" mb="10px">
                                        Giá tiền / Đơn vị tính
                                      </FormLabel>
                                      <Input
                                        borderRadius="15px"
                                        placeholder="Nhập giá tiền"
                                        fontSize="xs"
                                      />
                                    </FormControl>)}</Field>
                                <Field name="fake_price">
                                  {({ field, form }) => (
                                    <FormControl>
                                      <FormLabel fontSize="xs" fontWeight="bold" mb="10px">
                                        Giá ảo
                                      </FormLabel>
                                      <Input
                                        borderRadius="15px"
                                        placeholder="Nhập giá ảo"
                                        fontSize="xs"
                                      />
                                    </FormControl>)}</Field>
                                <Field name="quantity">
                                  {({ field, form }) => (
                                    <FormControl>
                                      <FormLabel fontSize="xs" fontWeight="bold" mb="10px">
                                        Số lượng / Đơn vị tính
                                      </FormLabel>
                                      <Input
                                        borderRadius="15px"
                                        placeholder="Nhập giá ảo"
                                        fontSize="xs"
                                      />
                                    </FormControl>)}</Field>
                                <Field name="unit">
                                  {({ field, form }) => (
                                    <FormControl>

                                      <FormLabel fontSize="xs" fontWeight="bold" mb="10px">Kho: </FormLabel>
                                      <Select defaultValue={`image`} placeholder="Chọn kho">
                                        {allUnit.map(item => <option value={item.id}>{item?.name}</option>)}
                                      </Select>
                                    </FormControl>)}
                                </Field>
                                {index == priceList.length - 1 ? <Stack>
                                  <Tooltip
                                    hasArrow
                                    label="Thêm giá"
                                    placement="top"
                                  >
                                    <Button
                                      p="0px"
                                      variant='solid' colorScheme='gray' rounded='full'
                                      justifyContent={'center'} alignItems={'center'}
                                      onClick={handleAddNewPrice}
                                    >
                                      <Icon as={AddIcon} />
                                    </Button>
                                  </Tooltip>
                                </Stack> : <Stack>

                                </Stack>}
                              </Stack>
                            )
                          })}
                        </Stack>
                        <Flex justify="space-between">
                          <Button
                            variant="no-hover"
                            bg={bgPrevButton}
                            alignSelf="flex-end"
                            mt="24px"
                            w="100px"
                            h="35px"
                            onClick={() => socialsTab.current.click()}
                          >
                            <Text
                              fontSize="xs"
                              color="gray.700"
                              fontWeight="bold"
                            >
                              PREV
                            </Text>
                          </Button>
                          <FormControl
                            style={{
                              alignSelf: "flex-end",
                              width: "fit-content",
                            }}
                          >
                            <Button
                              variant="no-hover"
                              bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                              mt="24px"
                              w="100px"
                              h="35px"
                              type="submit"
                            >
                              <Text
                                fontSize="xs"
                                color="#fff"
                                fontWeight="bold"
                              >
                                SEND
                              </Text>
                            </Button>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </CardBody>

                  </Card>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}

export default NewProduct;
