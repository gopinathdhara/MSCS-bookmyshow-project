import axiosInstance from "./index.js";

export const addShow = async (payload) => {
  const response = await axiosInstance.post("/shows/add", payload);
  return response.data;
};

export const getShowsByTheatre = async (theatreId) => {
  const response = await axiosInstance.get(
    `/shows/get-by-theatre?theatreId=${theatreId}`,
  );
  return response.data;
};

export const getShowsByMovie = async (movieId, date) => {
  const response = await axiosInstance.get(
    `/shows/get-by-movie?movieId=${movieId}&date=${date}`,
  );
  return response.data;
};
