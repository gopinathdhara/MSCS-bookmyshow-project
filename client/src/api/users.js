import axiosInstance from "./index.js";

export const registerUser = async (payload) => {
  const response = await axiosInstance.post("/users/register", payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await axiosInstance.post("/users/login", payload);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/users/me");
  return response.data;
};
