import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import WarehouseTable from "./components/WarehouseTable";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getPagingWarehouse } from "./store";

const column = [
  { Header: "ID", accessor: "id", enableSorting: true },
  { Header: "Tên kho", accessor: "name", enableSorting: true },
  { Header: "Địa chỉ", accessor: "address", enableSorting: true },
  { Header: "Ngày tạo", accessor: "createdAt", enableSorting: true },
  { Header: "Hành động", accessor: "action", enableSorting: false },
];


const Warehouse = () => {
  const dispatch = useDispatch();

  return <Flex direction="column" pt={{ base: "150px", lg: "75px" }}>
    <WarehouseTable tableColumn={column} />
  </Flex>;
};

export default Warehouse;
