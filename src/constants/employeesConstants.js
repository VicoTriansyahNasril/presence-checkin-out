import ICONS from "./iconConstants";

// Table columns configuration
export const TABLE_COLUMNS = [
  {
    field: "departmentName",
    headerName: "Department",
    flex: 1.5,
  },
  {
    field: "employeeName",
    headerName: "Employee Name",
    flex: 2.2,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
  },
  {
    field: "roleCurrentCompany",
    headerName: "Role",
    flex: 1.2,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    flex: 1,
  },
];

// Header modal
export const HEADER_MODAL = {
  ADD: "Add Employee",
  EDIT: "Edit Employee Information",
};

// Modal button name
export const MODAL_BUTTONS = {
  SAVE: "Save",
  ADD: "Add",
  CANCEL: "Cancel",
};

// Label tabs
export const LABEL_TABS = {
  PERSONAL: "Personal Information",
  PROFESSIONAL: "Professional Information",
  CHANGE_PASSWORD: "Change Password",
  ADD_ONE: "Add One",
  IMPORT: "Import from Document",
};

// Tab configurations
export const ADD_TABS = [
  {
    icon: ICONS.ADD,
    iconActive: ICONS.ADD_ACTIVE,
    label: LABEL_TABS.ADD_ONE,
  },
  {
    icon: ICONS.IMPORT,
    iconActive: ICONS.IMPORT_ACTIVE,
    label: LABEL_TABS.IMPORT,
  },
];

export const EDIT_TABS = [
  {
    icon: ICONS.USER,
    iconActive: ICONS.USER_ACTIVE,
    label: LABEL_TABS.PERSONAL,
  },
  {
    icon: ICONS.PROFESSIONAL,
    iconActive: ICONS.PROFESSIONAL_ACTIVE,
    label: LABEL_TABS.PROFESSIONAL,
  },
  {
    icon: ICONS.PEN,
    iconActive: ICONS.PEN_ACTIVE,
    label: LABEL_TABS.CHANGE_PASSWORD,
  },
];

// Download Template for Import employee
export const DOWNLOAD_IMPORT_EMPLOYEE = "/docs/import-employee.xlsx";

// Action buttons on field status
export const ACTION_BUTTONS = {
  ICON_VIEW: ICONS.VIEW,
  TOOLTIP_VIEW: "View Details",
  ICON_EDIT: ICONS.EDIT,
  TOOLTIP_EDIT: "Edit Employee",
  ICON_DELETE: ICONS.DELETE,
  TOOLTIP_DELETE: "Delete Employee",
};

// Options status on form
export const OPTIONS_STATUS = [
  { label: "Contract", value: "Contract" },
  { label: "OJT", value: "OJT" },
  { label: "Permanent", value: "Permanent" },
  { label: "Freelance", value: "Freelance" },
];
