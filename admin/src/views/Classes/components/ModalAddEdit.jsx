

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
import { getProducts } from "../store";
import { useSelector } from "react-redux";
import Spinner from "@/components/Spinner";
import SingleUpload from "@/components/BoxUpload/SingleUpload";
import { getAllCategory } from "@/views/Categories/store";

const createCateValidationSchema = yup.object().shape({
    title: yup.string().required("Vui lòng nhập tiêu đề"),
    slug: yup.string().required("Vui lòng nhập đường dẫn tĩnh"),
    price: yup.string().required("Vui lòng nhập gía"),
    fakePrice: yup.string().required("Vui lòng nhập giá giả"),
    description: yup.string().required("Vui lòng nhập mô tả"),
    category: yup.string().required("Vui lòng nhập danh mục"),
    thumbnail: yup.string().required("Vui lòng thêm hình ảnh khoá học")
});

const ModalAddEdit = ({ onClose, isOpen }) => {
    const initialRef = useRef(null);
    const dispatch = useDispatch();
    const { products, params, selectedProduct, selectLoading } = useSelector(
        (state) => state.products
    );

    const { allCategory: categories } = useSelector(
        (state) => state.categories
    );

    const toast = useToast({ position: "top" });

    const handleTitleChange = (value, setFieldValue) => {
        setFieldValue("title", value);
        setFieldValue("slug", toSlug(value));
    };

    const handleSubmit = async (value, { setSubmitting }) => {
        try {
            setSubmitting(true);
            const api = new APIService();
            if (selectedProduct) {
                const res = await api.updateProduct(selectedProduct?.id, value);
                if (res.data.status == 1) {
                    toast({ title: "Cập nhật khoá học thành công", status: "success" });
                    onClose();
                } else {
                    toast({
                        title: "Cập nhật khoá học thất bại",
                        description: res.data.result.message,
                        status: "error",
                    });
                }
            } else {
                const res = await api.createProduct(value);
                if (res.data.status == 1) {
                    toast({ title: "Thêm khoá học thành công", status: "success" });
                    onClose();
                } else {
                    toast({
                        title: "Thêm khọc học thất bại",
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
            dispatch(getProducts(params));
        }
    };

    useEffect(() => {
        dispatch(getAllCategory())
    }, [])

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
                        selectedProduct
                            ? { ...selectedProduct, category: selectedProduct?.id }
                            : {
                                title: "",
                                slug: "",
                                description: "",
                                thumbnail: "",
                                price: "",
                                fakePrice: "",
                                category: ""
                            }
                    }
                    validationSchema={createCateValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <ModalContent>
                            <Form>
                                <ModalHeader>
                                    {selectedProduct ? "Cập nhật" : "Thêm"} khoá học
                                </ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Stack direction="column" spacing="20px" w="100%">
                                        <Stack direction="row" spacing={{ sm: "24px", lg: "30px" }}>
                                            <Field name="title">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isInvalid={form.errors.title && form.touched.title}
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
                                                            placeholder="eg. Khoá học Java cơ bản"
                                                            fontSize="xs"
                                                            onChange={(e) =>
                                                                handleTitleChange(e.target.value, setFieldValue)
                                                            }
                                                        />
                                                        <FormErrorMessage>
                                                            {form.errors.title}
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
                                                            placeholder="eg. hoc-java"
                                                            fontSize="xs"
                                                        />
                                                        <FormErrorMessage>
                                                            {form.errors.slug}
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </Stack>
                                        <Stack direction="row" spacing={{ sm: "24px", lg: "30px" }}>
                                            <Field name="description">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isInvalid={form.errors.description && form.touched.description}
                                                    >
                                                        <FormLabel
                                                            fontWeight="semibold"
                                                            fontSize="xs"
                                                            mb="10px"
                                                        >
                                                            Mô tả khoá học
                                                        </FormLabel>
                                                        <Input
                                                            {...field}
                                                            borderRadius="15px"
                                                            placeholder="eg. hoc-java"
                                                            fontSize="xs"
                                                        />
                                                        <FormErrorMessage>
                                                            {form.errors.description}
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </Stack>

                                        <Stack
                                            direction={{ sm: "column", lg: "row" }}
                                            spacing={{ sm: "24px", lg: "30px" }}
                                        >
                                            <Field name="category">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isInvalid={
                                                            form.errors.category && form.touched.category
                                                        }
                                                    >
                                                        <FormLabel
                                                            fontWeight="semibold"
                                                            fontSize="xs"
                                                            mb="10px"
                                                        >
                                                            Danh mục
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
                                                            {form.errors.category}
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </Stack>
                                    </Stack>
                                    <Stack direction="row" spacing={{ sm: "24px", lg: "30px" }} mt={'12px'} >
                                        <Field name="price">
                                            {({ field, form }) => (
                                                <FormControl
                                                    isInvalid={form.errors.price && form.touched.price}
                                                >
                                                    <FormLabel
                                                        fontWeight="semibold"
                                                        fontSize="xs"
                                                        mb="10px"
                                                    >
                                                        Giá (VND)
                                                    </FormLabel>
                                                    <Input
                                                        {...field}
                                                        borderRadius="15px"
                                                        placeholder="eg. 300000"
                                                        fontSize="xs"
                                                    />
                                                    <FormErrorMessage>
                                                        {form.errors.price}
                                                    </FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Stack>
                                    <Stack direction="row" spacing={{ sm: "24px", lg: "30px" }} mt={'12px'} >
                                        <Field name="fakePrice">
                                            {({ field, form }) => (
                                                <FormControl
                                                    isInvalid={form.errors.fakePrice && form.touched.fakePrice}
                                                >
                                                    <FormLabel
                                                        fontWeight="semibold"
                                                        fontSize="xs"
                                                        mb="10px"
                                                    >
                                                        Giá giả (VND)
                                                    </FormLabel>
                                                    <Input
                                                        {...field}
                                                        borderRadius="15px"
                                                        placeholder="eg. 300000"
                                                        fontSize="xs"
                                                    />
                                                    <FormErrorMessage>
                                                        {form.errors.fakePrice}
                                                    </FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Stack>
                                    <Stack direction="row" spacing={{ sm: "24px", lg: "30px" }} mt={'12px'} >
                                        <Field name="thumbnail">
                                            {({ field, form }) => (
                                                <FormControl
                                                    isInvalid={form.errors.thumbnail && form.touched.thumbnail}
                                                >
                                                    <FormLabel
                                                        fontWeight="semibold"
                                                        fontSize="xs"
                                                        mb="10px"
                                                    >
                                                        Hình ảnh
                                                    </FormLabel>
                                                    <SingleUpload backgroundImage={'/images/bdlw_d4li_220404.jpg'}  {...field} setFieldValue={setFieldValue} />
                                                    <FormErrorMessage>
                                                        {form.errors.thumbnail}
                                                    </FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
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
                                        {selectedProduct ? "Cập nhật" : "Thêm"}
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
