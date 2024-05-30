import {  Flex } from "@mantine/core";
import Create from "./Create";
import CreateMany from "./CreateMany";
import { Search } from "./Search";
import ExportToExcel from "../ExcelExport";
import { useSelector } from "react-redux";

export default function OperationHeader() {
  const { subjectData } = useSelector((state) => state.subject);
  const fileName = 'Subjects';
  const data = subjectData.map(v => ({
    code: v.code,
    name_arabic: v.name_arabic,
    name_english: v.name_english
  }));
  return (
    <Flex direction="row" justify="space-between">
      <Flex direction="row" justify="space-around" gap={8}>
        <Search/>
        <ExportToExcel apiData={data} fileName={fileName} />
         
      </Flex>
      <Flex direction="row" justify="space-around" gap={8}>
        <Create/>
        <CreateMany/>
      </Flex>
    </Flex>
  );
}
