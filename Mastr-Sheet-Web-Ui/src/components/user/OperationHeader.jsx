import { Flex } from "@mantine/core";
import Create from "./Create";
import { Search } from "./Search";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import ExportToExcel from "../ExcelExport";

export default function OperationHeader() {
  const fileName = 'Users';
  const { userData } = useSelector((state) => state.user);

  return (
    <Flex direction="row" justify="space-between">
      <Flex direction="row" justify="space-around" gap={8}>
        <Filter/>
        <Search/>
      </Flex>
      <Flex direction="row" justify="space-around" gap={8}>
        <Create/>
        <ExportToExcel apiData={userData} fileName={fileName} />
      </Flex>
    </Flex>
  );
}
