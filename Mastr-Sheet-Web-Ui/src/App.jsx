import "@mantine/core/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/notifications/styles.css";
import '@mantine/spotlight/styles.css';
import '@mantine/dates/styles.css';
import {
  DirectionProvider,
  MantineProvider,
  createTheme,
  virtualColor,
} from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Splash from "./pages/Splash";
import { NavigationProgress } from "@mantine/nprogress";
import { readLocalStorageValue } from "@mantine/hooks";
import SignIn from "./pages/SignIn";
import { ForgotPassword } from "./pages/ForgotPassword";
import Config from "./pages/Config";
import { Notifications } from "@mantine/notifications";
import Private from "./pages/Private";
import LoadingData from "./pages/LoadingData";
import Main from "./pages/dashbord/Main";
import { ModalsProvider } from '@mantine/modals';
import { RestPassword } from "./pages/RestPassword";

function createThemeWithColor(color) {
  return createTheme({
    fontFamily: "ChangaRegular",
    primaryColor: color || "yellow",
    colors: {
      primary: virtualColor({
        name: "primary",
        dark: color || "yellow",
        light: color || "yellow",
      }),
    },
  });
}

export default function App() {
  const color = readLocalStorageValue({ key: "primary-color" });
  return (
    <DirectionProvider direction="rtl">
      <MantineProvider
        theme={createThemeWithColor(color)}
        defaultColorScheme="dark"
      > 
      <ModalsProvider>
        <Notifications />
        <NavigationProgress />
       
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Splash />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/rest-password" element={<RestPassword />} />
              
              <Route element={<Private />}>  
              <Route path="/loading-data" element={<LoadingData />} />
                <Route path="/config" element={<Config />} />
                <Route path="/dashboard" element={<Main />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ModalsProvider>
      </MantineProvider>
    </DirectionProvider>
  );
}
