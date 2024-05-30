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
  GenderType,
  Status,
  StudyType,
} from "../../../public/constants/enums";
import { IconAdjustments } from "@tabler/icons-react";
import { filterStudentData } from "../../redux/student/studentSlice";

export default function Filter() {
  const dispatch = useDispatch();
  const { stageData } = useSelector((state) => state.stage);
  const { studentData } = useSelector((state) => state.student);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    initialValues: {
      gender: "all",
      study_type: "all",
      stage_id: `${stageData.length? stageData.reduce((minObject, currentObject) => {
        if (currentObject.order < minObject.order) {
          return currentObject;
        } else {
          return minObject;
        }
      }).id:null}`,
      status: "all",
    },
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    const { gender, study_type, stage_id , status } = form.values;

    const filterCriteria = (student) => {
      let passesFilter = true;

      // Filter by role
      if (gender !== "all" && student.gender !== gender) {
        passesFilter = false;
      }

      if (study_type !== "all" && student.study_type !== study_type) {
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

    dispatch(filterStudentData({ filterCriteria }));

    handleClose(); // Close modal after submitting
  };

  useEffect(() => {
    handleSubmit();
  }, [studentData]);

  const stageOptions = stageData.map((stage) => ({
    value: String(stage.id),
    label: stage.name,
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
    {
      value: "all",
      label: "الكل",
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
    {
      value: "all",
      label: "الكل",
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
    {
      value: "all",
      label: "الكل",
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

          <Select
            label="الجنس"
            allowDeselect={false}
            placeholder="ذكر"
            data={genderOptions}
            onChange={(_value, option) => {
              console.log(option.value)
              form.setFieldValue(
                "gender",
                option ? option.value : null
              );
              handleSubmit();
            }}
            {...form.getInputProps("gender")}
          />

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
