import {Flex} from '@mantine/core'
import { Table } from '../../../components/stage/Table'
import OperationHeader from '../../../components/stage/OperationHeader'


export default function Stage() {
  return (
    <Flex direction="column" flex={1} mt={30}>
        <OperationHeader/>
        <Table/>
    </Flex>
  )
}
