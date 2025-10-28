import ICONS from "./iconConstants";

// Kolom tabel attendance
export const ATTENDANCE_COLUMNS = [
  { field: "date", headerName: "Date", flex: 1 },
  { field: "checkIn", headerName: "Check In", flex: 1 },
  { field: "checkOut", headerName: "Check Out", flex: 1 },
  { field: "workingHours", headerName: "Working Hours", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
];

// Kolom tabel leave
export const LEAVE_COLUMNS = [
  { field: "leave_type", headerName: "Leave Type", flex: 0.8 },
  { field: "date", headerName: "Date", flex: 1 },
  { field: "leave_duration", headerName: "Duration", flex: 1.3 },
  { field: "leave_days", headerName: "Days", flex: 0.5 },
  { field: "status", headerName: "Status", flex: 0.5 },
];

// Tabs sidebar
export const TABS_SIDEBAR = [
  {
    icon: ICONS.USER,
    iconActive: ICONS.USER_PROFILE_ACTIVE,
    label: "Profile",
  },
  {
    icon: ICONS.ATTENDANCES,
    iconActive: ICONS.ATTENDANCES_PROFILE_ACTIVE,
    label: "Attendance",
  },
  {
    icon: ICONS.LEAVES,
    iconActive: ICONS.LEAVES_PROFILE_ACTIVE,
    label: "Leave",
  },
];

// Tabs profil
export const TABS_PROFILE = [
  {
    icon: ICONS.USER,
    iconActive: ICONS.USER_ACTIVE,
    label: "Personal Information",
  },
  {
    icon: ICONS.PROFESSIONAL,
    iconActive: ICONS.PROFESSIONAL_ACTIVE,
    label: "Professional Information",
  },
];

// Tabs perubahan foto
export const TABS_CHANGE_PHOTO = [
  {
    icon: ICONS.IMPORT,
    iconActive: ICONS.IMPORT_ACTIVE,
    label: "Choose Photo",
  },
];

// Function to display the value or a default placeholder
const displayValue = (value) => value || "-";

// Personal Information
export const PERSONAL_INFO = (personalInfo) => [
  { label: "First Name", value: displayValue(personalInfo?.first_name) },
  { label: "Last Name", value: displayValue(personalInfo?.last_name) },
  { label: "Date of Birth", value: displayValue(personalInfo?.date_of_birth) },
  { label: "Gender", value: displayValue(personalInfo?.gender) },
  {
    label: "Marital Status",
    value: displayValue(personalInfo?.marital_status),
  },
  { label: "Mobile Number", value: displayValue(personalInfo?.mobile_number) },
  { label: "Nationality", value: displayValue(personalInfo?.nationality) },
  { label: "Address", value: displayValue(personalInfo?.address) },
  { label: "Province", value: displayValue(personalInfo?.province) },
  { label: "City", value: displayValue(personalInfo?.city) },
  { label: "District", value: displayValue(personalInfo?.district) },
  { label: "Zip Code", value: displayValue(personalInfo?.zip_code) },
];

// Professional Information
export const PROFESSIONAL_INFO = (professionalInfo) => [
  {
    label: "Employee Number",
    value: displayValue(professionalInfo?.employee_number),
  },
  { label: "Username", value: displayValue(professionalInfo?.username) },
  { label: "Status", value: displayValue(professionalInfo?.status) },
  { label: "Email Address", value: displayValue(professionalInfo?.email) },
  {
    label: "Department",
    value: displayValue(professionalInfo?.department_name),
  },
  {
    label: "Role in Current Company",
    value: displayValue(professionalInfo?.role_current_company),
  },
  {
    label: "Role in Client",
    value: displayValue(professionalInfo?.role_in_client),
  },
  {
    label: "Joining Date",
    value: displayValue(professionalInfo?.joining_date),
  },
];
