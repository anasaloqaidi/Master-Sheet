import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ActionIcon,
  Flex,
  Select,
  Modal,
  Button,
  Loader,
  SimpleGrid,
} from "@mantine/core";
import {  useForm } from "@mantine/form";
import {  UserRole } from "../../../public/constants/enums";
import { filterUserData } from "../../redux/user/userSlice";
import { IconAdjustments } from "@tabler/icons-react";

export default function Filter() {
  const dispatch = useDispatch();
  const { departmentData } = useSelector((state) => state.department);
  const { userData } = useSelector((state) => state.user);
  const { authData } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false); 



  const form = useForm({
    initialValues: {

      role: 'all',
      is_active:'all',
      department_id: "all",
    },

  });


  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async () => {


    const { role, is_active, department_id } = form.values;

    // Define filterCriteria based on form values
    const filterCriteria = (user) => {
      let passesFilter = true;

      // Filter by role
      if (role !== "all" && user.role !== role) {
        passesFilter = false;
      }

      // Filter by active status
      if (is_active !== "all" && user.is_active.toString() !== is_active) {
        passesFilter = false;
      }

      // Filter by department_id
      if (department_id !== "all" && user.department_id !== parseInt(department_id)) {
        passesFilter = false;
      }

      return passesFilter;
    };

    dispatch(filterUserData({ filterCriteria }));

    handleClose(); // Close modal after submitting
  };

  useEffect(() => {
   handleSubmit();
  }, [userData]);


  const departmentOptions = departmentData.map((department) => ({
    value: String(department.id),
    label: department.name,
  }));

  const roleOptions = [
    {
      value: UserRole.DepartmentHead,
      label: UserRole.DepartmentHead,
    },
    {
      value: UserRole.Dean,
      label: UserRole.Dean,
    },
    {
      value: 'all',
      label: 'الكل',
    },
  ];

  return (
    <>
     
      <ActionIcon  onClick={handleOpen} variant="filled" radius="xs" aria-label="Settings">
          <IconAdjustments
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>

      <Modal
        opened={isOpen}
        onClose={handleClose}
        centered
      >
        <Flex direction="column" gap={10}>

          <SimpleGrid cols={authData.role === UserRole.Dean ?2:1} spacing="sm">
          {
            authData.role === UserRole.Dean ?
          <Select
            label="الصلاحية"
            data={roleOptions}
            allowDeselect={false}
            onChange={(_value, option) =>{
             
              form.setFieldValue("role", option.value);
             handleSubmit();
            }
            }
            {...form.getInputProps("role")}
          />:null}

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
              {
                value: 'all',
                label: 'الكل',
              },
            ]}
            onChange={(_value, option) =>{
              form.setFieldValue("is_active", option.value);
              handleSubmit();
            }
            }
            {...form.getInputProps("is_active")}

          />
          </SimpleGrid>
          {
            authData.role === UserRole.Dean ?
            <Select
            label="القسم"
            allowDeselect={true}
            placeholder="العلوم"
            data={[...departmentOptions,    {
              value: 'all',
              label: 'الكل',
            },    {
              value: '',
              label: 'عام',
            }]}
            onChange={(_value, option) =>{
              form.setFieldValue(
                "department_id",
                option ? parseInt(option.value) : null
              );
              handleSubmit();
            }
            }
            {...form.getInputProps("department_id")}
          />:null
          }

          <Flex direction="row" gap={8} mt={20}>
            <Button flex={1} onClick={handleSubmit} >
               حفظ
            </Button>
            <Button
              flex={1}
              variant="outline"
              onClick={handleClose}
  
            >
              الغاء
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}
