import { Flex } from "@chakra-ui/react";
import { getProducts } from "./store";
import TableProduct from "./components/TableProduct";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

const column = [
    { Header: "ID", accessor: "id", enableSorting: true },
    { Header: "Tiêu đề", accessor: "title", enableSorting: true },
    { Header: "Đường dẫn tĩnh", accessor: "slug", enableSorting: true },
    { Header: "Danh mục", accessor: "category", enableSorting: true },
    { Header: "Ngày tạo", accessor: "createdAt", enableSorting: true },
    { Header: "Hành động", accessor: "action", enableSorting: false },
];


const Product = () => {
    const { products, loading, totalDoc, totalPage } = useSelector(
        (state) => state.products
    );

    const dispatch = useDispatch()

    const getData = useCallback((pageSize = 10, pageIndex = 1, search = "") => {
        dispatch(getProducts({ pageSize, pageIndex, search }));
    }, []);
    return (
        <Flex direction="column" pt={{ base: "150px", lg: "75px" }}>
            <TableProduct
                tableColumn={column}
                data={products}
                loading={loading}
                totalDoc={totalDoc}
                getData={getData}
                totalPage={totalPage}
            />
        </Flex>
    )
}

export default Product