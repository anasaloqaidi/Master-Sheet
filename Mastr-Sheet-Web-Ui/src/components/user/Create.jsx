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
  PasswordInput,
  SimpleGrid,
} from "@mantine/core";
import { IconNewSection } from "@tabler/icons-react";
import { hasLength, isEmail, isNotEmpty, useForm } from "@mantine/form";
import { createUser } from "../../redux/user/createUser";
import { DateInput } from '@mantine/dates';
import { GenderType, UserRole } from "../../../public/constants/enums";

export default function Create() {
  const dispatch = useDispatch();
  const { departmentData } = useSelector((state) => state.department);
  const { authData } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false); 


  const form = useForm({
    initialValues: {
      first_name: "",

      middle_name: "",

      last_name: "",

      birthday: "", // Assuming date is stored as string

      email: "",

      password: "",

      gender: GenderType.Male,

      is_active: 'true',

      role: `${authData.role === UserRole.DepartmentHead?UserRole.Supervisor:UserRole.DepartmentHead}`,

      department_id: `${authData.role === UserRole.DepartmentHead?authData.department_id:departmentData.length?departmentData[0].id:null}`,
    },
    validate: {
      first_name: isNotEmpty("مطلوب"),

      middle_name: isNotEmpty("مطلوب"),

      last_name: isNotEmpty("مطلوب"),

      birthday: isNotEmpty("مطلوب"), // Assuming date is stored as string

      email: isEmail("ليس بريد الكتروني"),

      password: hasLength({ min: 8 }, "لا يقل عن 8 احرف"),
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
          createUser({
            ...form.values,
            is_active:form.values.is_active==='true'?true:false,
             department_id: form.values.department_id?parseInt(form.values.department_id):null,
          })
        ); // Dispatch createDepartment action
        handleClose(); // Close modal on success
        // Handle success further (e.g., clear form, show notification)
      } catch (error) {
        // Handle errors appropriately
        console.error("Error creating User:", error);
      }
    }
  };

  const departmentOptions = departmentData.map((department) => ({
    value: String(department.id),
    label: department.name,
  }));
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

  const roleOptions = [];

  // Check if authData role is not DepartmentHead, then add Supervisor option
  if (authData.role === UserRole.DepartmentHead) {
    roleOptions.push({
      value: UserRole.Supervisor,
      label: UserRole.Supervisor,
    });
  }
  
  // Check if authData role is not Dean, then add DepartmentHead option
  if (authData.role === UserRole.Dean) {
    roleOptions.push({
      value: UserRole.DepartmentHead,
      label: UserRole.DepartmentHead,
    });
 
  
  // Always add Dean option regardless of the authData role
  roleOptions.push({
    value: UserRole.Dean,
    label: UserRole.Dean,
  }); }
  

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

      <Modal
        opened={isOpen}
        onClose={handleClose}
        title="إضافة مستخدم"
        centered
      >
        <Flex direction="column" gap={10}>
        <SimpleGrid cols={2} spacing="sm">
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
          </SimpleGrid>
          <TextInput
            label="الأسم الثالث"
            placeholder="خضير"
            {...form.getInputProps("last_name")}
          />
          <SimpleGrid cols={2} spacing="sm">
          <DateInput
            valueFormat="DD/MM/YYYY"
            label="تاريخ الميلاد"
            placeholder="Date input"
            {...form.getInputProps("birthday")}
          />
          <Select
            label="الجنس"
            allowDeselect={false}
            data={genderOptions}
            onChange={(_value, option) =>
              form.setFieldValue("gender", option.value)
            }
            {...form.getInputProps("gender")}
          /></SimpleGrid>
          <TextInput
            label="البريد الألكتروني"
            placeholder="anasaloqaidi@gmail.com"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="كلمة المرور"
            placeholder="1234"
            {...form.getInputProps("password")}
          />
          <SimpleGrid cols={2} spacing="sm">
          <Select
            label="الصلاحية"
            data={roleOptions}
            allowDeselect={false}
            onChange={(_value, option) =>{
              form.setFieldValue("role", option.value)
              if(option.value===UserRole.Dean)
                 form.setFieldValue("department_id", '')
            console.log(form.values)
            }
            }
            {...form.getInputProps("role")}
          />
          <Select
            label="الحالة"
            allowDeselect={false}
            data={[
              {
                value: 'true',
                label: "فعال",
              },
              {
                value: 'false',
                label: "غير فعال",
              },
            ]}
            onChange={(_value, option) =>
              form.setFieldValue("is_active", option.value)
            }
            {...form.getInputProps("is_active")}

          />
          </SimpleGrid>
          {form.values.role!==UserRole.Dean && authData.role !== UserRole.DepartmentHead?<Select
            label="القسم"
            allowDeselect={false}
            placeholder="العلوم"
            data={departmentOptions}
            onChange={(_value, option) =>
              form.setFieldValue(
                "department_id",
                option ? parseInt(option.value) : null
              )
            }
            {...form.getInputProps("department_id")}
          />:null}

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
