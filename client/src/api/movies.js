import axiosInstance from "./index.js";

export const getAllMoviesAdmin = async () => {
  const response = await axiosInstance.get("/movies/get-all-movies-admin");
  return response.data;
};

export const getAllMovies = async (page = 1, limit = 8, search = "") => {
  const response = await axiosInstance.get(
    `/movies/get-all-movies?page=${page}&limit=${limit}&search=${search}`,
  );
  return response.data;
};

export const getAllMoviesForShow = async () => {
  const response = await axiosInstance.get(
    `/movies/get-all-movies-for-show`,
  );
  return response.data;
};

export const getLatestMovies = async () => {
  const response = await axiosInstance.get("/movies/get-latest-movies");
  return response.data;
};

export const getAllTrendingMovies = async () => {
  const response = await axiosInstance.get("/movies/get-trending-movies");
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
  const response = await axiosInstance.get(
    `/movies/get-single-movie/${movieId}`,
  );
  return response.data;
};
