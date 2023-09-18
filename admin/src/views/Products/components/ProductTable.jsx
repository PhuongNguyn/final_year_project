import Card from "@/components/Card/Card";
import CardBody from "@/components/Card/CardBody";
import { HSeparator } from "@/components/Separator/Separator";
import {
  Avatar,
  Button,
  Checkbox,
  Flex,
  Icon,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorModeValue,
  useDisclosure,
  Table,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tag,
  TagLabel,
} from "@chakra-ui/react";

import React, { useCallback, useEffect, useMemo } from "react";
import { BsCircleFill } from "react-icons/bs";
import {
  FaEye,
  FaPencilAlt,
  FaPlus,
  FaTrashAlt,
  FaUnlock,
} from "react-icons/fa";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { getProduct } from "../store";
import Loading from "@/components/Loading";

const status = {
  1: { label: "Sẵn hàng", color: "teal" },
  0: { label: "Hết hàng", color: "red" },
  "-1": { label: "Không hiển thị", color: "gray" },
};

const ProductTable = ({
  tableColumn,
  data,
  loading,
  totalDoc,
  getData,
  totalPage,
  openDelete,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const textColor = useColorModeValue("gray.700", "white");
  const columns = useMemo(() => tableColumn, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    gotoPage,
    pageCount,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 10,
        pageIndex: 0,
      },
      autoResetPage: false,
      manualPagination: true,
      pageCount: totalPage,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const createPages = useCallback((count) => {
    let arrPageCount = [];

    for (let i = 1; i <= count; i++) {
      arrPageCount.push(i);
    }

    return arrPageCount;
  }, []);

  useEffect(() => {
    getData(10, pageIndex + 1);
  }, [pageIndex]);

  const handleSelect = useCallback((id) => {
    dispatch(getProduct(id));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleUpdate = useCallback((id) => {
    history.push(`/admin/products/edit/${id}`);
  }, []);

  const handleAddProduct = () => {
    history.push("/admin/products/new-product");
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Card overflowX={{ sm: "scroll", lg: "hidden" }}>
          <CardBody>
            <Flex
              direction="column"
              w="100%"
              overflowX={{ sm: "scroll", lg: "hidden" }}
            >
              <Flex
                align={{ sm: "flex-start", lg: "flex-end" }}
                justify={{ sm: "flex-start", lg: "flex-end" }}
                w="100%"
                px="22px"
                mb="36px"
                gap={2}
              >
                <Input
                  type="text"
                  placeholder="Tìm kiếm..."
                  minW="75px"
                  maxW="175px"
                  fontSize="sm"
                  _focus={{ borderColor: "teal.300" }}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                />
                <Button
                  variant="no-hover"
                  bg="linear-gradient(to right, #ff5f6d, #ffc371);"
                  color="#fff"
                  fontSize="xs"
                  fontWeight="bold"
                  alignSelf={{ sm: "flex-start", lg: null }}
                  p="0px"
                  mb={{ sm: "10px", md: "0px" }}
                  me={{ md: "12px" }}
                  onClick={handleAddProduct}
                >
                  <Flex
                    color={"white"}
                    cursor="pointer"
                    align="center"
                    p="12px"
                  >
                    <Icon as={FaPlus} me="4px" />
                    <Text fontSize={"sm"}>Thêm mới</Text>
                  </Flex>
                </Button>
              </Flex>
              <HSeparator />
              <Table
                {...getTableProps()}
                variant="simple"
                color="gray.500"
                mb="24px"
              >
                <Thead>
                  {headerGroups.map((headerGroup, index) => (
                    <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                      {headerGroup.headers.map((column, index) => (
                        <Th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          pe="0px"
                          key={index}
                        >
                          <Flex
                            justify="space-between"
                            align="center"
                            fontSize={{ sm: "10px", lg: "12px" }}
                            color="gray.400"
                          >
                            {column.render("Header")}

                            {column.enableSorting && (
                              <Icon
                                w={{ sm: "10px", md: "14px" }}
                                h={{ sm: "10px", md: "14px" }}
                                color={
                                  columns.isSorted ? "gray.500" : "gray.400"
                                }
                                float="right"
                                as={
                                  column.isSorted
                                    ? column.isSortedDesc
                                      ? TiArrowSortedDown
                                      : TiArrowSortedUp
                                    : TiArrowUnsorted
                                }
                              />
                            )}
                          </Flex>
                        </Th>
                      ))}
                    </Tr>
                  ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                  {page.map((row, index) => {
                    prepareRow(row);
                    return (
                      <Tr {...row.getRowProps()} key={index}>
                        {row.cells.map((cell, index) => {
                          let data = "";

                          if (cell.column.id === "status") {
                            data = (
                              <Flex align="center">
                                <Tag
                                  size={"md"}
                                  variant="outline"
                                  colorScheme={status[cell.value]?.color}
                                  py={2}
                                >
                                  <TagLabel>
                                    {status[cell.value]?.label}
                                  </TagLabel>
                                </Tag>
                              </Flex>
                            );
                          } else if (cell.column.Header === "ID") {
                            data = (
                              <Flex align="center">
                                <Checkbox
                                  size="lg"
                                  colorScheme="teal"
                                  me="8px"
                                />
                                <Text>{cell.value}</Text>
                              </Flex>
                            );
                          } else if (cell.column.id === "name") {
                            data = <Text>{cell.value}</Text>;
                          } else if (cell.column.id === "fullname") {
                            data = (
                              <Flex align="center">
                                <Avatar
                                  // name={cell.value.split(" ").join()[0]}
                                  src={row.original.avatar}
                                  w="30px"
                                  h="30px"
                                  me="6px"
                                />
                                <Text>{cell.value}</Text>
                              </Flex>
                            );
                          } else if (cell.column.id === "slug") {
                            data = <Text>{cell.value}</Text>;
                          } else if (cell.column.id === "description") {
                            data = <Text>{cell.value}</Text>;
                          } else if (cell.column.id === "base_price") {
                            data = (
                              <Text>{Number(cell.value).toLocaleString()}</Text>
                            );
                          } else if (cell.column.id === "category") {
                            data = (
                              <Text>
                                {cell.value?.map((cate) => cate.name).join(",")}
                              </Text>
                            );
                          } else if (cell.column.id === "createdAt") {
                            data = (
                              <Text>
                                {moment(cell.value).format("DD MM YYYY")}
                              </Text>
                            );
                          } else if (cell.column.id === "action") {
                            data = (
                              <Flex direction={{ sm: "column", md: "row" }}>
                                <Tooltip
                                  hasArrow
                                  label="Xem chi tiết"
                                  placement="top"
                                >
                                  <Button
                                    p="0px"
                                    bg="transparent"
                                    onClick={() =>
                                      handleSelect(row.original.id)
                                    }
                                  >
                                    <Flex
                                      color={"blue.500"}
                                      cursor="pointer"
                                      align="center"
                                      p="12px"
                                    >
                                      <Icon as={FaEye} me="4px" />
                                    </Flex>
                                  </Button>
                                </Tooltip>
                                <Tooltip
                                  hasArrow
                                  label="Cập nhật sản phẩm"
                                  placement="top"
                                >
                                  <Button
                                    p="0px"
                                    bg="transparent"
                                    onClick={() =>
                                      handleUpdate(row.original.id)
                                    }
                                  >
                                    <Flex
                                      color={textColor}
                                      cursor="pointer"
                                      align="center"
                                      p="12px"
                                    >
                                      <Icon as={FaPencilAlt} me="4px" />
                                    </Flex>
                                  </Button>
                                </Tooltip>
                                <Tooltip
                                  hasArrow
                                  label="Xóa sản phẩm"
                                  placement="top"
                                >
                                  <Button
                                    p="0px"
                                    bg="transparent"
                                    mb={{ sm: "10px", md: "0px" }}
                                    me={{ md: "12px" }}
                                    onClick={() => openDelete(row.original.id)}
                                  >
                                    <Flex
                                      color="red.500"
                                      cursor="pointer"
                                      align="center"
                                      p="12px"
                                    >
                                      <Icon as={FaTrashAlt} me="4px" />
                                    </Flex>
                                  </Button>
                                </Tooltip>
                              </Flex>
                            );
                          }
                          return (
                            <Td
                              {...cell.getCellProps()}
                              key={index}
                              fontSize={{ sm: "14px" }}
                              minW={{
                                sm: "150px",
                                md: "200px",
                                lg: "fit-content",
                              }}
                            >
                              {data}
                            </Td>
                          );
                        })}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
              <Flex
                direction={{ sm: "column", md: "row" }}
                justify="space-between"
                align="center"
                px="22px"
                w="100%"
              >
                <Text
                  fontSize="sm"
                  color="gray.500"
                  fontWeight="normal"
                  mb={{ sm: "24px", md: "0px" }}
                >
                  Showing {pageSize * pageIndex + data.length} of {totalDoc}{" "}
                  entries
                </Text>
                <Stack
                  direction="row"
                  alignSelf="flex-end"
                  spacing="4px"
                  ms="auto"
                >
                  <Button
                    variant="no-hover"
                    onClick={() => previousPage()}
                    transition="all .5s ease"
                    w="40px"
                    h="40px"
                    borderRadius="50%"
                    bg="#fff"
                    border="1px solid lightgray"
                    display={canPreviousPage ? "flex" : "none"}
                    _hover={{
                      bg: "gray.200",
                      opacity: "0.7",
                      borderColor: "gray.500",
                    }}
                  >
                    <Icon
                      as={GrFormPrevious}
                      w="16px"
                      h="16px"
                      color="gray.400"
                    />
                  </Button>

                  {createPages(pageCount).map((pageNumber, index) => {
                    return (
                      <Button
                        variant="no-hover"
                        transition="all .5s ease"
                        onClick={() => gotoPage(pageNumber - 1)}
                        w="40px"
                        h="40px"
                        borderRadius="160px"
                        bg={pageNumber === pageIndex + 1 ? "teal.300" : "#fff"}
                        border="1px solid lightgray"
                        _hover={{
                          bg: "gray.200",
                          opacity: "0.7",
                          borderColor: "gray.500",
                        }}
                        key={index}
                      >
                        <Text
                          fontSize="xs"
                          color={
                            pageNumber === pageIndex + 1 ? "#fff" : "gray.600"
                          }
                        >
                          {pageNumber}
                        </Text>
                      </Button>
                    );
                  })}
                  <Button
                    variant="no-hover"
                    onClick={() => nextPage()}
                    transition="all .5s ease"
                    w="40px"
                    h="40px"
                    borderRadius="160px"
                    bg="#fff"
                    border="1px solid lightgray"
                    display={canNextPage ? "flex" : "none"}
                    _hover={{
                      bg: "gray.200",
                      opacity: "0.7",
                      borderColor: "gray.500",
                    }}
                  >
                    <Icon as={GrFormNext} w="16px" h="16px" color="gray.400" />
                  </Button>
                </Stack>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default ProductTable;
