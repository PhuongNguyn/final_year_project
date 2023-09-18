import Spinner from "@/components/Spinner";
import { permissionAction, permissionSubject } from "@/constants";
import APIService from "@/helper/api";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Switch,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getAllRoles } from "../store";
import { useDispatch } from "react-redux";

const labels = ["Tên phân quyền", "Xem", "Thêm", "Sửa", "Xóa", "Tất cả"];

const ModalAddEdit = ({ onClose, isOpen }) => {
  const { selectLoading, selectedRole } = useSelector((state) => state.roles);
  const permissions = useMemo(() => selectedRole?.permission, [selectedRole]);
  const textColor = useColorModeValue("gray.700", "white");
  const toast = useToast({ position: "top" });
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    if (selectedRole) {
      const permissionObject = {};
      for (const key of Object.keys(permissionSubject)) {
        permissionObject[key] = [];
      }
      const data = { ...permissionObject, ...permissions };
      setData(data);

      setRoleName(selectedRole.name);
    } else {
      const permissionObject = {};
      for (const key of Object.keys(permissionSubject)) {
        permissionObject[key] = [];
      }
      setData(permissionObject);
      setRoleName("");
    }
  }, [selectedRole, permissions]);

  const initialRef = useRef(null);
  const onChange = (key, permission, value) => {
    setData((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));

      if (permission === "all") {
        if (value) {
          newState[key] = [
            permissionAction.READ,
            permissionAction.UPDATE,
            permissionAction.CREATE,
            permissionAction.DELETE,
          ];
        } else {
          newState[key] = [];
        }
      } else {
        if (value) {
          newState[key] = [...newState[key], permission];
          0;
        } else {
          newState[key] = Array.from(
            newState[key]?.filter((item) => item !== permission)
          );
        }
      }

      return { ...newState };
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const api = new APIService();
      if (selectedRole) {
        const res = await api.updateRole(selectedRole?.id, {
          name: roleName,
          permissions: data,
        });
        if (res?.data?.status === 1) {
          toast({ title: "Cập nhật quyền hạn thành công", status: "success" });
        } else {
          toast({
            title: "Cập nhật quyền hạn thất bại",
            description: error.response?.data?.message,
            status: "error",
          });
        }
      } else {
        const res = await api.createRole({ name: roleName, permissions: data });
        if (res?.data?.status === 1) {
          toast({ title: "Thêm mới quyền hạn thành công", status: "success" });
        } else {
          toast({
            title: "Thêm mới quyền hạn thất bại",
            description: error.response?.data?.message,
            status: "error",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Xảy ra lỗi không xác định",
        description: error.response?.data?.message,
        status: "error",
      });
    } finally {
      setLoading(false);
      dispatch(getAllRoles());
      onClose();
    }
  };

  return (
    <Modal
      onClose={onClose}
      size={"3xl"}
      isOpen={isOpen}
      initialFocusRef={initialRef}
    >
      <ModalOverlay />{" "}
      {selectLoading ? (
        <ModalContent>
          <Flex w={"100%"} h={"500px"} justify={"center"} align={"center"}>
            <Spinner />
          </Flex>
        </ModalContent>
      ) : (
        <ModalContent>
          <ModalHeader>
            {selectedRole ? "Cập nhật" : "Thêm"} quyền hạn
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Tên quyền hạn</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Tên quyền hạn"
                onChange={(e) => setRoleName(e.target.value)}
                value={roleName}
              />
            </FormControl>

            <Table variant="simple" mt={3}>
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
                {Object.keys(data).map((key) => (
                  <Tr>
                    <Td minW="180px">
                      <Stack direction="row" spacing="16px">
                        <Text color={textColor} fontSize="sm" fontWeight="bold">
                          {permissionSubject?.[key]?.label}
                        </Text>
                      </Stack>
                    </Td>
                    <Td>
                      <Switch
                        isChecked={
                          data?.[key]?.find(
                            (item) => item === permissionAction.READ
                          )
                            ? true
                            : false
                        }
                        onChange={(e) =>
                          onChange(key, permissionAction.READ, e.target.checked)
                        }
                      />
                    </Td>
                    <Td>
                      <Switch
                        isChecked={
                          data?.[key]?.find(
                            (item) => item === permissionAction.CREATE
                          )
                            ? true
                            : false
                        }
                        onChange={(e) =>
                          onChange(
                            key,
                            permissionAction.CREATE,
                            e.target.checked
                          )
                        }
                      />
                    </Td>
                    <Td>
                      <Switch
                        isChecked={
                          data?.[key]?.find(
                            (item) => item === permissionAction.UPDATE
                          )
                            ? true
                            : false
                        }
                        onChange={(e) =>
                          onChange(
                            key,
                            permissionAction.UPDATE,
                            e.target.checked
                          )
                        }
                      />
                    </Td>
                    <Td>
                      <Switch
                        isChecked={
                          data?.[key]?.find(
                            (item) => item === permissionAction.DELETE
                          )
                            ? true
                            : false
                        }
                        onChange={(e) =>
                          onChange(
                            key,
                            permissionAction.DELETE,
                            e.target.checked
                          )
                        }
                      />
                    </Td>
                    <Td>
                      <Switch
                        isChecked={
                          data?.[key]?.find(
                            (item) => item === permissionAction.READ
                          ) &&
                          data?.[key]?.find(
                            (item) => item === permissionAction.CREATE
                          ) &&
                          data?.[key]?.find(
                            (item) => item === permissionAction.UPDATE
                          ) &&
                          data?.[key]?.find(
                            (item) => item === permissionAction.DELETE
                          )
                            ? true
                            : false
                        }
                        onChange={(e) => onChange(key, "all", e.target.checked)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button
              variant="solid"
              colorScheme="facebook"
              onClick={handleSubmit}
              isLoading={loading}
            >
              {selectedRole ? "Cập nhật" : "Thêm"}
            </Button>
            <Button onClick={onClose}>Đóng</Button>
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
};
export default ModalAddEdit;
