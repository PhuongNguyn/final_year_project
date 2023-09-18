import Card from "@/components/Card/Card";
import CardBody from "@/components/Card/CardBody";
import CardHeader from "@/components/Card/CardHeader";
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import ProductSortDetail from "../components/ProductSortDetail";
import ProductTable from "../components/ProductTable";
import { useSelector } from "react-redux";
import { getProduct, getProducts } from "../store";
import { useDispatch } from "react-redux";
import Spinner from "@/components/Spinner";
import AlertDelete from "../components/AlertDelete";

const column = [
  { Header: "ID", accessor: "id", enableSorting: true },
  { Header: "Tên sản phẩm", accessor: "name", enableSorting: true },
  { Header: "Đường dẫn tĩnh", accessor: "slug", enableSorting: true },
  { Header: "Mô tả", accessor: "description", enableSorting: true },
  { Header: "Giá khởi điểm", accessor: "base_price", enableSorting: true },
  { Header: "Danh mục", accessor: "category", enableSorting: true },
  { Header: "Trạng thái", accessor: "status", enableSorting: true },
  { Header: "Hành động", accessor: "action", enableSorting: false },
];

function ProductPage() {
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();

  const {
    isOpen: isOpenDelete,
    onClose: onCloseDelete,
    onOpen: onOpenDelete,
  } = useDisclosure();

  const {
    products,
    selectedProduct,
    loading,
    totalDoc,
    selectLoading,
    totalPage,
  } = useSelector((state) => state.products);
  const getData = useCallback((pageSize = 10, pageIndex = 1, search = "") => {
    dispatch(getProducts({ pageSize, pageIndex, search }));
  }, []);

  useEffect(() => {
    dispatch(getProduct());
  }, []);

  const handleCloseDelete = useCallback(() => {
    onCloseDelete();
    dispatch(getProduct());
  }, []);
  const handleOpenDelete = useCallback((id) => {
    onOpenDelete();
    dispatch(getProduct(id));
  }, []);

  return (
    <Flex direction={"column"} gap={4}>
      {!isOpenDelete && selectLoading ? (
        <Card mt={{ sm: "125px", md: "75px" }}>
          <CardBody>
            <Flex w={"100%"} h={"700px"} justify={"center"} align={"center"}>
              <Spinner />
            </Flex>
          </CardBody>
        </Card>
      ) : (
        !isOpenDelete &&
        selectedProduct && (
          <ProductSortDetail
            product={selectedProduct}
            openDelete={handleOpenDelete}
          />
        )
      )}
      <Card
        mt={
          (!selectedProduct || (selectedProduct && isOpenDelete)) && {
            sm: "125px",
            md: "75px",
          }
        }
      >
        <CardBody>
          <ProductTable
            data={products}
            tableColumn={column}
            loading={loading}
            totalDoc={totalDoc}
            getData={getData}
            totalPage={totalPage}
            openDelete={handleOpenDelete}
          />
        </CardBody>
      </Card>
      <AlertDelete isOpen={isOpenDelete} onClose={handleCloseDelete} />
    </Flex>
  );
}

export default ProductPage;
