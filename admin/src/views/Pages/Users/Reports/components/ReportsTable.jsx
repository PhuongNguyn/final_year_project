/*!

=========================================================
* Purity UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/purity-ui-dashboard-pro
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design by Creative Tim & Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Avatar,
  Button,
  Checkbox,
  Flex,
  Icon,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
// Custom components
import Loading from "@/components/Loading";
import moment from "moment/moment";
import { memo, useCallback, useEffect, useMemo } from "react";
import { BsCircleFill } from "react-icons/bs";
import { FaPencilAlt, FaPlus, FaTrashAlt, FaUnlock } from "react-icons/fa";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Card from "../../../../../components/Card/Card";
import CardBody from "../../../../../components/Card/CardBody";

import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import AlertDelete from "./AlertDelete";
import ModalUpdatePassword from "./ModalUpdatePassword";
import { HSeparator } from "@/components/Separator/Separator";
import { useSelector } from "react-redux";
import { permissionAction } from "@/constants";

const status = {
  1: { label: "Đang hoạt động", color: "teal.300" },
  0: { label: "Chờ xác nhận", color: "gray.700" },
  "-1": { label: "Đã khóa", color: "red.500" },
};

const ReportsTable = ({
  data,
  loading,
  totalPage,
  column: tableColumn,
  getData,
  totalDoc,
  selectUser,
}) => {
  const {
    isOpen: isOpenAdd,
    onClose: onCloseAdd,
    onOpen: onOpenAdd,
  } = useDisclosure();
  const {
    isOpen: isOpenUpdate,
    onClose: onCloseUpdate,
    onOpen: onOpenUpdate,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onClose: onCloseDelete,
    onOpen: onOpenDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenUpdatePassword,
    onClose: onCloseUpdatePassword,
    onOpen: onOpenUpdatePassword,
  } = useDisclosure();

  const { permission } = useSelector((state) => state.auth);

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
    getData(pageSize, pageIndex + 1);
  }, [pageIndex, pageSize]);

  const handleSelectUser = useCallback((id) => {
    onOpenUpdate();
    selectUser(id);
  }, []);
  const handleUpdatePassword = useCallback((id) => {
    onOpenUpdatePassword();
    selectUser(id);
  }, []);
  const handleCloseUpdatePassword = useCallback((id) => {
    onCloseUpdatePassword();
    selectUser();
  }, []);
  const handleDeleteUser = useCallback((id) => {
    onOpenDelete();
    selectUser(id);
  }, []);
  const handleCloseModal = useCallback((id) => {
    onCloseUpdate();
    selectUser();
  }, []);
  const handleCloseDelete = useCallback((id) => {
    onCloseDelete();
    selectUser();
  }, []);

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
                {permission?.["user"]?.find(
                  (permission) => permission === permissionAction.CREATE
                ) ||
                  (permission?.["all"] && (
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
                      onClick={onOpenAdd}
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
                  ))}
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
                                <Icon
                                  as={BsCircleFill}
                                  w="8px"
                                  h="8px"
                                  color={status[cell.value]?.color}
                                  me="6px"
                                />
                                <Text
                                  color={status[cell.value]?.color}
                                  fontSize="md"
                                >
                                  {status[cell.value]?.label}
                                </Text>
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
                          } else if (cell.column.id === "phoneNumber") {
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
                          } else if (cell.column.id === "email") {
                            data = <Text>{cell.value}</Text>;
                          } else if (cell.column.id === "address") {
                            data = <Text>{cell.value}</Text>;
                          } else if (cell.column.id === "role") {
                            data = <Text>{cell.value.name}</Text>;
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
                                  label="Cấp lại mật khẩu"
                                  placement="top"
                                >
                                  <Button
                                    p="0px"
                                    bg="transparent"
                                    onClick={() =>
                                      handleUpdatePassword(row.original.id)
                                    }
                                  >
                                    <Flex
                                      color={"blue.500"}
                                      cursor="pointer"
                                      align="center"
                                      p="12px"
                                    >
                                      <Icon as={FaUnlock} me="4px" />
                                    </Flex>
                                  </Button>
                                </Tooltip>
                                <Tooltip
                                  hasArrow
                                  label="Chỉnh sửa người dùng"
                                  placement="top"
                                >
                                  <Button
                                    p="0px"
                                    bg="transparent"
                                    onClick={() =>
                                      handleSelectUser(row.original.id)
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
                                  label="Xóa người dùng"
                                  placement="top"
                                >
                                  <Button
                                    p="0px"
                                    bg="transparent"
                                    mb={{ sm: "10px", md: "0px" }}
                                    me={{ md: "12px" }}
                                    onClick={() =>
                                      handleDeleteUser(row.original.id)
                                    }
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
                  align={"center"}
                >
                  <Select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    color="gray.500"
                    size="sm"
                    borderRadius="12px"
                    maxW="75px"
                    cursor="pointer"
                    mr={3}
                  >
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                    <option>25</option>
                  </Select>

                  <Button
                    variant="no-hover"
                    onClick={() => previousPage()}
                    transition="all .5s ease"
                    w="40px"
                    h="40px"
                    borderRadius="50%"
                    bg="#fff"
                    border="1px solid lightgray"
                    display={
                      pageSize === 5
                        ? "none"
                        : canPreviousPage
                        ? "flex"
                        : "none"
                    }
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
                  {pageSize === 5 ? (
                    <NumberInput
                      max={pageCount - 1}
                      min={1}
                      w="75px"
                      mx="6px"
                      defaultValue="1"
                      onChange={(e) => gotoPage(e)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper onClick={() => nextPage()} />
                        <NumberDecrementStepper
                          onClick={() => previousPage()}
                        />
                      </NumberInputStepper>
                    </NumberInput>
                  ) : (
                    createPages(pageCount).map((pageNumber, index) => {
                      return (
                        <Button
                          variant="no-hover"
                          transition="all .5s ease"
                          onClick={() => gotoPage(pageNumber - 1)}
                          w="40px"
                          h="40px"
                          borderRadius="160px"
                          bg={
                            pageNumber === pageIndex + 1 ? "teal.300" : "#fff"
                          }
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
                    })
                  )}
                  <Button
                    variant="no-hover"
                    onClick={() => nextPage()}
                    transition="all .5s ease"
                    w="40px"
                    h="40px"
                    borderRadius="160px"
                    bg="#fff"
                    border="1px solid lightgray"
                    display={
                      pageSize === 5 ? "none" : canNextPage ? "flex" : "none"
                    }
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
      <ModalAdd onClose={onCloseAdd} isOpen={isOpenAdd} />
      <ModalEdit onClose={handleCloseModal} isOpen={isOpenUpdate} />
      <ModalUpdatePassword
        onClose={handleCloseUpdatePassword}
        isOpen={isOpenUpdatePassword}
      />
      <AlertDelete isOpen={isOpenDelete} onClose={handleCloseDelete} />
    </>
  );
};

export default memo(ReportsTable);
