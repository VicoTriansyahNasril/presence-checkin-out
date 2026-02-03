import { mockUsers, simulateDelay } from "../../data/mockData";

export const getSuperadminInformation = async () => {
  await simulateDelay();
  const superadmin = mockUsers.find(u => u.role === 'Superadmin');
  return { statusCode: 200, data: superadmin };
};