import cx from "clsx";
import { IconDatabaseX } from "@tabler/icons-react";
import { useElementSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import {
  Table as T,
  Checkbox,
  Group,
  Text,
  rem,
  Loader,
  Center,
  Pagination,
  Flex,
} from "@mantine/core";
import { useSelector } from "react-redux";
import Update from "./Update";
import Delete from "./Delete";

export function Table() {
  const { stageData, loading } = useSelector((state) => state.stage);
  const { collegeData } = useSelector((state) => state.college);
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
  const data = chunk(stageData, itemsPerPage);



  // Prepare rows to render
  const rows = data[activePage - 1]?.map((item) => {

    return (
      <T.Tr key={item.id} >

        <T.Td>
          <Group gap="sm">
            <Text size="sm" fontWeight={500}>
              {item.name}
            </Text>
          </Group>
        </T.Td>
        <T.Td>
            <Text size="sm" fontWeight={500}>
              {item.order}
            </Text>
        </T.Td>
        <T.Td>{collegeData[0]?.name}</T.Td>
        <T.Td>
          <Group gap={0} justify="flex-start">
            <Delete item={item} />
            <Update item={item} />
          </Group>
        </T.Td>
      </T.Tr>
    );
  });

  return (
    <>
      {!loading && stageData.length ? (
        <>
        <Flex flex={1} ref={ref} direction="column">
          <T  verticalSpacing="md" highlightOnHover>
            <T.Thead>
              <T.Tr>
                
                <T.Th>الأسم</T.Th>
                <T.Th>الترتيب</T.Th>
                <T.Th>الكلية</T.Th>
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
