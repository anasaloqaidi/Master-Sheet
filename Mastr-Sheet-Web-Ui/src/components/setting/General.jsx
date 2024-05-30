import React, { useState } from "react";
import { Button, Divider, Flex, NumberInput, Select, TextInput } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { isNotEmpty, useForm } from "@mantine/form";
import { updateCollege } from "../../redux/college/updateCollege";
import { updateAcademicYear } from "../../redux/academicYear/updateAcademicYear";
import { UserRole } from "../../../public/constants/enums";

export default function General() {
  const { authData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { collegeData } = useSelector((state) => state.college);
  const { academicYearData } = useSelector((state) => state.academicYear);

  // Determine current academic year ID
  const currentAcademicYearId = academicYearData.find((year) => year.is_current)?.id;

  const formCollege = useForm({
    initialValues: {
      name: collegeData[0]?.name || "",
      success_grade: `${collegeData[0]?.success_grade || ""}`,
    },
    validate: {
      name: isNotEmpty("مطلوب"),
      success_grade: isNotEmpty("مطلوب"),
    },
  });

  const formAcademicYear = useForm({
    initialValues: {
      id: `${currentAcademicYearId || ""}`,
    },
    validate: {
      id: isNotEmpty("مطلوب"),
    },
  });

  const handleSubmitCollege = async () => {
    if (!formCollege.validate().hasErrors) {
      try {
        await dispatch(
          updateCollege({
            id: collegeData[0]?.id,
            updateData: {
              ...formCollege.values,
              success_grade: Number(formCollege.values.success_grade),
            },
          })
        );
      } catch (error) {
        console.error("Error updating College:", error);
      }
    }
  };

  const handleSubmitAcademicYear = async () => {
    if (!formAcademicYear.validate().hasErrors) {
      try {
        await dispatch(
          updateAcademicYear({
            Id: Number(formAcademicYear.values.id),
            updateData: {
              is_current: true,
            },
          })
        );
      } catch (error) {
        console.error("Error updating Academic Year:", error);
      }
    }
  };

  const academicYearOptions = academicYearData.map((year) => ({
    value: String(year.id),
    label: year.name,
  }));

  return (
    <Flex direction="column" mr={30}>
      <Divider my="md" label="الكلية" labelPosition="left" />
      <Flex direction="row">
        <Flex direction="row" flex={1} gap={30}>
          <TextInput
          disabled={authData.role !== UserRole.Dean}
            placeholder="أسم الكلية"
            w={250}
            {...formCollege.getInputProps("name")}
          />
          <NumberInput
             disabled={authData.role !== UserRole.Dean}
            placeholder="درجة النجاح"
            min={0}
            max={100}
            {...formCollege.getInputProps("success_grade")}
          />
        </Flex>
        <Button
          onClick={handleSubmitCollege}
          disabled={
            formCollege.values.name === (collegeData[0]?.name || "") &&
            formCollege.values.success_grade == `${collegeData[0]?.success_grade || ""}`
          }
        >
          حفظ
        </Button>
      </Flex>
      <Divider my="md" label="السنة الدراسية" labelPosition="left" />
      <Flex direction="row">
        <Flex direction="row" flex={1}>
          <Select
          disabled={authData.role !== UserRole.Dean}
            placeholder="السنة الدراسية"
            data={academicYearOptions}
            onChange={(_value, option) => formAcademicYear.setFieldValue("id", option.value)}
            {...formAcademicYear.getInputProps("id")}
          />
        </Flex>
        <Button
          onClick={handleSubmitAcademicYear}
          disabled={formAcademicYear.values.id === `${currentAcademicYearId || ""}`}
        >
          حفظ
        </Button>
      </Flex>
    </Flex>
  );
}
