import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { validationSchema } from "../../validation/adminValidation";
import { addAdmin } from "../../redux/slices/adminSlice";
import { fetchCompanies } from "../../redux/slices/companySlice";
import { CustomModal } from "../../components/Elements";
import AddOrEditAdminInformationForm from "./AddOrEditAdminInformationForm";
import adminConstants from "../../constants/adminConstants";
import appConstants from "../../constants/appConstants";
import adminMessages from "../../messages/adminMessages";

const AdminAdd = ({ open, onClose, fetchData, setPage }) => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.companies);

  useEffect(() => {
    if (open) {
      dispatch(fetchCompanies());
    }
  }, [open, dispatch]);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      id_company: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      const requestData = {
        first_name: values.first_name,
        last_name: values.last_name,
        username: values.username,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        id_company: values.id_company,
      };

      try {
        await dispatch(addAdmin(requestData)).unwrap();
        Swal.fire({
          title: appConstants.STATUS_TITLE_SUCCESS,
          text: adminMessages.successAdd,
          icon: appConstants.ICON_SUCCESS,
          confirmButtonText: appConstants.confirmationMessages.confirmText,
        }).then((result) => {
          if (result.isConfirmed) {
            fetchData();
            setPage(1);
          }
        });
        resetForm();
        onClose();
      } catch (error) {
        if (
          error &&
          error.status === 400 &&
          error.message === adminMessages.errorUsernameAlreadyExist
        ) {
          setFieldError("username", adminMessages.errorUsernameAlreadyExist);
        } else if (error) {
          setFieldError("username", adminMessages.errorUsernameAlreadyExist);
        } else {
          Swal.fire({
            title: appConstants.STATUS_TITLE_ERROR,
            text: adminMessages.errorAdd,
            icon: appConstants.ICON_ERROR,
            confirmButtonText: appConstants.confirmationMessages.confirmText,
          });
        }
      }
    },
  });

  return (
    <CustomModal open={open} onClose={onClose}>
      <CustomModal.Header onClose={onClose}>
        {adminConstants.addNewAdmin}
      </CustomModal.Header>
      <AddOrEditAdminInformationForm
        values={formik.values}
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        touched={formik.touched}
        errors={formik.errors}
        dataCompanyMaster={companies}
        isEditMode={false}
      />
      <CustomModal.Footer onClose={onClose} onSubmit={formik.handleSubmit}>
        {adminConstants.addButtonLabel}
      </CustomModal.Footer>
    </CustomModal>
  );
};

export default AdminAdd;
