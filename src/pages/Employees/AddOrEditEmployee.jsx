import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CustomModal,
  CustomTabs,
  CustomLoader,
} from "../../components/Elements";
import {
  addEmployee,
  importEmployee,
  fetchAllEmployees,
  editPersonalEmployee,
  editProfessionalEmployee,
  editPassword,
} from "../../redux/slices/employeeSlice";
import {
  ADD_TABS,
  EDIT_TABS,
  MODAL_BUTTONS,
  LABEL_TABS,
  HEADER_MODAL,
} from "../../constants/employeesConstants";
import AddOrEditEmployeeForm from "./AddOrEditEmployeeForm";
import Swal from "sweetalert2";
import employeeMessages from "../../messages/employeeMessages";

const AddOrEditEmployee = ({
  open,
  handleClose,
  employeeId,
  isEditMode,
  paginationModel,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const formRef = useRef();
  const loading = useSelector((state) => state.employees.loading);
  const personalInfo = useSelector((state) => state.employees.personalInfo);
  const professionalInfo = useSelector(
    (state) => state.employees.professionalInfo
  );

  // Unified state for all form values
  const [formValues, setFormValues] = useState({
    // Personal Info
    first_name: "",
    last_name: "",
    date_of_birth: "",
    mobile_number: "",
    gender: "",
    marital_status: "",
    nationality: "",
    address: "",
    province: "",
    city: "",
    district: "",
    zip_code: "",
    // Professional Info
    employee_number: "",
    username: "",
    status: "",
    id_department: "",
    email: "",
    role_current_company: "",
    role_in_client: "",
    joining_date: "",
    // Password
    new_password: "",
    retype_new_password: "",
    // Add new employee
    password: "",
  });

  const replaceNullWithEmptyString = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        value === null ? "" : value,
      ])
    );
  };

  useEffect(() => {
    if (isEditMode && personalInfo && professionalInfo && employeeId) {
      setFormValues((prevState) => ({
        ...prevState,
        ...replaceNullWithEmptyString(personalInfo),
        ...replaceNullWithEmptyString(professionalInfo),
      }));
    }
  }, [isEditMode, personalInfo, professionalInfo, employeeId]);

  const handleSubmit = (data, file) => {
    let action;
    let payload;

    if (isEditMode) {
      switch (tabValue) {
        case 0:
          action = editPersonalEmployee;
          break;
        case 1:
          action = editProfessionalEmployee;
          break;
        case 2:
          action = editPassword;
          break;
        default:
          console.error("Invalid tab value for edit mode");
          return;
      }
      payload = { id_employee: employeeId, formData: data };
    } else {
      tabValue === 0
        ? ((action = addEmployee), (payload = data))
        : ((action = importEmployee), (payload = file));
    }

    dispatch(action(payload))
      .unwrap()
      .then((response) => {
        handleClose();
        if (response.status === "Error") {
          throw new Error(response.message);
        }
        Swal.fire({
          title: employeeMessages.SWAL_MESSAGES.TITLE_SUCCESS,
          text: response.message,
          icon: employeeMessages.SWAL_MESSAGES.ICON_SUCCESS,
          confirmButtonText: employeeMessages.SWAL_MESSAGES.CONFIRM_BUTTON,
        }).then(() => {
          dispatch(fetchAllEmployees({ ...paginationModel }));
        });
      })
      .catch((error) => {
        handleClose();
        Swal.fire({
          title: employeeMessages.SWAL_MESSAGES.TITLE_ERROR,
          text: error.message,
          icon: employeeMessages.SWAL_MESSAGES.ICON_ERROR,
          confirmButtonText: employeeMessages.SWAL_MESSAGES.CONFIRM_BUTTON,
        }).then(() => {
          dispatch(fetchAllEmployees({ ...paginationModel }));
        });
      });
  };

  const renderContent = () => {
    const getTabName = () => {
      if (isEditMode) {
        switch (tabValue) {
          case 0:
            return LABEL_TABS.PERSONAL;
          case 1:
            return LABEL_TABS.PROFESSIONAL;
          case 2:
            return LABEL_TABS.CHANGE_PASSWORD;
          default:
            return "";
        }
      } else {
        return tabValue === 0 ? LABEL_TABS.ADD_ONE : LABEL_TABS.IMPORT;
      }
    };

    return (
      <>
        {loading ? (
          <CustomLoader loading={loading} withBackground={false} />
        ) : (
          <AddOrEditEmployeeForm
            ref={formRef}
            initialValues={formValues}
            onSubmit={handleSubmit}
            tabName={getTabName()}
          />
        )}
      </>
    );
  };

  return (
    <CustomModal open={open} onClose={handleClose}>
      <CustomModal.Header onClose={handleClose}>
        {isEditMode ? HEADER_MODAL.EDIT : HEADER_MODAL.ADD}
      </CustomModal.Header>
      <CustomTabs
        value={tabValue}
        onChange={(_, newValue) => setTabValue(newValue)}
        tabs={isEditMode ? EDIT_TABS : ADD_TABS}
      />
      {renderContent()}
      <CustomModal.Footer
        onSubmit={() => formRef.current?.submitForm()}
        onClose={handleClose}
      >
        {isEditMode ? MODAL_BUTTONS.SAVE : MODAL_BUTTONS.ADD}
      </CustomModal.Footer>
    </CustomModal>
  );
};

export default AddOrEditEmployee;
