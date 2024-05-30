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
  Loader,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import classes from "../style/ForgotPassword.module.css";
import { hardText } from "../../public/constants/hardText";
import { isEmail, useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../redux/auth/forgetPassword";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: isEmail("البريد الاكتروني غير صالح"),
    },
  });

  const handleSubmit = async () => {
    setLoading(true);
    const data = await dispatch(forgetPassword(form.values.email));
    setLoading(false);
    if (data?.error) {
     
      notifications.show({
        color: "red",
        title: "تحذير",
        message: data.payload.message,
        autoClose: false,
      });
    } else {
      notifications.show({
        color: "primary",
        title: "تم بنجاح",
        message: "ارسلنا رابط التغيير الى بريدك الألكتروني",
        autoClose: false,
      });
      form.reset();
    }
  };

  return (
    <Center style={{ height: "100vh", width: "100vw" }}>
      <Container size={460} my={30}>
        <Title className={classes.title} ta="center">
          {hardText["forgotPassword"]["title"]}
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
          {hardText["forgotPassword"]["subtitle"]}
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label={hardText["forgotPassword"]["email"]}
            placeholder="anasaloqaidi@gmail.dev"
            {...form.getInputProps("email")}
          />
          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Button type="submit" className={classes.control} disabled={loading}>
            {loading ? (
                <Loader size="sm" type="bars" />
              ) : (
                <>{hardText["forgotPassword"]["reset"]}</>
              )}
         
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
