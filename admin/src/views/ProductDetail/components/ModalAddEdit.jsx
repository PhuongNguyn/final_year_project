

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
import { getLessons } from "../store";
import { useSelector } from "react-redux";
import Spinner from "@/components/Spinner";
import { getAllProduct } from "@/views/Product/store";

const createCateValidationSchema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tiêu đề"),
    slug: yup.string().required("Vui lòng nhập đường dẫn tĩnh"),
    ordered: yup.string().required("Vui lòng nhập số thứ tự bài học"),
    videoUrl: yup.string().required("Vui lòng nhập link video"),
    description: yup.string().required("Vui lòng nhập mô tả"),
    productId: yup.string().required("Vui lòng nhập khoá học"),
    isFree: yup.boolean()
});

const ModalAddEdit = ({ onClose, isOpen }) => {
    const initialRef = useRef(null);
    const dispatch = useDispatch();
    const { allProducts, selectedProduct } = useSelector(
        (state) => state.products
    );


    const { lessons, params, selectedLesson, selectLoading } = useSelector(
        (state) => state.lessons
    );

    const toast = useToast({ position: "top" });

    const handleTitleChange = (value, setFieldValue) => {
        setFieldValue("name", value);
        setFieldValue("slug", toSlug(value));
    };

    const handleSubmit = async (value, { setSubmitting }) => {
        try {
            setSubmitting(true);
            const api = new APIService();
            if (selectedLesson) {
                const { product, ...submitData } = value
                const res = await api.updateLesson(selectedLesson?.id, submitData);
                toast({ title: "Cập nhật bài học thành công", status: "success" });
                onClose();
            } else {
                const res = await api.createLesson(value);

                toast({ title: "Thêm bài học thành công", status: "success" });
                onClose();

            }
        } catch (error) {
            toast({
                title: "Xảy ra lỗi nghiêm trọng",
                description: error.response?.data?.message,
                status: "error",
            });
        } finally {
            setSubmitting(false);
            dispatch(getLessons(params));
        }
    };

    useEffect(() => {
        dispatch(getAllProduct())
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
                        selectedLesson
                            ? { ...selectedLesson, productId: selectedLesson?.product?.id }
                            : {
                                name: "",
                                slug: "",
                                description: "",
                                thumbnail: "",
                                videoUrl: "",
                                ordered: 0,
                                productId: "",
                                isFree: false
                            }
                    }
                    validationSchema={createCateValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <ModalContent>
                            <Form>
                                <ModalHeader>
                                    {selectedLesson ? "Cập nhật" : "Thêm"} bài học
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
                                                            placeholder="eg. Khoá học Java cơ bản"
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
                                                            Mô tả bài học
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
                                            <Field name="productId">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isInvalid={
                                                            form.errors.productId && form.touched.productId
                                                        }
                                                    >
                                                        <FormLabel
                                                            fontWeight="semibold"
                                                            fontSize="xs"
                                                            mb="10px"
                                                        >
                                                            Khoá học
                                                        </FormLabel>
                                                        <Select
                                                            {...field}
                                                            borderRadius="15px"
                                                            color="gray.400"
                                                            fontSize="sm"
                                                        >
                                                            <option value={""}>Không có</option>
                                                            {allProducts?.map((product) => (
                                                                <option value={product?.id}>
                                                                    {product.title}
                                                                </option>
                                                            ))}
                                                        </Select>
                                                        <FormErrorMessage>
                                                            {form.errors.productId}
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </Stack>
                                    </Stack>
                                    <Stack
                                        direction={{ sm: "column", lg: "row" }}
                                        spacing={{ sm: "24px", lg: "30px" }}
                                    >
                                        <Field name="isFree">
                                            {({ field, form }) => (
                                                <FormControl
                                                    isInvalid={
                                                        form.errors.isFree && form.touched.isFree
                                                    }
                                                >
                                                    <FormLabel
                                                        fontWeight="semibold"
                                                        fontSize="xs"
                                                        mb="10px"
                                                    >
                                                        Khoá học miễn phí
                                                    </FormLabel>
                                                    <Select
                                                        {...field}
                                                        borderRadius="15px"
                                                        color="gray.400"
                                                        fontSize="sm"
                                                    >
                                                        <option value={true}>Có</option>
                                                        <option value={false}>Không</option>
                                                    </Select>
                                                    <FormErrorMessage>
                                                        {form.errors.isFree}
                                                    </FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Stack>
                                    <Stack direction="videoUrl" spacing={{ sm: "24px", lg: "30px" }} mt={'12px'} >
                                        <Field name="videoUrl">
                                            {({ field, form }) => (
                                                <FormControl
                                                    isInvalid={form.errors.videoUrl && form.touched.videoUrl}
                                                >
                                                    <FormLabel
                                                        fontWeight="semibold"
                                                        fontSize="xs"
                                                        mb="10px"
                                                    >
                                                        Video Url
                                                    </FormLabel>
                                                    <Input
                                                        {...field}
                                                        borderRadius="15px"
                                                        placeholder="youtube.com"
                                                        fontSize="xs"
                                                    />
                                                    <FormErrorMessage>
                                                        {form.errors.videoUrl}
                                                    </FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Stack>
                                    <Stack direction="row" spacing={{ sm: "24px", lg: "30px" }} mt={'12px'} >
                                        <Field name="ordered">
                                            {({ field, form }) => (
                                                <FormControl
                                                    isInvalid={form.errors.ordered && form.touched.ordered}
                                                >
                                                    <FormLabel
                                                        fontWeight="semibold"
                                                        fontSize="xs"
                                                        mb="10px"
                                                    >
                                                        Sắp xếp
                                                    </FormLabel>
                                                    <Input
                                                        {...field}
                                                        borderRadius="15px"
                                                        placeholder="1"
                                                        fontSize="xs"
                                                    />
                                                    <FormErrorMessage>
                                                        {form.errors.ordered}
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
                                        {selectedLesson ? "Cập nhật" : "Thêm"}
                                    </Button>
                                    <Button onClick={onClose}>Đóng</Button>
                                </ModalFooter>
                            </Form>
                        </ModalContent>
                    )}
                </Formik>
            )
            }
        </Modal >
    );
};

export default memo(ModalAddEdit);
