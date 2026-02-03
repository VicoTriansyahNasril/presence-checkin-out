import { mockCompanies, mockCompanyConfig, simulateDelay } from "../../data/mockData";

const currentCompany = mockCompanies[0];

export const getCompanyProfile = async () => {
  await simulateDelay();
  return { data: currentCompany };
};

export const updateCompanyProfileAPI = async (companyData) => {
  await simulateDelay();
  Object.assign(currentCompany, companyData);
  return { message: "Profile updated (Mock)", data: currentCompany };
};

export const getCompanyConfig = async () => {
  await simulateDelay();
  return mockCompanyConfig;
};

export const updateCompanyConfig = async (configData) => {
  await simulateDelay();
  Object.assign(mockCompanyConfig, configData);
  return configData; // Return updated config part
};

export const updateCompanyLogo = async (file) => {
  await simulateDelay();
  return { message: "Logo updated (Mock)" };
};

// Superadmin functions
export const fetchMasterCompanies = async () => {
  await simulateDelay();
  return mockCompanies;
};

export const changeCompanysLogo = async (idCompany, formData) => {
  await simulateDelay();
  return { message: "Logo changed (Mock)" };
};

export const getDetailCompany = async (idCompany) => {
  await simulateDelay();
  const company = mockCompanies.find(c => c.id_company === parseInt(idCompany));
  return company || currentCompany;
};

export const insertNewCompany = async (data) => {
  await simulateDelay();
  const newCompany = { ...data, id_company: Math.floor(Math.random() * 1000) };
  mockCompanies.push(newCompany);
  return { message: "Company added (Mock)" };
};

export const getDataCompanies = async (params) => {
  await simulateDelay();
  const { pageNumber = 1, pageSize = 10 } = params;

  // Simple pagination logic
  const start = (pageNumber - 1) * pageSize;
  const end = start + pageSize;

  return {
    data: mockCompanies.slice(start, end),
    meta: { total: mockCompanies.length }
  };
};

export const editDataCompany = async (id, data) => {
  await simulateDelay();
  const index = mockCompanies.findIndex(c => c.id_company === parseInt(id));
  if (index !== -1) {
    mockCompanies[index] = { ...mockCompanies[index], ...data };
  }
  return { message: "Company edited (Mock)" };
};

export const deleteDataCompany = async (id, data) => {
  await simulateDelay();
  const index = mockCompanies.findIndex(c => c.id_company === parseInt(id));
  if (index !== -1) {
    mockCompanies.splice(index, 1);
  }
  return { message: "Company deleted (Mock)" };
};