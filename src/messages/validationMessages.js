const messages = {
  first_name: {
    required: "First name is required",
    minLength: "First name must be at least 2 characters",
    maxLength: "First name must be at most 50 characters",
    invalid: "First name must not contain numbers",
  },
  last_name: {
    required: "Last name is required",
    minLength: "Last name must be at least 2 characters",
    maxLength: "Last name must be at most 50 characters",
    invalid: "Last name must not contain numbers",
  },
  email: {
    required: "Email is required",
    invalid: "Invalid email address",
  },
  username: {
    required: "Username is required",
    minLength: "Username must be at least 7 characters",
    maxLength: "Username must be at most 20 characters",
  },
  id_company: {
    required: "Company is required",
  },
  password: {
    required: "Password is required",
    minLength: "Password must be at least 8 characters",
    maxLength: "Password must be at most 50 characters",
  },
  confirmPassword: {
    required: "Confirm Password is required",
    notMatch: "Passwords must match",
  },
  company_name: {
    required: "Company Name is required",
    minLength: "Company Name must be at least 3 characters long",
  },
  email: {
    invalid: "Invalid email format",
    required: "Email is required",
  },
  phone: {
    digitsOnly: "Phone number must be digits only",
    minLength: "Phone number must be at least 10 digits",
    maxLength: "Phone number cannot exceed 15 digits",
    required: "Phone is required",
  },
  address: {
    required: "Address is required",
    minLength: "Address must be at least 5 characters",
    maxLength: "Address cannot exceed 255 characters",
    latitude: "Latitude must be between -90 and 90",
    longitude: "Longitude must be between -180 and 180",
  },
  state: {
    required: "Province is required",
  },
  city: {
    required: "City is required",
  },
  zip_code: {
    digitsOnly: "Zip Code must be digits only",
    minLength: "Zip Code must be at least 5 digits",
    maxLength: "Zip Code cannot exceed 10 digits",
    required: "Zip Code is required",
  },
  joining_date: {
    required: "Joining Date is required",
    max: "Joining Date cannot be in the future",
  },
  file: {
    required: "Field must not be empty",
    size: "Max photo's size is 2MB",
    format: "Format must be .jpg/.jpeg/.png",
  },
  department_name: {
    required: "Department name is required",
    minLength: "Department name must be at least 1 character",
    maxLength: "Department name cannot exceed 100 characters",
  },
  employee_number: {
    required: "Employee Number is required",
    digitsOnly: "Employee number must be digits only",
    minLength: "Employee number must be at least 7 digits",
    maxLength: "Employee number must not exceed 20 digits",
  },
  id_department: {
    required: "Department is required",
  },
  role_current_company: {
    required: "Role in Current Company is required",
    minLength: "Role in Current Company must be at least 3 characters",
    maxLength: "Role in Current Company must not exceed 50 characters",
  },
  role_in_client: {
    required: "Role in Client is required",
    minLength: "Role in Client must be at least 3 characters",
    maxLength: "Role in Client must not exceed 50 characters",
  },
  status: {
    required: "Status is required",
  },
};

export default messages;
