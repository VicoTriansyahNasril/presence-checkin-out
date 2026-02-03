import { mockAttendance, simulateDelay } from "../../data/mockData";

export const getAttendances = async (page = 0, size = 10, keyword = "") => {
  await simulateDelay();

  let filtered = mockAttendance;
  if (keyword) {
    const lowerKey = keyword.toLowerCase();
    filtered = filtered.filter(a => a.employee_name.toLowerCase().includes(lowerKey));
  }

  const start = page * size;
  const end = start + size;

  return {
    statusCode: 200,
    data: filtered.slice(start, end),
    total_data: filtered.length,
    total_page: Math.ceil(filtered.length / size),
    page_size: size
  };
};

export const importAttendanceAPI = async (file) => {
  await simulateDelay();
  return { message: "Import successful", data: [] };
};

export const exportAttendance = async () => {
  await simulateDelay();
  // Simulate download
  const blob = new Blob([""], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "attendance.xlsx");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};