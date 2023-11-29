// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
// Assets
import { handleLogin } from "@/app/auth";
import APIService from "@/helper/api";
import { Field, Form, Formik } from "formik";
import Lottie from "lottie-react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import animation from "./animation_llvs4fs6.json";

const loginValidationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .min(10, "Số điện thoại không hợp lệ"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
});

function SignIn() {
  const toast = useToast({ position: "top" });
  const history = useHistory();
  const dispatch = useDispatch();

  // Chakra color mode
  const titleColor = useColorModeValue("orange.300", "orange.200");
  const textColor = useColorModeValue("gray.400", "white");
  const illustrationBackground = useColorModeValue("gray.50", "gray.700");

  const onSubmit = async (value, { setSubmitting }) => {
    try {
      setSubmitting(true);
      const api = new APIService();
      const res = await api.login(value);
      if (res?.data?.status === 1) {
        toast({ title: "Đăng nhập thành công", status: "success" });
        dispatch(handleLogin(res.data.result));
        history.push("/admin");
      } else {
        toast({
          title: "Đăng nhập thất bại",
          description: error.response?.data?.message,
          status: "error",
        });
      }
    } catch (error) {
      toast({
        title: "Đăng nhập thất bại",
        description: error.response?.data?.message,
        status: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Flex position="relative" mb={2}>
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "95vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          direction={"column"}
          alignItems="center"
          justifyContent="center"
          mx={{ base: "auto", lg: "unset" }}
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex direction="column" w="100%" background="transparent" p="48px">
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Đăng nhập
            </Heading>
            <Formik
              initialValues={{ phoneNumber: "", password: "" }}
              validationSchema={loginValidationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field name="phoneNumber">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.phoneNumber && form.touched.phoneNumber
                        }
                        mb="24px"
                      >
                        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                          Số điện thoại
                        </FormLabel>
                        <Input
                          {...field}
                          borderRadius="15px"
                          fontSize="sm"
                          type="text"
                          placeholder="Số điện thoại"
                          size="lg"
                        />
                        <FormErrorMessage>
                          {form.errors.phoneNumber}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                        mb="36px"
                      >
                        <FormLabel
                          ms="4px"
                          fontSize="sm"
                          fontWeight="normal"
                          color="gray.1300"
                        >
                          Mật khẩu
                        </FormLabel>
                        <Input
                          {...field}
                          borderRadius="15px"
                          fontSize="sm"
                          type="password"
                          placeholder="Mật khẩu"
                          size="lg"
                        />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <FormControl>
                    <Button
                      isLoading={isSubmitting}
                      fontSize="sm"
                      type="submit"
                      bg="orange.300"
                      w="100%"
                      h="45"
                      mb="20px"
                      color="white"
                      mt="20px"
                      _hover={{
                        bg: "orange.200",
                      }}
                      _active={{
                        bg: "orange.400",
                      }}
                    >
                      Đăng nhập
                    </Button>
                  </FormControl>
                </Form>
              )}
            </Formik>
            {/* <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColor} fontWeight="medium">
                Don't have an account?
                <Link color={titleColor} as="span" ms="5px" fontWeight="bold">
                  Sign Up
                </Link>
              </Text>
            </Flex> */}
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w={{ lg: "50vw", "2xl": "50vw" }}
          position="absolute"
          right="0px"
        >
          <Flex
            backgroundColor={illustrationBackground}
            justify="center"
            align="end"
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
          >
            {/* <Image
              boxSize={{ lg: "500px", xl: "600px", "2xl": "790px" }}
              src={illustration}
              alt="illustration"
            /> */}
            <Lottie animationData={animation} loop={true} />
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
