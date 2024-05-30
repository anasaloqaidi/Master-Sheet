import { useEffect, useState } from 'react';
import { Center, Flex, Loader, Text } from '@mantine/core';
import { IconCircleCheckFilled, IconCircleX } from '@tabler/icons-react';
import { useDispatch } from "react-redux";
import { readDepartments } from '../redux/department/readDepartments';
import { readStages } from '../redux/stage/readStages';
import { readSubjects } from '../redux/subject/readSubjects';
import { readAcademicYears } from '../redux/academicYear/readAcademicYears';
import { readCollege } from '../redux/college/readCollege';
import { useNavigate } from "react-router-dom";
import { readUsers } from '../redux/user/readUsers';
import { readPreparingSubjects } from '../redux/preparingSubject/readPreparingSubjects';
import { readStudents } from '../redux/student/readStudents';
import { readMidGrades } from '../redux/grade/readMidGrades';
import { readFinalGrades } from '../redux/grade/readFinalGrades';
import { readReFinalGrades } from '../redux/grade/readReFinalGrades';



export default function LoadingData() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [done, setDone] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      try {
         const collegeData = await dispatch(readCollege());

         if (!collegeData?.payload && !collegeData?.error) {
             navigate("/config");
             return;
          }
        

        setLoadingProgress(1);
       
        await Promise.all([
          dispatch(readDepartments()),
          dispatch(readStudents()),
          new Promise((resolve) => setTimeout(resolve, 1000)),
        ]);
        setLoadingProgress(2);

        await Promise.all([
          dispatch(readStages()),
          dispatch(readPreparingSubjects()),
          dispatch(readReFinalGrades()),
          new Promise((resolve) => setTimeout(resolve, 1000)),
        ]);
        setLoadingProgress(3);
        setDone(3);
        
         await Promise.all([
          dispatch(readSubjects()),
          dispatch(readUsers()),
          new Promise((resolve) => setTimeout(resolve, 1000)),
          
        ]);
      
        setLoadingProgress(4);
        setDone(4);
        setLoadingProgress(5);
        await Promise.all([
          dispatch(readAcademicYears()),
          new Promise((resolve) => setTimeout(resolve, 1000)),
        ]);
        
        setDone(6);
        await Promise.all([

          dispatch(readMidGrades()),
          dispatch(readFinalGrades()),
          new Promise((resolve) => setTimeout(resolve, 1000)),
        ]);
        
         navigate('/dashboard');
      } catch (error) {
        console.error('Error loading data:', error);
      }
     
    };
    
    loadData();
    
    return () => {   
      setLoadingProgress(0);
    };
  }, [dispatch, navigate]);

  const renderStatus = (step) => {
    if (loadingProgress === step) {
      return <Loader color="primary" size="14px" />;
    } else {
      return <IconCircleX size={16} color="gray" stroke={1} />;
    }
  };

  return (
    <Center>
      <Flex
        h="100vh"
        w="300px"
        gap={15}
        justify="center"
        align="flex-start"
        direction="column"
      >
        
        <Flex align="center" gap={6}>
          {done > 2? <IconCircleCheckFilled size={16} stroke={1} />: renderStatus( 1)}
          <Text c={loadingProgress === 1 ? 'primary' : 'gray'} weight={400} size="xs">
          جار تحميل  البيانات  من  الخادم
          </Text>
        </Flex>
        <Flex align="center" gap={6}>
          {done > 3? <IconCircleCheckFilled size={16}  stroke={1} />:renderStatus(3)}
          <Text c={loadingProgress === 3 ? 'primary' : 'gray'}   weight={400} size="xs">
          يتم استلام البيانات  من الخادم
          </Text>
        </Flex>
        <Flex align="center" gap={6}>
          {done > 5? <IconCircleCheckFilled size={16} stroke={1} />:renderStatus( 5)}
          <Text c={loadingProgress === 5 ? 'primary' : 'gray'}   weight={400} size="xs">
          تم معالجة البيانات الآن بنجاح
          </Text>
        </Flex>
      </Flex>
    </Center>
  );
}