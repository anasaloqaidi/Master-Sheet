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
import { useForm } from "@mantine/form";
import { deletePreparingSubject } from "../../redux/preparingSubject/deletePreparingSubject";

export default function Delete({ item }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.preparingSubject);
  const [isOpen, setIsOpen] = useState(false); // Modal state

  const form = useForm({
    initialValues: { subject_code: "" },
    validate: {
      subject_code: (value) =>
        value === item.subject_code ? false : "غير متطابق",
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
        await dispatch(
          deletePreparingSubject({
            subject_code: item.subject_code,
            stage_id: item.stage_id,
            academic_year_id: item.academic_year_id,
            department_id: item.department_id,
          })
        );
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

      <Modal opened={isOpen} onClose={handleClose} title="حذف المقرر" centered>
        <Flex direction="column" gap={10}>
          <Text fs="italic" size="xs">
            تحذير بمجرد الضغط على حذف سيتم حذف جميع البيانات المرتبطه به, ضع
            <Code c="primary">{item.subject_code}</Code>
            في الصندوق للتأكيد.
          </Text>

          <TextInput
            placeholder={item.subject_code}
            {...form.getInputProps("subject_code")}
          />

          <Flex direction="row" gap={8} mt={20}>
            <Button bg="red" flex={1} onClick={handleSubmit} disabled={loading}>
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
