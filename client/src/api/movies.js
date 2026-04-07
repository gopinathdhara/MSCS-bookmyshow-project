import axiosInstance from "./index.js";

export const getAllMovies = async () => {
  const response = await axiosInstance.get("/movies/get-all-movies");
  return response.data;
};

export const addMovie = async (payload) => {
  const response = await axiosInstance.post("/movies/add-movie", payload);
  return response.data;
};

export const updateMovie = async (id,payload) => {
  const response = await axiosInstance.put("/movies/update-movie/"+id, payload);
  return response.data;
};

export const getMovieById = async (id) => {
  const response = await axiosInstance.get("/movies/get-single-movie/"+id);
  return response.data;
};

// export const deleteMovie = async (payload) => {
//   const response = await axiosInstance.get("/movies/delete-movie", payload);
//   return response.data;
// };
