import axiosInstance from "./index.js";

export const getAllMovies = async () => {
  const response = await axiosInstance.get("/movies/get-all-movies");
  return response.data;
};

export const addMovie = async (payload) => {
  const response = await axiosInstance.post("/movies/add-movie", payload);
  return response.data;
};

export const updateMovie = async (payload) => {
  const response = await axiosInstance.get("/movies/update-movie", payload);
  return response.data;
};

export const deleteMovie = async (payload) => {
  const response = await axiosInstance.get("/movies/delete-movie", payload);
  return response.data;
};
