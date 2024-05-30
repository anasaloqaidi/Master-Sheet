import { ActionIcon, Flex } from "@mantine/core";
import {IconAdjustments} from "@tabler/icons-react"
import Create from "./Create";


export default function OperationHeader() {
  return (
    <Flex direction="row" justify="space-between">
      <Flex direction="row" justify="space-around" gap={8}>
        <ActionIcon variant="filled" radius="xs" aria-label="Settings">
          <IconAdjustments
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>

      </Flex>
      <Flex direction="row" justify="space-around" gap={8}>
        <Create/>
      </Flex>
    </Flex>
  );
}
