// NOTE: Implementasi API eksternal telah dihapus untuk tujuan portofolio publik.
// Fungsi-fungsi ini sekarang mengembalikan data tiruan (mock data) untuk menunjukkan struktur data yang diharapkan oleh komponen.

// Fungsi tiruan untuk mengambil data negara
export const fetchCountries = async () => {
  console.log("API Call: fetchCountries [Redacted]");
  // Mengembalikan data tiruan yang sesuai dengan format yang diharapkan
  return Promise.resolve([
    { value: "Indonesia", label: "Indonesia" },
    { value: "Malaysia", label: "Malaysia" },
    { value: "Singapore", label: "Singapore" },
  ]);
};

// Fungsi tiruan untuk mengambil data provinsi
export const fetchProvinces = async () => {
  console.log("API Call: fetchProvinces [Redacted]");
  return Promise.resolve([
    { id: "11", text: "JAWA BARAT" },
    { id: "12", text: "JAWA TIMUR" },
    { id: "13", text: "DKI JAKARTA" },
  ]);
};

// Fungsi tiruan untuk mengambil data kota berdasarkan provinsi
export const fetchCities = async (provinceId) => {
  console.log(`API Call: fetchCities for province ${provinceId} [Redacted]`);
  // Mengembalikan data tiruan yang relevan berdasarkan input (opsional)
  if (provinceId === "11") {
    return Promise.resolve([
        { id: "1101", text: "KOTA BANDUNG" },
        { id: "1102", text: "KABUPATEN BEKASI" },
    ]);
  }
  return Promise.resolve([]);
};

// Fungsi tiruan untuk mengambil data kecamatan berdasarkan kota
export const fetchDistricts = async (cityId) => {
  console.log(`API Call: fetchDistricts for city ${cityId} [Redacted]`);
  if (cityId === "1101") {
      return Promise.resolve([
        { id: "110101", text: "BANDUNG KIDUL" },
        { id: "110102", text: "CICENDO" },
      ]);
  }
  return Promise.resolve([]);
};

// Fungsi tiruan untuk mengambil data kode pos berdasarkan kecamatan
export const fetchPostalCodes = async (cityId, districtId) => {
  console.log(`API Call: fetchPostalCodes for city ${cityId}, district ${districtId} [Redacted]`);
  if (districtId === "110101") {
      return Promise.resolve([
        { id: "1", text: "40266" },
        { id: "2", text: "40267" },
      ]);
  }
  return Promise.resolve([]);
};