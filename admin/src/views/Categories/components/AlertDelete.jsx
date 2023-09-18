import Spinner from "@/components/Spinner";
import APIService from "@/helper/api";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../store";

const AlertDelete = ({ isOpen, onClose }) => {
  const { selectedCategory, selectLoading, params } = useSelector(
    (state) => state.categories
  );

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const toast = useToast({ position: "top" });
  const cancelRef = React.useRef();
  const handleDelete = async () => {
    try {
      setLoading(true);
      const api = new APIService();

      const res = await api.deleteCategories(selectedCategory?.id);
      if (res?.data?.status === 1) {
        toast({ title: "Xóa danh mục thành công", status: "success" });
        dispatch(getCategories(params));
        onClose();
      } else {
        toast({
          title: "Xóa danh mục thất bại",
          description: error.response?.data?.message,
          status: "error",
        });
      }
    } catch (error) {
      toast({
        title: "Xóa danh mục thất bại",
        description: error.response?.data?.message,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        {selectLoading ? (
          <AlertDialogContent>
            <Flex w={"100%"} h={"200px"} justify={"center"} align={"center"}>
              <Spinner />
            </Flex>
          </AlertDialogContent>
        ) : (
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Xóa danh mục
            </AlertDialogHeader>

            <AlertDialogBody>
              Bạn có chắc chắn muốn xóa danh mục này hem ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Hủy
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDelete}
                ml={3}
                isLoading={loading}
              >
                Xóa
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AlertDelete;
