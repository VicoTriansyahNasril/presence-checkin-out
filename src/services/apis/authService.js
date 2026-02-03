import { mockUsers, simulateDelay } from "../../data/mockData";

export const login = async (username, password) => {
  await simulateDelay();

  const user = mockUsers.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    return {
      message: "Login Successful",
      token: "mock-jwt-token-" + Math.random().toString(36).substring(7),
      username: user.username,
      role: user.role,
      id_admin: user.id_admin,
      id_account: user.id_account,
      id_company: user.id_company,
      data: user // For superadmin fetch logic compatibility
    };
  } else {
    // Simulate Axios error structure
    const error = new Error("Invalid credentials");
    error.response = {
      data: { message: "Invalid username or password" },
      status: 401
    };
    throw error;
  }
};