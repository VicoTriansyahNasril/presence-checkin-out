// NOTE: Implementasi API telah dihapus
// Fungsi ini sekarang mengembalikan data tiruan (mock data).

export const login = async (username, password) => {
  console.log("Attempting login... [Implementation Redacted]");
  // Simulasi respons API yang berhasil
  return Promise.resolve({
    token: "mock-jwt-token-for-showcase",
    username: "showcaseUser",
    role: "Admin",
    id_admin: 1,
    id_account: 1,
    id_company: 1,
  });
};