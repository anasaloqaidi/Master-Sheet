import {Flex} from '@mantine/core';
import { Table } from '../../../components/subject/Table';
import OperationHeader from '../../../components/subject/OperationHeader';


export default function Subject() {
  return (
    <Flex direction="column" flex={1} mt={30}>
        <OperationHeader/>
        <Table/>
    </Flex>
  )
}
