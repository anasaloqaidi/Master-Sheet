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
import {  matches, useForm } from "@mantine/form";
import { deleteDepartment } from "../../redux/department/deleteDepartment";

export default function Delete({ item }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.department);
  const [isOpen, setIsOpen] = useState(false); // Modal state

  const form = useForm({
    initialValues: { name: '' },
    validate: {
      name: (value) => (value===item.name ? false : "غير متطابق"),
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
        await dispatch(deleteDepartment(item.id)); // Dispatch createDepartment action
        handleClose(); // Close modal on success
        // Handle success further (e.g., clear form, show notification)
      } catch (error) {
        // Handle errors appropriately
        console.error("Error delete department:", error);
      }
    }
  };

  return (
    <>
      <ActionIcon variant="subtle" color="red" onClick={handleOpen}>
        <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
      </ActionIcon>

      <Modal opened={isOpen} onClose={handleClose} title="حذف قسم" centered>
        <Flex direction="column" gap={10}>
        <Text fs="italic" size="xs">
           تحذير بمجرد الضغط على حذف سيتم حذف جميع البيانات المرتبطه به, ضع
          <Code c='primary'>{item.name}</Code>
          في الصندوق للتأكيد.
        </Text>
        
          <TextInput placeholder={item.name} {...form.getInputProps("name")} />

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
