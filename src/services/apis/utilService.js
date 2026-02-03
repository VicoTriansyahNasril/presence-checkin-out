import { simulateDelay } from "../../data/mockData";

export const fetchCountries = async () => {
  await simulateDelay(200);
  return [
    { value: "Indonesia", label: "Indonesia" },
    { value: "Malaysia", label: "Malaysia" },
    { value: "Singapore", label: "Singapore" },
  ];
};

export const fetchProvinces = async () => {
  await simulateDelay(200);
  return [
    { id: "11", text: "JAWA BARAT" },
    { id: "12", text: "JAWA TIMUR" },
    { id: "13", text: "DKI JAKARTA" },
  ];
};

export const fetchCities = async (provinceId) => {
  await simulateDelay(200);
  if (provinceId === "11") {
    return [
      { id: "1101", text: "KOTA BANDUNG" },
      { id: "1102", text: "KABUPATEN BEKASI" },
    ];
  }
  return [{ id: "99", text: "KOTA DUMMY" }];
};

export const fetchDistricts = async (cityId) => {
  await simulateDelay(200);
  if (cityId === "1101") {
    return [
      { id: "110101", text: "BANDUNG KIDUL" },
      { id: "110102", text: "CICENDO" },
    ];
  }
  return [{ id: "9901", text: "KECAMATAN DUMMY" }];
};

export const fetchPostalCodes = async (cityId, districtId) => {
  await simulateDelay(200);
  return [{ id: "1", text: "40266" }, { id: "2", text: "40267" }];
};