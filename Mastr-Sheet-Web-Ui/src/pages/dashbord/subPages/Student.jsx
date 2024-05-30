import {Flex} from '@mantine/core'
import { Table } from '../../../components/student/Table'
import OperationHeader from '../../../components/student/OperationHeader'

export default function Student() {
  return (
    <Flex direction="column" flex={1} mt={30}>
        <OperationHeader/>
        <Table/>
    </Flex>
  )
}
