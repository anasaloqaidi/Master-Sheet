import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
  PasswordInput,
} from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import classes from "../style/ForgotPassword.module.css";
import { hardText } from "../../public/constants/hardText";
import { hasLength, useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { restPassword } from "../redux/auth/restPassword";

export function RestPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('token');
    if (tabFromUrl) {
      setToken(tabFromUrl);
    }
  }, [ ]);
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      password: "",
    },
    validate: {
      password: hasLength({ min: 4 }, "كلمة المرور ليست اقل من 8 احرف"),
    },
  });

  const handleSubmit = async () => {

    const data = await dispatch(restPassword({password:form.values.password, token:token}));

    if (data?.error) {
     
      notifications.show({
        color: "red",
        title: "تحذير",
        message: data.payload.message,
        autoClose: true,
      });
    } else {
      notifications.show({
        
        color: "primary",
        title: "تم بنجاح",
        message: "تم تغيير كلمة المرور",
        autoClose: true,
      });
      form.reset();
      navigate('/signin')
    }
  };

  return (
    <Center style={{ height: "100vh", width: "100vw" }}>
      <Container size={460} my={30}>
        <Title className={classes.title} ta="center">
         تحديث كلمة المرور
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
         ادخل كلمة المرور الجديدة
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form onSubmit={form.onSubmit(handleSubmit)}>
        <PasswordInput
              label={hardText["signin"]["password"]}
              placeholder="*******"
              mt="md"
              withAsterisk
              {...form.getInputProps("password")}
            />
          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Button type="submit" className={classes.control}>
              {hardText["forgotPassword"]["reset"]}
            </Button>
            <Anchor onClick={()=>{navigate('/signin')}} c="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <Box ml={5}> {hardText["forgotPassword"]["back"]}</Box>
                <IconArrowLeft
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </Center>
            </Anchor>
          </Group></form>
        </Paper>
      </Container>
    </Center>
  );
}
