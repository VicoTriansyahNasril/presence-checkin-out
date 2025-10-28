import axiosInstance from "../../services/axiosInstance";

// Fetch attendances data
export const getAttendances = async (page = 0, size = 10, keyword = "") => {
  try {
    const response = await axiosInstance.get(
      `/admin/attendance?page=${page}&pageSize=${size}&keyword=${keyword}`
    );

    if (response.data && response.data.statusCode === 200) {
      return response.data.data;
    } else {
      throw new Error("Failed to retrieve attendance");
    }
  } catch (error) {
    console.error("Error fetching attendances:", error);
    throw new Error(
      error.response?.data?.message || "Error fetching attendances"
    );
  }
};

// Import attendance data
export const importAttendanceAPI = async (file) => {
  if (!file) {
    throw new Error("No file selected for import");
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post(
    "/admin/company/attendance/import",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Export attendance data
export const exportAttendance = async () => {
  try {
    const response = await axiosInstance.get(
      "/admin/company/attendance/export",
      {
        responseType: "blob", // Important for downloading files
      }
    );

    downloadBlob(response.data, "attendance-list.xlsx");
  } catch (error) {
    console.error("Error exporting attendance:", error);
    throw new Error(
      error.response?.data?.message || "Error exporting attendance"
    );
  }
};

// Utility function to download blob as a file
const downloadBlob = (data, filename) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
