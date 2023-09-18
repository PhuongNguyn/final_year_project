import SingleUpload from "@/components/BoxUpload/SingleUpload";
import APIService from "@/helper/api";
import { getAllRoles } from "@/views/Roles/store";
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
import { Field, Form, Formik } from "formik";
import { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { getUsers } from "../store/userSlice";

const createUserValidationSchema = yup.object().shape({
  fullname: yup.string().required("Vui lòng nhập họ tên"),
  phoneNumber: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .min(10, "Số điện thoại không hợp lệ"),
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Email không hợp lệ"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
  confirm_password: yup
    .string()
    .required("Vui lòng xác nhận mật khẩu")
    .oneOf([yup.ref("password"), null], "Mật khẩu không trùng khớp"),
});

const ModalAdd = ({ onClose, isOpen }) => {
  const initialRef = useRef(null);
  const { roles } = useSelector((state) => state.roles);
  const { params } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRoles());
  }, []);
  const toast = useToast({ position: "top" });

  const handleSubmit = async (value, { setSubmitting }) => {
    try {
      setSubmitting(true);

      const api = new APIService();
      const res = await api.addUser(value);
      if (res?.data?.status === 1) {
        toast({ title: "Thêm người dùng thành công", status: "success" });
        dispatch(getUsers(params));
        onClose();
      } else {
        toast({
          title: "Thêm người dùng thất bại",
          description: error.response?.data?.message,
          status: "error",
        });
      }
    } catch (error) {
      toast({
        title: "Thêm người dùng thất bại",
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
          fullname: "",
          phoneNumber: "",
          email: "",
          password: "",
          confirm_password: "",
          address: "",
        }}
        validationSchema={createUserValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <ModalContent>
            <Form>
              <ModalHeader>Thêm người dùng</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack direction="column" spacing="20px" w="100%">
                  <Stack direction="row" spacing={{ sm: "24px", lg: "30px" }}>
                    <Field name="fullname">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.fullname && form.touched.fullname
                          }
                        >
                          <FormLabel
                            fontWeight="semibold"
                            fontSize="xs"
                            mb="10px"
                          >
                            Họ tên
                          </FormLabel>
                          <Input
                            {...field}
                            borderRadius="15px"
                            placeholder="eg. Kylian Dante"
                            fontSize="xs"
                          />
                          <FormErrorMessage>
                            {form.errors.fullname}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Stack>

                  <Stack direction="row" spacing={{ sm: "24px", lg: "30px" }}>
                    <Field name="email">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.email && form.touched.email}
                        >
                          <FormLabel
                            fontWeight="semibold"
                            fontSize="xs"
                            mb="10px"
                          >
                            Email
                          </FormLabel>
                          <Input
                            {...field}
                            borderRadius="15px"
                            placeholder="eg. dante@cuabien.vn"
                            fontSize="xs"
                          />
                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="phoneNumber">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.phoneNumber && form.touched.phoneNumber
                          }
                        >
                          <FormLabel
                            fontWeight="semibold"
                            fontSize="xs"
                            mb="10px"
                          >
                            Số điện thoại
                          </FormLabel>
                          <Input
                            {...field}
                            borderRadius="15px"
                            placeholder="eg. 0123456789"
                            fontSize="xs"
                          />
                          <FormErrorMessage>
                            {form.errors.phoneNumber}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Stack>

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
                            Mật khẩu
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

                  <Stack
                    direction={{ sm: "column", lg: "row" }}
                    spacing={{ sm: "24px", lg: "30px" }}
                  >
                    <Field name="address">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.address && form.touched.address
                          }
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
                      )}
                    </Field>
                  </Stack>
                  <Stack
                    direction={{ sm: "column", lg: "row" }}
                    spacing={{ sm: "24px", lg: "30px" }}
                  >
                    <Field name="status">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.status && form.touched.status}
                        >
                          <FormLabel
                            fontWeight="semibold"
                            fontSize="xs"
                            mb="10px"
                          >
                            Trạng thái
                          </FormLabel>
                          <Select
                            {...field}
                            borderRadius="15px"
                            color="gray.400"
                            fontSize="sm"
                          >
                            <option value={1}>Đang hoạt động</option>
                            <option value={0}>Chờ xác nhận</option>
                            <option value={-1}>Bị khóa</option>
                          </Select>
                          <FormErrorMessage>
                            {form.errors.status}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="role">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.role && form.touched.role}
                        >
                          <FormLabel
                            fontWeight="semibold"
                            fontSize="xs"
                            mb="10px"
                          >
                            Quyền hạn
                          </FormLabel>
                          <Select
                            {...field}
                            borderRadius="15px"
                            color="gray.400"
                            fontSize="sm"
                          >
                            {roles?.map((role) => (
                              <option value={role.id}>{role.name}</option>
                            ))}
                          </Select>
                          <FormErrorMessage>
                            {form.errors.role}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Stack>
                  <Stack
                    direction={{ sm: "column", lg: "row" }}
                    justify={"center"}
                    align={"center"}
                    spacing={{ sm: "24px", lg: "30px" }}
                  >
                    <Field name="avatar">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.avatar && form.touched.avatar}
                        >
                          <FormLabel
                            fontWeight="semibold"
                            fontSize="xs"
                            mb="10px"
                          >
                            Avatar
                          </FormLabel>
                          <SingleUpload
                            {...field}
                            backgroundImage={"/images/bdlw_d4li_220404.jpg"}
                            setFieldValue={setFieldValue}
                          />
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
                  Thêm
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

export default memo(ModalAdd);
