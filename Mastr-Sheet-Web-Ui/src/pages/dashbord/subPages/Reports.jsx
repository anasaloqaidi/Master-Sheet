
import { Button, Group, Modal, ScrollArea } from "@mantine/core";
import Table from "../../../components/reports/Table";
import { useState } from "react";






export default function Reports() {




  const [isOpen, setIsOpen] = useState(false);


  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);


  

  return (
    <Group mt={40} justify="center">
      <>
        <Button h={"20vh"} variant="default" onClick={handleOpen}>
          قيد الدرجات ( Master Sheet )
        </Button>

        <Button h={"20vh"} miw={"206px"} variant="default" onClick={handleOpen}>
          نسب النجاح
        </Button>

        <Modal opened={isOpen} scrollAreaComponent={ScrollArea.Autosize} onClose={handleClose} size="auto" centered >
          <Table/>
        </Modal>
      </>
    </Group>
  );
}
