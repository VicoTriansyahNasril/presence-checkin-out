import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Box, Grid, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DepartmentCard from "./DepartmentCard";
import AddIcon from "/assets/icons/add-circle.svg";
import AddDepartmentIcon from "/assets/icons/professional.svg";
import AddDepartmentIconActive from "/assets/icons/professional-active.svg";
import ImportIcon from "/assets/icons/file-add-black.svg";
import ImportIconActive from "/assets/icons/file-add-active.svg";
import DownloadTemplate from "/assets/icons/download-template.svg";
import Swal from "sweetalert2";
import {
  CustomModal,
  CustomTabs,
  CustomButton,
  CustomInput,
} from "../../components/Elements";
import {
  fetchAllDepartments,
  addDepartment,
  importDepartment,
  editDepartment,
  deleteDepartment,
} from "../../redux/slices/departmentSlice";
import { useFormik } from "formik";
import departmentMessages from "../../messages/departmentMessages";
import appConstants from "../../constants/appConstants";
import validationSchema from "../../validation/departmentValidation";

const Departments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(appConstants.DEFAULT_PAGINATION_SIZE);

  const { data: departments } = useSelector((state) => state.departments);

  useEffect(() => {
    dispatch(fetchAllDepartments());
    if (selectedDepartment) {
      formikEdit.setFieldValue("department_name", selectedDepartment.name);
    }
  }, [dispatch, selectedDepartment]);

  const tabsAdd = [
    {
      icon: AddDepartmentIcon,
      iconActive: AddDepartmentIconActive,
      label: departmentMessages.addOne,
    },
    {
      icon: ImportIcon,
      iconActive: ImportIconActive,
      label: departmentMessages.importFromDocument,
    },
  ];

  const totalDepartments = departments.length;
  const indexOfLastDepartment = page * size;
  const indexOfFirstDepartment = indexOfLastDepartment - size;
  const currentDepartments = departments.slice(
    indexOfFirstDepartment,
    indexOfLastDepartment
  );

  const handleOpenModalAdd = () => setModalAddOpen(true);

  const handleCloseModalAdd = () => setModalAddOpen(false);

  const handleFileSelection = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmitAdd = (form) => {
    setLoading(true);
    handleCloseModalAdd();

    dispatch(addDepartment(form.department_name))
      .unwrap()
      .then(() => {
        Swal.fire(
          appConstants.STATUS_TITLE_SUCCESS,
          departmentMessages.successAdd,
          appConstants.ICON_SUCCESS
        );
        dispatch(fetchAllDepartments());
      })
      .catch((error) => {
        Swal.fire(
          appConstants.STATUS_TITLE_ERROR,
          error.message || departmentMessages.errorAdd,
          appConstants.ICON_ERROR
        );
      })
      .finally(() => setLoading(false));
  };

  const handleImportDepartment = (file) => {
    if (!file) {
      Swal.fire(
        appConstants.STATUS_TITLE_ERROR,
        departmentMessages.errorImport,
        appConstants.ICON_ERROR
      );
      return;
    }

    setLoading(true);
    handleCloseModalAdd();

    dispatch(importDepartment(file))
      .unwrap()
      .then(() => {
        Swal.fire(
          appConstants.STATUS_TITLE_SUCCESS,
          departmentMessages.successImport,
          appConstants.ICON_SUCCESS
        );
        dispatch(fetchAllDepartments());
      })
      .catch((error) => {
        Swal.fire(
          appConstants.STATUS_TITLE_ERROR,
          departmentMessages.errorImport,
          appConstants.ICON_ERROR
        );
      })
      .finally(() => setLoading(false));
  };

  const handleOpenModalEdit = (department) => {
    if (department && department.id) {
      setSelectedDepartment(department);
      formikEdit.setFieldValue("department_name", department.name);
      setModalEditOpen(true);
    } else {
      Swal.fire(
        appConstants.STATUS_ERROR,
        departmentMessages.errorEdit,
        appConstants.STATUS_ERROR
      );
    }
  };

  const handleCloseModalEdit = () => {
    setModalEditOpen(false);
    setTimeout(() => setSelectedDepartment(null), 300);
  };

  const handleSubmitEdit = (form) => {
    if (!selectedDepartment || !selectedDepartment.id) {
      Swal.fire(
        appConstants.STATUS_TITLE_ERROR,
        departmentMessages.errorEdit,
        appConstants.ICON_ERROR
      );
      return;
    }

    setLoading(true);

    dispatch(
      editDepartment({
        idDepartment: selectedDepartment.id,
        departmentName: form.department_name,
      })
    )
      .unwrap()
      .then((response) => {
        handleCloseModalEdit();
        Swal.fire(
          appConstants.STATUS_TITLE_SUCCESS,
          response.message || departmentMessages.successEdit,
          appConstants.ICON_SUCCESS
        );
      })
      .catch((error) => {
        Swal.fire(
          appConstants.STATUS_TITLE_ERROR,
          error.message || departmentMessages.errorEdit,
          appConstants.ICON_ERROR
        );
      })
      .finally(() => setLoading(false));
  };

  const handleDeleteDepartment = (idDepartment) => {
    Swal.fire({
      title: departmentMessages.confirmDeleteTitle,
      text: departmentMessages.confirmDeleteText,
      icon: appConstants.ICON_WARNING,
      showCancelButton: true,
      confirmButtonColor: appConstants.COLOR_ERROR,
      cancelButtonColor: appConstants.COLOR_PRIMARY,
      confirmButtonText: departmentMessages.confirmDeleteConfirm,
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        dispatch(deleteDepartment(idDepartment))
          .unwrap()
          .then(() => {
            Swal.fire(
              appConstants.STATUS_TITLE_SUCCESS,
              departmentMessages.successDelete,
              appConstants.ICON_SUCCESS
            );
            dispatch(fetchAllDepartments());
          })
          .catch((error) => {
            Swal.fire(
              appConstants.STATUS_TITLE_ERROR,
              error.message || departmentMessages.errorDelete,
              appConstants.ICON_ERROR
            );
          })
          .finally(() => setLoading(false));
      }
    });
  };

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const handleViewDepartment = (department) => {
    navigate(`/departments/${department.name}`, {
      state: { idDepartment: department.id, departmentName: department.name },
    });
  };

  const handlePageChange = (event, newPage) => setPage(newPage);

  const templateUrl = "/docs/import-department.xlsx";

  const formikAdd = useFormik({
    initialValues: {
      department_name: "",
    },
    validationSchema: validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      handleSubmitAdd({ department_name: values.department_name });
    },
  });

  const formikEdit = useFormik({
    initialValues: {
      department_name: selectedDepartment ? selectedDepartment.name : "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      handleSubmitEdit({ department_name: values.department_name });
    },
  });

  // Suspense akan menangani loading secara global, jadi tidak perlu menampilkan loader manual di sini

  return (
    <>
      <Card variant="outlined" sx={classes.card}>
        <Box sx={classes.header}>
          <Box sx={classes.buttonGroup}>
            <CustomButton
              colorScheme="bgBlue"
              onClick={handleOpenModalAdd}
              icon={AddIcon}
            >
              {departmentMessages.addNewDepartment}
            </CustomButton>
          </Box>
        </Box>
        <Box sx={classes.tableContainer}>
          <Grid container spacing={2}>
            {currentDepartments.map((department, index) => (
              <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
                <DepartmentCard
                  departmentId={department.id}
                  departmentName={department.name}
                  members={department.topEmployees}
                  onView={() => handleViewDepartment(department)}
                  onEdit={() => handleOpenModalEdit(department)}
                  onDelete={() => handleDeleteDepartment(department.id)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={Math.ceil(totalDepartments / size)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
        {/* Modal Add Department */}
        <CustomModal open={modalAddOpen} onClose={handleCloseModalAdd}>
          <CustomModal.Header onClose={handleCloseModalAdd}>
            {departmentMessages.addNewDepartment}
          </CustomModal.Header>

          <CustomTabs
            value={tabValue}
            onChange={handleTabChange}
            tabs={tabsAdd}
          />

          {/* Tab for adding a new department */}
          {tabValue === 0 && (
            <form onSubmit={formikAdd.handleSubmit}>
              <Box sx={classes.textField}>
                <CustomInput
                  label={departmentMessages.addNewDepartment}
                  type="text"
                  name="department_name"
                  value={formikAdd.values.department_name}
                  onChange={formikAdd.handleChange}
                  onBlur={formikAdd.handleBlur}
                  fullWidth
                  error={
                    formikAdd.touched.department_name &&
                    Boolean(formikAdd.errors.department_name)
                  }
                  helperText={
                    formikAdd.touched.department_name &&
                    formikAdd.errors.department_name
                  }
                />
              </Box>
            </form>
          )}

          {/* Tab for importing department from a file */}
          {tabValue === 1 && (
            <Box mt={2}>
              <CustomInput
                type="file"
                fileType="document"
                name="fileField"
                onChange={handleFileSelection} // Call file selection handler
              />
              <Box mt={2}>
                <a
                  href={templateUrl}
                  download="import-department.xlsx"
                  style={{ textDecoration: "none" }}
                >
                  <CustomButton
                    variant="outlined"
                    colorScheme="bgOrange"
                    icon={DownloadTemplate}
                  >
                    {departmentMessages.downloadTemplate}
                  </CustomButton>
                </a>
              </Box>
            </Box>
          )}

          {/* Modal Footer */}
          <CustomModal.Footer
            onClose={handleCloseModalAdd}
            onSubmit={() => {
              if (tabValue === 0) {
                // Handle add department submission
                formikAdd.handleSubmit();
              } else if (tabValue === 1) {
                // Handle file import submission
                handleImportDepartment(selectedFile); // Call handleImportDepartment with the selected file
              }
            }}
          >
            {departmentMessages.addButtonLabel}{" "}
            {/* Use the same label for both tabs */}
          </CustomModal.Footer>
        </CustomModal>
        {/* Modal Edit Department */}
        <CustomModal open={modalEditOpen} onClose={handleCloseModalEdit}>
          <CustomModal.Header onClose={handleCloseModalEdit}>
            {departmentMessages.editDepartment}
          </CustomModal.Header>

          <form onSubmit={formikEdit.handleSubmit}>
            <Box sx={classes.textField}>
              <CustomInput
                label={departmentMessages.editDepartment}
                type="text"
                name="department_name"
                value={formikEdit.values.department_name}
                onChange={formikEdit.handleChange}
                onBlur={formikEdit.handleBlur}
                fullWidth
                error={
                  formikEdit.touched.department_name &&
                  Boolean(formikEdit.errors.department_name)
                }
                helperText={
                  formikEdit.touched.department_name &&
                  formikEdit.errors.department_name
                }
              />
            </Box>
          </form>
          <CustomModal.Footer
            onClose={handleCloseModalEdit}
            onSubmit={formikEdit.handleSubmit}
          >
            {departmentMessages.saveButtonLabel}
          </CustomModal.Footer>
        </CustomModal>
      </Card>
    </>
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
      justifyContent: "flex-end",
      flexDirection: "row",
      gap: 2,
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: 2,
    },
    tableContainer: {
      mt: 4,
    },
    textField: {
      display: "flex",
      gap: 2,
    },
  };
};

export default Departments;
