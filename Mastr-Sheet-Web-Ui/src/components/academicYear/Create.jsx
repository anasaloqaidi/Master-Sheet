import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ActionIcon,
  Flex,
  TextInput,
  Select,
  Modal,
  Button,
  Loader,
} from "@mantine/core";
import { IconNewSection } from "@tabler/icons-react";
import { isNotEmpty, useForm } from "@mantine/form";
import { DateInput } from '@mantine/dates';

import { createAcademicYear } from "../../redux/academicYear/createAcademicYear";

export default function Create() {
  const dispatch = useDispatch();
  const { collegeData } = useSelector((state) => state.college);
  const { loading } = useSelector((state) => state.stage);
  const [isOpen, setIsOpen] = useState(false); // Modal state

  const form = useForm({
    initialValues: {
      name: "",
      start_date: '',
      end_date: '',
      college_id: "",
    },
    validate: {
      name: isNotEmpty("مطلوب"),
      start_date: isNotEmpty("مطلوب"),
      end_date: isNotEmpty("مطلوب"),
      college_id: isNotEmpty("مطلوب"),
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
        await dispatch(createAcademicYear({
            ...form.values,
            college_id: parseInt(form.values.college_id),
          }));
      
        handleClose(); // Close modal on success
        // Handle success further (e.g., clear form, show notification)
      } catch (error) {
        // Handle errors appropriately
        console.error("Error creating stage:", error);
      }
    }
  };

  const collegeOptions = collegeData.map((college) => ({
    value: String(college.id),
    label: college.name,
  }));

  return (
    <>
      <ActionIcon
        onClick={handleOpen}
        variant="filled"
        radius="xs"
        aria-label="Settings"
      >
        <IconNewSection style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>

      <Modal opened={isOpen} onClose={handleClose} title="إضافة سنة دراسية" centered>
        <Flex direction="column" gap={10}>
          <TextInput
            label="الأسم"
            placeholder="2020 / 2021 ..."
            {...form.getInputProps("name")}
          />
          <DateInput
            valueFormat="DD/MM/YYYY" 
            label="تاريخ البداية"
            placeholder="Date input"
            {...form.getInputProps("start_date")}
          />
          <DateInput
            valueFormat="DD/MM/YYYY" 
            label="تاريخ النهاية"
            placeholder="Date input"
            {...form.getInputProps("end_date")}
          />
          <Select
            label="الكلية"
            placeholder="العلوم"
            data={collegeOptions}
            onChange={(_value, option) =>
              form.setFieldValue(
                "college_id",
                option ? parseInt(option.value) : null
              )
            }
            {...form.getInputProps("college_id")}
          />

          <Flex direction="row" gap={8} mt={20}>
            <Button flex={1} onClick={handleSubmit} disabled={loading}>
              {loading ? <Loader size="sm" type="bars" /> : <>حفظ</>}
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
