const holidayMessages = {
  validation: {
    holidayName: {
      required: "Holiday name is required.",
      minLength: "Holiday name must be at least 3 characters long.",
    },
    date: {
      required: "Date is required.",
      invalidFormat: "Please enter a valid date",
    },
  },
  notifications: {
    addSuccessTitle: "Success",
    successAdd: "Holiday added successfully!",
    addFailedTitle: "Add Failed",
    failedAdd: "Failed to add holiday. Please try again.",
    validationErrorTitle: "Validation Error",
  },
  inputMessages: {
    holidayName: "Please enter the name of the holiday (at least 3 characters).",
    holidayDate: "Please select a valid date for the holiday.",
  }
};

export default holidayMessages;