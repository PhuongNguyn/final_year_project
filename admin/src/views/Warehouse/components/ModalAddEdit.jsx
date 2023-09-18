import APIService from "@/helper/api";
import { toSlug } from "@/utils";
import {
    Button,
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
import { Field, Form, Formik, useFormikContext } from "formik";
import { memo, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import * as yup from "yup";
import { getPagingWarehouse, getWarehouse, updateWarehouse } from "../store";
import { useSelector } from "react-redux";

const createCateValidationSchema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên"),
    address: yup.string().required("Vui lòng nhập địa chỉ"),
});

const ModalAddEdit = ({ onClose, isOpen }) => {
    const initialRef = useRef(null);
    const dispatch = useDispatch();
    const { units, params, selectedWarehouse, selectLoading } = useSelector(
        (state) => state.warehouses
    );

    const toast = useToast({ position: "top" });

    const handleTitleChange = (value, setFieldValue) => {
        setFieldValue("name", value);
    };

    const handleSubmit = async (value, { setSubmitting }) => {
        try {
            if (selectedWarehouse) {
                const result = await dispatch(updateWarehouse({ id: selectedWarehouse.id, data: value })).unwrap()
                if (result == 0) {
                    toast({
                        title: "Cập nhật kho thất bại",
                        description: error.response?.data?.message,
                        status: "error",
                    });
                } else if (result == 1) {
                    toast({ title: "Cập nhật kho thành công", status: "success" });
                    onClose()
                }
                return;
            }
            setSubmitting(true);
            const api = new APIService();
            const res = await api.createWarehouse(value);
            if (res.data.status == 1) {
                toast({ title: "Thêm kho thành công", status: "success" });
                dispatch(getPagingWarehouse(params));
                onClose();
            } else {
                toast({
                    title: "Thêm kho thất bại",
                    description: res.data.result.message,
                    status: "error",
                });
            }
        } catch (error) {
            console.log(error)
            toast({
                title: "Thêm kho thất bại",
                description: error.response?.data?.message,
                status: "error",
            });
        } finally {
            setSubmitting(false);
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

            <Formik
                initialValues={{
                    name: selectedWarehouse ? selectedWarehouse.name : "",
                    address: selectedWarehouse ? selectedWarehouse.address : ""
                }}
                validationSchema={createCateValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <ModalContent>
                        <Form>
                            <ModalHeader>{!selectedWarehouse ? "Thêm kho" : "Sửa kho"}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Stack direction="column" spacing="20px" w="100%">
                                    <Stack direction="row" spacing={{ sm: "24px", lg: "30px" }}>
                                        <Field name="name">
                                            {({ field, form }) => {
                                                return (
                                                    <FormControl
                                                        isInvalid={form.errors.name && form.touched.name}
                                                    >
                                                        <FormLabel
                                                            fontWeight="semibold"
                                                            fontSize="xs"
                                                            mb="10px"
                                                        >
                                                            Tên kho
                                                        </FormLabel>
                                                        <Input
                                                            {...field}
                                                            borderRadius="15px"
                                                            placeholder="eg. Kho Tân Phú"
                                                            fontSize="xs"
                                                            onChange={(e) =>
                                                                handleTitleChange(e.target.value, setFieldValue)
                                                            }
                                                        />
                                                        <FormErrorMessage>
                                                            {form.errors.name}
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )
                                            }}
                                        </Field>
                                        <Field name="address">
                                            {({ field, form }) => {
                                                return (
                                                    <FormControl
                                                        isInvalid={form.errors.name && form.touched.name}
                                                    >
                                                        <FormLabel
                                                            fontWeight="semibold"
                                                            fontSize="xs"
                                                            mb="10px"
                                                        >
                                                            Địa chỉ
                                                        </FormLabel>
                                                        <Input
                                                            {...field}
                                                            borderRadius="15px"
                                                            placeholder="eg. 131, CN11"
                                                            fontSize="xs"
                                                        />
                                                        <FormErrorMessage>
                                                            {form.errors.address}
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )
                                            }}
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
                                    {!selectedWarehouse ? "Thêm" : "Cập nhật"}
                                </Button>
                                <Button onClick={onClose}>Đóng</Button>
                            </ModalFooter>
                        </Form>
                    </ModalContent>
                )}
            </Formik>
        </Modal>
    );
};

export default memo(ModalAddEdit);
