import { Flex } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoriesTable from "./components/CategoriesTable";
import { getCategories } from "./store";

const column = [
  { Header: "ID", accessor: "id", enableSorting: true },
  { Header: "Tiêu đề", accessor: "name", enableSorting: true },
  { Header: "Đường dẫn tĩnh", accessor: "slug", enableSorting: true },
  { Header: "Danh mục cha", accessor: "parent", enableSorting: true },
  { Header: "Trạng thái", accessor: "isShow", enableSorting: true },
  { Header: "Ngày tạo", accessor: "createdAt", enableSorting: true },
  { Header: "Hành động", accessor: "action", enableSorting: false },
];

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading, totalDoc, totalPage } = useSelector(
    (state) => state.categories
  );

  const getData = useCallback((pageSize = 10, pageIndex = 1, search = "") => {
    dispatch(getCategories({ pageSize, pageIndex, search }));
  }, []);
  return (
    <Flex direction="column" pt={{ base: "150px", lg: "75px" }}>
      <CategoriesTable
        tableColumn={column}
        data={categories}
        loading={loading}
        totalDoc={totalDoc}
        getData={getData}
        totalPage={totalPage}
      />
    </Flex>
  );
};

export default Categories;
