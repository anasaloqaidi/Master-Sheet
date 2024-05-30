import { Group, Code, ScrollArea, Image, Title, Stack, Divider} from '@mantine/core';
import {
  IconGauge,
  IconUsers,
  IconFileSpreadsheet,
  IconBook,
  IconSection,
  IconUserBolt,
  IconReport,
  IconSettings,
  IconCalendarMonth,
  IconBook2,
  IconStairs
} from '@tabler/icons-react';
import  {UserButton}  from './UserButton';
import  LinksGroup  from './LinksGroup';
import classes from '../theme/sidebar.module.css';
import Logo from '../Logo';
import { useSelector } from 'react-redux';
import { UserRole } from '../../../public/constants/enums';


export default function SideBar() {
  const mockdata = [
 
  ];
  const { authData } = useSelector((state) => state.auth);
    // Check if authData role is not DepartmentHead, then add Supervisor option
    if (authData.role === UserRole.Supervisor ) {
      mockdata.push({ label: 'لوحة التحكم', icon: IconGauge, link: '/dashboard?tab=dash'});
      mockdata.push(  {
        label: 'قسم الطلاب',
        icon: IconUsers,
        link: '/dashboard?tab=student',
        tab: 'student'
      });

      mockdata.push(   {
        label: 'قسم الدرجات',
        icon: IconFileSpreadsheet,
        link: '/dashboard?tab=grade',
        tab: 'grade'
      });

      mockdata.push(  {
        label: 'الأعدادت', icon: IconSettings,    link: '/dashboard?tab=setting',  tab: 'setting'});


    }
    if (authData.role === UserRole.DepartmentHead) {
      mockdata.push({ label: 'لوحة التحكم', icon: IconGauge, link: '/dashboard?tab=dash', tab: 'dash'});
      mockdata.push(  {
        label: 'قسم الطلاب',
        icon: IconUsers,
        link: '/dashboard?tab=student',
        tab: 'student'
      });

      mockdata.push(   {
        label: 'قسم الدرجات',
        icon: IconFileSpreadsheet,
        link: '/dashboard?tab=grade',
        tab: 'grade'
      });

      mockdata.push({ label: 'تهيئة المقررات السنوية', icon: IconBook ,    link: '/dashboard?tab=preparingSubject',  tab: 'preparingSubject'});
      mockdata.push( { label: 'المستخدمين', icon: IconUserBolt ,    link: '/dashboard?tab=user',  tab: 'user'});
      mockdata.push(  {
        label: 'تقارير',
        icon: IconReport,
        link: '/dashboard?tab=report',
        tab: 'report'
      });
      mockdata.push({ label: 'الأعدادت', icon: IconSettings,    link: '/dashboard?tab=setting',  tab: 'setting'});
    }
    

    if (authData.role === UserRole.Dean) {
      mockdata.push({ label: 'لوحة التحكم', icon: IconGauge, link: '/dashboard?tab=dash',  tab: 'dash'});
   
    
    // Always add Dean option regardless of the authData role
    mockdata.push({ label: 'الأقسام', icon: IconSection ,   link: '/dashboard?tab=department',  tab: 'department'}); 
    mockdata.push( { label: 'المستخدمين', icon: IconUserBolt ,    link: '/dashboard?tab=user',  tab: 'user'});
    // mockdata.push({
    //   label: 'تقارير',
    //   icon: IconReport,
    //   link: '/dashboard?tab=student',
    // });
    mockdata.push( {
      label: 'السنة الدراسية',
      icon: IconCalendarMonth,
      link: '/dashboard?tab=academicYear',
      tab: 'academicYear'
    });
    mockdata.push( {
      label: 'المقررات',
      icon: IconBook2,
      link: '/dashboard?tab=subject',
      tab: 'subject'
    });
    mockdata.push(  {
      label: 'المراحل',
      icon: IconStairs,
      link: '/dashboard?tab=stage',
      tab: 'stage'
    });
    mockdata.push({
      label: 'الأعدادت', icon: IconSettings,    link: '/dashboard?tab=setting',  tab: 'setting'},);}

  const links = mockdata.map((item) =><Stack key={item.label} >{item.admin && <Divider my="xs" label={item.admin} mr={14} labelPosition="left" />} <LinksGroup {...item} /></Stack>);

  return (
    // eslint-disable-next-line react/prop-types
    <nav className={classes.navbar} style={{height:'100vh'}} >
      <div className={classes.header}>
        <Group justify="space-between">
            <Group>
            <Logo height={38} width={38}/>
            <Title order={5} >اللجنة الأمتحانية</Title>
            </Group>
            <Code fw={700}>v1.0.0</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
}
