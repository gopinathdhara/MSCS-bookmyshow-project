import axiosInstance from "./index.js";

export const getAllMovies = async () => {
  const response = await axiosInstance.get("/movies/get-all-movies");
  return response.data;
};

export const getFeaturedMovies = async () => {
  const response = await axiosInstance.get("/movies/get-featured-movies");
  return response.data;
};

export const addMovie = async (payload) => {
  const response = await axiosInstance.post("/movies/add-movie", payload);
  return response.data;
};

export const updateMovie = async (movieId, payload) => {
  const response = await axiosInstance.put(
    `/movies/update-movie/${movieId}`,
    payload,
  );
  return response.data;
};

export const deleteMovie = async (movieId) => {
  const response = await axiosInstance.delete(
    `/movies/delete-movie/${movieId}`,
  );
  return response.data;
};

export const getMovieDetails = async (movieId) => {
  const response = await axiosInstance.get(`/movies/get-single-movie/${movieId}`);
  return response.data;
};