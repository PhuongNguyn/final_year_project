import { useDispatch } from "react-redux";
import { getLessons } from "./store";
import { useCallback, useEffect } from "react";
import TableLesson from "./components/LessonTable";
import { useSelector } from "react-redux";
import { Flex } from "@chakra-ui/react";

const column = [
    { Header: "ID", accessor: "id", enableSorting: true },
    { Header: "Tiêu đề", accessor: "name", enableSorting: true },
    { Header: "Đường dẫn tĩnh", accessor: "slug", enableSorting: true },
    { Header: "Khoá học", accessor: "product", enableSorting: true },
    { Header: "Số thứ tự bài", accessor: "ordered", enableSorting: true },
    { Header: "Ngày tạo", accessor: "createdAt", enableSorting: true },
    { Header: "Hành động", accessor: "action", enableSorting: false },
];

const ProductDetail = () => {
    const { lessons, loading, totalDoc, totalPage } = useSelector(
        (state) => state.lessons
    );
    const dispatch = useDispatch()

    const getData = useCallback((pageSize = 10, pageIndex = 1, search = "") => {
        dispatch(getLessons({ pageSize, pageIndex, search }));
    }, []);


    return (
        <Flex direction="column" pt={{ base: "150px", lg: "75px" }}>
            <TableLesson
                tableColumn={column}
                data={lessons}
                loading={loading}
                totalDoc={totalDoc}
                getData={getData}
                totalPage={totalPage}
            />
        </Flex>
    )
}

export default ProductDetail