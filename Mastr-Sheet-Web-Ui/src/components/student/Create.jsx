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
import { createStudent } from "../../redux/student/createStudent";
import { DateInput } from "@mantine/dates";
import {
  GenderType,
  Status,
  StudyType,
} from "../../../public/constants/enums";

export default function Create() {
  const dispatch = useDispatch();
  const { academicYearData } = useSelector((state) => state.academicYear);
  const { loading } = useSelector((state) => state.student);
  const { stageData } = useSelector((state) => state.stage);
  const { authData } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false); // Modal state

  const form = useForm({
    initialValues: {
      first_name: "",

      middle_name: "",

      last_name: "",

      birthday: "", // Assuming date is stored as string

      email: "",

      password: "",

      gender: GenderType.Male,

      study_type: StudyType.Morning,

      status: Status.Ongoing,

      academic_year_id:'',

      stage_id: 
        stageData.length? stageData.reduce((minObject, currentObject) => {
          if (currentObject.order < minObject.order) {
            return currentObject;
          } else {
            return minObject;
          }
        }).id:null
      ,
      
    },
    validate: {
      first_name: isNotEmpty("مطلوب"),

      middle_name: isNotEmpty("مطلوب"),

      last_name: isNotEmpty("مطلوب"),

      birthday: isNotEmpty("مطلوب"), // Assuming date is stored as string

      email: isEmail("ليس بريد الكتروني"),

      password: hasLength({ min: 8 }, "لا يقل عن 8 احرف"),
      stage_id: isNotEmpty("مطلوب"),
      academic_year_id: isNotEmpty("مطلوب"),
    },
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    form.reset();
  };

  const handleSubmit = async () => {

    const currentAcademicYear = academicYearData.find(obj => obj.is_current === true);


    if (!form.validate().hasErrors && currentAcademicYear && authData?.department_id !==null) {
      const {academic_year_id , stage_id , status , ...student} = form.values;
      try {
        await dispatch(
          createStudent({
            students:[{
              ...student,
              enrollment_year_id: Number(currentAcademicYear.id),
              department_id: Number(authData.department_id),
            }],
            academic_year_id:Number(academic_year_id),
            stage_id:Number(stage_id),
            status:status

          })
        ); // Dispatch createDepartment action
        handleClose(); // Close modal on success
        // Handle success further (e.g., clear form, show notification)
      } catch (error) {
        // Handle errors appropriately
        console.error("Error creating Student:", error);
      }
    }
  };

  const stageOptions = stageData.map((stage) => ({
    value: String(stage.id),
    label: stage.name,
  }));
  const academicYearOptions = academicYearData.map((academicYear) => ({
    value: String(academicYear.id),
    label: academicYear.name,
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

  const statusOptions = [
    {
      value: Status.Ongoing,
      label: Status.Ongoing,
    },
    {
      value: Status.Resumed,
      label: Status.Resumed,
    },
    {
      value: Status.Stoping,
      label: Status.Stoping,
    },
    {
      value: Status.Uploading,
      label: Status.Uploading,
    },
    {
      value: Status.Graduation,
      label: Status.Graduation,
    },
  ];

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
        title="إضافة طالب"
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
            />
          </SimpleGrid>
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
              label="نوع الدراسة"
              data={studyTypeOptions}
              allowDeselect={false}
              onChange={(_value, option) =>
                form.setFieldValue("study_type", option.value)
              }
              {...form.getInputProps("study_type")}
            />
            <Select
              label="الحالة"
              allowDeselect={false}
              data={statusOptions}
              onChange={(_value, option) =>
                form.setFieldValue("status", option.value)
              }
              {...form.getInputProps("status")}
            />
          </SimpleGrid>
          <SimpleGrid cols={2} spacing="sm">
          <Select
            label="المرحلة"
            allowDeselect={false}
            placeholder="الأولى"
            data={stageOptions}
            onChange={(_value, option) =>
              form.setFieldValue(
                "stage_id",
                option ? parseInt(option.value) : null
              )
            }
            {...form.getInputProps("stage_id")}
          />
         <Select
            label="السنة الدراسية"
            allowDeselect={false}
            placeholder="2020 / 2021"
            data={academicYearOptions}
            onChange={(_value, option) =>
              form.setFieldValue(
                "academic_year_id",
                option ? parseInt(option.value) : null
              )
            }
            {...form.getInputProps("academic_year_id")}
          />
          
          </SimpleGrid>

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
