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

} from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { isNotEmpty, useForm } from "@mantine/form";
import { updateSubject } from "../../redux/subject/updateSubject";

export default function Update({item}) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.subject);
  const [isOpen, setIsOpen] = useState(false); // Modal state

  const form = useForm({
    initialValues: {
      name_english: item.name_english,
      name_arabic: item.name_arabic,
    },
    validate: {
      name_english: isNotEmpty("مطلوب"),
      name_arabic: isNotEmpty("مطلوب"),
    },
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {setIsOpen(false); form.reset()};

  const handleSubmit = async () => {
    
    if(!form.validate().hasErrors){
    try {
      await dispatch(updateSubject({code:item.code,updateData:form.values})); // Dispatch createsubject action
      handleClose(); // Close modal on success
      // Handle success further (e.g., clear form, show notification)
    } catch (error) {
      // Handle errors appropriately
      console.error("Error creating subject:", error);
    }}
  };



  return (
    <>

      <ActionIcon variant="subtle" color="gray" onClick={handleOpen}>
            <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>


      <Modal opened={isOpen} onClose={handleClose} title="تحديث مقرر" centered>
        <Flex direction="column" gap={10}>

          <TextInput
            label="الأسم بالعربي"
            placeholder="برمجة..."
            {...form.getInputProps("name_arabic")}
          />
          <TextInput
            label="الأسم بالأنجليزي"
            placeholder="programming..."
            {...form.getInputProps("name_english")}
          />

          <Flex direction="row" gap={8} mt={20}>
            <Button flex={1} onClick={handleSubmit} disabled={loading}>{loading? <Loader size="sm" type="bars" />:<>تحديث</>}</Button>
            <Button flex={1} variant="outline" onClick={handleClose} disabled={loading}>الغاء</Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}



