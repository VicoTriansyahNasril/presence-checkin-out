import * as Yup from "yup";
import messages from "../messages/validationMessages";
import { LABEL_TABS } from "../constants/employeesConstants";

const createValidationSchema = (tabName, isEditMode) => {
  const personalSchema = {
    first_name: Yup.string()
      .required(messages.first_name.required)
      .min(2, messages.first_name.minLength)
      .max(50, messages.first_name.maxLength)
      .matches(/^[A-Za-z\s]+$/, messages.first_name.invalid),
    last_name: Yup.string()
      .required(messages.last_name.required)
      .min(2, messages.last_name.minLength)
      .max(50, messages.last_name.maxLength)
      .matches(/^[A-Za-z\s]+$/, messages.last_name.invalid),
    date_of_birth: Yup.date(),
    mobile_number: Yup.string()
      .matches(/^[0-9]+$/, messages.phone.digitsOnly)
      .min(10, messages.phone.minLength)
      .max(13, messages.phone.maxLength),
    gender: Yup.string(),
    marital_status: Yup.string(),
    nationality: Yup.string(),
    address: Yup.string()
      .min(5, messages.address.minLength)
      .max(255, messages.address.maxLength),
    province: Yup.string(),
    city: Yup.string(),
    district: Yup.string(),
    zip_code: Yup.string(),
  };

  const professionalSchema = {
    employee_number: Yup.string()
      .required(messages.employee_number.required)
      .matches(/^[0-9]+$/, messages.employee_number.digitsOnly)
      .min(7, messages.employee_number.minLength)
      .max(20, messages.employee_number.maxLength),
    username: Yup.string()
      .required(messages.username.required)
      .min(7, messages.username.minLength)
      .max(20, messages.username.maxLength),
    status: Yup.string(),
    email: Yup.string()
      .email(messages.email.invalid)
      .required(messages.email.required),
    id_department: Yup.string().required(messages.id_department.required),
    role_current_company: Yup.string()
      .required(messages.role_current_company.required)
      .min(3, messages.role_current_company.minLength)
      .max(50, messages.role_current_company.maxLength),
    role_in_client: Yup.string(),
    joining_date: Yup.date().required(messages.joining_date.required),
  };

  const changePasswordSchema = {
    new_password: Yup.string()
      .required(messages.password.required)
      .min(7, messages.password.minLength)
      .max(50, messages.password.maxLength),
    retype_new_password: Yup.string()
      .required(messages.confirmPassword.required)
      .oneOf(
        [Yup.ref("new_password"), null],
        messages.confirmPassword.notMatch
      ),
  };

  const addEmployee = {
    first_name: Yup.string()
      .required(messages.first_name.required)
      .min(2, messages.first_name.minLength)
      .max(50, messages.first_name.maxLength)
      .matches(/^[A-Za-z\s]+$/, messages.first_name.invalid),
    last_name: Yup.string()
      .required(messages.last_name.required)
      .min(2, messages.last_name.minLength)
      .max(50, messages.last_name.maxLength)
      .matches(/^[A-Za-z\s]+$/, messages.last_name.invalid),
    username: Yup.string()
      .required(messages.username.required)
      .min(7, messages.username.minLength)
      .max(20, messages.username.maxLength),
    password: Yup.string()
      .required(messages.password.required)
      .min(7, messages.password.minLength)
      .max(50, messages.password.maxLength),
    email: Yup.string()
      .email(messages.email.invalid)
      .required(messages.email.required),
    employee_number: Yup.string()
      .required(messages.employee_number.required)
      .matches(/^[0-9]+$/, messages.employee_number.digitsOnly)
      .min(7, messages.employee_number.minLength)
      .max(20, messages.employee_number.maxLength),
    id_department: Yup.string().required(messages.id_department.required),
    role_current_company: Yup.string()
      .required(messages.role_current_company.required)
      .min(3, messages.role_current_company.minLength)
      .max(50, messages.role_current_company.maxLength),
  };

  let schema = {};

  switch (tabName) {
    case LABEL_TABS.PERSONAL:
      schema = personalSchema;
      break;
    case LABEL_TABS.PROFESSIONAL:
      schema = professionalSchema;
      break;
    case LABEL_TABS.CHANGE_PASSWORD:
      schema = changePasswordSchema;
      break;
    case LABEL_TABS.ADD_ONE:
      schema = addEmployee;
      break;
    default:
      schema = {};
  }

  // If in edit mode, make all fields optional
  if (isEditMode) {
    Object.keys(schema).forEach((key) => {
      schema[key] = schema[key].optional();
    });
  }

  return Yup.object().shape(schema);
};

export default createValidationSchema;
