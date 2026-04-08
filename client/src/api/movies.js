import axiosInstance from "./index.js";

export const getAllMovies = async () => {
  const response = await axiosInstance.get("/movies/get-all-movies");
  return response.data;
};

export const addMovie = async (payload) => {
  const response = await axiosInstance.post("/movies/add-movie", payload);
  return response.data;
};

export const updateMovie = async ({ values, movieId }) => {
  console.log(movieId);
  const response = await axiosInstance.put(
    "/movies/update-movie/" + movieId,
    values,
  );
  return response.data;
};

export const deleteMovie = async (payload) => {
  const response = await axiosInstance.post("/movies/delete-movie", payload);
  return response.data;
};
