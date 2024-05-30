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
import { createStage } from "../../redux/stage/createStage";
import { notifications } from "@mantine/notifications";

export default function Create() {
  const dispatch = useDispatch();
  const { collegeData } = useSelector((state) => state.college);
  const { loading } = useSelector((state) => state.stage);
  const [isOpen, setIsOpen] = useState(false); // Modal state

  const form = useForm({
    initialValues: {
      name: '',
      order: '',
      college_id: '',
    },
    validate: {
      name: isNotEmpty("مطلوب"),
      order: isNotEmpty("مطلوب"),
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
      const res =  await dispatch(createStage({...form.values,order:parseInt(form.values.order),college_id:parseInt(form.values.college_id)})); 
        
        if(res?.error){
          notifications.show({
            color: "red",
            title: "تحذير",
            message: "الترتيب معد مسبقًا",
            autoClose: false,
          });
         }
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

      <Modal opened={isOpen} onClose={handleClose} title="إضافة مرحلة" centered>
        <Flex direction="column" gap={10}>
          <TextInput
            label="الأسم"
            placeholder="المرحلة الثالثة..."
            {...form.getInputProps("name")}
          />
          <TextInput
            label="الترتيب"
            placeholder="1 , 3 ..."
            {...form.getInputProps("order")}
          />
          <Select
            label="الكلية"
            placeholder="العلوم"
            data={collegeOptions}
            
            onChange={(_value, option) =>
              form.setFieldValue("college_id",option? parseInt(option.value):null)
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
