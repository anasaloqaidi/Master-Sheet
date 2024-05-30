import { useElementSize } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import {
  Table as T,
  Group,
  Text,
  rem,
  Loader,
  Center,
  Pagination,
  Flex,
  Avatar,
  NumberInput,
  Button,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { IconChecks, IconDatabaseX } from "@tabler/icons-react";
import { createMidGrade } from "../../redux/grade/createMidGrade";
import { createFinalGrade } from "../../redux/grade/createFinalGrade";

export default function Table() {
  const { filteredPreparingSubjectGradeData, loading } = useSelector(
    (state) => state.preparingSubject
  );
  const { filteredGradeData , key } = useSelector((state) => state.grade);
  const dispatch = useDispatch();
  const { subjectData } = useSelector((state) => state.subject);
  const { academicYearData } = useSelector((state) => state.academicYear);
  const { filteredStudentGradeData } = useSelector((state) => state.student);
  const [activePage, setActivePage] = useState(1);
  const [grades, setGrades] = useState({}); 
  const [last, setLast] = useState({}); 
  const { ref, height } = useElementSize();

  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Update itemsPerPage when height changes
  useEffect(() => {
    if (height) {
      setItemsPerPage(Math.floor(height / 61) - 3);
    }
  }, [height]);
  useEffect(() => {
    setGrades({})
    setLast({})
    if (filteredGradeData.length > 0) {
      const updatedGrades = {};
      filteredGradeData.forEach((v) => {
        const { student_id, subject_code, grade, stage_id, semester } = v;
        updatedGrades[`${student_id}-${subject_code}`] = {
          student_id,
          subject_code,
          grade,
          stage_id,
          semester,
          academic_year_id: academicYearData.find((year) => year.is_current)?.id || null,
        };
      });
      setGrades((prevGrades) => ({ ...prevGrades, ...updatedGrades }));
      setLast((prevGrades) => ({ ...prevGrades, ...updatedGrades }));
    }else{
      const updatedGrades = {};
      filteredStudentGradeData.map((v)=>{
        filteredPreparingSubjectGradeData.map((s)=>{
            updatedGrades[`${v.id}-${s.subject_code}`] = {
              student_id:v.id,
              subject_code: s.subject_code,
              grade:0,
              stage_id:s.stage_id,
              semester:s.semester,
              academic_year_id: academicYearData.find((year) => year.is_current)?.id || null,
            };
      
        })
      })
          setGrades((prevGrades) => ({ ...prevGrades, ...updatedGrades }));
          setLast((prevGrades) => ({ ...prevGrades, ...updatedGrades }));
    }
  

  }, [filteredGradeData]);

  const handelButton=()=>{
    if(key==='mid'){
      dispatch(createMidGrade(Object.values(grades)))
    }else if(key==='final'){
      dispatch(createFinalGrade(Object.values(grades)))
    }
  }

  const handleGradesChange = debounce( (studentId, subjectCode, value, stageId, semester) => {
      const updatedGrades = {
        ...grades,
        [`${studentId}-${subjectCode}`]: {
          student_id: studentId,
          subject_code: subjectCode,
          grade: value,
          stage_id: stageId,
          semester: semester,
          academic_year_id: academicYearData.find((v) => v.is_current === true).id,
        },
      };

      setGrades(updatedGrades);
    },
    300 // Debounce delay in milliseconds
  );

  // Chunk the filteredStudentData based on itemsPerPage
  const data = chunk(filteredStudentGradeData, itemsPerPage);

  const rows = data[activePage - 1]?.map((item, index) => {
    return (
      <T.Tr key={item.id}>
        <T.Td>
          <Group gap="sm">
            <Avatar radius="xl" />
            <Text size="sm" fontWeight={500}>
              {item.first_name + " " + item.middle_name + " " + item.last_name}
            </Text>
          </Group>
        </T.Td>
        {key!=='reFinal'?filteredPreparingSubjectGradeData.map((subject) => {
          const gradeKey = `${item.id}-${subject.subject_code}`;
          const currentGrade = grades[gradeKey]?.grade || 0; // Access grade from grades object or default to 0

          console.log(key)
          return (
            <T.Td key={gradeKey}>
              <NumberInput
                value={currentGrade} // Use the currentGrade from state as the value
                onChange={(value) =>
                  handleGradesChange(
                    item.id,
                    subject.subject_code,
                    value,
                    subject.stage_id,
                    subject.semester
                  )
                }
                error={key==='mid'?currentGrade > subject.limit_of_mid? "اكبر من المحدد":null:currentGrade > subject.limit_of_final? "اكبر من المحدد":null}
                min={0} // Define minimum value if needed
              
              />
            </T.Td>
          );
        }):
        
        filteredPreparingSubjectGradeData.map((subject) => {
          const gradeKey = `${item.id}-${subject.subject_code}`;
          const currentGrade = grades[gradeKey]?.grade || 0; // Access grade from grades object or default to 0

          return (
            <T.Td key={gradeKey}>
             {filteredGradeData.find((v)=>v.student_id===item.id&&v.subject_code===subject.subject_code)?
               <NumberInput
               value={currentGrade} // Use the currentGrade from state as the value
               onChange={(value) =>
                 handleGradesChange(
                   item.id,
                   subject.subject_code,
                   value,
                   subject.stage_id,
                   subject.semester
                 )
               }
               min={0} // Define minimum value if needed
               error={key==='mid' && currentGrade > subject.limit_of_mid? "اكبر من المحدد": "اكبر من المحدد"}// Define maximum value if needed
             />
             :<IconChecks/>}
            </T.Td>
          );
        })
        
        }
      </T.Tr>
    );
  });

  return (
    <>
      {!loading && filteredPreparingSubjectGradeData?.length ? (
        <>
          <Flex flex={1} ref={ref} direction="column" style={{minWidth:"1300px"}}>
            <T verticalSpacing="md" highlightOnHover highlightOnHoverColor="rgba(0, 0, 0, 0.1)" > 
              <T.Thead>
                <T.Tr>
                  <T.Th>أسم الطالب</T.Th>
                  {filteredPreparingSubjectGradeData.map((item, idx) => (
                    <T.Th key={`subject-header-${idx}`}>
                      {subjectData.find((subject) => subject.code === item.subject_code)?.name_arabic}
                    </T.Th>
                  ))}
                </T.Tr>
              </T.Thead>
              <T.Tbody>{rows}</T.Tbody>
            </T>
          </Flex>
          <Flex justify="space-between">
            <Button variant="filled" radius="xs" onClick={handelButton} disabled={JSON.stringify(last)===JSON.stringify(grades)}>حفظ التغيرات</Button>

            <Pagination
              my={10}
              disabled={data.length < 2}
              total={data.length}
              value={activePage}
              onChange={setActivePage}
              mt="sm"
            />
            
          </Flex>
        </>
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

// Debounce function
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Function to chunk array into smaller arrays of given size
function chunk(array, size) {
  const result = [];
  for (let i = 0; i < array?.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}
