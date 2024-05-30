import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as XLSX from 'xlsx';
import { ActionIcon, Flex, Select, Modal, Button, Loader, FileInput } from "@mantine/core";
import { IconClipboardPlus } from "@tabler/icons-react";
import { createUser } from "../../redux/user/createUser";
import ExportToExcel from "../ExcelExport";
import { GenderType, UserRole } from "../../../public/constants/enums";

export default function CreateMany() {
  const dispatch = useDispatch();
  const { departmentData } = useSelector((state) => state.department);
  const { loading } = useSelector((state) => state.user);
  const fileName = 'Users';
  const data = [
    { first_name: '', middle_name: '',last_name:'',email:'',birthday:'2000-3-15',password:'',gender:`${GenderType.Male} or ${GenderType.Female}`,role:`${UserRole.Dean} or ${UserRole.DepartmentHead} or ${UserRole.Supervisor}`,is_active:'true or false'},

  ];
  const [isOpen, setIsOpen] = useState(false);
  const [department, setDepartment] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setDepartment(null);
    setFile(null);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!file) {
      setError({ field:"file" ,message:'فارغ'});
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

        const Users = json.map((item) => ({
          first_name: item.first_name,

          middle_name: item.middle_name,
    
          last_name: item.last_name,
    
          email: item.email,

          birthday: item.birthday,
    
          password: item.password,
    
          gender: item.gender,

          role: item.role,

          is_active:item.is_active==='true'?true:false,

          department_id: department!==null?parseInt(department):null,
        }));

        await dispatch(createUser(Users));
        handleClose();
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error creating Users:", error);
    }
  };

  const departmentOptions = departmentData.map((department) => ({
    value: String(department.id),
    label: department.name,
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

      <Modal opened={isOpen} onClose={handleClose} title="إضافة مستخدمين" centered>
        <Flex direction="column" gap={10}>
        <ExportToExcel apiData={data} fileName={fileName} />
          <FileInput
            label="ملف أكسل"
            placeholder="المستخدمين"
            error={error && error.field === "file" ? error.message : null}
            onChange={(value) => {
              setFile(value);
              setError(null); // Clear file error on change
            }}
          />
          <Select
            label="القسم"
            placeholder="اختر القسم"
            allowDeselect={true}
            data={departmentOptions}
            onChange={(value, option) => {
              setDepartment(option ? Number(option.value) : null);
              setError(null); // Clear Department error on change
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
