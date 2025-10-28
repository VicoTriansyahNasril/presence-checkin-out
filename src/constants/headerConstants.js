export const titleMap = {
  "/": (isSuperadmin, userName) =>
    isSuperadmin ? `Hello ${userName} 👋` : `Hello ${userName} 👋`,
  "/company/profile": "Company Profile",
  "/departments": "All Departments",
  "/employees": "All Employees",
  "/attendances": "Attendance",
  "/leaves": "Leaves",
  "/holidays": "Holidays",
  "/settings": "Settings",
  "/administrator/profile": (isSuperadmin) =>
    isSuperadmin ? "Superadmin Profile" : "My Profile",
  "/administrators": (isSuperadmin) =>
    isSuperadmin ? "All Administrators" : "Administrators",
  "/companies": (isSuperadmin) =>
    isSuperadmin ? "All Companies" : "Companies",
};

export const subtitleMap = {
  "/": (greeting, dateTime) => `${greeting} ${dateTime}`,
  "/companies": "All Companies Information",
  "/company/profile": "Your Company Information",
  "/departments": "All Departments Information",
  "/employees": "All Employees Information",
  "/attendances": "All Employee Attendance",
  "/leaves": "Leaves Information",
  "/holidays": "All Holiday Lists",
  "/settings": "Company Settings",
  "/administrators": "All Administrators Information",
  "/companies/:companyName": "All Companies Information", // Add this line
};
