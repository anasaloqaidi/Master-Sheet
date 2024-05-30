import {Flex} from '@mantine/core'
//import { Table } from '../../../components/department/Table'
import OperationHeader from '../../../components/grade/OperationHeader'
import Table from '../../../components/grade/Table'

export default function Grade() {
  return (
    <Flex direction="column" flex={1} mt={30}>
        <OperationHeader/>
       <Table/>
    </Flex>
  )
}
// <Table/>