import { IconBook2, IconCalendar, IconSection, IconUserBolt, IconUsers , IconStairs , IconSettings, IconFileSpreadsheet, IconReport} from "@tabler/icons-react";
import { IconGauge } from "@tabler/icons-react";

export const Path = {
    dash:{
        arabic:"لوحة التحكم",
        english:"dashbord",
        icon:<IconGauge/>
    },
    student:{
        arabic:"قسم الطلاب",
        english:"student",
        icon:<IconUsers/>
    },
    department:{
        arabic:"الأقسام",
        english:"department",
        icon:<IconSection/>
    },
    subject:{
        arabic:"المقررات",
        english:"subjects",
        icon:<IconBook2/>
    },
    preparingSubject:{
        arabic:"تهيئة المقررات الدراسية",
        english:"subjects",
        icon:<IconBook2/>
    },
    academicYear:{
        arabic:"السنة الدراسية",
        english:"academicYear",
        icon:<IconCalendar/>
    },
    user:{
        arabic:"المستخدمين",
        english:"user",
        icon:<IconUserBolt/>
    },
    'user-profile':{
        arabic:"مستخدم",
        english:"user",
        icon:<IconUserBolt/>
    },
    stage:{
        arabic:"المراحل",
        english:"stage",
        icon:<IconStairs/>
    },
    setting:{
        arabic:"الأعدادات",
        english:"setting",
        icon:<IconSettings/>
    },
    grade:{
        arabic:"الدرجات",
        english:"grade",
        icon:<IconFileSpreadsheet/>
    },

    report:{
        arabic:"تقارير",
        english:"grade",
        icon:<IconReport/>
    },
}