import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ActionIcon,
  Flex,
  TextInput,
  Modal,
  Button,
  Loader,
  rem,
  Text,
  Code,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import {  useForm } from "@mantine/form";
import { deleteUser} from "../../redux/user/deleteUser";

export default function Delete({ item }) {
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false); // Modal state

  const form = useForm({
    initialValues: { first_name: '' },
    validate: {
      first_name: (value) => (value===item?.first_name ? false : "غير متطابق"),
    },
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    form.reset();
  };

  const handleSubmit = async () => {
    if (!form.validate().hasErrors) {
      try {
        await dispatch(deleteUser(item?.id)); 
        if(item?.id === authData.id){
          localStorage.removeItem('auth');
          sessionStorage.removeItem('auth');
          dispatch(signOutAuth());
          location.reload();
        }
        handleClose(); // Close modal on success
        // Handle success further (e.g., clear form, show notification)
      } catch (error) {
        // Handle errors appropriately
        console.error("Error delete subject:", error);
      }
    }
  };

  return (
    <>
      <ActionIcon variant="subtle" color="red" onClick={handleOpen}>
        <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
      </ActionIcon>

      <Modal opened={isOpen} onClose={handleClose} title="حذف المستخدم" centered>
        <Flex direction="column" gap={10}>
        <Text fs="italic" size="xs">
           تحذير بمجرد الضغط على حذف سيتم حذف جميع البيانات المرتبطه به, ضع
          <Code c='primary'>{item?.first_name}</Code>
          في الصندوق للتأكيد.
        </Text>
        
          <TextInput placeholder={item?.first_name} {...form.getInputProps("first_name")} />

          <Flex direction="row" gap={8} mt={20}>
            <Button bg='red' flex={1} onClick={handleSubmit} disabled={loading}>
              {loading ? <Loader size="sm" type="bars" /> : <>حذف</>}
            </Button>
            <Button
              flex={1}
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              الغاء
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}
