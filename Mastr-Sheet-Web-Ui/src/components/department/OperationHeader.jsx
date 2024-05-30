import { Flex } from "@mantine/core";
import Create from "./Create";
import CreateMany from "./CreateMany";

export default function OperationHeader() {
  return (
    <Flex direction="row" justify="space-between">
      <Flex direction="row" justify="space-around" gap={8}>

      </Flex>
      <Flex direction="row" justify="space-around" gap={8}>
        <Create/>
        <CreateMany/>
      </Flex>
    </Flex>
  );
}
