import { Center } from "@mantine/core";
import { nprogress } from "@mantine/nprogress";
import { useEffect } from "react";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  {
    /*--------------------------------------------------*/
  }
  const navigate = useNavigate();

  {
    /*--------------------------------------------------*/
  }

  useEffect(() => {

    nprogress.start();
    const timer = setTimeout( () => {
      nprogress.complete();
      navigate("/loading-data");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  {
    /*--------------------------------------------------*/
  }
  return (
    <Center style={{ height: "100vh", width: "100vw" }}>
      <Logo width={"6vw"} height={"6vw"} />
    </Center>
  );
  {
    /*--------------------------------------------------*/
  }
}
