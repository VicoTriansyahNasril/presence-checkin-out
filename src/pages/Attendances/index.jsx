import { Avatar, Box, Card, Chip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/Elements/CustomButton";
import CustomModal from "../../components/Elements/CustomModal";
import SearchBar from "../../components/Elements/CustomSearchBar";
import TableComponent from "../../components/Elements/TableComponent";
import {
  fetchAttendances,
  importAttendance,
} from "../../redux/slices/attendanceSlice";
import ExportIcon from "/assets/icons/export.svg";
import ImportIcon from "/assets/icons/file-add.svg";
import CustomInput from "../../components/Elements/CustomInput";
import DownloadTemplate from "/assets/icons/download-template.svg";
import { exportAttendance } from "../../services/apis/attendanceService";
import Swal from "sweetalert2";
import CustomLoader from "../../components/Elements/CustomLoader"; // Loader tambahan jika dibutuhkan

const AttendanceList = () => {
  const dispatch = useDispatch();
  const totalData = useSelector((state) => state.attendances.totalData);
  const attendances = useSelector((state) => state.attendances.data);
  const loading = useSelector((state) => state.attendances.loading); // Gunakan state loading
  const [searchValue, setSearchValue] = useState("");
  const [modalImportOpen, setModalImportOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const classes = useStyles();
  const templateUrl = "/docs/import-attendance.xlsx";

  useEffect(() => {
    dispatch(
      fetchAttendances({
        page: paginationModel.page,
        size: paginationModel.pageSize,
        keyword: searchValue,
      })
    );
  }, [dispatch, paginationModel, searchValue]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const handleOpenModalImport = () => setModalImportOpen(true);
  const handleCloseModalImport = () => {
    setModalImportOpen(false);
    setSelectedFile(null);
  };

  const handleSubmitImport = (file) => {
    if (!file) {
      Swal.fire("Error", "Please select a file to import", "error");
      return;
    }

    dispatch(importAttendance(file))
      .unwrap()
      .then((response) => {
        console.log("response3:", response);
        handleCloseModalImport();
        if (response.statusCode === 400) {
          throw new Error(response.message);
        }

        console.log(response.message);

        Swal.fire({
          icon: "success", // atau 'error', 'warning', 'info', 'question'
          title: "Success",
          text: "Attendance imported successfully",
        }).then(() => {
          dispatch(fetchAttendances(paginationModel));
        });
      })
      .catch((error) => {
        console.log("error message:", error.message);
        handleCloseModalImport();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        }).then(() => {
          dispatch(fetchAttendances(paginationModel));
        });
      });
  };

  const handleFileSelection = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleExportClick = async () => {
    try {
      await exportAttendance();
    } catch (error) {
      console.error("Error exporting attendance:", error);
    }
  };

  const handlePaginationModelChange = (newModel) => {
    setPaginationModel(newModel);
  };

  const attendanceColumns = [
    {
      field: "date_attendance",
      headerName: "Date Attendance",
      flex: 1.5,
    },
    {
      field: "department_name",
      headerName: "Department",
      flex: 1.5,
    },
    {
      field: "employee_name",
      headerName: "Employee Name",
      flex: 2,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            src={params.row.profile_picture || params.row.employee_name}
            alt={params.row.employee_name}
          />
          {params.row.employee_name}
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={{
            backgroundColor:
              params.value === "On Time"
                ? "rgba(63, 194, 138, 0.1)"
                : "rgba(244, 91, 105, 0.1)",
            color: params.value === "On Time" ? "#3FC28A" : "#F45B69",
            borderRadius: "4px",
          }}
        />
      ),
    },
    {
      field: "check_in",
      headerName: "Check In",
      flex: 1,
      renderCell: (params) => {
        const checkInTime = new Date(params.value);
        const hours = checkInTime.getHours().toString().padStart(2, "0");
        const minutes = checkInTime.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      },
    },
    {
      field: "check_out",
      headerName: "Check Out",
      flex: 1,
      renderCell: (params) => {
        const checkOutTime = new Date(params.value);
        const hours = checkOutTime.getHours().toString().padStart(2, "0");
        const minutes = checkOutTime.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      },
    },
    {
      field: "total_working_hours",
      headerName: "Work Hours",
      flex: 1,
      renderCell: (params) => (params.value === "N/A" ? "-" : params.value),
    },
  ];

  if (loading) {
    return <CustomLoader loading={true} />;
  }

  return (
    <Card variant="outlined" sx={classes.card}>
      <Box sx={classes.header}>
        <SearchBar
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
        />
        <Box sx={classes.buttonGroup}>
          <CustomButton
            colorScheme="bgBlue"
            onClick={handleOpenModalImport}
            icon={ImportIcon}
          >
            Import
          </CustomButton>
          <CustomModal open={modalImportOpen} onClose={handleCloseModalImport}>
            <CustomModal.Header onClose={handleCloseModalImport}>
              Import Attendance Data
            </CustomModal.Header>
            <Box mt={2}>
              <CustomInput
                type="file"
                fileType="document"
                name="fileField"
                onChange={handleFileSelection}
              />
              <Box mt={2}>
                <a
                  href={templateUrl}
                  download="import-attendance.xlsx"
                  style={{ textDecoration: "none" }}
                >
                  <CustomButton
                    variant="outlined"
                    colorScheme="bgOrange"
                    icon={DownloadTemplate}
                  >
                    Download Template
                  </CustomButton>
                </a>
              </Box>
            </Box>
            <CustomModal.Footer
              onClose={handleCloseModalImport}
              onSubmit={() => handleSubmitImport(selectedFile)}
            >
              Save
            </CustomModal.Footer>
          </CustomModal>
          <CustomButton
            colorScheme="bgOrange"
            icon={ExportIcon}
            onClick={handleExportClick}
          >
            Export
          </CustomButton>
        </Box>
      </Box>
      <Box sx={classes.tableContainer}>
        <TableComponent
          columns={attendanceColumns}
          rows={attendances}
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange}
          searchValue={searchValue}
          rowCount={totalData}
          getRowId={(row) => row.id}
        />
      </Box>
    </Card>
  );
};

const useStyles = () => {
  return {
    card: {
      p: 2,
      m: 2,
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
    },
    buttonGroup: {
      display: "flex",
      alignItems: "center",
      gap: 2,
    },
    tableContainer: {
      mt: 2,
    },
  };
};

export default AttendanceList;
