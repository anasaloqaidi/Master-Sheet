import { Avatar, Button, Center, Flex, Indicator, Paper, Stack, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Delete from "./Delete";
import Update from "./Update";
import { GenderType } from "../../../public/constants/enums";
import { IconGenderFemale, IconGenderMale } from "@tabler/icons-react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { state } = useLocation();
  const { authData } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.user);
  const [user, setUser] = useState(state);

  useEffect(() => {
    
    setUser(userData?.find((v)=>{

      if(v.id === state?.id){

        return v
      }

    })||authData);
  }, [userData,state]);
  return (
    <Center flex={1}>
      <Flex
        
          gap={15}
          justify="start"
          align="start"
          direction="row"
        >
      <Paper shadow="xs" withBorder radius="xs" p="xl">
        <Flex
          
          gap={15}
          justify="start"
          align="start"
          direction="row"
        >
          <Indicator color={user?.is_active ?"primary":"gray"} size={13} withBorder processing={user?.is_active}>
            <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
              size={94}
              radius="md"
            />
          </Indicator>
          <Flex
          
          gap={4}
          justify="start"
          align="start"
          direction="column"
        >
          <Text size="15px" fw={500} c="primary">
            {user?.first_name +
              " " +
              user?.middle_name +
              " " +
              user?.last_name}
          </Text>
          <Text c="dimmed" size="xs">{ user?.email}</Text>
          <Text c="dimmed" size="xs">{ user?.role}</Text>
          <Flex
          
          gap={20}
          justify="start"
          align="start"
          direction="row"
        >
          <Text c="dimmed" size="xs">{ user?.birthday}</Text>
          {user?.gender === GenderType.Male ? (
            <IconGenderMale size='15px' />
          ) : (
            <IconGenderFemale size='15px'/>
          )}
          
          </Flex>

        </Flex>
        </Flex>
      </Paper>
      
      <Flex
          
          gap={4}
          justify="center"
          align="center"
          direction="column"
        >
          {authData.id!==state?.id?<Delete item={user}/>:null}
          <Update item={user}/>
        </Flex>
     
      
      </Flex>
    </Center>
  );
}
