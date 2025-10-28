// NOTE: Implementasi API telah dihapus untuk tujuan portofolio publik.

const mockCompany = {
  data: { company_name: "Showcase Company Inc.", founder: "John Doe", email: "contact@showcase.com" }
};

export const getCompanyProfile = async () => {
  console.log("API Call: getCompanyProfile [Redacted]");
  return Promise.resolve(mockCompany);
};

export const updateCompanyProfileAPI = async (companyData) => {
  console.log("API Call: updateCompanyProfileAPI [Redacted]");
  return Promise.resolve({ message: "Profile updated (mock)." });
};

export const getCompanyConfig = async () => {
  console.log("API Call: getCompanyConfig [Redacted]");
  return Promise.resolve({ working_day_start: "Monday", working_day_end: "Friday" });
};

export const updateCompanyConfig = async (configData) => {
  console.log("API Call: updateCompanyConfig [Redacted]");
  return Promise.resolve({ message: "Config updated (mock)." });
};

export const updateCompanyLogo = async (file) => {
  console.log("API Call: updateCompanyLogo [Redacted]");
  return Promise.resolve({ message: "Logo updated (mock)." });
};

export const fetchMasterCompanies = async () => {
  console.log("API Call: fetchMasterCompanies [Redacted]");
  return Promise.resolve([mockCompany.data]);
};

export const changeCompanysLogo = async (idCompany, formData) => {
  console.log("API Call: changeCompanysLogo [Redacted]");
  return Promise.resolve({ message: "Logo changed (mock)." });
};

export const getDetailCompany = async (idCompany) => {
  console.log("API Call: getDetailCompany [Redacted]");
  return Promise.resolve(mockCompany.data);
};

export const insertNewCompany = async (data) => {
  console.log("API Call: insertNewCompany [Redacted]");
  return Promise.resolve({ message: "Company added (mock)." });
};

export const getDataCompanies = async (params) => {
  console.log("API Call: getDataCompanies [Redacted]");
  return Promise.resolve({ data: [mockCompany.data], meta: { total: 1 } });
};

export const editDataCompany = async (idCompany, data) => {
  console.log("API Call: editDataCompany [Redacted]");
  return Promise.resolve({ message: "Company edited (mock)." });
};

export const deleteDataCompany = async (idCompany, data) => {
  console.log("API Call: deleteDataCompany [Redacted]");
  return Promise.resolve({ message: "Company deleted (mock)." });
};