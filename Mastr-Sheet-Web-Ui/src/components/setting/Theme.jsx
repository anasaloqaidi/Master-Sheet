import {
  CheckIcon,
  ColorSwatch,
  Divider,
  Flex,
  rem,
} from "@mantine/core";
import ActionToggle from "../ActionToggle";
import { useLocalStorage } from "@mantine/hooks";

export default function Theme() {

    const [color, setColor, removeColor] = useLocalStorage({
        key: 'primary-color',
        defaultValue:'yellow'
      });
  return (
    <Flex direction="column"  mr={30}>
      <Divider my="md" label="النمط" labelPosition="left" />
      <Flex direction="row">
        <ActionToggle />
      </Flex>
      <Divider my="md" label="اللون الأساسي" labelPosition="left" />
      <Flex direction="row" gap={10}>

        <ColorSwatch
          component="button"
          onClick={()=>{setColor('yellow'); location.reload()}}
          color="orange"
          style={{ color: "#fff", cursor: "pointer" }}
        >
          {color == 'yellow' && <CheckIcon style={{ width: rem(12), height: rem(12) }} />}
        </ColorSwatch>

        <ColorSwatch
          component="button"
          onClick={()=>{setColor('red'); location.reload()}}
          color="red"
          style={{ color: "#fff", cursor: "pointer" }}
        >
          {color === 'red' && <CheckIcon style={{ width: rem(12), height: rem(12) }} />}
        </ColorSwatch>

        <ColorSwatch
          component="button"
          onClick={()=>{setColor('blue'); location.reload()}}
          color="rgba(58, 132, 222, 1)"
          style={{ color: "#fff", cursor: "pointer" }}
        >
          {color == 'blue' && <CheckIcon style={{ width: rem(12), height: rem(12) }} />}
        </ColorSwatch>

        <ColorSwatch
          component="button"
          onClick={()=>{setColor('green'); location.reload()}}
          color="green"
          style={{ color: "#fff", cursor: "pointer" }}
        >
          {color == 'green' && <CheckIcon style={{ width: rem(12), height: rem(12) }} />}
        </ColorSwatch>

      </Flex>
    </Flex>
  );
}
