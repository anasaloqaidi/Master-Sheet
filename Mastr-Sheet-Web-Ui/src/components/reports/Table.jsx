import React, { useEffect, useState } from "react";
import {
  Table as T,
  Group,
  Text,
  Loader,
  Flex,
  Avatar,
  NumberInput,
  SimpleGrid,
  Kbd,
  Paper,
  Divider,
  Center,
  ActionIcon,
} from "@mantine/core";
import { useSelector } from "react-redux";
import { IconChecks, IconDatabaseX, IconFileExport } from "@tabler/icons-react";
import { Margin, Resolution, usePDF } from "react-to-pdf";
import Filter from "./Filter";

const options = {
  // default is `save`
  method: "open",
  // default is Resolution.MEDIUM = 3, which should be enough, higher values
  // increases the image quality but also the size of the PDF, so be careful
  // using values higher than 10 when having multiple pages generated, it
  // might cause the page to crash or hang.
  resolution: Resolution.HIGH,
  page: {
    // margin is in MM, default is Margin.NONE = 0
    margin: Margin.LARGE,
    // default is 'A4'
    format: "A0",
    // default is 'portrait'
    orientation: "landscape",
  },
  canvas: {
    // default is 'image/jpeg' for better size performance
    mimeType: "image/png",
    qualityRatio: 1,
  },
  // Customize any value passed to the jsPDF instance and html2canvas
  // function. You probably will not need this and things can break,
  // so use with caution.
  overrides: {
    // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
    pdf: {
      compress: true,
    },
  },
};

