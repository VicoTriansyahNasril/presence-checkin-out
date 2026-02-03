import { mockDepartments, mockEmployees, simulateDelay } from "../../data/mockData";

export const getDepartmentByCompany = async () => {
  await simulateDelay();
  return { statusCode: 200, data: mockDepartments };
};

export const getDepartmentDetailsByCompanyId = async () => {
  await simulateDelay();

  // Transform data to match UI expectations (top employees, etc.)
  const enrichedDepartments = mockDepartments.map(dept => {
    const deptEmployees = mockEmployees.filter(e => e.id_department === dept.id);
    return {
      idDepartment: dept.id,
      departmentName: dept.name,
      totalEmployees: deptEmployees.length,
      topEmployees: deptEmployees.slice(0, 3).map(e => ({
        name: e.employeeName,
        position: e.roleCurrentCompany,
        profilePicture: e.profilePicture,
        username: e.username
      }))
    };
  });

  return { statusCode: 200, data: enrichedDepartments };
};

export const addDepartment = async (departmentName) => {
  await simulateDelay();
  const newDept = {
    id: Math.floor(Math.random() * 1000),
    name: departmentName,
    totalEmployees: 0,
    topEmployees: []
  };
  mockDepartments.push(newDept);

  // Return format expected by reducer
  return {
    data: {
      id: newDept.id,
      name: newDept.name,
      totalEmployees: 0,
      topEmployees: []
    }
  };
};

export const importDepartment = async (file) => {
  await simulateDelay();
  return { message: "Import successful (Mock)", data: [] };
};

export const getEmployeesByDepartmentId = async (idDepartment, paginationModel) => {
  await simulateDelay();
  const { page, pageSize } = paginationModel;

  const filtered = mockEmployees.filter(e => e.id_department === parseInt(idDepartment));
  const start = page * pageSize;
  const end = start + pageSize;

  return {
    data: filtered.slice(start, end),
    total_data: filtered.length
  };
};

export const editDepartment = async (idDepartment, departmentName) => {
  await simulateDelay();
  const dept = mockDepartments.find(d => d.id === parseInt(idDepartment));
  if (dept) dept.name = departmentName;

  return {
    message: "Department edited",
    statusCode: 200,
    status: "Success"
  };
};

export const deleteDepartment = async (idDepartment) => {
  await simulateDelay();
  const index = mockDepartments.findIndex(d => d.id === parseInt(idDepartment));
  if (index !== -1) mockDepartments.splice(index, 1);

  return {
    message: "Department deleted",
    statusCode: 200,
    status: "Success"
  };
};

export const exportEmployeesByDepartment = async (idDepartment, departmentName) => {
  await simulateDelay();
  // Return dummy blob
  return { data: new Blob(["dummy data"], { type: 'text/csv' }) };
};