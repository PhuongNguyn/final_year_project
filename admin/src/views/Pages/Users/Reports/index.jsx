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
import { Flex } from "@chakra-ui/react";
import { tablesReportsData } from "../../../../variables/general";
import ReportsTable from "./components/ReportsTable";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers, getUser } from "./store/userSlice";
import Loading from "@/components/Loading";

const column = [
  { Header: "ID", accessor: "id", enableSorting: true },
  { Header: "Họ tên", accessor: "fullname", enableSorting: true },
  { Header: "Số điện thoại", accessor: "phoneNumber", enableSorting: true },
  { Header: "Email", accessor: "email", enableSorting: true },
  { Header: "Địa chỉ", accessor: "address", enableSorting: true },
  { Header: "Quyền hạn", accessor: "role", enableSorting: true },
  { Header: "Trạng thái", accessor: "status", enableSorting: true },
  { Header: "Ngày tạo", accessor: "createdAt", enableSorting: true },
  { Header: "Hành động", accessor: "action", enableSorting: false },
  // { Header: "REVENUE", accessor: "revenue" },
];

function Reports() {
  const { users, loading, totalPage, totalDoc } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();
  const getData = useCallback((pageSize = 10, pageIndex = 1, search = "") => {
    dispatch(getUsers({ pageSize, pageIndex, search }));
  }, []);

  const selectUser = useCallback((id) => {
    dispatch(getUser(id));
  }, []);

  return (
    <Flex direction="column" pt={{ base: "150px", lg: "75px" }}>
      {/*<Flex gap="24px" mb="24px">
         <Grid templateColumns={{ md: "repeat(4, 1fr)" }} w={"full"} gap="24px">
          <ReportsCard
            backgroundImage={bgCardReports}
            title={"Người dùng"}
            number={1600}
            icon={<Icon as={FaUser} w="25px" h="25px" color="blue.900" />}
            percentage={"+55%"}
          />
           <ReportsCard
            backgroundImage={bgCardReports}
            title={"Click Events"}
            number={357}
            icon={<Icon as={RocketIcon} w="25px" h="25px" color="blue.900" />}
            percentage={"+124%"}
          /> 
          <ReportsCard
            backgroundImage={bgCardReports}
            title={"Đơn hàng"}
            icon={<Icon as={CartIcon} w="25px" h="25px" color="blue.900" />}
            number={2340}
            percentage={"+14%"}
          />
           <ReportsCard
            backgroundImage={bgCardReports}
            title={"Likes"}
            icon={<Icon as={AiFillLike} w="25px" h="25px" color="blue.900" />}
            number={940}
            percentage={"+90%"}
          /> 
        </Grid> 
         <Reviews /> 
      </Flex>*/}

      <ReportsTable
        data={users}
        loading={loading}
        totalPage={totalPage}
        column={column}
        getData={getData}
        totalDoc={totalDoc}
        selectUser={selectUser}
      />
    </Flex>
  );
}

export default Reports;
