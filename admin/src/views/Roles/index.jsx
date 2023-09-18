import bgCardReports from "@/assets/img/background-card-reports.png";
import Card from "@/components/Card/Card";
import CardBody from "@/components/Card/CardBody";
import Loading from "@/components/Loading";
import {
  Button,
  Flex,
  Grid,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import ModalAddEdit from "./components/ModalAddEdit";
import RolesCard from "./components/RolesCard";
import { getAllRoles } from "./store";

const Roles = () => {
  const { roles, loading } = useSelector((state) => state.roles);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRoles());
  }, []);

  const {
    isOpen: isOpenAdd,
    onClose: onCloseAdd,
    onOpen: onOpenAdd,
  } = useDisclosure();
  return (
    <Flex direction="column" pt={{ base: "150px", lg: "75px" }}>
      <Flex gap="24px" mb="24px">
        {loading ? (
          <Loading />
        ) : (
          <Card overflowX={{ sm: "scroll", lg: "hidden" }} h={"80vh"}>
            <CardBody>
              <Grid
                templateColumns={{ md: "repeat(4, 1fr)" }}
                w={"full"}
                gap="24px"
              >
                {roles.map((role) => (
                  <RolesCard
                    key={role?.id}
                    backgroundImage={bgCardReports}
                    role={role}
                    icon={
                      <Icon
                        as={MdAdminPanelSettings}
                        w="25px"
                        h="25px"
                        color="blue.900"
                      />
                    }
                  />
                ))}
                <Card backgroundImage={bgCardReports} minH="168px">
                  <CardBody h="100%">
                    <Button
                      bg="transparent"
                      w="100%"
                      h="100%"
                      variant="no-hover"
                      onClick={onOpenAdd}
                    >
                      <Flex
                        direction="column"
                        justify="center"
                        align={"center"}
                        w="100%"
                        h="100%"
                        gap={4}
                      >
                        <Icon
                          as={AiOutlinePlus}
                          w={12}
                          h={12}
                          color={"white"}
                        />
                        <Text color={"white"}>Thêm mới quyền hạn</Text>
                      </Flex>
                    </Button>
                  </CardBody>
                </Card>
              </Grid>
            </CardBody>
          </Card>
        )}
      </Flex>
      <ModalAddEdit isOpen={isOpenAdd} onClose={onCloseAdd} />
    </Flex>
  );
};

export default Roles;
