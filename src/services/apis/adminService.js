import { mockUsers, simulateDelay } from "../../data/mockData";

// Helper to find admin
const findAdmin = (id) => mockUsers.find(u => u.id_admin === parseInt(id));

export const getAdminInformation = async () => {
  await simulateDelay();
  // Return first admin for default profile view
  return { data: mockUsers.find(u => u.role === 'Admin') };
};

export const updateAdminInformation = async (adminData) => {
  await simulateDelay();
  return { message: "Admin information updated successfully (Mock)" };
};

export const changeAdminPassword = async (passwordData) => {
  await simulateDelay();
  return { message: "Password changed successfully (Mock)" };
};

export const changeAdminProfilePicture = async (file) => {
  await simulateDelay();
  return { message: "Profile picture updated successfully (Mock)" };
};

export const getAdminDetail = async (idAdmin) => {
  await simulateDelay();
  const admin = findAdmin(idAdmin);
  if (!admin) throw new Error("Admin not found");

  // Mock company structure for detail view
  return {
    ...admin,
    company: {
      id_company: 1,
      company_name: "Tech Solutions Inc.",
      companyName: "Tech Solutions Inc."
    }
  };
};

export const getAllAdmin = async (sortBy, pageSize, page, startDate, endDate) => {
  await simulateDelay();

  let filtered = mockUsers.filter(u => u.role === 'Admin');

  // Date filtering simulation (if needed)
  if (startDate && endDate) {
    // Mock logic: assuming 'created_day' exists or just ignore for now
  }

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginated = filtered.slice(start, end);

  return {
    data: paginated.map(admin => ({
      ...admin,
      company: { company_name: "Tech Solutions Inc." },
      created_day: "2023-01-15" // Mock creation date
    })),
    meta: {
      total: filtered.length,
      page: page,
      page_size: pageSize
    }
  };
};

export const changeAdminProfilePhoto = async (idAdmin, formData) => {
  await simulateDelay();
  return { data: { data: { message: "Photo updated" } } };
};

export const addNewAdmin = async (adminData) => {
  await simulateDelay();
  const newAdmin = {
    id_admin: Math.floor(Math.random() * 1000),
    ...adminData,
    role: "Admin",
    profile_picture: "https://i.pravatar.cc/150"
  };
  mockUsers.push(newAdmin);
  return { data: { message: "Admin added" } };
};

export const editDataAdmin = async (id, data) => {
  await simulateDelay();
  const index = mockUsers.findIndex(u => u.id_admin === parseInt(id));
  if (index !== -1) {
    mockUsers[index] = { ...mockUsers[index], ...data };
  }
  return { data: { data: mockUsers[index] }, message: "Admin edited" };
};

export const editPassword = async (id, password) => {
  await simulateDelay();
  return { message: "Password edited (Mock)" };
};

export const deleteDataAdministrator = async (id, data) => {
  await simulateDelay();
  const index = mockUsers.findIndex(u => u.id_admin === parseInt(id));
  if (index !== -1) {
    mockUsers.splice(index, 1);
  }
  return { message: "Admin deleted (Mock)" };
};