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
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
// Custom components
import Card from "@/components/Card/Card";
import CardBody from "@/components/Card/CardBody";
import IconBox from "@/components/Icons/IconBox";
import React, { useCallback } from "react";
import { FaEye, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import ModalAddEdit from "./ModalAddEdit";
import ModalView from "./ModalView";
import { useDispatch } from "react-redux";
import { getRoleById } from "../store";

const RolesCard = ({ backgroundImage, icon, role }) => {
  const textColor = useColorModeValue("gray.700", "white");

  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  const {
    isOpen: isOpenView,
    onClose: onCloseView,
    onOpen: onOpenView,
  } = useDisclosure();
  const {
    isOpen: isOpenAdd,
    onClose: onCloseAdd,
    onOpen: onOpenAdd,
  } = useDisclosure();

  const dispatch = useDispatch();

  const handleSelectRole = useCallback((id) => {
    onOpenView();
    dispatch(getRoleById(id));
  }, []);
  const handleCloseView = useCallback((id) => {
    onCloseView();
    dispatch(getRoleById());
  }, []);
  const handleUpdateRole = useCallback((id) => {
    onOpenAdd();
    dispatch(getRoleById(id));
  }, []);
  const handleUpdateClose = useCallback((id) => {
    onCloseAdd();
    dispatch(getRoleById());
  }, []);

  return (
    <Card backgroundImage={backgroundImage} minH="168px">
      <CardBody h="100%">
        <Flex direction="column" justify="space-between" w="100%" h="100%">
          <Flex justify="space-between" w="100%">
            <IconBox bg="#fff" w="50px" h="50px">
              {icon}
            </IconBox>
            <Menu isOpen={isOpen1} onClose={onClose1}>
              <MenuButton onClick={onOpen1} alignSelf="flex-start">
                <Icon
                  as={IoEllipsisHorizontalSharp}
                  color="gray.400"
                  w="20px"
                  h="20px"
                />
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Button
                    p="0px"
                    w={"full"}
                    bg="transparent"
                    variant="no-hover"
                    onClick={() => handleSelectRole(role?.id)}
                  >
                    <Flex
                      color={textColor}
                      cursor="pointer"
                      align="center"
                      p="12px"
                    >
                      <Icon as={FaEye} me="4px" />
                      <Text fontSize="sm" fontWeight="semibold">
                        Xem chi tiết
                      </Text>
                    </Flex>
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    p="0px"
                    w={"full"}
                    bg="transparent"
                    variant="no-hover"
                    onClick={() => handleUpdateRole(role?.id)}
                    disabled={role?.name === "admin"}
                  >
                    <Flex color={textColor} align="center" p="12px">
                      <Icon as={FaPencilAlt} me="4px" />
                      <Text fontSize="sm" fontWeight="semibold">
                        Chỉnh sửa
                      </Text>
                    </Flex>
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    p="0px"
                    w={"full"}
                    bg="transparent"
                    variant="no-hover"
                    disabled={role?.name === "admin"}
                  >
                    <Flex color="red.500" p="12px">
                      <Icon as={FaTrashAlt} me="4px" />
                      <Text fontSize="sm" fontWeight="semibold">
                        Xóa
                      </Text>
                    </Flex>
                  </Button>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Flex justify="space-between" w="100%">
            <Flex direction="column">
              <Text color="#fff" fontWeight="bold" fontSize="md">
                {role?.name}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </CardBody>
      <ModalView isOpen={isOpenView} onClose={handleCloseView} />
      <ModalAddEdit isOpen={isOpenAdd} onClose={handleUpdateClose} />
    </Card>
  );
};

export default RolesCard;
