import cx from "clsx";
import {
  IconDatabaseX,
  IconGenderMale,
  IconGenderFemale,
  IconEye,
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
  Indicator,
  ActionIcon,
} from "@mantine/core";
import { useSelector } from "react-redux";
import Update from "./Update";
import Delete from "./Delete";
import { GenderType } from "../../../public/constants/enums";
import { useNavigate } from "react-router-dom";

export function Table() {
  const navigate = useNavigate();
  const { filteredUserData, loading } = useSelector((state) => state.user);
  const { departmentData } = useSelector((state) => state.department);
  const [activePage, setActivePage] = useState(1);
  const { ref, height } = useElementSize();
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Update itemsPerPage when height changes
  useEffect(() => {
    if (height) {
      setItemsPerPage(Math.floor(height / 61) - 1);
    }
  }, [height]);

  // Chunk the filteredUserData based on itemsPerPage
  const data = chunk(filteredUserData, itemsPerPage);

  // Toggle selection for a specific row
  // Prepare rows to render
  const rows = data[activePage - 1]?.map((item) => {
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
          {
            item?.department_id
              ? departmentData.map((department) => {
                  if (department.id === item.department_id) {
                    return department.name; // Render department name if matched
                  }
                  return null; // Return null if no match
                })
              : "عام" // Render "عام" if department_id is falsy (null or undefined)
          }
        </T.Td>

        <T.Td>
          <Text size="sm" fontWeight={500}>
            {item.role}
          </Text>
        </T.Td>
        <T.Td>
          {item.is_active ? (
            <Indicator color="green" />
          ) : (
            <Indicator color="red" />
          )}
        </T.Td>
        <T.Td>
          <Group gap={0} justify="flex-start">
            <Delete item={item} />
            <Update item={item} />
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={() => {
                navigate("/dashboard?tab=user-profile", {
                  state: item,
                });
              }}
            >
              <IconEye
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </T.Td>
      </T.Tr>
    );
  });

  return (
    <>
      {!loading && filteredUserData.length ? (
        <>
          <Flex flex={1} ref={ref} direction="column">
            <T verticalSpacing="md" highlightOnHover>
              <T.Thead>
                <T.Tr>
                  <T.Th>الأسم</T.Th>
                  <T.Th>تاريخ الميلاد</T.Th>
                  <T.Th>البريد الألكتروني</T.Th>
                  <T.Th>الجنس</T.Th>
                  <T.Th>القسم</T.Th>
                  <T.Th>الصلاحيات</T.Th>
                  <T.Th>الحالة</T.Th>
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
