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
import { createDepartment } from "../../redux/department/createDepartment";

export default function Create() {
  const dispatch = useDispatch();
  const { collegeData } = useSelector((state) => state.college);
  const { loading } = useSelector((state) => state.department);
  const [isOpen, setIsOpen] = useState(false); // Modal state

  const form = useForm({
    initialValues: { name: '', college_id: '' },
    validate: {
      name: isNotEmpty("مطلوب"),
      college_id: isNotEmpty("مطلوب"),
    },
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {setIsOpen(false); form.reset()};

  const handleSubmit = async () => {
    
    if(!form.validate().hasErrors){
    try {
      await dispatch(createDepartment(form.values)); // Dispatch createDepartment action
      handleClose(); // Close modal on success
      // Handle success further (e.g., clear form, show notification)
    } catch (error) {
      // Handle errors appropriately
      console.error("Error creating department:", error);
    }}
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

      <Modal opened={isOpen} onClose={handleClose} title="إضافة قسم" centered>
        <Flex direction="column" gap={10}>
          <TextInput
            label="الأسم"
            placeholder="نظم, الشبكات ..."
            {...form.getInputProps("name")}
          />
          <Select
            label="الكلية"
            placeholder="العلوم"
            data={collegeOptions}
            
            onChange={(_value, option) =>
              form.setFieldValue("college_id",option? Number(option.value):null)
            }
            {...form.getInputProps("college_id")}
          />

          <Flex direction="row" gap={8} mt={20}>
            <Button flex={1} onClick={handleSubmit} disabled={loading}>{loading? <Loader size="sm" type="bars" />:<>حفظ</>}</Button>
            <Button flex={1} variant="outline" onClick={handleClose} disabled={loading}>الغاء</Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}
