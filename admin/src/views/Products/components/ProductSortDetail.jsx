import productPage1 from "@/assets/img/product-page-1.png";
import productPage2 from "@/assets/img/product-page-2.png";
import productPage3 from "@/assets/img/product-page-3.png";
import productPage4 from "@/assets/img/product-page-4.png";
import productPage5 from "@/assets/img/product-page-5.png";
import Card from "@/components/Card/Card";
import CardBody from "@/components/Card/CardBody";
import CardHeader from "@/components/Card/CardHeader";
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "@/components/Icons/Icons";
import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Image,
  List,
  ListIcon,
  ListItem,
  OrderedList,
  Select,
  SimpleGrid,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { memo, useCallback, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import MiniStatistics from "./MiniStatistics";
import {
  AiOutlineEye,
  AiOutlineLike,
  AiOutlinePlusCircle,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { Rating } from "react-simple-star-rating";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { useHistory } from "react-router-dom";

const status = {
  1: { label: "Sẵn hàng", color: "teal" },
  0: { label: "Hết hàng", color: "red" },
  "-1": { label: "Không hiển thị", color: "gray" },
};
const fillColorArray = [
  "#f17a45",
  "#f17a45",
  "#f19745",
  "#f19745",
  "#f1a545",
  "#f1a545",
  "#f1b345",
  "#f1b345",
  "#f1d045",
  "#f1d045",
];
const ProductSortDetail = ({ product, openDelete }) => {
  const iconBoxInside = useColorModeValue("white", "white");
  const [currentImage, setCurrentImage] = useState(product?.file?.[0]?.link);
  const textColor = useColorModeValue("gray.700", "white");
  const history = useHistory();

  const handleUpdate = useCallback(() => {
    history.push(`/admin/products/edit/${product?.id}`);
  }, []);
  return (
    <Flex direction={{ sm: "column", lg: "row" }} mb={{ sm: "42px" }} gap={5}>
      {product?.file?.length > 0 && (
        <Flex>
          <Card mt={{ sm: "125px", md: "75px" }}>
            <CardHeader mb="42px">
              <Text color={textColor} fontSize="lg" fontWeight="bold">
                Chi tiết sản phẩm
              </Text>
            </CardHeader>
            <CardBody>
              <Flex
                direction="column"
                // me={{ lg: "70px", xl: "120px" }}
                mb={{ sm: "24px", lg: "0px" }}
              >
                <Box
                  w={{ sm: "275px", md: "670px", lg: "450px", xl: "600px" }}
                  h={{ sm: "200px", md: "500px", lg: "330px", xl: "500px" }}
                  mb="26px"
                  mx={{ sm: "auto", lg: "0px" }}
                >
                  <Image
                    src={currentImage}
                    w="100%"
                    h="100%"
                    borderRadius="15px"
                  />
                </Box>
                <Stack
                  direction="row"
                  spacing={{ sm: "20px", md: "35px", lg: "20px" }}
                  mx="auto"
                  mb={{ sm: "24px", lg: "0px" }}
                >
                  {product?.file?.map((file) => (
                    <Box
                      w={{ sm: "36px", md: "90px", lg: "60px" }}
                      h={{ sm: "36px", md: "90px", lg: "60px" }}
                    >
                      <Image
                        src={file?.link}
                        w="100%"
                        h="100%"
                        borderRadius="15px"
                        cursor="pointer"
                        onClick={(e) => setCurrentImage(e.target.src)}
                      />
                    </Box>
                  ))}
                </Stack>
              </Flex>
            </CardBody>
          </Card>
        </Flex>
      )}
      <Flex direction={"column"} flex={1} mt={{ sm: "125px", md: "75px" }}>
        <Stack direction={{ sm: "column", lg: "row" }} spacing="24px" mb="40px">
          <SimpleGrid
            columns={{ sm: "1", md: "2", xl: "3" }}
            spacing="18px"
            justifyContent={"center"}
            alignItems={"center"}
            w={"full"}
          >
            <MiniStatistics
              title={"Lượt thích"}
              amount={product?.detail?.liked}
              icon={
                <Icon
                  as={AiOutlineLike}
                  h={"24px"}
                  w={"24px"}
                  color={iconBoxInside}
                />
              }
            />
            <MiniStatistics
              title={"Lượt xem"}
              amount={product?.detail?.view}
              icon={
                <Icon
                  as={AiOutlineEye}
                  h={"24px"}
                  w={"24px"}
                  color={iconBoxInside}
                />
              }
            />
            <MiniStatistics
              title={"Đơn hàng"}
              amount={product?.detail?.ordered}
              icon={
                <Icon
                  as={AiOutlineShoppingCart}
                  h={"24px"}
                  w={"24px"}
                  color={iconBoxInside}
                />
              }
            />
          </SimpleGrid>
        </Stack>
        <Card>
          <CardBody>
            <Flex direction="column">
              <Text
                color={textColor}
                fontSize="3xl"
                fontWeight="bold"
                mb="12px"
              >
                {product?.name}
              </Text>
              <Flex spacing="12px" color="orange.300" mb="30px">
                <Rating
                  size={30}
                  allowFraction
                  fillColorArray={fillColorArray}
                  SVGstyle={{ display: "inline" }}
                  initialValue={product?.detail?.rated}
                />
              </Flex>
              <Text color="gray.400" fontWeight="normal" fontSize="sm">
                Giá
              </Text>
              <Flex mb="12px" gap={4} py={3}>
                {product?.price?.map((price) => (
                  <Tag size={"md"} variant="subtle" colorScheme="cyan">
                    <TagLeftIcon boxSize="12px" as={FaDollarSign} />
                    <TagLabel>
                      {Number(price?.price).toLocaleString()}/
                      {price?.unit?.name}
                    </TagLabel>
                  </Tag>
                ))}
              </Flex>
              <Text color="gray.400" fontWeight="normal" fontSize="sm">
                Trạng thái
              </Text>
              <Flex mb="12px" gap={4} py={3}>
                <Badge
                  colorScheme={status[product?.status].color}
                  w="95px"
                  h="28px"
                  borderRadius="15px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {status[product?.status].label}
                </Badge>
              </Flex>
              <Text color="gray.400" fontSize="sm" fontWeight="normal" mb="8px">
                Số lượng
              </Text>
              <Box mb="12px" ml={"16px"}>
                <OrderedList>
                  {product?.quantity.map((quantity) => (
                    <ListItem fontSize="sm">
                      <Flex gap={2}>
                        <Text fontSize="sm" fontWeight="bold">
                          Hiện có:
                        </Text>
                        {quantity?.quantity} đơn vị {quantity?.unit?.name}
                        <Text fontSize="sm" fontWeight="bold">
                          Kho:
                        </Text>
                        {quantity?.warehouse?.name}
                      </Flex>
                    </ListItem>
                  ))}
                </OrderedList>
              </Box>
              <Text color="gray.400" fontSize="sm" fontWeight="normal" mb="8px">
                Danh mục
              </Text>
              <Box mb="12px" ml={"16px"}>
                <List>
                  {product?.category?.map((cate) => (
                    <ListItem
                      fontSize="sm"
                      fontWeight="normal"
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <ListIcon
                        as={BiCategory}
                        fontSize="md"
                        color="orange.500"
                      />
                      {cate?.name}
                    </ListItem>
                  ))}
                </List>
              </Box>
              {product?.detail?.parameter?.length > 0 && (
                <>
                  <Text
                    color="gray.400"
                    fontSize="sm"
                    fontWeight="normal"
                    mb="8px"
                  >
                    Thông số kỹ thuật
                  </Text>
                  <Box mb="12px" ml={"16px"}>
                    <List>
                      {product?.detail?.parameter?.map((parameter) => (
                        <ListItem
                          fontSize="sm"
                          fontWeight="normal"
                          display={"flex"}
                          alignItems={"center"}
                        >
                          <ListIcon
                            as={AiOutlinePlusCircle}
                            fontSize="md"
                            color="orange.500"
                          />
                          {parameter?.key}: {parameter?.value}
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </>
              )}
              <Stack direction={"row"}>
                <Button
                  variant="no-hover"
                  bg="linear-gradient(to right, #ff5f6d, #ffc371)"
                  w={{ sm: "240px", md: "100%", lg: "240px" }}
                  h="50px"
                  mx={{ sm: "auto", md: "0px" }}
                  color="#fff"
                  fontSize="xs"
                  fontWeight="bold"
                  leftIcon={<Icon as={FiEdit3} fontSize={"md"} />}
                  onClick={handleUpdate}
                >
                  Cập nhật
                </Button>
                <Button
                  variant="no-hover"
                  bg="linear-gradient(to right, #cb2d3e, #ef473a)"
                  w={{ sm: "240px", md: "100%", lg: "240px" }}
                  h="50px"
                  mx={{ sm: "auto", md: "0px" }}
                  color="#fff"
                  fontSize="xs"
                  fontWeight="bold"
                  leftIcon={<Icon as={FiTrash2} fontSize={"md"} />}
                  onClick={() => openDelete(product?.id)}
                >
                  Xóa
                </Button>
              </Stack>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
    </Flex>
  );
};

export default memo(ProductSortDetail);
