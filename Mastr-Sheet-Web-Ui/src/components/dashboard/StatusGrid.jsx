import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
import {
  IconUsers,
  IconCalendarMonth,
  IconSection,
  IconBook2,
} from '@tabler/icons-react';
import classes from '../theme/statusGrid.module.css';
import { useSelector } from 'react-redux';

const icons = {
  AllStudent: IconUsers,
  academicYear: IconCalendarMonth,
  Department: IconSection,
  Books: IconBook2,
};


export default function StatsGrid() {
  const { studentData } = useSelector((state) => state.student);
  const { academicYearData } = useSelector((state) => state.academicYear);
  const { departmentData } = useSelector((state) => state.department);
  const { subjectData } = useSelector((state) => state.subject);

  const data = [
    { title: 'الطلاب', icon: 'AllStudent', value: String(studentData.length) },
    { title: 'السنوات الدراسية', icon: 'academicYear', value: String(academicYearData.length), },
    { title: 'الاقسام', icon: 'Department', value: String(departmentData.length) },
    { title: 'المقررات', icon: 'Books', value: String(subjectData.length)},
  ];
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];


    return (
      <Paper withBorder p="md" bg="primary" key={stat.title}>
        <Group justify="space-between">
          <Text size="xs" c="white" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
        </Group>

      </Paper>
    );
  });
  return (

      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
  );
}