import { Flex } from "@mantine/core";
import Create from "./Create";
import CreateMany from "./CreateMany";
import { Search } from "./Search";

export default function OperationHeader() {
  const fileName = 'my_data';
  const data = [
    { id: 0, name: '', price: 0, category: '' },

  ];
  
  return (
    <Flex direction="row" justify="space-between">
      <Flex direction="row" justify="space-around" gap={8}>



        <Search/>
      </Flex>
      <Flex direction="row" justify="space-around" gap={8}>
        <Create/>
        <CreateMany/>
      </Flex>
    </Flex>
  );
}
