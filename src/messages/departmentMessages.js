const departmentMessages = {
  // Titles and Headers
  addNewDepartment: "Add New Department",
  editDepartment: "Edit Department",

  // Buttons
  addButtonLabel: "Add",
  saveButtonLabel: "Save",
  deleteButtonLabel: "Delete",
  downloadTemplate: "Download Template",
  importFromDocument: "Import from Document",
  addOne: "Add One",
  viewDepartment: "View Department",

  // Validation Messages
  validation: {
    department: {
      required: "Department name is required",
      min: "Department name must be at least 1 character",
      max: "Department name cannot be more than 100 characters",
    },
  },

  // Swal Messages
  successAdd: "Department added successfully",
  successEdit: "Department edited successfully",
  successImport: "Departments imported successfully",
  successDelete: "The department has been deleted.",
  errorAdd: "Failed to add department",
  errorEdit: "Failed to edit department",
  errorImport: "Failed to import departments",
  errorDelete: "Failed to delete department",

  // Other Messages
  confirmDeleteTitle: "Are you sure?",
  confirmDeleteText: "This action cannot be undone!",
  confirmDeleteConfirm: "Yes, delete it!",
  confirmDeleteCancel: "Cancel",
};

export default departmentMessages;
