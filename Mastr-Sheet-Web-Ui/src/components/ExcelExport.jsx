import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ActionIcon } from '@mantine/core';
import { IconTableExport } from '@tabler/icons-react';

const ExportToExcel = ({ apiData, fileName }) => {
    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(apiData); // Convert data to worksheet
        const wb = XLSX.utils.book_new(); // Create a new workbook
        XLSX.utils.book_append_sheet(wb, ws, 'data'); // Add worksheet to workbook
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        saveAs(blob, `${fileName}.xlsx`); // Save as Excel file
    };

    return (
        <ActionIcon onClick={handleExport} variant="outline" radius="xs" aria-label="Settings">
        <IconTableExport
          style={{ width: "70%", height: "70%" }}
          stroke={1.5}
        />
      </ActionIcon>
    );
};

export default ExportToExcel;
