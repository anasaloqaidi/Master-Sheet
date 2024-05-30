import { IconBook2, IconSearch } from "@tabler/icons-react";
import {
  ActionIcon,
  rem,
} from "@mantine/core";
import { Spotlight, spotlight } from '@mantine/spotlight';
import { useSelector } from "react-redux";

export function Search() {
  const { subjectData } = useSelector((state) => state.subject);

  const actions = subjectData.map((item) => {
    return {
      id: item.code,
      label: item.name_arabic,
      onClick: () => console.log("Home"),
      leftSection: (
        <IconBook2 style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
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
          placeholder: "بحث...",
        }}
      />
    </>
  );
}
