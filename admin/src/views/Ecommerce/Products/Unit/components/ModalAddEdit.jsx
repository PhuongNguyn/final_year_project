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
import { getUnits } from "../store";
import { useSelector } from "react-redux";

const createCateValidationSchema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tiêu đề"),
    slug: yup.string().required("Vui lòng nhập đường dẫn tĩnh"),
});

const ModalAddEdit = ({ onClose, isOpen }) => {
    const initialRef = useRef(null);
    const dispatch = useDispatch();
    const { units, params, selectedUnit, selectLoading } = useSelector(
        (state) => state.units
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
            const res = await api.createUnit(value);
            if (res.data.result.status == 1) {
                toast({ title: "Thêm đơn vị tính thành công", status: "success" });
                dispatch(getUnits(params));
                onClose();
            } else {
                toast({
                    title: "Thêm đơn vị tính thất bại",
                    description: res.data.result.message,
                    status: "error",
                });
            }
        } catch (error) {
            toast({
                title: "Thêm đơn vị tính thất bại",
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
                    name: null,
                }}
                validationSchema={createCateValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <ModalContent>
                        <Form>
                            <ModalHeader>{!selectedUnit ? "Thêm đơn vị tính" : "Sửa đơn vị tính"}</ModalHeader>
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
                                                            Đơn vị tính
                                                        </FormLabel>
                                                        <Input
                                                            {...field}
                                                            borderRadius="15px"
                                                            placeholder="eg. con, kg, cái"
                                                            fontSize="xs"
                                                            onChange={(e) =>
                                                                handleTitleChange(e.target.value, setFieldValue)
                                                            }
                                                            value={form?.values.name != null ? form?.values.name : selectedUnit?.name}
                                                        />
                                                        <FormErrorMessage>
                                                            {form.errors.name}
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
                                    {!selectedUnit ? "Thêm" : "Cập nhật"}
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
