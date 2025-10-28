import ImportIcon from "/assets/icons/file-add-active.svg";
import EditProfileIcon from "/assets/icons/edit-profile.svg";
import ChangesImageIcon from "/assets/icons/image-edit.svg";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, Typography, Button, Divider } from "@mui/material";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import AddOrEditCompany from "./AddOrEditCompany";
import {
  fetchCompany,
  updateCompanyLogo,
  fetchDetailCompany,
  changeCompanyLogo,
} from "../../redux/slices/companySlice";
import {
  CustomLoader,
  CustomModal,
  CustomInput,
  CustomTabs,
  CustomButton,
} from "../../components/Elements";
import Swal from "sweetalert2";
import companyConstants from "../../constants/companyConstants";
import appConstants from "../../constants/appConstants";
import companyMessages from "../../messages/companyMessages";

const CompanyDetail = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const location = useLocation();
  const idCompany = location.state?.idCompany;
  const dispatch = useDispatch();
  const companyData = useSelector((state) => state.company.data);
  const detailCompany = useSelector((state) => state.company.detailCompany);
  const loading = useSelector((state) => state.company.loading);

  // Get the user information
  const user = JSON.parse(localStorage.getItem("user"));
  const isSuperAdmin = user?.role === "Superadmin";

  const tabsChangePhoto = [
    {
      icon: ImportIcon,
      iconActive: ImportIcon,
      label: companyConstants.choosePhoto,
    },
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleIconClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSaveLogo = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("company_logo", selectedFile);

      if (idCompany) {
        dispatch(changeCompanyLogo({ idCompany, formData }))
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
                dispatch(fetchDetailCompany(idCompany));
              });
            }, 100);
          })
          .catch((error) => {
            const errorMessage =
              error.response?.data?.message ||
              companyMessages.errorChangeCompanyLogo;
            Swal.fire({
              title: appConstants.STATUS_TITLE_ERROR,
              text: errorMessage,
              icon: appConstants.ICON_ERROR,
              confirmButtonText: appConstants.confirmationMessages.confirmText,
            });
          });
      } else {
        dispatch(updateCompanyLogo(selectedFile))
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
                dispatch({ type: "company/updateReset" });
                window.location.reload();
              });
            }, 100);
          })
          .catch((error) => {
            const errorMessage =
              error.response?.data?.message ||
              companyMessages.errorChangeCompanyLogo;
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
        text: companyMessages.errorChangeCompanyLogoNoFile,
        icon: appConstants.ICON_ERROR,
        confirmButtonText: appConstants.confirmationMessages.confirmText,
      });
    }
  };

  useEffect(() => {
    if (idCompany) {
      dispatch(fetchDetailCompany(idCompany));
    } else {
      dispatch(fetchCompany());
    }
  }, [dispatch, idCompany]);

  const profileData = idCompany ? detailCompany : companyData?.data;

  const formatDate = (date) => {
    return dayjs(date).format("MMMM D, YYYY");
  };

  if (loading) {
    return null; // Suspense akan menangani loading fallback
  }

  if (!profileData) {
    return <CustomLoader loading={loading} />;
  }

  return (
    <Card variant="outlined" sx={classes.card}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img
            alt={profileData.company_name}
            src={profileData.company_logo || companyConstants.defaultLogo}
            style={{ width: 200 }}
          />
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Button sx={classes.tabButton} onClick={handleIconClick}>
                <img
                  src={ChangesImageIcon}
                  alt="Edit icon"
                  style={classes.icon}
                />
              </Button>
              <CustomModal open={modalOpen} onClose={handleCloseModal}>
                <CustomModal.Header onClose={handleCloseModal}>
                  {companyConstants.changeCompanyLogo}
                </CustomModal.Header>
                <CustomTabs
                  value={tabValue}
                  onChange={handleTabChange}
                  tabs={tabsChangePhoto}
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
                  onSubmit={handleSaveLogo}
                >
                  {companyConstants.saveButtonLabel}
                </CustomModal.Footer>
              </CustomModal>
            </Box>
          </Box>
        </Box>
        <CustomButton
          colorScheme={"bgBlue"}
          icon={EditProfileIcon}
          onClick={handleOpen}
        >
          {companyConstants.editProfileButtonLabel}
        </CustomButton>
      </Box>

      <Divider sx={{ marginY: "24px" }} />

      <Box sx={classes.section}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>
            {companyConstants.companyNameLabel}
          </Typography>
          <Typography sx={classes.infoValue}>
            {profileData.company_name || "-"}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>
            {companyConstants.founderLabel}
          </Typography>
          <Typography sx={classes.infoValue}>
            {profileData.founder || "-"}
          </Typography>
        </Box>
      </Box>

      <Box sx={classes.section}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>
            {companyConstants.foundedAtLabel}
          </Typography>
          <Typography sx={classes.infoValue}>
            {profileData.founded_at ? formatDate(profileData.founded_at) : "-"}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>
            {companyConstants.phoneLabel}
          </Typography>
          <Typography sx={classes.infoValue}>
            {profileData.phone || "-"}
          </Typography>
        </Box>
      </Box>

      <Box sx={classes.section}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>
            {companyConstants.emailLabel}
          </Typography>
          <Typography sx={classes.infoValue}>
            {profileData.email || "-"}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>
            {companyConstants.addressLabel}
          </Typography>
          <Typography sx={classes.infoValue}>
            {profileData.address || "-"}
          </Typography>
        </Box>
      </Box>

      <Box sx={classes.section}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>
            {companyConstants.latitudeLabel}
          </Typography>
          <Typography sx={classes.infoValue}>
            {profileData.latitude || "-"}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>
            {companyConstants.longitudeLabel}
          </Typography>
          <Typography sx={classes.infoValue}>
            {profileData.longitude || "-"}
          </Typography>
        </Box>
      </Box>

      <Box sx={classes.section}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>
            {companyConstants.provinceLabel}
          </Typography>
          <Typography sx={classes.infoValue}>
            {profileData.province || "-"}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>
            {companyConstants.cityLabel}
          </Typography>
          <Typography sx={classes.infoValue}>
            {profileData.city || "-"}
          </Typography>
        </Box>
      </Box>

      <Box sx={classes.section}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>
            {companyConstants.districtLabel}
          </Typography>
          <Typography sx={classes.infoValue}>
            {profileData.district || "-"}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>
            {companyConstants.zipCodeLabel}
          </Typography>
          <Typography sx={classes.infoValue}>
            {profileData.zip_code || "-"}
          </Typography>
        </Box>
      </Box>

      <Box sx={classes.section}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>
            {companyConstants.joiningDateLabel}
          </Typography>
          <Typography sx={classes.infoValue}>
            {profileData.joining_date
              ? formatDate(profileData.joining_date)
              : "-"}
          </Typography>
        </Box>
      </Box>

      {/* AddOrEditCompany Modal */}
      <AddOrEditCompany
        open={open}
        handleClose={handleClose}
        isEditMode={true}
        companyId={isSuperAdmin && open ? idCompany : undefined}
      />
    </Card>
  );
};

const useStyles = () => {
  return {
    card: {
      p: 2,
      m: 2,
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
  };
};

export default CompanyDetail;
