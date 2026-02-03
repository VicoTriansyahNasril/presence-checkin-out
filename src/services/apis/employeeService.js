import { mockEmployees, mockAttendance, mockLeaves, simulateDelay } from "../../data/mockData";

export const getEmployees = async (page = 0, size = 10, keyword = "") => {
  await simulateDelay();

  let filtered = mockEmployees;
  if (keyword) {
    const lowerKey = keyword.toLowerCase();
    filtered = filtered.filter(e =>
      e.employeeName.toLowerCase().includes(lowerKey) ||
      e.employeeNumber.toLowerCase().includes(lowerKey)
    );
  }

  const start = page * size;
  const end = start + size;

  return {
    statusCode: 200,
    data: filtered.slice(start, end),
    totalData: filtered.length,
    totalPage: Math.ceil(filtered.length / size),
    pageSize: size
  };
};

export const addEmployee = async (formEmployee) => {
  await simulateDelay();
  const newEmp = {
    ...formEmployee,
    idEmployee: Math.floor(Math.random() * 10000),
    employeeName: `${formEmployee.first_name} ${formEmployee.last_name}`,
    department: { departmentName: "New Department" }, // Mock department name
    profilePicture: "https://i.pravatar.cc/150" // Mock default picture
  };
  mockEmployees.push(newEmp);
  return { data: newEmp, message: "Employee added successfully" };
};

export const importEmployee = async (file) => {
  await simulateDelay();
  return { data: [], message: "Import successful (Mock)" };
};

// --- BAGIAN INI YANG DIMINTA KHUSUS ---
export const getEmployeeIdByUsername = async (username) => {
  await simulateDelay();
  // Pastikan pencocokan username case-insensitive dan trim whitespace
  const emp = mockEmployees.find(e => e.username.toLowerCase() === username.toLowerCase().trim());

  if (!emp) {
    console.error(`Employee with username ${username} not found in mock data.`);
    throw new Error("Employee not found");
  }

  return { statusCode: 200, data: emp.idEmployee };
};
// --------------------------------------

export const getEmployeeProfileById = async (id_employee) => {
  await simulateDelay();
  const emp = mockEmployees.find(e => e.idEmployee === parseInt(id_employee));
  if (!emp) throw new Error("Employee not found");
  return { statusCode: 200, data: emp };
};

export const getEmployeeProfessionalInfo = async (id_employee) => {
  await simulateDelay();
  const emp = mockEmployees.find(e => e.idEmployee === parseInt(id_employee));

  if (!emp) throw new Error("Employee not found");

  return {
    data: {
      employee_number: emp.employeeNumber,
      username: emp.username,
      status: emp.status,
      email: emp.email,
      department_name: emp.department?.departmentName || "N/A",
      role_current_company: emp.role_current_company,
      role_in_client: emp.role_in_client,
      joining_date: emp.joining_date
    }
  };
};

export const getEmployeePersonalInfo = async (id_employee) => {
  await simulateDelay();
  const emp = mockEmployees.find(e => e.idEmployee === parseInt(id_employee));

  if (!emp) throw new Error("Employee not found");

  return {
    data: {
      first_name: emp.first_name,
      last_name: emp.last_name,
      date_of_birth: emp.date_of_birth,
      gender: emp.gender,
      marital_status: emp.marital_status,
      mobile_number: emp.mobile_number,
      nationality: emp.nationality,
      address: emp.address,
      province: emp.province,
      city: emp.city,
      district: emp.district,
      zip_code: emp.zip_code
    }
  };
};

export const getEmployeeLeave = async (id_employee) => {
  await simulateDelay();
  const emp = mockEmployees.find(e => e.idEmployee === parseInt(id_employee));
  if (!emp) return { statusCode: 200, data: [] };

  // Mock logic: return leaves where first name matches (simple association for mock)
  const leaves = mockLeaves.filter(l => l.first_name === emp.first_name);
  return { statusCode: 200, data: leaves };
};

export const deleteEmployee = async (id_employee) => {
  await simulateDelay();
  const index = mockEmployees.findIndex(e => e.idEmployee === parseInt(id_employee));
  if (index !== -1) mockEmployees.splice(index, 1);
  return { message: "Deleted" };
};

export const editPersonalEmployee = async (id_employee, formData) => {
  await simulateDelay();
  const index = mockEmployees.findIndex(e => e.idEmployee === parseInt(id_employee));
  if (index !== -1) {
    Object.assign(mockEmployees[index], formData);
  }
  return { message: "Personal info updated", data: mockEmployees[index] };
};

export const editProfessionalEmployee = async (id_employee, formData) => {
  await simulateDelay();
  const index = mockEmployees.findIndex(e => e.idEmployee === parseInt(id_employee));
  if (index !== -1) {
    Object.assign(mockEmployees[index], formData);
  }
  return { message: "Professional info updated", data: mockEmployees[index] };
};

export const changePassword = async (id_employee, formData) => {
  await simulateDelay();
  return { message: "Password updated" };
};

export const getEmployeeAttendanceDetails = async (id_employee) => {
  await simulateDelay();
  const emp = mockEmployees.find(e => e.idEmployee === parseInt(id_employee));

  if (!emp) return { statusCode: 200, data: [] };

  // Return attendance matching name
  const attendance = mockAttendance.filter(a => a.employee_name === emp.employeeName);
  return { statusCode: 200, data: attendance };
};

export const exportEmployeesByCompany = async () => {
  await simulateDelay();
  return { data: new Blob([""], { type: 'text/csv' }) };
};

export const changeEmployeeProfilePicture = async (id_employee, file) => {
  await simulateDelay();
  return { message: "Picture updated" };
};