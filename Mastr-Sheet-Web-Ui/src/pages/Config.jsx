import {
  Box,
  Button,
  Center,
  Code,
  Flex,
  NumberInput,
  Paper,
  Stepper,
  Text,
  TextInput,
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import classes from "../style/Config.module.css";
import { useNavigate } from "react-router-dom";

export default function Config() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  const isActive = (index) => {
    if (index === 2) {
      navigate("/loading-data");
    } else {
      setActive(index);
    }
  };

  return (
    <Center style={{ height: "100vh", width: "100vw" }}>
      <Stepper
        active={active}
        w={800}
        classNames={{
          stepWrapper: classes.stepWrapper,
          stepDescription: classes.stepDescription,
          stepLabel: classes.stepLabel,
        }}
      >
        <Stepper.Step label="الخطوة الأولى" description="الكلية">
          <Paper withBorder>
            <CollgeStep isActive={isActive} />
          </Paper>
        </Stepper.Step>

        <Stepper.Step label="الخطوة الثانية" description="ترحيب">
          <Paper withBorder h={400} w={800}>
            <Center h={340}>
              <Text>تهانينا ("</Text>
            </Center>
            <Button m={10} onClick={()=>{isActive(2)}}>
              تم
            </Button>
          </Paper>
        </Stepper.Step>
      </Stepper>
    </Center>
  );
}

import { createCollege } from "../redux/college/createCollege";

function CollgeStep({ isActive }) {
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    
    if (form.isValid("name")) {
    const data = dispatch(createCollege(form.values));
      if (!data?.error) {
        isActive(1);
      }
    } else form.validate();
  };
  const form = useForm({
    initialValues: {
      name: "",
      success_grade: 50,
      is_configure: true,
    },
    validate: {
      name: hasLength({ min: 1 }, "الأسم فارغ"),
    },
  });

  return (
    <>
      <Flex m={20} mb={0} justify="center" gap={50} mx="auto" h={360} w={760}>
        <Box>
          <TextInput
            label="أسم الكلية"
            placeholder="علوم الحاسوب ..."
            {...form.getInputProps("name")}
          />
          <NumberInput
            label="درجة النجاح"
            placeholder="0 الى 100"
            mt={30}
            min={0}
            max={100}
            {...form.getInputProps("success_grade")}
          />
        </Box>
        <Box flex={1}>
          <Code block fz={15} h={300} pt={40}>
            {`college : ${JSON.stringify(form.values, null, 3)}`}
          </Code>
        </Box>
      </Flex>
      <Button m={10} onClick={handleSubmit}>
        حفظ
      </Button>
    </>
  );
}
