import { Margin, Resolution, usePDF } from 'react-to-pdf';

import { IconDatabaseX } from "@tabler/icons-react";
import { useElementSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import {
  Table as T,
  Group,
  Text,
  Loader,
  Center,
  Pagination,
  Flex,
} from "@mantine/core";
import { useSelector } from "react-redux";
import Delete from "./Delete";






export function Table() {


  const { preparingSubjectData, loading } = useSelector((state) => state.preparingSubject);
  const { subjectData } = useSelector((state) => state.subject);
  const { stageData } = useSelector((state) => state.stage);

  const [activePage, setActivePage] = useState(1);
  const { ref, height } = useElementSize();
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Update itemsPerPage when height changes
  useEffect(() => {
    
    if (height) {
      setItemsPerPage(Math.floor(height / 61) - 1);
    }
  }, [height]);

  // Chunk the departmentData based on itemsPerPage
  const data = chunk(preparingSubjectData, itemsPerPage);



  // Prepare rows to render
  const rows = preparingSubjectData?.map((item) => {
 
    return (
      <T.Tr key={item.subject_code} >

        <T.Td>
          <Text size="sm" fontWeight={500}>
              {subjectData.find((subject)=>{
                if(subject.code==item.subject_code){
              
                  return subject
                }
    
              }).name_arabic}
          </Text>
        </T.Td>
        <T.Td>
          <Text size="sm" fontWeight={500}>
              {stageData.map((stage)=>{
                if(stage.id==item.stage_id){
                  return stage.name
                }
                return null
              })}
          </Text>
        </T.Td>
        <T.Td>
          <Text size="sm" fontWeight={500}>
              {item.semester}
          </Text>
        </T.Td>
        <T.Td>
          <Text size="sm" fontWeight={500}>
              {item.subject_weight}
          </Text>
        </T.Td>
        <T.Td>
          <Text size="sm" fontWeight={500}>
              {item.limit_of_mid}
          </Text>
        </T.Td>
        <T.Td>
          <Text size="sm" fontWeight={500}>
              {item.limit_of_final}
          </Text>
        </T.Td>
        <T.Td>
          <Group gap={0} justify="flex-start">
            <Delete item={item} />
          </Group>
        </T.Td>
      </T.Tr>
    );
  });

  return (
    <>

      {!loading && preparingSubjectData.length ? (
        <>
        <Flex flex={1} direction="column">
          <T  verticalSpacing="md" >
            <T.Thead>
              <T.Tr>
                <T.Th>أسم المادة</T.Th>
                <T.Th>المرحلة</T.Th>
                <T.Th>الفصل</T.Th>
                <T.Th>وزن المادة</T.Th>
                <T.Th>حد درجة المد</T.Th>
                <T.Th>حد درجة النهائي</T.Th>
                <T.Th>:::</T.Th>
              </T.Tr>
            </T.Thead>
            <T.Tbody>{rows}</T.Tbody>
          </T>

        </Flex>
          <Flex justify="flex-end">
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

// Function to chunk array into smaller arrays of given size
function chunk(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}
