import { ActionIcon, Flex } from "@mantine/core";
import {IconAdjustments , IconSearch} from "@tabler/icons-react"
import Create from "./Create";
import CreateMany from "./CreateMany";
import { Search } from "./Search";
import Filter from "./Filter";

export default function OperationHeader() {
  return (
    <Flex direction="row" justify="space-between">
      <Flex direction="row" justify="space-around" gap={8}>
        <Filter/>
        <Search/>
      </Flex>
      <Flex direction="row" justify="space-around" gap={8}>
        <Create/>
        <CreateMany/>
      </Flex>
    </Flex>
  );
}
