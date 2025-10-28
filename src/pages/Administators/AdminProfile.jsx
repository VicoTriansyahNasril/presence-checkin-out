import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, Avatar, Typography, Button, Divider } from "@mui/material";
import AdminEdit from "./AdminEdit";
import ChangesImageIcon from "/assets/icons/image-edit.svg";
import {
  fetchAdmin,
  updateAdminProfilePicture,
  fetchAdminDetail,
  changeAdminPhoto,
} from "../../redux/slices/adminSlice";
import {
  CustomLoader,
  CustomModal,
  CustomInput,
  CustomTabs,
  CustomButton,
} from "../../components/Elements";
import Swal from "sweetalert2";
import { useLocation, useParams } from "react-router-dom";
import adminConstants from "../../constants/adminConstants";
import { TABS_CHANGE_PHOTO, TABS } from "../../constants/adminConstants";
import appConstants from "../../constants/appConstants";
import adminMessages from "../../messages/adminMessages";
import ICONS from "../../constants/iconConstants";

const AdminProfile = () => {
  const location = useLocation();
  const paramIdAdmin = location.state?.idAdmin;
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const localAdminId = user?.id_admin;
  const idAdmin = paramIdAdmin || localAdminId;
  const isSuperAdmin = user?.role === "Superadmin";

  const dispatch = useDispatch();
  const adminDetail = useSelector((state) => state.admin.adminDetail);
  const adminData = useSelector((state) => state.admin.data);
  const companies = useSelector((state) => state.company.companies);
  const loading = useSelector((state) => state.admin.loading);

  useEffect(() => {
    if (paramIdAdmin) {
      // Jika superadmin mengakses halaman ini dengan params
      dispatch(fetchAdminDetail(idAdmin));
    } else if (!paramIdAdmin && localAdminId) {
      // Jika admin mengakses halaman ini tanpa params
      dispatch(fetchAdmin(localAdminId));
    }
  }, [dispatch, paramIdAdmin, localAdminId, idAdmin]);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = (params = false) => {
    setOpen(false);
  };

  const handleIconClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSavePhoto = () => {
    if (selectedFile) {
      if (isSuperAdmin && paramIdAdmin) {
        dispatch(changeAdminPhoto({ idAdmin, profile_picture: selectedFile }))
          .unwrap()
          .then(() => {
            Swal.fire(
              appConstants.STATUS_TITLE_SUCCESS,
              adminMessages.successChangeAdminPhoto,
              appConstants.ICON_SUCCESS
            );
            setModalOpen(false);
            dispatch(fetchAdminDetail(idAdmin));
          })
          .catch(() => {
            Swal.fire(
              appConstants.STATUS_TITLE_ERROR,
              adminMessages.errorChangeAdminPhoto,
              appConstants.ICON_ERROR
            );
          });
      } else {
        dispatch(updateAdminProfilePicture(selectedFile))
          .unwrap()
          .then((response) => {
            const { message } = response;
            handleCloseModal();
            setTimeout(() => {
              Swal.fire({
                title: appConstants.STATUS_TITLE_SUCCESS,
                text: message,
                icon: appConstants.ICON_SUCCESS,
                confirmButtonText:
                  appConstants.confirmationMessages.confirmText,
              }).then(() => {
                dispatch({ type: "admin/updateReset" });
                window.location.reload();
              });
            }, 100);
          })
          .catch((error) => {
            const errorMessage =
              error.response?.data?.message ||
              adminMessages.errorChangeAdminPhoto;
            Swal.fire({
              title: appConstants.STATUS_TITLE_ERROR,
              text: errorMessage,
              icon: appConstants.ICON_ERROR,
              confirmButtonText: appConstants.confirmationMessages.confirmText,
            });
          });
      }
    } else {
      Swal.fire({
        title: appConstants.STATUS_TITLE_ERROR,
        text: adminMessages.errorChangeAdminPhotoNoFile,
        icon: appConstants.ICON_ERROR,
        confirmButtonText: appConstants.confirmationMessages.confirmText,
      });
    }
  };

  // Menentukan data yang akan digunakan berdasarkan siapa yang mengakses
  const profileData = paramIdAdmin ? adminDetail : adminData?.data;

  if (!profileData) {
    return <CustomLoader loading={loading} />;
  }

  return (
    <Card variant="outlined" sx={classes.mainCard}>
      <Box sx={classes.cardHeaderContainer}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Avatar
            alt={`${profileData.first_name} ${profileData.last_name}`}
            src={profileData.profile_picture}
            sx={classes.avatar}
          />
          <Box>
            <Box sx={classes.employeeNameContainer}>
              <Typography
                fontSize="fontSizeSemiLarge"
                fontWeight="fontWeightBold"
              >
                {`${profileData.first_name} ${profileData.last_name}`}
              </Typography>
              <Button sx={classes.tabButton} onClick={handleIconClick}>
                <img
                  src={ChangesImageIcon}
                  alt="Edit icon"
                  style={classes.icon}
                />
              </Button>
              <CustomModal open={modalOpen} onClose={handleCloseModal}>
                <CustomModal.Header onClose={handleCloseModal}>
                  {adminConstants.changeAdminPhoto}
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
                      onChange={handleFileChange}
                    />
                  </Box>
                )}
                <CustomModal.Footer
                  onClose={handleCloseModal}
                  onSubmit={handleSavePhoto}
                >
                  {adminConstants.saveButtonLabel}
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
                {profileData.company?.company_name ||
                  profileData.company?.companyName}
              </Typography>
            </Box>
            <Box sx={classes.profileInfoItem}>
              <img
                src={ICONS.GMAIL}
                alt="Gmail icon"
                style={classes.iconSmall}
              />
              <Typography fontSize="fontSizeSmall" color="text.default">
                {profileData.email}
              </Typography>
            </Box>
          </Box>
        </Box>
        <CustomButton
          colorScheme={"bgBlue"}
          icon={ICONS.PEN_UNDERLINE}
          onClick={handleOpen}
        >
          {adminConstants.editProfileButtonLabel}
        </CustomButton>
      </Box>

      <Divider sx={classes.sectionDivider} />

      <CustomTabs value={value} onChange={handleChange} tabs={TABS} />

      <Box sx={classes.section}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>
            {adminConstants.firstNameLabel}
          </Typography>
          <Typography sx={classes.infoValue}>
            {profileData.first_name}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>
            {adminConstants.lastNameLabel}
          </Typography>
          <Typography sx={classes.infoValue}>
            {profileData.last_name}
          </Typography>
        </Box>
      </Box>

      <Box sx={classes.section}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>
            {adminConstants.usernameLabel}
          </Typography>
          <Typography sx={classes.infoValue}>{profileData.username}</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>
            {adminConstants.emailLabel}
          </Typography>
          <Typography sx={classes.infoValue}>{profileData.email}</Typography>
        </Box>
      </Box>

      <Box sx={classes.section}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>
            {adminConstants.companyOriginLabel}
          </Typography>
          <Typography sx={classes.infoValue}>
            {profileData.company?.company_name ||
              profileData.company?.companyName}
          </Typography>
        </Box>
      </Box>

      {/* Import Modal */}
      <AdminEdit
        open={open}
        handleClose={handleClose}
        adminDataProps={profileData}
        companyData={companies}
      />
    </Card>
  );
};

const useStyles = () => {
  return {
    mainCard: {
      p: 2,
      mt: 4,
    },
    cardHeaderContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: "12px",
    },
    employeeNameContainer: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    profileInfoItem: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      mt: "4px",
    },
    button: {
      textTransform: "none",
      borderRadius: "8px",
      height: "40px",
    },
    section: {
      display: "flex",
      gap: "24px",
      marginTop: "25px",
    },
    sectionDivider: {
      marginY: "24px",
    },
    infoLabel: {
      fontWeight: "fontWeightLight",
      fontSize: "fontSizeMediumSmall",
      color: "secondary.main",
    },
    infoValue: {
      fontWeight: "fontWeightLight",
      fontSize: "fontSizeSmall",
    },
    icon: {
      width: "20px",
      height: "20px",
    },
    tabButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ml: 2,
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "secondary.lightGrayOpacity10",
      minWidth: 0,
    },
    iconSmall: {
      width: "24px",
      height: "24px",
    },
  };
};

export default AdminProfile;
