import {
  Anchor,
  Button,
  Center,
  Checkbox,
  Container,
  Group,
  Loader,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { hardText } from "../../public/constants/hardText";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { notifications } from "@mantine/notifications";
import { signInAuth } from "../redux/auth/signInAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SignIn() {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keep, setKeep] = useState(false);

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    const authDatas = sessionStorage.getItem("auth");
    authData || authDatas ? navigate("/loading-data") : null;
  }, []);

  const handleSubmit = async() => {

    const data = await dispatch(signInAuth(form.values));

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
        title: "تم التسجيل بنجاح",
        autoClose: true,
      });
      console.log(data)
      keep
        ? localStorage.setItem("auth", JSON.stringify(data?.payload))
        : sessionStorage.setItem("auth", JSON.stringify(data?.payload));
        navigate("/loading-data")
      form.reset();
    }
  };

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      password: hasLength({ min: 4 }, "كلمة المرور ليست اقل من 8 احرف"),
      email: isEmail("البريد الاكتروني غير صالح"),
    },
  });

  return (
    <Center h={"100vh"} width={"100vw"}>
      <Container w="450px">
        <Title ta="center">{hardText["signin"]["title"]}</Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label={hardText["signin"]["email"]}
              placeholder="user@domin"
              withAsterisk
              {...form.getInputProps("email")}
            />

            <PasswordInput
              label={hardText["signin"]["password"]}
              placeholder="*******"
              mt="md"
              withAsterisk
              {...form.getInputProps("password")}
            />

            <Group justify="space-between" mt="lg">
              <Checkbox
                label={hardText["signin"]["remember"]}
                checked={keep}
                onChange={(event) => {
                  setKeep(event.currentTarget.checked);
                }}
              />

              <Anchor
                onClick={() => {
                  navigate("/forgot-password");
                }}
                component="button"
                size="sm"
              >
                {hardText["signin"]["forgot"]}
              </Anchor>
            </Group>

            <Button fullWidth type="submit" mt="xl" disabled={loading}>
              {loading ? (
                <Loader size="sm" type="bars" />
              ) : (
                <>{hardText["signin"]["login"]}</>
              )}
            </Button>
          </form>
        </Paper>
      </Container>
    </Center>
  );
}
