import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ActionIcon,
  Flex,
  Select,
  Modal,
  Button,
  Loader,
  NumberInput,
} from "@mantine/core";
import { IconNewSection } from "@tabler/icons-react";
import { isNotEmpty, useForm } from "@mantine/form";
import { SemesterType } from "../../../public/constants/enums";
import { createPreparingSubject } from "../../redux/preparingSubject/createPreparingSubject";

export default function Create() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.preparingSubject);
  const { subjectData } = useSelector((state) => state.subject);
  const { authData } = useSelector((state) => state.auth);
  const { stageData } = useSelector((state) => state.stage);
  const { academicYearData } = useSelector((state) => state.academicYear);
  const [isOpen, setIsOpen] = useState(false); // Modal state
  const [data, setData] = useState('50 - 50'); 

  const form = useForm({
    initialValues: {
      subject_code: "",
      stage_id: "",
      semester: SemesterType.First,
      subject_weight: '4',
      limit_of_mid: "50",
      limit_of_final: "50",
    },
    validate: {
      subject_code: isNotEmpty("مطلوب"),
      stage_id: isNotEmpty("مطلوب"),
      subject_weight: isNotEmpty("مطلوب"),
    },
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    form.reset();
  };

  const handleSubmit = async () => {
    const currentAcademicYear = academicYearData.find(obj => obj.is_current === true);  
    
    if (!form.validate().hasErrors&& currentAcademicYear) {
   
      try {
        await dispatch(
          createPreparingSubject({
            ...form.values,
            stage_id:Number(form.values.stage_id),
            subject_weight:Number(form.values.subject_weight),
            limit_of_mid:Number(form.values.limit_of_mid),
            limit_of_final:Number(form.values.limit_of_final),
            academic_year_id:  Number(currentAcademicYear.id),
            department_id: Number(authData.department_id),
          })
        ); // Dispatch createDepartment action
        handleClose(); // Close modal on success
        // Handle success further (e.g., clear form, show notification)
      } catch (error) {
        // Handle errors appropriately
        console.error("Error creating PreparingSubject:", error);
      }
    }
  };

  const subjectOptions = subjectData?.map((subject) => ({
    value: subject.code,
    label: subject.name_arabic,
  }));
  const stageOptions = stageData?.map((stage) => ({
    value: String(stage.id),
    label: stage.name,
  }));

  const SemesterTypeOptions = [
    {
      value: SemesterType.First,
      label: SemesterType.First,
    },
    {
      value: SemesterType.Second,
      label: SemesterType.Second,
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

      <Modal opened={isOpen} onClose={handleClose} title="إضافة مقرر" centered>
        <Flex direction="column" gap={10}>
          <Select
            label="المقرر"
            placeholder="برمجة"
            data={subjectOptions}
            onChange={(_value, option) =>
              form.setFieldValue(
                "subject_code",
                option ? option.value : null
              )
            }
            {...form.getInputProps("subject_code")}
          />
          <Select
            label="المرحلة"
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
            label="الفصل"
            allowDeselect={false}
            placeholder="الأول"
            data={SemesterTypeOptions}
            onChange={(_value, option) =>
              form.setFieldValue(
                "semester",
                option ? option.value : null
              )
            }
            {...form.getInputProps("semester")}
          />
          <NumberInput
            label="وزن المادة"
            placeholder="وزن المادة"
            min={0}
            max={100}
            {...form.getInputProps("subject_weight")}
          />
          <Select
            label="توزيع الدرجة بين المد و النهائي"
            allowDeselect={false}
            placeholder="50 - 50"
            value={data}
            data={['50 - 50' , '40 - 60']}
            onChange={(_value, option) =>{
              setData(option.value)
              if (option.value === '50 - 50'){
              form.setFieldValue(
                "limit_of_mid",
                option ? 50 : null
              )
              form.setFieldValue(
                "limit_of_final",
                option ? 50 : null
              )}else{
                form.setFieldValue(
                  "limit_of_mid",
                  option ? 40 : null
                )
                form.setFieldValue(
                  "limit_of_final",
                  option ? 60 : null
                )
              }
            
            }

            }
            
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
