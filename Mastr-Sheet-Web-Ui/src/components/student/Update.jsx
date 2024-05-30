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
  Select,
  SimpleGrid,
} from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { updateStudent } from "../../redux/student/updateStudent";
import { GenderType, Status, StudyType } from "../../../public/constants/enums";

export default function Update({ item }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.student);
  const [isOpen, setIsOpen] = useState(false); // Modal state


  const form = useForm({
    initialValues: {
      first_name: item.first_name,

      middle_name: item.middle_name,

      last_name: item.last_name,

      email: item.email,

      gender: item.gender,

      study_type: item.study_type,

      
    },
    validate: {
      first_name: isNotEmpty("مطلوب"),

      middle_name: isNotEmpty("مطلوب"),

      last_name: isNotEmpty("مطلوب"),

      email: isEmail("ليس بريد الكتروني"),

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
          updateStudent({
            Id: Number(item.id),
            updateData: form.values,
              
          })
        ); // Dispatch createstage action
        handleClose(); // Close modal on success
        // Handle success further (e.g., clear form, show notification)
      } catch (error) {
        // Handle errors appropriately
        console.error("Error creating student:", error);
      }
    }
  };

  const genderOptions = [
    {
      value: GenderType.Male,
      label: GenderType.Male,
    },
    {
      value: GenderType.Female,
      label: GenderType.Female,
    },
  ];

  const studyTypeOptions = [
    {
      value: StudyType.Evening,
      label: StudyType.Evening,
    },
    {
      value: StudyType.Morning,
      label: StudyType.Morning,
    },
  ];



  return (
    <>
      <ActionIcon variant="subtle" color="gray" onClick={handleOpen}>
        <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
      </ActionIcon>

      <Modal
        opened={isOpen}
        onClose={handleClose}
        title="تحديث مستخدم"
        centered
      >
      <Flex direction="column" gap={10}>
        <SimpleGrid cols={2} spacing="sm">
            <TextInput
              label="الأسم الأول"
              placeholder="ساري"
              {...form.getInputProps("first_name")}
            />
            <TextInput
              label="الأسم الثاني"
              placeholder="عبدالله"
              {...form.getInputProps("middle_name")}
            />
          </SimpleGrid>
          <SimpleGrid cols={2} spacing="sm">
          <TextInput
            label="الأسم الثالث"
            placeholder="رشيد"
            {...form.getInputProps("last_name")}
          />
            <Select
              label="الجنس"
              allowDeselect={false}
              data={genderOptions}
              onChange={(_value, option) =>
                form.setFieldValue("gender", option.value)
              }
              {...form.getInputProps("gender")}
            />
          </SimpleGrid>
          <TextInput
            label="البريد الألكتروني"
            placeholder="anasaloqaidi@gmail.com"
            {...form.getInputProps("email")}
          />

          <SimpleGrid cols={2} spacing="sm">
            <Select
              label="نوع الدراسة"
              data={studyTypeOptions}
              allowDeselect={false}
              onChange={(_value, option) =>
                form.setFieldValue("study_type", option.value)
              }
              {...form.getInputProps("study_type")}
            />

          </SimpleGrid>
          <Flex direction="row" gap={8} mt={20}>
            <Button flex={1} onClick={handleSubmit} disabled={loading}>
              {loading ? <Loader size="sm" type="bars" /> : <>تحديث</>}
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
