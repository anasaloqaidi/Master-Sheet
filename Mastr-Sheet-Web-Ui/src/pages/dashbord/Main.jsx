import { Flex, ScrollArea, Text } from "@mantine/core";
import SideBar from "../../components/sidebar/SideBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Dashboard from "./subPages/Dashboard";
import Department from "./subPages/Department";
import Subject from "./subPages/Subject";
import Stage from "./subPages/Stage";
import AcademicYear from "./subPages/AcademicYear";
import User from "./subPages/User";
import Setting from "./subPages/Setting";
import Student from "./subPages/Student";
import PreparingSubject from "./subPages/PreparingSubject";
import Profile from "../../components/user/Profile";
import Grade from "./subPages/Grade";
import Reports from "./subPages/Reports";


export default function Main() {
  const location = useLocation();
  const [tab, setTab] = useState("dash");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search ]);
  return (
    <Flex h="100vh" w="100vw" direction="row">
      <SideBar />

      <Flex h="100vh" flex={1} direction="column" px={20}>
        <Header />
        {/* Dashbord... */}
        {tab === "dash" && <Dashboard />}
        {tab === "" && <Dashboard />}
        {/* Student... */}
        {tab === "student" && <Student />}
        {/* Student... */}
        {tab === "grade" && <Grade />}
        {/* Student... */}
        {tab === "preparingSubject" && <PreparingSubject />}
        {/* Student... */}
        {tab === "department" && <Department />}
        {/* Student... */}
        {tab === "subject" && <Subject />}
        {/* Student... */}
        {tab === "academicYear" && <AcademicYear />}
        {/* Student... */}
        {tab === "user" && <User />}
        {/* Student... */}
        {tab === "user-profile" && <Profile />}
        {/* Student... */}
        {tab === "stage" && <Stage />}
        {/* Student... */}
        {tab === "setting" && <Setting />}
        {/* Student... */}
        {tab === "report" && <Reports />}
      </Flex>
    </Flex>
  );
}
