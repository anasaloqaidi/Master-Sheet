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
import { useForm } from "@mantine/form";
import {
  SemesterType,
  Status,
  StudyType,
} from "../../../public/constants/enums";
import { IconAdjustments } from "@tabler/icons-react";
import { filterGradeData } from "../../redux/grade/gradeSlice";
import { filterStudentGradeData } from "../../redux/student/studentSlice";
import { filterPreparingSubjectGradeData } from "../../redux/preparingSubject/preparingSubjectSlice";


export default function Filter() {
  const dispatch = useDispatch();
  const { stageData } = useSelector((state) => state.stage);
  const { midGradeData, finalGradeData } = useSelector((state) => state.grade);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    initialValues: {
      semester: SemesterType.First,
      study_type: StudyType.Morning,
      stage_id: `${
        stageData.length
          ? stageData.reduce((minObject, currentObject) => {
              if (currentObject.order < minObject.order) {
                return currentObject;
              } else {
                return minObject;
              }
            }).id
          : null
      }`,
      status: Status.Ongoing,
    },
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    const { semester, study_type, stage_id, status } = form.values;


    const filterStudentCriteria = (student) => {
      let passesFilter = true;

      if (student.study_type !== study_type) {
        passesFilter = false;
      }

      if (status !== "all" && !student.studentStages.find((v)=>v.status===status)) {
        passesFilter = false;
      }
      // Filter by stage_id
      if (!student.studentStages.find((v)=>v.stage_id===parseInt(stage_id))) {
        passesFilter = false;
      }

      return passesFilter;
    };

    dispatch(filterStudentGradeData({filterCriteria:filterStudentCriteria }));

    const filterSubjectCriteria = (subject) => {
      let passesFilter = true;

 
      if (
        subject.stage_id !== parseInt(stage_id)
      ) {
        passesFilter = false;
      }

      if (subject.semester !== semester) {
        passesFilter = false;
      }

      return passesFilter;
    };

    dispatch(filterPreparingSubjectGradeData({filterCriteria: filterSubjectCriteria }));

    handleClose(); // Close modal after submitting
  };

  useEffect(() => {
    handleSubmit();
  }, [midGradeData,finalGradeData]);
//midGradeData, finalGradeData
  const stageOptions = stageData.map((stage) => ({
    value: String(stage.id),
    label: stage.name,
  }));

  const semesterOptions = [
    {
      value: SemesterType.First,
      label: SemesterType.First,
    },
    {
      value: SemesterType.Second,
      label: SemesterType.Second,
    },
  ];
  const studyOptions = [
    {
      value: StudyType.Morning,
      label: StudyType.Morning,
    },
    {
      value: StudyType.Evening,
      label: StudyType.Evening,
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
        <IconAdjustments style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>

      <Modal opened={isOpen} onClose={handleClose} centered>
        <Flex direction="column" gap={10}>
          <SimpleGrid cols={2} spacing="sm">
            <Select
              label="نوع الدراسة"
              data={studyOptions}
              allowDeselect={false}
              onChange={(_value, option) => {
                form.setFieldValue("study_type", option.value);
                handleSubmit();
              }}
              {...form.getInputProps("study_type")}
            />

            <Select
              label="الحالة"
              allowDeselect={false}
              data={statusOptions}
              onChange={(_value, option) => {
                form.setFieldValue("status", option.value);
                handleSubmit();
              }}
              {...form.getInputProps("status")}
            />
          </SimpleGrid>

          <Select
            label="المرحلة"
            allowDeselect={false}
            placeholder="الأولى"
            data={stageOptions}
            onChange={(_value, option) => {
              form.setFieldValue(
                "stage_id",
                option ? parseInt(option.value) : null
              );
              handleSubmit();
            }}
            {...form.getInputProps("stage_id")}
          />
          <SimpleGrid cols={1} spacing="sm">
            <Select
              label="الفصل"
              allowDeselect={false}
              placeholder="الأول"
              data={semesterOptions}
              onChange={(_value, option) => {
                form.setFieldValue("semester", option ? option.value : null);
                handleSubmit();
              }}
              {...form.getInputProps("semester")}
            />
           
          </SimpleGrid>
          <Flex direction="row" gap={8} mt={20}>
            <Button flex={1} onClick={handleSubmit}>
              حفظ
            </Button>
            <Button flex={1} variant="outline" onClick={handleClose}>
              الغاء
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}
