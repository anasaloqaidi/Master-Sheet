import {Flex} from '@mantine/core'
import { Table } from '../../../components/preparingSubject/Table'
import OperationHeader from '../../../components/preparingSubject/OperationHeader'


export default function PreparingSubject() {
  return (
    <Flex direction="column" flex={1} mt={30}>
        <OperationHeader/>
        <Table/>
    </Flex>
  )
}
