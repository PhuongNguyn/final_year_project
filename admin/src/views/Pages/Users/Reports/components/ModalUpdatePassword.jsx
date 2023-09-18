import Spinner from "@/components/Spinner";
import APIService from "@/helper/api";
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
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { memo, useRef } from "react";
import { useSelector } from "react-redux";
import * as yup from "yup";

const updatePasswordValidationSchema = yup.object().shape({
  password: yup.string().required("Vui lòng nhập mật khẩu mới"),
  confirm_password: yup
    .string()
    .required("Vui lòng xác nhận mật khẩu")
    .oneOf([yup.ref("password"), null], "Mật khẩu không trùng khớp"),
});

const ModalUpdatePassword = ({ onClose, isOpen }) => {
  const initialRef = useRef(null);
  const { selectedUser, selectLoading } = useSelector((state) => state.users);
  const toast = useToast({ position: "top" });

  const handleSubmit = async (value, { setSubmitting }) => {
    try {
      setSubmitting(true);

      const api = new APIService();
      const res = await api.resetPassowordUser(selectedUser?.id, value);
      if (res?.data?.status === 1) {
        toast({
          title: "Cấp lại mật khẩu người dùng thành công",
          status: "success",
        });

        onClose();
      } else {
        toast({
          title: "Cấp lại mật khẩu người dùng thất bại",
          description: error.response?.data?.message,
          status: "error",
        });
      }
    } catch (error) {
      toast({
        title: "Cấp lại mật khẩu người dùng thất bại",
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
      isCentered
    >
      <ModalOverlay />
      {selectLoading ? (
        <ModalContent>
          <Flex w={"100%"} h={"200px"} justify={"center"} align={"center"}>
            <Spinner />
          </Flex>
        </ModalContent>
      ) : (
        <Formik
          initialValues={{
            password: "",
            confirm_password: "",
          }}
          validationSchema={updatePasswordValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <ModalContent>
              <Form>
                <ModalHeader>Cấp lại mật khẩu</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Stack direction="column" spacing="20px" w="100%">
                    <Stack direction="row" spacing={{ sm: "24px", lg: "30px" }}>
                      <Field name="password">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.password && form.touched.password
                            }
                          >
                            <FormLabel
                              fontWeight="semibold"
                              fontSize="xs"
                              mb="10px"
                            >
                              Mật khẩu mới
                            </FormLabel>
                            <Input
                              {...field}
                              borderRadius="15px"
                              fontSize="xs"
                              type="password"
                            />
                            <FormErrorMessage>
                              {form.errors.password}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="confirm_password">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.confirm_password &&
                              form.touched.confirm_password
                            }
                          >
                            <FormLabel
                              fontWeight="semibold"
                              fontSize="xs"
                              mb="10px"
                            >
                              Xác nhận mật khẩu
                            </FormLabel>
                            <Input
                              {...field}
                              borderRadius="15px"
                              fontSize="xs"
                              type="password"
                            />
                            <FormErrorMessage>
                              {form.errors.confirm_password}
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
                    Xác nhận
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

export default memo(ModalUpdatePassword);
