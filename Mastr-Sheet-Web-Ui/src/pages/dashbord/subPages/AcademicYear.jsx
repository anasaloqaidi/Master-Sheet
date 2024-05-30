import {Flex} from '@mantine/core'
import { Table } from '../../../components/academicYear/Table'
import OperationHeader from '../../../components/academicYear/OperationHeader'


export default function AcademicYear() {
  return (
    <Flex direction="column" flex={1} mt={30}>
        <OperationHeader/>
        <Table/>
    </Flex>
  )
}
