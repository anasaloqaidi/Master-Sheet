import {Flex} from '@mantine/core'
import { Table } from '../../../components/user/Table'
import OperationHeader from '../../../components/user/OperationHeader'

export default function User() {
  return (
    <Flex direction="column" flex={1} mt={30}>
        <OperationHeader/>
        <Table/>
    </Flex>
  )
}
