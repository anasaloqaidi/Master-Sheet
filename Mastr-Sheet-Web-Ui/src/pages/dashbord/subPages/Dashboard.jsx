import { Flex } from "@mantine/core";
import StatsGrid from "../../../components/dashboard/StatusGrid";
import ActionsGrid from "../../../components/dashboard/ActionsGrid";

export default function Dashboard() {
  return (
    <Flex direction="column" flex={1} justify="space-between" mt={30} mb="8vh" gap={20}>
        <StatsGrid/>
        <ActionsGrid/>
    </Flex>
  )
}






