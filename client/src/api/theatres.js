import axiosInstance from "./index.js";

export const addTheatre = async (payload) => {
  const response = await axiosInstance.post("/theatres/add-theatre", payload);
  return response.data;
};

export const getMyTheatres = async () => {
  const response = await axiosInstance.get("/theatres/get-my-theatres");
  return response.data;
};

export const getAllTheatres = async () => {
  try {
    const response = await axiosInstance.get("/theatres/get-all-theatres");
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

export const approveTheatre = async (payload) => {
  try {
    const response = await axiosInstance.patch(
      "/theatres/approve-theatre",
      payload,
    );
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

export const rejectTheatre = async (payload) => {
  try {
    const response = await axiosInstance.patch(
      "/theatres/reject-theatre",
      payload,
    );
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};
