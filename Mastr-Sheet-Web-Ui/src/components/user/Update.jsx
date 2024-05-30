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
} from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { updateUser } from "../../redux/user/updateUser";
import { GenderType, UserRole } from "../../../public/constants/enums";

export default function Update({ item }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false); // Modal state

  const form = useForm({
    initialValues: {
      first_name: item?.first_name,

      middle_name: item?.middle_name,

      last_name: item?.last_name,

      email: item?.email,

      gender: item?.gender,

      is_active: `${item?.is_active}`,

      role: item?.role,
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
          updateUser({
            Id: item?.id,
            updateData: {
              ...form.values,
              is_active: form.values.is_active==='true'?true:false,
            },
          })
        ); // Dispatch createstage action
        handleClose(); // Close modal on success
        // Handle success further (e.g., clear form, show notification)
      } catch (error) {
        // Handle errors appropriately
        console.error("Error creating user:", error);
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

  const roleOptions = [
    {
      value: UserRole.Supervisor,
      label: UserRole.Supervisor,
    },
    {
      value: UserRole.DepartmentHead,
      label: UserRole.DepartmentHead,
    },
    {
      value: UserRole.Dean,
      label: UserRole.Dean,
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
          <TextInput
            label="الأسم الأول"
            placeholder="أنس"
            {...form.getInputProps("first_name")}
          />
          <TextInput
            label="الأسم الثاني"
            placeholder="محمد"
            {...form.getInputProps("middle_name")}
          />
          <TextInput
            label="الأسم الثالث"
            placeholder="خضير"
            {...form.getInputProps("last_name")}
          />
          <TextInput
            label="البريد الألكتروني"
            placeholder="anasaloqaidi@gmail.com"
            {...form.getInputProps("email")}
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
          <Select
            label="الصلاحية"
            data={roleOptions}
            allowDeselect={false}
            onChange={(_value, option) =>
              form.setFieldValue("role", option.value)
            }
            {...form.getInputProps("role")}
          />
          <Select
            label="الحالة"
            data={[
              {
                value: "true",
                label: "فعال",
              },
              {
                value: "false",
                label: "غير فعال",
              },
            ]}
            allowDeselect={false}
            onChange={(_value, option) =>
              form.setFieldValue("is_active", option.value)
            }
            {...form.getInputProps("is_active")}
          />
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
