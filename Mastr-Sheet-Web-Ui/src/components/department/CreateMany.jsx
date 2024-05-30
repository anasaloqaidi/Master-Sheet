import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as XLSX from 'xlsx';
import { ActionIcon, Flex, Select, Modal, Button, Loader, FileInput } from "@mantine/core";
import { IconClipboardPlus } from "@tabler/icons-react";
import { createDepartment } from "../../redux/department/createDepartment";
import ExportToExcel from "../ExcelExport";

export default function CreateMany() {
  const dispatch = useDispatch();
  const { collegeData } = useSelector((state) => state.college);
  const { loading } = useSelector((state) => state.department);
  const fileName = 'Departments';
  const data = [
    { name: ''},

  ];
  const [isOpen, setIsOpen] = useState(false);
  const [college, setCollege] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setCollege(null);
    setFile(null);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!college || !file) {
      setError({ field:college?"file":file?'college':'both' ,message:'فارغ'});
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        const departments = json.map((item) => ({
          name: item.name,
          college_id: college
        }));

        await dispatch(createDepartment(departments));
        handleClose();
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error creating department:", error);
    }
  };

  const collegeOptions = collegeData.map((college) => ({
    value: String(college.id),
    label: college.name,
  }));

  return (
    <>
      <ActionIcon
        onClick={handleOpen}
        variant="filled"
        radius="xs"
        aria-label="Settings"
      >
        <IconClipboardPlus style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>

      <Modal opened={isOpen} onClose={handleClose} title="إضافة أقسام" centered>
        <Flex direction="column" gap={10}>
        <ExportToExcel apiData={data} fileName={fileName} />
          <FileInput
            label="ملف أكسل"
            placeholder="الأقسام"
            error={error && (error.field === "file" || error.field === "both") ? error.message : null}
            onChange={(value) => {
              setFile(value);
              setError(null); // Clear file error on change
            }}
          />
          <Select
            label="الكلية"
            placeholder="اختر الكلية"
            data={collegeOptions}
            error={error && ( error.field === "college" || error.field === "both")  ? error.message : null}
            onChange={(value, option) => {
              setCollege(option ? Number(option.value) : null);
              setError(null); // Clear college error on change
            }}
          />

          {error && !error.field && (
            <div style={{ color: "red", textAlign: "center" }}>{error.message}</div>
          )}

          <Flex direction="row" gap={8} mt={20}>
            <Button flex={1} onClick={handleSubmit} disabled={loading}>
              {loading ? <Loader size="sm" type="bars" /> : "حفظ"}
            </Button>
            <Button flex={1} variant="outline" onClick={handleClose} disabled={loading}>
              الغاء
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}
