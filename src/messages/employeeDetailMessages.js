import Swal from "sweetalert2";

const employeeDetailMessages = {
  notifications: {
    editSuccessTitle: "Success",
    editFailedTitle: "Edit Failed",
    photoChangeSuccess: "Profile photo changed successfully!",
    photoChangeFailed: "Failed to change profile photo. Please try again.",
    editSuccess: "Employee details updated successfully!",
    editFailed: "Failed to update employee details. Please try again.",
    loadingEmployee: "Loading employee data...",
    loadingFailed: "Failed to load employee data. Please try again.",
  },
  inputMessages: {
    choosePhoto: "Please choose a photo to upload.",
  },
  validation: {
    required: "This field is required.",
    fileFormat: "Unsupported format. Please upload a JPEG or PNG image.",
    nameTooShort: "Name is too short.",
    invalidEmail: "Please enter a valid email address.",
  },
  swalMessages: {
    successPhotoChange: (message) => {
      return Swal.fire({
        title: employeeDetailMessages.notifications.editSuccessTitle,
        text: message,
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    failedPhotoChange: (errorMessage) => {
      return Swal.fire({
        title: employeeDetailMessages.notifications.editFailedTitle,
        text: errorMessage || employeeDetailMessages.notifications.photoChangeFailed,
        icon: "error",
        confirmButtonText: "OK",
      });
    },
    missingFile: () => {
      return Swal.fire({
        title: "Error",
        text: employeeDetailMessages.inputMessages.choosePhoto,
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  },
};

export default employeeDetailMessages;
