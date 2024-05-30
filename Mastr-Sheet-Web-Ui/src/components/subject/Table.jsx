
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
import Update from "./Update";
import Delete from "./Delete";

export function Table() {
  const { subjectData, loading } = useSelector((state) => state.subject);
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
  const data = chunk(subjectData, itemsPerPage);

  // Toggle selection for a specific row


  // Prepare rows to render
  const rows = data[activePage - 1]?.map((item) => {

    return (
      <T.Tr key={item.code} >

        <T.Td>
            <Text size="sm" fontWeight={500}>
              {item.code}
            </Text>
        </T.Td>
        <T.Td>
          <Group gap="sm">
            <Text size="sm" fontWeight={500}>
              {item.name_arabic}
            </Text>
          </Group>
        </T.Td>
        <T.Td>
            <Text size="sm" fontWeight={500}>
              {item.name_english}
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
      {!loading && subjectData.length ? (
        <>
        <Flex flex={1} ref={ref} direction="column">
          <T  verticalSpacing="md" highlightOnHover>
            <T.Thead>
              <T.Tr>

                <T.Th>الرمز</T.Th>
                <T.Th>الأسم بالعربي</T.Th>
                <T.Th>الأسم بالأنجليزي</T.Th>
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
