const companyConstants = {
  // Titles and Headers
  addNewCompany: "Add New Company",
  editCompany: "Edit Company Information",
  dateFilter: "Date Filter",

  // Buttons
  addButtonLabel: "Add Company",
  saveButtonLabel: "Save",
  editProfileButtonLabel: "Edit Profile",
  applyButtonLabel: "Apply",

  // Labels
  changeCompanyLogo: "Change Company Logo",
  choosePhoto: "Choose Photo",
  companyNameLabel: "Company Name",
  founderLabel: "Founder",
  foundedAtLabel: "Founded at",
  latitudeLabel: "Latitude",
  longitudeLabel: "Longitude",
  phoneLabel: "Phone",
  emailLabel: "Email Address",
  addressLabel: "Address",
  provinceLabel: "Province",
  cityLabel: "City",
  districtLabel: "District",
  zipCodeLabel: "Zip Code",
  joiningDateLabel: "Joining Date",
  defaultLogo: "/assets/images/company-logo.png",
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
    field: "companyName",
    headerName: "Company Name",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "totalAdmin",
    headerName: "Total Admin",
    flex: 1,
  },
  {
    field: "phone",
    headerName: "Phone",
    flex: 1,
  },
  {
    field: "joiningDate",
    headerName: "Joining Date",
    flex: 1,
  },
  {
    field: "actions",
    headerName: "Action",
    flex: 1,
    sortable: false,
  },
];


export default companyConstants;
