import React, { useState, useEffect } from "react";
import CustomModal from "../../components/Elements/CustomModal";
import CustomTabs from "../../components/Elements/CustomTabs";
import AddOrEditAdminInformationForm from "./AddOrEditAdminInformationForm";
import ChangePasswordAdminForm from "./ChangePasswordAdminForm";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdmin,
  saveAdminInformation,
  saveAdminPassword,
  fetchEditAdminData,
  fetchEditPassword,
  fetchAdminDetail,
} from "../../redux/slices/adminSlice";
import Swal from "sweetalert2";
import { Formik, Form } from "formik";
import adminConstants from "../../constants/adminConstants";
import appConstants from "../../constants/appConstants";
import adminMessages from "../../messages/adminMessages";
import {
  editAdminInformationSchema,
  changePasswordSchema,
} from "../../validation/adminValidation";
import { ICONS } from "../../constants/adminConstants";
import { useNavigate } from "react-router-dom";

const AdminEdit = ({
  open,
  handleClose,
  adminDataProps,
  companyData,
  fetchData,
  setPage,
}) => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isSuperAdmin = currentUser?.role === "Superadmin";
  const adminData = useSelector((state) => state.admin.data);
  const loading = useSelector((state) => state.admin.loading);
  const [idAdmin, setIdAdmin] = useState(adminData?.id_admin || "");

  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    id_company: "",
  });

  useEffect(() => {
    if (open) {
      if (!isSuperAdmin) {
        dispatch(fetchAdmin());
      }
    }
  }, [dispatch, open, isSuperAdmin]);

  useEffect(() => {
    if (adminData && !isSuperAdmin) {
      setInitialValues({
        first_name: adminData.data.first_name || "",
        last_name: adminData.data.last_name || "",
        username: adminData.data.username || "",
        email: adminData.data.email || "",
        id_company: adminData?.company?.id_company || "",
        company_name: adminData?.company?.company_name || "",
      });
      setIdAdmin(adminData?.id_admin);
    } else if (adminDataProps && isSuperAdmin) {
      setInitialValues({
        first_name: adminDataProps?.first_name || "",
        last_name: adminDataProps?.last_name || "",
        username: adminDataProps?.username || "",
        email: adminDataProps?.email || "",
        id_company: adminDataProps?.company?.id_company || "",
        company_name: adminDataProps?.company?.company_name || "",
      });
      setIdAdmin(adminDataProps?.id_admin);
    }
  }, [adminData, adminDataProps]);

  const handleSaveAdminInfo = (values) => {
    if (isSuperAdmin && idAdmin) {
      dispatch(fetchEditAdminData({ id: idAdmin, adminData: values }))
        .unwrap()
        .then(() => {
          Swal.fire(
            appConstants.STATUS_TITLE_SUCCESS,
            adminMessages.successEdit,
            appConstants.ICON_SUCCESS
          );
          if (fetchData) {
            fetchData();
            setPage(1);
            handleClose();
          } else {
            handleClose(true);
            dispatch(fetchAdminDetail(idAdmin));
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire(
            appConstants.STATUS_TITLE_ERROR,
            adminMessages.errorEdit,
            appConstants.ICON_ERROR
          );
        });
    } else {
      dispatch(saveAdminInformation(values))
        .unwrap()
        .then((response) => {
          const { message } = response;
          handleClose();
          setTimeout(() => {
            Swal.fire({
              title: appConstants.STATUS_TITLE_SUCCESS,
              text: message,
              icon: appConstants.ICON_SUCCESS,
              confirmButtonText: appConstants.confirmationMessages.confirmText,
            }).then(() => {
              dispatch({ type: "admin/updateReset" });
              window.location.reload();
              fetchData();
              setPage(1);
            });
          }, 300);
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message || adminMessages.errorEdit;
          Swal.fire({
            title: appConstants.STATUS_TITLE_ERROR,
            text: errorMessage,
            icon: appConstants.ICON_ERROR,
            confirmButtonText: appConstants.confirmationMessages.confirmText,
          });
        });
    }
  };

  const handleSavePassword = (values) => {
    if (isSuperAdmin && idAdmin) {
      dispatch(
        fetchEditPassword({ id: idAdmin, password: values.new_password })
      )
        .unwrap()
        .then(() => {
          Swal.fire(
            appConstants.STATUS_TITLE_SUCCESS,
            adminMessages.successChangePassword,
            appConstants.ICON_SUCCESS
          );
          handleClose();
        })
        .catch(() => {
          Swal.fire(
            appConstants.STATUS_TITLE_ERROR,
            adminMessages.errorChangePassword,
            appConstants.ICON_ERROR
          );
        });
    } else {
      dispatch(saveAdminPassword(values))
        .unwrap()
        .then((response) => {
          const { message } = response;
          handleClose();
          setTimeout(() => {
            Swal.fire({
              title: appConstants.STATUS_TITLE_SUCCESS,
              text: message,
              icon: appConstants.ICON_SUCCESS,
              confirmButtonText: appConstants.confirmationMessages.confirmText,
            }).then(() => {
              dispatch({ type: "admin/updateReset" });
            });
          }, 300);
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message || adminMessages.errorChangePassword;
          Swal.fire({
            title: appConstants.STATUS_TITLE_ERROR,
            text: errorMessage,
            icon: appConstants.ICON_ERROR,
            confirmButtonText: appConstants.confirmationMessages.confirmText,
          });
        });
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const tabs = [
    {
      icon: ICONS.USER,
      iconActive: ICONS.USER_ACTIVE,
      label: adminConstants.adminInformation,
    },
    {
      icon: ICONS.PEN,
      iconActive: ICONS.PEN_ACTIVE,
      label: adminConstants.changePassword,
    },
  ];

  if (loading) {
    return <p>Loading...</p>; // Menampilkan loading jika data sedang diambil
  }

  return (
    <CustomModal open={open} onClose={handleClose}>
      <CustomModal.Header onClose={handleClose}>
        {adminConstants.editAdmin}
      </CustomModal.Header>
      <CustomTabs value={tabValue} onChange={handleTabChange} tabs={tabs} />
      {tabValue === 0 && adminData && (
        <Formik
          initialValues={initialValues}
          validationSchema={editAdminInformationSchema}
          onSubmit={handleSaveAdminInfo}
          enableReinitialize={true}
        >
          {({ values, handleChange, handleBlur, touched, errors, isValid }) => (
            <Form>
              <AddOrEditAdminInformationForm
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
                errors={errors}
                dataCompanyMaster={companyData}
                isEditMode={true}
              />
              <CustomModal.Footer
                onClose={handleClose}
                onSubmit={() => handleSaveAdminInfo(values)}
                disableSubmit={!isValid}
              >
                {adminConstants.saveButtonLabel}
              </CustomModal.Footer>
            </Form>
          )}
        </Formik>
      )}
      {tabValue === 1 && (
        <Formik
          initialValues={{ new_password: "", retype_new_password: "" }}
          validationSchema={changePasswordSchema}
          onSubmit={handleSavePassword}
        >
          {({
            values,
            handleChange,
            handleBlur,
            touched,
            errors,
            isValid,
            dirty,
          }) => (
            <Form>
              <ChangePasswordAdminForm
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
                errors={errors}
              />
              <CustomModal.Footer
                onClose={handleClose}
                onSubmit={() => handleSavePassword(values)}
                disableSubmit={!isValid || !dirty}
              >
                {adminConstants.saveButtonLabel}
              </CustomModal.Footer>
            </Form>
          )}
        </Formik>
      )}
    </CustomModal>
  );
};

export default AdminEdit;
