// NOTE: Implementasi API telah dihapus untuk tujuan portofolio publik.

const mockAdmin = {
  data: { first_name: "Admin", last_name: "User", email: "admin@example.com", username: "adminuser" }
};

export const getAdminInformation = async () => {
  console.log("API Call: getAdminInformation [Redacted]");
  return Promise.resolve(mockAdmin);
};

export const updateAdminInformation = async (adminData) => {
  console.log("API Call: updateAdminInformation [Redacted]");
  return Promise.resolve({ message: "Admin information updated successfully (mock)." });
};

export const changeAdminPassword = async (passwordData) => {
  console.log("API Call: changeAdminPassword [Redacted]");
  return Promise.resolve({ message: "Password changed successfully (mock)." });
};

export const changeAdminProfilePicture = async (file) => {
  console.log("API Call: changeAdminProfilePicture [Redacted]");
  return Promise.resolve({ message: "Profile picture updated successfully (mock)." });
};

export const getAdminDetail = async (idAdmin) => {
  console.log(`API Call: getAdminDetail for id ${idAdmin} [Redacted]`);
  return Promise.resolve(mockAdmin.data);
};

export const getAllAdmin = async () => {
  console.log("API Call: getAllAdmin [Redacted]");
  return Promise.resolve({ data: [mockAdmin.data], meta: { total: 1 } });
};

export const changeAdminProfilePhoto = async (idAdmin, formData) => {
  console.log("API Call: changeAdminProfilePhoto [Redacted]");
  return Promise.resolve({ message: "Photo updated (mock)." });
};

export const addNewAdmin = async (adminData) => {
  console.log("API Call: addNewAdmin [Redacted]");
  return Promise.resolve({ message: "Admin added (mock)." });
};

export const editDataAdmin = async (id, data) => {
  console.log("API Call: editDataAdmin [Redacted]");
  return Promise.resolve({ message: "Admin edited (mock)." });
};

export const editPassword = async (id, password) => {
  console.log("API Call: editPassword [Redacted]");
  return Promise.resolve({ message: "Password edited (mock)." });
};

export const deleteDataAdministrator = async (id, data) => {
  console.log("API Call: deleteDataAdministrator [Redacted]");
  return Promise.resolve({ message: "Admin deleted (mock)." });
};