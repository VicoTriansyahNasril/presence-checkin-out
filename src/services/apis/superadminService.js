import axiosInstance from "../axiosInstance";

export const getSuperadminInformation = async () => {
  try {
    const response = await axiosInstance.get(`/superadmin/superadmin`);

    if (response.data.statusCode === 200) {
      return response.data;
    } else {
      console.log(
        "Failed to fetch superadmin information:",
        response.data.message
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching superadmin information:", error);
    return null;
  }
};
