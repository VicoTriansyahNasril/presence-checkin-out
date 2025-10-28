import appConstants from "../constants/appConstants";

const leaveMessages = {
  SWAL_MESSAGES_DATE: {
    ICON: appConstants.ICON_WARNING,
    TITLE: "Incomplete Date Filter",
    TEXT: "Both Start Date and End Date must be selected!",
    CONFIRM_BUTTON: "OK",
  },

  SWAL_MESSAGES_UPDATE: {
    ICON_SUCCESS: appConstants.ICON_SUCCESS,
    ICON_ERROR: appConstants.ICON_ERROR,
    TITLE_SUCCESS: appConstants.STATUS_TITLE_SUCCESS,
    TITLE_ERROR: appConstants.STATUS_TITLE_ERROR,
    TEXT_SUCCESS: (status) => `Leave ${status.toLowerCase()} successfully`,
    TEXT_ERROR: (status) => `Failed to ${status} Leave`,
  },
};

export default leaveMessages;
