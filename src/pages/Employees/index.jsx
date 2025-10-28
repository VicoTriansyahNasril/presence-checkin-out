import React, { useState, useEffect } from "react";
import { Card, Box, Chip, IconButton, Avatar, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  SearchBar,
  TableComponent,
  CustomButton,
} from "../../components/Elements";
import AddOrEditEmployee from "./AddOrEditEmployee";
import {
  fetchAllEmployees,
  fetchEmployeePersonalInfoByUsername,
  fetchEmployeeProfessionalInfoByUsername,
  deleteEmployee,
} from "../../redux/slices/employeeSlice";
import { exportEmployeesByCompany } from "../../services/apis/employeeService";
import {
  TABLE_COLUMNS,
  ACTION_BUTTONS,
} from "../../constants/employeesConstants";
import ICONS from "../../constants/iconConstants";
import COLORS from "../../constants/colorConstants";
import employeeMessages from "../../messages/employeeMessages";

const EmployeesList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const employees = useSelector((state) => state.employees.data) || [];
  const loading = useSelector((state) => state.employees.loading);
  const totalData = useSelector((state) => state.employees.totalData);

  useEffect(() => {
    dispatch(
      fetchAllEmployees({
        page: paginationModel.page,
        size: paginationModel.pageSize,
        keyword: searchValue,
      })
    );
  }, [dispatch, paginationModel, searchValue]);

  const handleSearchChange = (event) => setSearchValue(event.target.value);
  const handleOpenModalEdit = (employee) => {
    setSelectedEmployee(employee);
    setModalEditOpen(true);
    dispatch(fetchEmployeePersonalInfoByUsername(employee.username));
    dispatch(fetchEmployeeProfessionalInfoByUsername(employee.username));
  };
  const handleOpenModalAdd = () => setModalAddOpen(true);
  const handleCloseModalAdd = () => setModalAddOpen(false);
  const handleCloseModalEdit = () => setModalEditOpen(false);

  const handleViewEmployee = (username) => navigate(`/employees/${username}`);
  const handlePaginationModelChange = (newModel) =>
    setPaginationModel(newModel);

  const handleExportClick = async () => {
    try {
      await exportEmployeesByCompany(); // Call the export function
    } catch (error) {
      console.error("Error exporting employees:", error);
    }
  };

  const handleDeleteEmployee = (id_employee) => {
    Swal.fire({
      title: employeeMessages.SWAL_MESSAGES_DELETE.TITLE_CONFIRM,
      text: employeeMessages.SWAL_MESSAGES_DELETE.TEXT_CONFIRM,
      icon: employeeMessages.SWAL_MESSAGES_DELETE.ICON_CONFIRM,
      showCancelButton: true,
      confirmButtonColor:
        employeeMessages.SWAL_MESSAGES_DELETE.CONFIRM_BUTTON_COLOR,
      cancelButtonColor:
        employeeMessages.SWAL_MESSAGES_DELETE.CANCEL_BUTTON_COLOR,
      confirmButtonText:
        employeeMessages.SWAL_MESSAGES_DELETE.CONFIRM_BUTTON_TEXT,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteEmployee(id_employee))
          .unwrap()
          .then(() => {
            Swal.fire(
              employeeMessages.SWAL_MESSAGES_DELETE.TITLE_SUCCESS,
              employeeMessages.SWAL_MESSAGES_DELETE.TEXT_SUCCESS,
              employeeMessages.SWAL_MESSAGES_DELETE.ICON_SUCCESS
            );
            dispatch(fetchAllEmployees(paginationModel));
          })
          .catch((error) => {
            Swal.fire(
              employeeMessages.SWAL_MESSAGES_DELETE.TITLE_ERROR,
              error.message || employeeMessages.SWAL_MESSAGES_DELETE.TEXT_ERROR,
              employeeMessages.SWAL_MESSAGES_DELETE.ICON_ERROR
            );
          });
      }
    });
  };

  const rows =
    employees?.map((employee) => ({
      idEmployee: employee.idEmployee,
      employeeName: employee.employeeName || "N/A",
      departmentName: employee.department.departmentName || "N/A",
      status: employee.status || "N/A",
      roleCurrentCompany: employee.roleCurrentCompany || "N/A",
      profilePicture: employee.profilePicture || null,
      username: employee.username,
    })) || [];

  const columns = TABLE_COLUMNS.map((column) => {
    if (column.field === "employeeName") {
      return {
        ...column,
        renderCell: (params) => (
          <Box sx={classes.avatarCell}>
            <Avatar
              src={params.row.profilePicture || params.row.employeeName}
              alt={params.row.employeeName}
            />
            {params.row.employeeName}
          </Box>
        ),
      };
    }
    if (column.field === "status") {
      return {
        ...column,
        renderCell: (params) => (
          <Chip label={params.value} sx={classes.statusChip} />
        ),
      };
    }
    if (column.field === "action") {
      return {
        ...column,
        renderCell: (params) => (
          <Box sx={classes.actionButtons}>
            {[
              {
                icon: ACTION_BUTTONS.ICON_VIEW,
                tooltip: ACTION_BUTTONS.TOOLTIP_VIEW,
                onClick: () => handleViewEmployee(params.row.username),
              },
              {
                icon: ACTION_BUTTONS.ICON_EDIT,
                tooltip: ACTION_BUTTONS.TOOLTIP_EDIT,
                onClick: () => handleOpenModalEdit(params.row),
              },
              {
                icon: ACTION_BUTTONS.ICON_DELETE,
                tooltip: ACTION_BUTTONS.TOOLTIP_DELETE,
                onClick: () => handleDeleteEmployee(params.row.idEmployee),
              },
            ].map(({ icon, tooltip, onClick }, index) => (
              <IconButton key={index} sx={classes.iconButton} onClick={onClick}>
                <Tooltip title={tooltip}>
                  <img src={icon} alt={tooltip} style={classes.iconImage} />
                </Tooltip>
              </IconButton>
            ))}
          </Box>
        ),
      };
    }
    return column;
  });

  return (
    <Card variant="outlined" sx={classes.card}>
      <Box sx={classes.header}>
        <SearchBar
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
        />
        <Box sx={classes.actions}>
          <CustomButton
            colorScheme="bgBlue"
            onClick={handleOpenModalAdd}
            icon={ICONS.ADD_CIRCLE}
          >
            Add New Employee
          </CustomButton>
          <CustomButton
            colorScheme="bgOrange"
            icon={ICONS.EXPORT}
            onClick={handleExportClick}
          >
            Export
          </CustomButton>
        </Box>
      </Box>
      <Box sx={classes.tableContainer}>
        <TableComponent
          columns={columns}
          rows={rows}
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange}
          rowCount={totalData}
          loading={loading}
          getRowId={(row) => row.idEmployee}
        />
      </Box>
      {/* Modal untuk Add dan Edit */}
      <AddOrEditEmployee
        open={modalAddOpen}
        handleClose={handleCloseModalAdd}
        isEditMode={false} // Untuk Add, mode edit false
        paginationModel={paginationModel}
      />
      <AddOrEditEmployee
        open={modalEditOpen}
        handleClose={handleCloseModalEdit}
        employeeId={selectedEmployee?.idEmployee}
        isEditMode={true} // Untuk Edit, mode edit true
        paginationModel={paginationModel}
      />
    </Card>
  );
};

const classes = {
  card: { p: 2, m: 2 },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    gap: 2,
    "@media (min-width: 600px)": {
      flexDirection: "row",
    },
  },
  actions: { display: "flex", alignItems: "center", gap: 2 },
  tableContainer: { mt: 2, width: "100%" },
  avatarCell: { display: "flex", alignItems: "center", gap: 1 },
  statusChip: {
    backgroundColor: COLORS.STATUS.BACKGROUND,
    color: COLORS.STATUS.TEXT,
    borderRadius: "4px",
    padding: "0 8px",
  },
  actionButtons: {
    display: "flex",
    gap: 1,
    alignItems: "center",
    height: "100%",
  },
  iconButton: { p: 1 },
  iconImage: { width: "20px", height: "20px" },
};

export default EmployeesList;
