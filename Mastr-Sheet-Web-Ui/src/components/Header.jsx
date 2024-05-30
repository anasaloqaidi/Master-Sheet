import { Avatar, Flex, Title } from "@mantine/core";
import ActionToggle from "./ActionToggle";
import { IconSettings } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Path } from "../../public/constants/Path";
import { useSelector } from "react-redux";

export default function Header() {
  const { authData } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <Flex
      w={"100%"}
      mih={70}
      gap="lg"
      justify="flex-end"
      align="center"
      direction="row"
      wrap="wrap"
    >
      <Flex flex={1}>
        {Path[tab || "dash"]["icon"]}
        <Title mr={8} order={5}>
          {Path[tab || "dash"]["arabic"]}
        </Title>
      </Flex>
      <ActionToggle />
      <IconSettings
        onClick={() => {
          navigate("/dashboard?tab=setting");
        }}
        cursor="pointer"
      />
      <Avatar
        style={{ cursor: "pointer" }}
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
        alt="it's me"
        onClick={() => {
          navigate("/dashboard?tab=user-profile", {
            state: authData,
          });
        }}
      />
    </Flex>
  );
}