export default function Table() {
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" }, options);
  const { filteredPreparingSubjectGradeData, loading } = useSelector(
    (state) => state.preparingSubject
  );
  const { midGradeData, finalGradeData, reFinalGradeData } = useSelector(
    (state) => state.grade
  );

  const { subjectData } = useSelector((state) => state.subject);
  const { academicYearData } = useSelector((state) => state.academicYear);
  const { filteredStudentGradeData } = useSelector((state) => state.student);
  const { authData } = useSelector((state) => state.auth);
  const { departmentData } = useSelector((state) => state.department);
  const { collegeData } = useSelector((state) => state.college);

  const [grades, setGrades] = useState({});

  useEffect(() => {
    setGrades({});

    const updatedGrades = {};
    filteredStudentGradeData.map((v) => {
      filteredPreparingSubjectGradeData.map((s) => {
        updatedGrades[`${v.id}-${s.subject_code}`] = {
          student_id: v.id,
          subject_code: s.subject_code,
          mid:
            midGradeData.find(
              (m) => m.student_id === v.id && m.subject_code === s.subject_code
            )?.grade || 0,
          final:
            finalGradeData.find(
              (m) => m.student_id === v.id && m.subject_code === s.subject_code
            )?.grade || 0,
          reFinal:
            reFinalGradeData.find(
              (m) => m.student_id === v.id && m.subject_code === s.subject_code
            )?.grade || 0,
          stage_id: s.stage_id,
          semester: s.semester,
          academic_year_id:
            academicYearData.find((year) => year.is_current)?.id || null,
        };
      });
    });
    setGrades((prevGrades) => ({ ...prevGrades, ...updatedGrades }));
  }, []);

  const rows = filteredStudentGradeData?.map((item, index) => {
    return (
      <>
        {index % 15 == 0 && index !== 0 ? (
          <T.Tr key={item.id + "uu"}>
            <T.Td>
              {" "}
              <Paper mih={120}></Paper>
            </T.Td>{" "}
          </T.Tr>
        ) : null}

        <T.Tr key={item.id}>
          <T.Td w={0}>{index + 1}</T.Td>
          <T.Td>
            <Group gap="sm">
              <Text size="sm" fontWeight={800} c="black">
                {item.first_name +
                  " " +
                  item.middle_name +
                  " " +
                  item.last_name}
              </Text>
            </Group>
          </T.Td>
          {filteredPreparingSubjectGradeData.map((subject) => {
            const gradeKey = `${item.id}-${subject.subject_code}`;

            return (
              <T.Td key={gradeKey} c="black">
                <SimpleGrid cols={3} spacing="2" verticalSpacing="2">
                  <Kbd bg={"white"} c="black">
                    {grades[gradeKey]?.mid || 0}
                  </Kbd>
                  <Kbd bg={"white"} c="black">
                    {grades[gradeKey]?.final || 0}
                  </Kbd>
                  <Kbd bg={"white"} c="black">
                    {grades[gradeKey]?.mid + grades[gradeKey]?.final ||
                      grades[gradeKey]?.mid + grades[gradeKey]?.reFinal ||
                      0}
                  </Kbd>
                  <div></div>
                  <Kbd bg={"white"} c="black">
                    {grades[gradeKey]?.reFinal || 0}
                  </Kbd>
                </SimpleGrid>
              </T.Td>
            );
          })}
        </T.Tr>
      </>
    );
  });

  return (
    <>
      <Flex align="end" gap={5} direction="row" mb={20}>
        <Filter />
        <ActionIcon
          onClick={() => toPDF(options)}
          variant="filled"
          radius="xs"
          aria-label="Settings"
        >
          <IconFileExport
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
                         
        </ActionIcon>
         <Text size="lg">معاينة</Text>
      </Flex>

      {!loading ? (
        <Paper
          shadow="xs"
          radius="xs"
          withBorder
          p="xl"
          bg={"white"}
          c={"black"}
        >
          <Flex flex={1} direction="column" ref={targetRef} p={20}>
            <Flex align="end" flex={1} direction="row" mb={20}>
              <Flex direction="column">
                <Text size="sm">الجامعة الأنبار</Text>
                <Text size="sm">الكلية {collegeData[0]?.name}</Text>
                <Text size="sm">
                  القسم{" "}
                  {
                    departmentData.find((v) => v.id === authData.department_id)
                      ?.name
                  }
                </Text>
                <Text size="sm">
                  الدراسة {filteredStudentGradeData[0]?.study_type}
                </Text>
              </Flex>
              <Text size="xs" fw={700}>
                السنة الدراسية{" "}
                {academicYearData.find((obj) => obj.is_current === true)?.name}
              </Text>
            </Flex>
            <T
              verticalSpacing="4"
              highlightOnHover
              highlightOnHoverColor="rgba(0, 0, 0, 0.1)"
              miw="900px"
              withTableBorder
              withColumnBorders
            >
              <T.Thead>
                <T.Tr h={100}>
                  <T.Th pb={50} pr={17}>
                    <div style={{ transform: "rotate(-90deg)", width: 0 }}>
                      التسلسل
                    </div>
                  </T.Th>
                  <T.Th>
                    <Flex direction="column">
                      <div>أسم المادة</div>
                      <Divider my="md" />
                      <div>أسم الطالب</div>
                    </Flex>
                  </T.Th>
                  {filteredPreparingSubjectGradeData.map((item, idx) => (
                    <T.Th key={`subject-header-${idx}`}>
                      <Flex direction="column">
                        <Center ta="center">
                          {
                            subjectData.find(
                              (subject) => subject.code === item.subject_code
                            )?.name_arabic
                          }
                        </Center>
                        <Divider my="md" />
                        <Flex
                          direction="row"
                          p={0}
                          h="0px"
                          style={{ fontSize: "11px" }}
                        >
                          <Center flex={1}>الوحدات</Center>
                          <Divider my={-16} orientation="vertical" />
                          <Center flex={1}>4</Center>
                        </Flex>
                        <Divider my="md" />
                        <Flex
                          direction="row"
                          mt={-10}
                          style={{ fontSize: "11px" }}
                        >
                          <Center flex={1}>س</Center>
                          <Center flex={1}>ن</Center>
                          <Center flex={1}>م</Center>
                        </Flex>
                      </Flex>
                    </T.Th>
                  ))}
                </T.Tr>
              </T.Thead>
              <T.Tbody>{rows}</T.Tbody>
            </T>
          </Flex>
        </Paper>
      ) : (
        <Center h="100%">
          {loading ? (
            <Loader color="primary" size="md" type="bars" />
          ) : (
            <IconDatabaseX size={60} />
          )}
        </Center>
      )}
    </>
  );
}
