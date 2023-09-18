import React, { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { getUnits } from "./store";
import { useSelector } from "react-redux";
import UnitTable from "./components/UnitTable";

const column = [
  { Header: "ID", accessor: "id", enableSorting: true },
  { Header: "Đơn vị tính", accessor: "name", enableSorting: true },
  { Header: "Ngày tạo", accessor: "createdAt", enableSorting: true },
  { Header: "Hành động", accessor: "action", enableSorting: false },
];

const Unit = () => {
  const dispatch = useDispatch();
  const { params, units, loading, totalDoc } = useSelector(
    (state) => state.units
  );
  useEffect(() => {
    dispatch(getUnits(params));
  }, []);
  return (
    <Flex direction="column" pt={{ base: "150px", lg: "75px" }}>
      <UnitTable
        tableColumn={column}
        data={units}
        loading={loading}
        totalDoc={totalDoc}
      />
    </Flex>
  );
};

export default Unit;
