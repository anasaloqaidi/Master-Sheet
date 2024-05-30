import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import classes from '../theme/userButton.module.css';
import { useSelector } from 'react-redux';

export function UserButton() {
 
  const { authData } = useSelector((state) => state.auth);
  const { departmentData } = useSelector((state) => state.department);
  const { collegeData } = useSelector((state) => state.college);
  return (
    <UnstyledButton className={classes.user} p={16}>
      <Group>


        <div style={{ flex: 1 }}>
          <Text size="sm" ta={'center'} fw={500}>
            {authData.department_id!==null?`قسم ${departmentData.find((v)=>v.id=== authData.department_id).name}`:collegeData[0].name}
          </Text>
        </div>


      </Group>
    </UnstyledButton>
  );
}