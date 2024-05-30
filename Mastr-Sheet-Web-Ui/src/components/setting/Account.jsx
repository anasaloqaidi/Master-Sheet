import { ActionIcon, Divider, Flex, rem } from "@mantine/core";
import { IconArrowBarLeft } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { signOutAuth } from "../../redux/auth/signOutAuth";
import { useNavigate } from "react-router-dom";

export default function Account() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   
  return (
    <Flex direction="column"  mr={30}>
      <Divider my="md" label="تسجيل الخروج" labelPosition="left" />
      <Flex direction="row">
        <ActionIcon
          onClick={()=>{
            try{
                localStorage.removeItem('auth');
                localStorage.removeItem('persist:root');
                sessionStorage.removeItem('auth');
                dispatch(signOutAuth());
                navigate("/signin");
            }catch(e){
                console.log(e);
            }
          }}
          size={42}
          variant="outline"
          color="red"
          aria-label="ActionIcon with size as a number"
        >
          <IconArrowBarLeft style={{ width: rem(24), height: rem(24) }} />
        </ActionIcon>
      </Flex>
    </Flex>
  );
}
