import { IconUserCircle, IconSearch } from "@tabler/icons-react";
import {
  ActionIcon,
  rem,
} from "@mantine/core";
import { Spotlight, spotlight } from '@mantine/spotlight';
import { useSelector } from "react-redux";

export function Search() {
  const { studentData } = useSelector((state) => state.student);
  

  const actions = studentData.map((item) => {
    return {
      id: item.id,
      label:`${item.first_name + " " +item.middle_name + " " +item.last_name}`,
      description: item.study_type,
      onClick: () => console.log("Home"),
      leftSection: (
        <IconUserCircle style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
      ),
    };
  });

  return (
    <>
      <ActionIcon
        onClick={spotlight.open}
        variant="filled"
        radius="xs"
        aria-label="Settings"
      >
        <IconSearch style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>

      <Spotlight
        actions={actions}
        nothingFound="لا يوجد ..."
        highlightQuery
        scrollable
        searchProps={{
          leftSection: (
            <IconSearch
              style={{ width: rem(20), height: rem(20) }}
              stroke={1.5}
            />
          ),
          placeholder: "بحث ...",
        }}
      />
    </>
  );
}
