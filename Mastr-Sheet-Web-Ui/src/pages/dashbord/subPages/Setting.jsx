import { Divider, Flex, ScrollArea, Title } from "@mantine/core";
import React from "react";
import General from "../../../components/setting/General";
import Theme from "../../../components/setting/Theme";
import Account from "../../../components/setting/Account";

export default function Setting() {
  return (
  <ScrollArea flex={1}>
    <Flex  gap="md" direction="column" m={10} mt={30}>
     
    
      <Title order={6}>عام</Title>
      <General/>
      <Divider my="md" />
      <Title order={6} >سمات</Title>
      <Theme/>
      <Divider my="md" />
      <Title order={6} >الحساب</Title>
      <Account/>

      
    </Flex></ScrollArea>
  );
}
