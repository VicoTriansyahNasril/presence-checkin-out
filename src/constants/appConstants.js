const appConstants = {
  // Icon Codes
  ICON_SUCCESS: "success",
  ICON_ERROR: "error",
  ICON_WARNING: "warning",
  ICON_INFO: "info",

  // Status Title Codes
  STATUS_TITLE_SUCCESS: "Success",
  STATUS_TITLE_ERROR: "Error",
  STATUS_TITLE_WARNING: "Warning",
  STATUS_TITLE_INFO: "Info",

  // Colors
  COLOR_SUCCESS: "#28a745",
  COLOR_ERROR: "#dc3545",
  COLOR_WARNING: "#ffc107",
  COLOR_INFO: "#17a2b8",
  COLOR_PRIMARY: "#007bff",
  COLOR_SECONDARY: "#6c757d",
  COLOR_LIGHT: "#f8f9fa",
  COLOR_DARK: "#343a40",

  // API Endpoints (globally reusable across components)
  API_ADD_DEPARTMENT: "/api/departments/add",
  API_EDIT_DEPARTMENT: "/api/departments/edit",
  API_DELETE_DEPARTMENT: "/api/departments/delete",

  // Default Pagination Size
  DEFAULT_PAGINATION_SIZE: 10,

  // Swal Config (reusable Swal configurations)
  swalConfig: {
    success: {
      icon: "success",
      confirmButtonColor: "#28a745",
    },
    error: {
      icon: "error",
      confirmButtonColor: "#dc3545",
    },
    warning: {
      icon: "warning",
      confirmButtonColor: "#ffc107",
    },
  },

  // Confirmation Messages (global use)
  confirmationMessages: {
    delete: {
      title: "Are you sure?",
      text: "This action cannot be undone!",
      confirmText: "Yes, delete it!",
      cancelText: "Cancel",
    },
    confirmText: "OK",
  },
};

export default appConstants;
