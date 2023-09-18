import APIService from "@/helper/api";
import { toSlug } from "@/utils";
import { getAllRoles } from "@/views/Roles/store";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { memo, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import * as yup from "yup";
import { getCategories } from "../store";
import { useSelector } from "react-redux";
import Spinner from "@/components/Spinner";

const createCateValidationSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tiêu đề"),
  slug: yup.string().required("Vui lòng nhập đường dẫn tĩnh"),
});

const ModalAddEdit = ({ onClose, isOpen }) => {
  const initialRef = useRef(null);
  const dispatch = useDispatch();
  const { categories, params, selectedCategory, selectLoading } = useSelector(
    (state) => state.categories
  );

  const toast = useToast({ position: "top" });

  const handleTitleChange = (value, setFieldValue) => {
    setFieldValue("name", value);
    setFieldValue("slug", toSlug(value));
  };

  const handleSubmit = async (value, { setSubmitting }) => {
    if (value.parent === "0") {
      delete value.parent;
    }
    try {
      setSubmitting(true);
      const api = new APIService();
      if (selectedCategory) {
        const res = await api.updateCategories(selectedCategory?.id, value);
        if (res.data.result.sucess) {
          toast({ title: "Cập nhật danh mục thành công", status: "success" });
        } else {
          toast({
            title: "Cập nhật danh mục thất bại",
            description: res.data.result.message,
            status: "error",
          });
        }
      } else {
        const res = await api.createCategories(value);
        if (res.data.result.success) {
          toast({ title: "Thêm danh mục thành công", status: "success" });
        } else {
          toast({
            title: "Thêm danh mục thất bại",
            description: res.data.result.message,
            status: "error",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Xảy ra lỗi nghiêm trọng",
        description: error.response?.data?.message,
        status: "error",
      });
    } finally {
      setSubmitting(false);
      dispatch(getCategories(params));
      onClose();
    }
  };

  return (
    <Modal
      onClose={onClose}
      size={"3xl"}
      isOpen={isOpen}
      initialFocusRef={initialRef}
    >
      <ModalOverlay />

      {selectLoading ? (
        <ModalContent>
          <Flex w={"100%"} h={"400px"} justify={"center"} align={"center"}>
            <Spinner />
          </Flex>
        </ModalContent>
      ) : (
        <Formik
          initialValues={
            selectedCategory
              ? { ...selectedCategory, parent: selectedCategory.parent?.id }
              : {
                  name: "",
                  slug: "",
                }
          }
          validationSchema={createCateValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <ModalContent>
              <Form>
                <ModalHeader>
                  {selectedCategory ? "Cập nhật" : "Thêm"} danh mục
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Stack direction="column" spacing="20px" w="100%">
                    <Stack direction="row" spacing={{ sm: "24px", lg: "30px" }}>
                      <Field name="name">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel
                              fontWeight="semibold"
                              fontSize="xs"
                              mb="10px"
                            >
                              Tiêu đề
                            </FormLabel>
                            <Input
                              {...field}
                              borderRadius="15px"
                              placeholder="eg. Hải sản Từ Nham"
                              fontSize="xs"
                              onChange={(e) =>
                                handleTitleChange(e.target.value, setFieldValue)
                              }
                            />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Stack>

                    <Stack direction="row" spacing={{ sm: "24px", lg: "30px" }}>
                      <Field name="slug">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.slug && form.touched.slug}
                          >
                            <FormLabel
                              fontWeight="semibold"
                              fontSize="xs"
                              mb="10px"
                            >
                              Đường dẫn tĩnh
                            </FormLabel>
                            <Input
                              {...field}
                              borderRadius="15px"
                              placeholder="eg. hai-san-tu-nham"
                              fontSize="xs"
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
                      spacing={{ sm: "24px", lg: "30px" }}
                    >
                      <Field name="parent">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.parent && form.touched.parent
                            }
                          >
                            <FormLabel
                              fontWeight="semibold"
                              fontSize="xs"
                              mb="10px"
                            >
                              Danh mục cha
                            </FormLabel>
                            <Select
                              {...field}
                              borderRadius="15px"
                              color="gray.400"
                              fontSize="sm"
                            >
                              <option value={0}>Không có</option>
                              {categories.map((category) => (
                                <option value={category?.id}>
                                  {category?.name}
                                </option>
                              ))}
                            </Select>
                            <FormErrorMessage>
                              {form.errors.parentId}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Stack>
                  </Stack>
                </ModalBody>
                <ModalFooter gap={3}>
                  <Button
                    type="submit"
                    variant="solid"
                    bg="linear-gradient(to right, #ff5f6d, #ffc371);"
                    color="white"
                    _hover={{
                      bg: "linear-gradient(to right, #ff4b1f, #ff9068);",
                    }}
                    _active={{
                      bg: "orange.400",
                    }}
                    isLoading={isSubmitting}
                  >
                    {selectedCategory ? "Cập nhật" : "Thêm"}
                  </Button>
                  <Button onClick={onClose}>Đóng</Button>
                </ModalFooter>
              </Form>
            </ModalContent>
          )}
        </Formik>
      )}
    </Modal>
  );
};

export default memo(ModalAddEdit);
