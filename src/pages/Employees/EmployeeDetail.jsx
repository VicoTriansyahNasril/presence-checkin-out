import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  CustomButton,
  CustomInput,
  CustomModal,
  CustomTabs,
  TableComponent,
} from "../../components/Elements";
import COLORS from "../../constants/colorConstants";
import {
  ATTENDANCE_COLUMNS,
  LEAVE_COLUMNS,
  PERSONAL_INFO,
  PROFESSIONAL_INFO,
  TABS_CHANGE_PHOTO,
  TABS_PROFILE,
  TABS_SIDEBAR,
} from "../../constants/employeeDetailConstants";
import ICONS from "../../constants/iconConstants";
import employeeDetailMessages from "../../messages/employeeDetailMessages";
import {
  fetchEmployeeAttendanceDetailsById,
  fetchEmployeeLeave,
  fetchEmployeePersonalInfoByUsername,
  fetchEmployeeProfessionalInfoByUsername,
  fetchEmployeeProfileByUsername,
  updateEmployeeProfilePicture,
} from "../../redux/slices/employeeSlice";
import AddOrEditEmployee from "./AddOrEditEmployee";

const EmployeeDetail = () => {
  const [tabSidebarValue, setTabSidebarValue] = useState(0);
  const [tabProfileValue, setTabProfileValue] = useState(0);
  const [modalChangePhotoOpen, setModalChangePhotoOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const prevModalEditOpenRef = useRef(false);
  const classes = useStyles();
  const { username } = useParams();
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employees.selectedEmployee);
  const professionalInfo = useSelector(
    (state) => state.employees.professionalInfo
  );
  const personalInfo = useSelector((state) => state.employees.personalInfo);
  const attendanceDetails =
    useSelector((state) => state.employees.attendanceDetails) || [];
  const leaveRows = useSelector((state) => state.employees.leaves);

  const currentYear = new Date().getFullYear();
  const filteredAttendanceDetails = attendanceDetails.filter((attendance) => {
    const attendanceYear = new Date(attendance.date).getFullYear();
    return attendanceYear === currentYear;
  });

  useEffect(() => {
    if (username) {
      dispatch(fetchEmployeeProfileByUsername(username));
      dispatch(fetchEmployeeProfessionalInfoByUsername(username));
      dispatch(fetchEmployeePersonalInfoByUsername(username));
      dispatch(fetchEmployeeLeave(username));
      dispatch(fetchEmployeeAttendanceDetailsById(username));
    }
  }, [dispatch, username]);

  useEffect(() => {
    if (prevModalEditOpenRef.current && !modalEditOpen) {
      if (username) {
        dispatch(fetchEmployeeProfileByUsername(username));
        dispatch(fetchEmployeeProfessionalInfoByUsername(username));
        dispatch(fetchEmployeePersonalInfoByUsername(username));
      }
    }
    prevModalEditOpenRef.current = modalEditOpen;
  }, [modalEditOpen, dispatch, username]);

  const handleTabSidebarChange = (event, newValue) => {
    setTabSidebarValue(newValue);
  };

  const handleTabProfileChange = (event, newValue) => {
    setTabProfileValue(newValue);
  };

  const handleOpenModalChangePhoto = () => setModalChangePhotoOpen(true);
  const handleCloseModalChangePhoto = () => setModalChangePhotoOpen(false);

  const handleOpenModalEdit = () => setModalEditOpen(true);
  const handleCloseModalEdit = () => setModalEditOpen(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  const handleSubmitChangePhoto = () => {
    if (!selectedFile) {
      setErrorMessage(employeeDetailMessages.inputMessages.choosePhoto);
    } else {
      setErrorMessage("");
      const { id_employee } = employee.data;

      dispatch(
        updateEmployeeProfilePicture({ id_employee, file: selectedFile })
      )
        .unwrap()
        .then((response) => {
          const { message } = response;
          setSelectedFile(null);
          handleCloseModalChangePhoto();
          setTimeout(() => {
            employeeDetailMessages.swalMessages
              .successPhotoChange(message)
              .then(() => {
                dispatch(fetchEmployeeProfileByUsername(username));
              });
          }, 100);
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message ||
            employeeDetailMessages.notifications.photoChangeFailed;
          employeeDetailMessages.swalMessages.failedPhotoChange(errorMessage);
        });
    }
  };

  if (!employee || !employee.data) {
    return (
      <Typography>
        {employeeDetailMessages.notifications.loadingEmployee}
      </Typography>
    );
  }

  const displayValue = (value) => value || "-";

  const renderStatusChip = (value) => {
    let backgroundColor = "";
    let color = "";

    switch (value) {
      case "On Time":
        backgroundColor = COLORS.ON_TIME.BACKGROUND;
        color = COLORS.ON_TIME.TEXT;
        break;
      case "Late":
        backgroundColor = COLORS.LATE.BACKGROUND;
        color = COLORS.LATE.TEXT;
        break;
      case "Approved":
        backgroundColor = COLORS.APPROVED.BACKGROUND;
        color = COLORS.APPROVED.TEXT;
        break;
      case "Pending":
        backgroundColor = COLORS.PENDING.BACKGROUND;
        color = COLORS.PENDING.TEXT;
        break;
      case "Rejected":
        backgroundColor = COLORS.REJECTED.BACKGROUND;
        color = COLORS.REJECTED.TEXT;
        break;
      default:
        backgroundColor = COLORS.DEFAULT.BACKGROUND;
        color = COLORS.DEFAULT.TEXT;
        break;
    }

    return (
      <Chip
        label={value}
        sx={{
          backgroundColor,
          color,
          borderRadius: "4px",
          fontSize: "12px",
          fontWeight: "fontWeightLight",
        }}
      />
    );
  };

  return (
    <Card elevation={0} sx={classes.mainCard}>
      <Box sx={classes.cardHeaderContainer}>
        <Box sx={classes.profileInfoContainer}>
          <Avatar
            alt={`${employee.data.first_name} ${employee.data.last_name}`}
            src={employee.data.profile_picture}
            sx={classes.largeAvatar}
          />
          <Box>
            <Box sx={classes.employeeNameContainer}>
              <Typography
                fontSize="fontSizeSemiLarge"
                fontWeight="fontWeightBold"
              >
                {`${employee.data.first_name} ${employee.data.last_name}`}
              </Typography>
              <Button
                sx={classes.changePhotoButton}
                onClick={handleOpenModalChangePhoto}
              >
                <img
                  src={ICONS.CHANGE_PHOTO}
                  alt="Edit icon"
                  style={classes.iconSmall}
                />
              </Button>
              <CustomModal
                open={modalChangePhotoOpen}
                onClose={handleCloseModalChangePhoto}
              >
                <CustomModal.Header onClose={handleCloseModalChangePhoto}>
                  Change Employee Photo
                </CustomModal.Header>
                <CustomTabs
                  value={tabValue}
                  onChange={handleTabChange}
                  tabs={TABS_CHANGE_PHOTO}
                />
                {tabValue === 0 && (
                  <Box mt={2}>
                    <CustomInput
                      type="file"
                      fileType="image"
                      name="fileField"
                      onChange={(e) => {
                        setSelectedFile(e.target.files[0]);
                        setErrorMessage("");
                      }}
                    />
                    {errorMessage && (
                      <Typography color="error" fontSize="small" mt={1}>
                        {errorMessage}
                      </Typography>
                    )}
                  </Box>
                )}
                <CustomModal.Footer
                  onClose={handleCloseModalChangePhoto}
                  onSubmit={handleSubmitChangePhoto}
                >
                  Save
                </CustomModal.Footer>
              </CustomModal>
            </Box>
            <Box sx={classes.profileInfoItem}>
              <img
                src={ICONS.PROFESSIONAL}
                alt="Role icon"
                style={classes.iconSmall}
              />
              <Typography fontSize="fontSizeSmall" color="text.default">
                {displayValue(employee.data.role_current_company)}
              </Typography>
            </Box>
            <Box sx={classes.profileInfoItem}>
              <img
                src={ICONS.GMAIL}
                alt="Gmail icon"
                style={classes.iconSmall}
              />
              <Typography fontSize="fontSizeSmall" color="text.default">
                {displayValue(employee.data.email)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <CustomButton
          colorScheme={"bgBlue"}
          icon={ICONS.PEN_UNDERLINE}
          onClick={handleOpenModalEdit}
        >
          Edit Profile
        </CustomButton>
      </Box>
      <Divider sx={classes.sectionDivider} />
      <Box sx={classes.mainContentContainer}>
        <Card elevation={0} sx={classes.sidebarCard}>
          <Tabs
            orientation="vertical"
            value={tabSidebarValue}
            onChange={handleTabSidebarChange}
            sx={classes.sidebarTabs}
          >
            {TABS_SIDEBAR.map((tab, index) => (
              <Tab
                key={index}
                icon={
                  <img
                    src={tabSidebarValue === index ? tab.iconActive : tab.icon}
                    alt={`${tab.label} Icon`}
                    style={classes.iconSmall}
                  />
                }
                iconPosition="start"
                label={tab.label}
                sx={{
                  fontSize: "fontSizeSmall",
                  fontWeight:
                    tabSidebarValue === index
                      ? "fontWeightMedium"
                      : "fontWeightLight",
                }}
              />
            ))}
          </Tabs>
        </Card>
        <Box sx={classes.tabContentContainer}>
          {tabSidebarValue === 0 && (
            <Box>
              <CustomTabs
                value={tabProfileValue}
                onChange={handleTabProfileChange}
                tabs={TABS_PROFILE}
              />
              {tabProfileValue === 0 && (
                <InformationDisplay
                  data={PERSONAL_INFO(personalInfo)}
                  classes={classes}
                />
              )}
              {tabProfileValue === 1 && (
                <InformationDisplay
                  data={PROFESSIONAL_INFO(professionalInfo)}
                  classes={classes}
                />
              )}
            </Box>
          )}
          {tabSidebarValue === 1 && (
            <Box sx={classes.tableWrapper}>
              <TableComponent
                paginationEnabled={false}
                columns={ATTENDANCE_COLUMNS.map((column) => ({
                  ...column,
                  renderCell:
                    column.field === "status"
                      ? (params) => renderStatusChip(params.value)
                      : undefined,
                }))}
                rows={filteredAttendanceDetails}
                getRowId={(row) => row.id}
                rowCount={null}
              />
            </Box>
          )}
          {tabSidebarValue === 2 && (
            <Box sx={classes.tableWrapper}>
              <TableComponent
                paginationEnabled={false}
                getRowId={(row) => row.id_leave}
                columns={LEAVE_COLUMNS.map((column) => ({
                  ...column,
                  renderCell:
                    column.field === "status"
                      ? (params) => renderStatusChip(params.value)
                      : undefined,
                }))}
                rows={leaveRows}
              />
            </Box>
          )}
        </Box>
      </Box>
      <AddOrEditEmployee
        open={modalEditOpen}
        handleClose={handleCloseModalEdit}
        employeeId={employee?.data.id_employee}
        isEditMode={true}
      />
    </Card>
  );
};

const InformationDisplay = ({ data, classes }) => (
  <Grid container spacing={2} py={2}>
    {data.map((item, index) => (
      <Grid item xs={12} sm={6} key={index}>
        <Typography sx={classes.infoLabel}>{item.label}</Typography>
        <Typography sx={classes.infoValue}>{item.value}</Typography>
        <Divider sx={{ mb: 2 }} />
      </Grid>
    ))}
  </Grid>
);

const useStyles = () => ({
  largeAvatar: {
    width: 100,
    height: 100,
    borderRadius: "12px",
  },
  infoLabel: {
    fontWeight: "fontWeightLight",
    fontSize: "fontSizeMediumSmall",
    color: "secondary.main",
    mb: 1,
  },
  infoValue: {
    fontWeight: "fontWeightLight",
    fontSize: "fontSizeSmall",
    mb: 1,
  },
  employeeNameContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  mainCard: {
    borderRadius: "10px",
    border: "1px solid #E5E5E5",
    marginTop: 4,
    padding: 2,
  },
  cardHeaderContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileInfoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  iconSmall: {
    width: "24px",
    height: "24px",
  },
  changePhotoButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ml: 2,
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "secondary.lightGrayOpacity10",
    minWidth: 0,
  },
  mainContentContainer: {
    marginTop: 2,
    width: "100%",
    display: "flex",
  },
  tabContentContainer: {
    ml: 3,
    width: "75%",
    flex: 1,
  },
  sidebarTabs: {
    "& .MuiTab-root": {
      textTransform: "none",
      justifyContent: "flex-start",
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
    "& .Mui-selected": {
      backgroundColor: "primary.main",
      color: "white !important",
    },
  },
  sidebarCard: {
    border: "1px solid #E0E0E0",
    borderRadius: "10px",
    width: "20%",
    height: "217px",
  },
  tableWrapper: {
    mt: 2,
  },
  profileInfoItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    mt: "4px",
  },
  sectionDivider: {
    marginY: "24px",
  },
});

export default EmployeeDetail;
