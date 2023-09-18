import Spinner from "@/components/Spinner";
import { permissionAction, permissionSubject } from "@/constants";
import {
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { FcCancel, FcCheckmark } from "react-icons/fc";
import { useSelector } from "react-redux";

const labels = ["Tên phân quyền", "Xem", "Thêm", "Sửa", "Xóa"];

const ModalView = ({ onClose, isOpen }) => {
  const { selectLoading, selectedRole } = useSelector((state) => state.roles);
  const permissions = useMemo(() => selectedRole?.permission, [selectedRole]);
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Modal onClose={onClose} size={"3xl"} isOpen={isOpen}>
      <ModalOverlay />
      {selectLoading ? (
        <ModalContent>
          <Flex w={"100%"} h={"500px"} justify={"center"} align={"center"}>
            <Spinner />
          </Flex>
        </ModalContent>
      ) : (
        <ModalContent>
          <ModalHeader>{selectedRole?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  {labels.map((label) => {
                    return (
                      <Th color="gray.400" fontSize="xs" key={label}>
                        {label}
                      </Th>
                    );
                  })}
                </Tr>
              </Thead>
              <Tbody>
                {Object.keys(permissionSubject).map((key) => (
                  <Tr>
                    <Td minW="180px">
                      <Stack direction="row" spacing="16px">
                        <Text color={textColor} fontSize="sm" fontWeight="bold">
                          {permissionSubject[key]?.label}
                        </Text>
                      </Stack>
                    </Td>
                    <Td>
                      <Text color={textColor} fontSize="sm" fontWeight="bold">
                        {permissions?.[key]?.find(
                          (permission) => permission === permissionAction.READ
                        ) || permissions?.["all"] ? (
                          <Icon as={FcCheckmark} />
                        ) : (
                          <Icon as={FcCancel} />
                        )}
                      </Text>
                    </Td>
                    <Td>
                      <Text color={textColor} fontSize="sm" fontWeight="bold">
                        {permissions?.[key]?.find(
                          (permission) => permission === permissionAction.CREATE
                        ) || permissions?.["all"] ? (
                          <Icon as={FcCheckmark} />
                        ) : (
                          <Icon as={FcCancel} />
                        )}
                      </Text>
                    </Td>
                    <Td>
                      <Text color={textColor} fontSize="sm" fontWeight="bold">
                        {permissions?.[key]?.find(
                          (permission) => permission === permissionAction.UPDATE
                        ) || permissions?.["all"] ? (
                          <Icon as={FcCheckmark} />
                        ) : (
                          <Icon as={FcCancel} />
                        )}
                      </Text>
                    </Td>
                    <Td>
                      <Text color={textColor} fontSize="sm" fontWeight="bold">
                        {permissions?.[key]?.find(
                          (permission) => permission === permissionAction.DELETE
                        ) || permissions?.["all"] ? (
                          <Icon as={FcCheckmark} />
                        ) : (
                          <Icon as={FcCancel} />
                        )}
                      </Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Đóng</Button>
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
};

export default ModalView;
