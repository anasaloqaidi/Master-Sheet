import {
    Card,
    Text,
    SimpleGrid,
    UnstyledButton,
    Group,
    useMantineTheme,
  } from '@mantine/core';
  import {
    IconReport,
    IconBook2,
    IconUserBolt,
    IconUsers,
    IconFileDigit,
    IconSection,
    IconSettings,
    IconBook,
    IconStairs,

  } from '@tabler/icons-react';
  import classes from '../theme/actionsGrid.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserRole } from '../../../public/constants/enums';
  

  
  export default function ActionsGrid() {
    const mockdata = [

    
    ];
    const theme = useMantineTheme();
    const navigate = useNavigate();
    const { authData } = useSelector((state) => state.auth);
    // Check if authData role is not DepartmentHead, then add Supervisor option
    if (authData.role === UserRole.Supervisor) {
      mockdata.push({ title: 'قسم الطلاب', icon: IconUsers, color: 'violet' , target:'student' });
      mockdata.push({ title: 'قسم الدرجات', icon: IconFileDigit, color: 'indigo', target:'grade'  });

      mockdata.push({ title: 'الأعدادات', icon: IconSettings, color: 'violet' , target:'setting' });
    }
    
    if (authData.role === UserRole.DepartmentHead) {
      mockdata.push({ title: 'قسم الطلاب', icon: IconUsers, color: 'violet' , target:'student' });
      mockdata.push({ title: 'قسم الدرجات', icon: IconFileDigit, color: 'indigo', target:'grade'  });

      mockdata.push({ title: 'تهيئة المقررات السنوية', icon: IconBook, color: 'violet' , target:'preparingSubject' });

      mockdata.push({ title: 'المشرفون', icon: IconUserBolt, color: 'green', target:'user' },);
      mockdata.push( { title: 'التقارير', icon: IconReport, color: 'teal' , target:'report' });
      mockdata.push({ title: 'الأعدادات', icon: IconSettings, color: 'violet' , target:'setting' });
}
    // Check if authData role is not Dean, then add DepartmentHead option
    if (authData.role === UserRole.Dean) {
      mockdata.push({ title: 'الاقسام الدراسية', icon: IconSection, color: 'blue', target:'department'  });
      mockdata.push({ title: 'المقررات', icon: IconBook2, color: 'pink' , target:'subject' });

      mockdata.push({ title: 'المراحل', icon: IconStairs, color: 'violet' , target:'stage' });

      mockdata.push({ title: 'المشرفون', icon: IconUserBolt, color: 'green', target:'user' },);
     /// mockdata.push( { title: 'التقارير', icon: IconReport, color: 'teal' , target:'subject' });
      mockdata.push({ title: 'الأعدادات', icon: IconSettings, color: 'violet' , target:'setting' });};

    const items = mockdata.map((item) => (
      <UnstyledButton onClick={()=>{navigate(`/dashboard?tab=${item.target}`)}} key={item.title} className={classes.item}>
        <item.icon color={theme.colors[item.color][6]} size="2rem" />
        <Text size="xs" mt={7}>
          {item.title}
        </Text>
      </UnstyledButton>
    ));
  
    return (
      <Card withBorder >
        <Group justify="space-between">
          <Text className={classes.title}>اختصارات</Text>
        </Group>
        <SimpleGrid cols={3} mt="md">
          {items}
        </SimpleGrid>
      </Card>
    );
  }