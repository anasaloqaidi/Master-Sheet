import {Flex} from '@mantine/core'
import { Table } from '../../../components/department/Table'
import OperationHeader from '../../../components/department/OperationHeader'

export default function Department() {
  return (
    <Flex direction="column" flex={1} mt={30}>
        <OperationHeader/>
        <Table/>
    </Flex>
  )
}
