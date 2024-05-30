import cx from "clsx";
import {
  IconDatabaseX,
  IconGenderMale,
  IconGenderFemale,
} from "@tabler/icons-react";
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
  Avatar,
  ScrollArea,
} from "@mantine/core";
import { useSelector } from "react-redux";
import Update from "./Update";
import Delete from "./Delete";
import { GenderType } from "../../../public/constants/enums";

export function Table() {
  const { filteredStudentData, studentData, loading } = useSelector((state) => state.student);
  const { academicYearData } = useSelector((state) => state.academicYear);
  const [selection, setSelection] = useState([]);
  const [activePage, setActivePage] = useState(1);

  const { ref, height } = useElementSize();
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Update itemsPerPage when height changes
  useEffect(() => {
    if (height) {
      setItemsPerPage(Math.floor(height / 60) - 3);

    }
  }, [height, filteredStudentData, itemsPerPage]);

  const data = chunk(filteredStudentData, itemsPerPage);
  // Toggle selection for a specific row
  const toggleRow = (id) => {
    setSelection((currentSelection) =>
      currentSelection.includes(id)
        ? currentSelection.filter((item) => item !== id)
        : [...currentSelection, id]
    );
  };

  // Toggle selection for all rows
  const toggleAll = () => {
    setSelection((currentSelection) =>
      currentSelection.length === filteredStudentData?.length
        ? []
        : filteredStudentData?.map((item) => item.id)
    );
  };

  // Prepare rows to render
  const rows = data[activePage - 1]?.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <T.Tr key={item.id} className={cx({ primary: selected })}>
        <T.Td>
          <Checkbox checked={selected} onChange={() => toggleRow(item.id)} />
        </T.Td>
        <T.Td>
          <Group gap="sm">
            <Avatar radius="xl" />
            <Text size="sm" fontWeight={500}>
              {item.first_name + " " + item.middle_name + " " + item.last_name}
            </Text>
          </Group>
        </T.Td>
        <T.Td>
          <Text size="sm" fontWeight={500}>
            {item.birthday}
          </Text>
        </T.Td>
        <T.Td>
          <Text size="sm" fontWeight={500}>
            {item.email}
          </Text>
        </T.Td>
        <T.Td>
          {item.gender === GenderType.Male ? (
            <IconGenderMale />
          ) : (
            <IconGenderFemale />
          )}
        </T.Td>
        <T.Td>
          <Text size="sm" fontWeight={500}>
            {academicYearData.find((year) => year.id === item.enrollment_year_id)?.name}
          </Text>
        </T.Td>
        <T.Td>
          <Text size="sm" fontWeight={500}>
            {item.study_type}
          </Text>
        </T.Td>
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
      {!loading && filteredStudentData?.length ? (
        <>
          <Flex flex={1} ref={ref} direction="column">
            <ScrollArea style={{ flex: 1 }}>
            <T.ScrollContainer minWidth="1000px">
              <T verticalSpacing="md" highlightOnHover >
                <T.Thead>
                  <T.Tr>
                    <T.Th style={{ width: rem(40) }}>
                      <Checkbox
                        onChange={toggleAll}
                        checked={selection.length === filteredStudentData?.length}
                        indeterminate={
                          selection.length > 0 &&
                          selection.length !== filteredStudentData?.length
                        }
                      />
                    </T.Th>
                    <T.Th>الأسم</T.Th>
                    <T.Th>تاريخ الميلاد</T.Th>
                    <T.Th>البريد الألكتروني</T.Th>
                    <T.Th>الجنس</T.Th>
                    <T.Th>سنة التسجيل</T.Th>
                    <T.Th>نوع الدراسة</T.Th>
                    <T.Th>:::</T.Th>
                  </T.Tr>
                </T.Thead>
                <T.Tbody>{rows}</T.Tbody>
              </T>
              </T.ScrollContainer>
            </ScrollArea>
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
  for (let i = 0; i < array?.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}
