import appConstants from "../constants/appConstants";

const employeeMessages = {
  SWAL_MESSAGES_DELETE: {
    // Confim delete
    TITLE_CONFIRM: "Are you sure?",
    TEXT_CONFIRM: "This action cannot be undone!",
    ICON_CONFIRM: appConstants.ICON_WARNING,
    CONFIRM_BUTTON_TEXT: "Yes, delete it!",
    CONFIRM_BUTTON_COLOR: appConstants.COLOR_ERROR,
    CANCEL_BUTTON_COLOR: appConstants.COLOR_PRIMARY,

    // If success
    TITLE_SUCCESS: appConstants.STATUS_TITLE_SUCCESS,
    TEXT_SUCCESS: "The employee has been deleted.",
    ICON_SUCCESS: appConstants.ICON_SUCCESS,

    // If error
    TITLE_ERROR: appConstants.STATUS_TITLE_ERROR,
    TEXT_ERROR: "Failed to delete employee",
    ICON_ERROR: appConstants.ICON_ERROR,
  },

  SWAL_MESSAGES: {
    // If success
    TITLE_SUCCESS: appConstants.STATUS_TITLE_SUCCESS,
    ICON_SUCCESS: appConstants.ICON_SUCCESS,

    // If error
    TITLE_ERROR: appConstants.STATUS_TITLE_ERROR,
    ICON_ERROR: appConstants.ICON_ERROR,

    // Button Text
    CONFIRM_BUTTON: appConstants.confirmationMessages.confirmText,
  },
};

export default employeeMessages;
