import { ActionIcon, Flex } from "@mantine/core";
import {IconAdjustments , IconSearch} from "@tabler/icons-react"
import Filter from "./Filter";


export default function OperationHeader() {
  return (
    <Flex direction="row" justify="space-between">
      <Flex direction="row" justify="space-around" gap={8}>
        <Filter/>

      </Flex>
      <Flex direction="row" justify="space-around" gap={8}>
 
      </Flex>
    </Flex>
  );
}
