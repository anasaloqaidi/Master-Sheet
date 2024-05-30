import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as XLSX from 'xlsx';
import { ActionIcon, Flex, Select, Modal, Button, Loader, FileInput, SimpleGrid } from "@mantine/core";
import { IconClipboardPlus } from "@tabler/icons-react";
import { createStudent } from "../../redux/student/createStudent";
import { isNotEmpty, useForm } from "@mantine/form";
import { GenderType, Status, StudyType } from "../../../public/constants/enums";
import ExportToExcel from "../ExcelExport";

export default function CreateMany() {
  const dispatch = useDispatch();
  const { academicYearData } = useSelector((state) => state.academicYear);
  const { stageData } = useSelector((state) => state.stage);
  const { authData } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.student);
  const fileName = 'Students';
  const data = [
    { first_name: '', middle_name: '',last_name:'',email:'',birthday:'2000-3-15',password:'',gender:`${GenderType.Male} or ${GenderType.Female}`},
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    
    setFile(null);
    setError(null);
  };
  const form = useForm({
    initialValues: {
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

      stage_id: isNotEmpty("مطلوب"),
      academic_year_id: isNotEmpty("مطلوب"),
    },
  });

  const handleSubmit = async () => {
    if (!file) {
      setError({ field:"file" ,message:'فارغ'});
      return;
    }
    if (!form.validate().hasErrors) {
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        const currentAcademicYear = academicYearData.find(obj => obj.is_current === true);
        const students = json.map((item) => ({
          first_name: item.first_name,

          middle_name: item.middle_name,
    
          last_name: item.last_name,

          birthday: new Date(item.birthday),

          study_type:form.values.study_type,
    
          email: item.email,
    
          password: String(item.password),
    
          gender: item.gender,
          
          enrollment_year_id: Number(currentAcademicYear.id),

          department_id: Number(authData.department_id),
        }));

        await dispatch(createStudent({
          students:students,
          academic_year_id:Number(form.values.academic_year_id),
          stage_id:Number(form.values.stage_id),
          status:form.values.status,
          
        }));
        handleClose();
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error creating students:", error);
    }}
  };

const stageOptions = stageData.map((stage) => ({
    value: String(stage.id),
    label: stage.name,
  }));
  const academicYearOptions = academicYearData.map((academicYear) => ({
    value: String(academicYear.id),
    label: academicYear.name,
  }));

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
        <IconClipboardPlus style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>

      <Modal opened={isOpen} onClose={handleClose} title="إضافة طلاب" centered>
        <Flex direction="column" gap={10}>
        <ExportToExcel apiData={data} fileName={fileName} />
          <FileInput
            label="ملف أكسل"
            placeholder="الطلاب"
            error={error && error.field === "file" ? error.message : null}
            onChange={(value) => {
              setFile(value);
              setError(null); // Clear file error on change
            }}
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


          {error && !error.field && (
            <div style={{ color: "red", textAlign: "center" }}>{error.message}</div>
          )}

          <Flex direction="row" gap={8} mt={20}>
            <Button flex={1} onClick={handleSubmit} disabled={loading}>
              {loading ? <Loader size="sm" type="bars" /> : "حفظ"}
            </Button>
            <Button flex={1} variant="outline" onClick={handleClose} disabled={loading}>
              الغاء
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}
