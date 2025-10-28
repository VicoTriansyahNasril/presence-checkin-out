import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { CustomLoader } from "../../components/Elements";
import CustomModal from "../../components/Elements/CustomModal";
import {
  fetchDetailCompany,
  addNewCompany,
  updateCompanyProfile,
  editCompany,
} from "../../redux/slices/companySlice";
import dayjs from "dayjs";
import companyConstants from "../../constants/companyConstants";
import appConstants from "../../constants/appConstants";
import companyMessages from "../../messages/companyMessages";
import AddOrEditCompanyForm from "./AddOrEditCompanyForm";

const AddOrEditCompany = ({ open, handleClose, companyId, isEditMode }) => {
  const dispatch = useDispatch();

  // Mendapatkan data user dari localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Conditional rendering berdasarkan role
  const isSuperAdmin = user?.role === "Superadmin";

  const companyData = useSelector((state) =>
    isSuperAdmin ? state.company.detailCompany : state.company.data
  );

  const loading = useSelector((state) => state.company.loading);

  const [initialValues, setInitialValues] = useState({
    company_name: "",
    founder: "",
    founded_at: "",
    email: "",
    phone: "",
    address: "",
    latitude: "",
    longitude: "",
    state: "",
    city: "",
    district: "",
    zip_code: "",
    joining_date: "",
  });

  // Fetch data if editing
  useEffect(() => {
    if (isEditMode && companyId && !companyData) {
      dispatch(fetchDetailCompany(companyId));
    }
  }, [dispatch, companyId, isEditMode, companyData]);

  // Set initial values based on fetched data
  useEffect(() => {
    if (companyData && isEditMode) {
      if (isSuperAdmin) {
        console.log("companyData", companyData);

        setInitialValues({
          company_name: companyData?.company_name || "",
          founder: companyData?.founder || "",
          founded_at: companyData?.founded_at
            ? dayjs(companyData?.founded_at).format("YYYY-MM-DD")
            : "",
          email: companyData?.email || "",
          phone: companyData?.phone || "",
          address: companyData?.address || "",
          state: companyData?.province || "",
          city: companyData?.city || "",
          district: companyData?.district || "",
          zip_code: companyData?.zip_code || "",
          joining_date: companyData?.joining_date
            ? dayjs(companyData?.joining_date).format("YYYY-MM-DD")
            : "",
        });
      } else {
        setInitialValues({
          company_name: companyData?.data?.company_name || "",
          founder: companyData?.data?.founder || "",
          founded_at: companyData?.data?.founded_at
            ? dayjs(companyData?.data?.founded_at).format("YYYY-MM-DD")
            : "",
          email: companyData?.data?.email || "",
          phone: companyData?.data?.phone || "",
          address: companyData?.data?.address || "",
          latitude: companyData?.data?.latitude || "",
          longitude: companyData?.data?.longitude || "",
          state: companyData?.data?.province || "",
          city: companyData?.data?.city || "",
          district: companyData?.data?.district || "",
          zip_code: companyData?.data?.zip_code || "",
          joining_date: companyData?.data?.joining_date
            ? dayjs(companyData?.data?.joining_date).format("YYYY-MM-DD")
            : "",
        });
      }
    }
  }, [companyData, isEditMode, isSuperAdmin]);

  const handleSaveCompanyInfo = (values) => {
    if (isEditMode) {
      if (isSuperAdmin) {
        dispatch(editCompany({ id: companyId, data: values }))
          .unwrap()
          .then((response) => {
            const { message } = response;
            handleClose();
            Swal.fire({
              title: appConstants.STATUS_TITLE_SUCCESS,
              text: message,
              icon: appConstants.ICON_SUCCESS,
              confirmButtonText: appConstants.confirmationMessages.confirmText,
            }).then(() => {
              dispatch({ type: "company/updateReset" });
              window.location.reload();
            });
          })
          .catch((error) => {
            const errorMessage =
              error.response?.data?.message || companyMessages.errorEdit;
            Swal.fire({
              title: appConstants.STATUS_TITLE_ERROR,
              text: errorMessage,
              icon: appConstants.ICON_ERROR,
              confirmButtonText: appConstants.confirmationMessages.confirmText,
            });
          });
      } else {
        dispatch(updateCompanyProfile({ id: companyId, ...values }))
          .unwrap()
          .then((response) => {
            const { message } = response;
            handleClose();
            Swal.fire({
              title: appConstants.STATUS_TITLE_SUCCESS,
              text: message,
              icon: appConstants.ICON_SUCCESS,
              confirmButtonText: appConstants.confirmationMessages.confirmText,
            }).then(() => {
              dispatch({ type: "company/updateReset" });
              window.location.reload();
            });
          })
          .catch((error) => {
            const errorMessage =
              error.response?.data?.message || companyMessages.errorEdit;
            Swal.fire({
              title: appConstants.STATUS_TITLE_ERROR,
              text: errorMessage,
              icon: appConstants.ICON_ERROR,
              confirmButtonText: appConstants.confirmationMessages.confirmText,
            });
          });
      }
    } else {
      console.log("New Data Company:", values);

      dispatch(addNewCompany(values))
        .unwrap()
        .then((response) => {
          const { message } = response;
          handleClose();
          Swal.fire({
            title: appConstants.STATUS_TITLE_SUCCESS,
            text: message,
            icon: appConstants.ICON_SUCCESS,
            confirmButtonText: appConstants.confirmationMessages.confirmText,
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message || companyMessages.errorAdd;
          Swal.fire({
            title: appConstants.STATUS_TITLE_ERROR,
            text: errorMessage,
            icon: appConstants.ICON_ERROR,
            confirmButtonText: appConstants.confirmationMessages.confirmText,
          });
        });
    }
  };

  if (loading) {
    return <CustomLoader loading={loading} />;
  }

  return (
    <CustomModal open={open} onClose={handleClose}>
      <CustomModal.Header onClose={handleClose}>
        {isEditMode
          ? companyConstants.editCompany
          : companyConstants.addNewCompany}
      </CustomModal.Header>
      <AddOrEditCompanyForm
        open={open}
        onClose={handleClose}
        companyId={companyId}
        isEditMode={isEditMode}
        onSubmit={handleSaveCompanyInfo}
        initialValues={initialValues} // Pass initial values
      />
    </CustomModal>
  );
};

export default AddOrEditCompany;
