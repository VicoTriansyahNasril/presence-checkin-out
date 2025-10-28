import ICONS_IMPORT from "./iconConstants";

const adminConstants = {
  // Titles and Headers
  addNewAdmin: "Add New Administrator",
  editAdmin: "Edit Administrator",
  dateFilter: "Date Filter",

  // Buttons
  addButtonLabel: "Add",
  saveButtonLabel: "Save",
  editProfileButtonLabel: "Edit Profile",
  applyButtonLabel: "Apply",

  // Labels
  choosePhoto: "Choose Photo",
  changeAdminPhoto: "Change Admin Photo",
  adminInformationTab: "Admin Information Tab",
  adminInformation: "Admin Information",
  changePassword: "Change Password",
  firstNameLabel: "First Name",
  lastNameLabel: "Last Name",
  usernameLabel: "Username",
  emailLabel: "Email Address",
  passwordLabel: "Password",
  confirmPasswordLabel: "Confirm Password",
  newPasswordLabel: "New Password",
  retypeNewPasswordLabel: "Retype New Password",
  companyNameLabel: "Company Name",
  companyOriginLabel: "Company Origin",
};

// Icon imports
export const ICONS = {
  EXPORT: "/assets/icons/export.svg",
  ADD_CIRCLE: "/assets/icons/add-circle.svg",
  ADD: "/assets/icons/user.svg",
  ADD_ACTIVE: "/assets/icons/user-active.svg",
  IMPORT: "/assets/icons/file-add-black.svg",
  IMPORT_ACTIVE: "/assets/icons/file-add-active.svg",
  VIEW: "/assets/icons/view.svg",
  EDIT: "/assets/icons/edit.svg",
  DELETE: "/assets/icons/trash.svg",
  DOWNLOAD_TEMPLATE: "/assets/icons/download-template.svg",
  USER: "/assets/icons/user.svg",
  USER_ACTIVE: "/assets/icons/user-active.svg",
  PEN: "/assets/icons/pen.svg",
  PEN_ACTIVE: "/assets/icons/pen-active.svg",
  PROFESSIONAL: "/assets/icons/professional.svg",
  PROFESSIONAL_ACTIVE: "/assets/icons/professional-active.svg",
  CALENDAR: "/assets/icons/calendar.svg",
};

// Table columns configuration
export const TABLE_COLUMNS = [
  {
    field: "company_name",
    headerName: "Company Name",
    flex: 1.5,
    renderCell: (params) => params.row.company_name || "-",
  },
  {
    field: "fullname",
    headerName: "Administrator Name",
    flex: 2,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 0.8,
  },
  {
    field: "created_date",
    headerName: "Joining Date",
    flex: 1.2,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    flex: 0.8,
  },
];

export const TABS = [
  {
    icon: ICONS_IMPORT.USER,
    iconActive: ICONS_IMPORT.USER_ADMIN,
    label: adminConstants.adminInformation,
  },
];

export const TABS_CHANGE_PHOTO = [
  {
    icon: ICONS_IMPORT.IMPORT,
    iconActive: ICONS_IMPORT.IMPORT_ACTIVE,
    label: adminConstants.choosePhoto,
  },
];

export default adminConstants;
