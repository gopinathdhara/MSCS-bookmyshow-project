import express from "express";
import {
  addMovie,
  getAllMovies,
  getMovieByID,
  updateMovie,
  deleteMovie,
  getAllFeaturedMovies,
  getTrendingMovies,
  getLatestMovies,
  getAllMoviesAdmin,
  getAllMoviesForShow
} from "../controllers/movieController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { partnerMiddleware } from "../middlewares/partnerMiddleware.js";

const movieRouter = express.Router();
movieRouter.post("/add-movie", authMiddleware, adminMiddleware, addMovie);
movieRouter.get("/get-all-movies-admin", authMiddleware, adminMiddleware, getAllMoviesAdmin);
movieRouter.get("/get-all-movies", getAllMovies);
movieRouter.get("/get-latest-movies", getLatestMovies);
movieRouter.get("/get-featured-movies", getAllFeaturedMovies);
movieRouter.get("/get-single-movie/:id", authMiddleware, getMovieByID);
movieRouter.put(
  "/update-movie/:id",
  authMiddleware,
  adminMiddleware,
  updateMovie,
);
movieRouter.delete(
  "/delete-movie/:id",
  authMiddleware,
  adminMiddleware,
  deleteMovie,
);
movieRouter.get("/get-trending-movies", getTrendingMovies);

movieRouter.get("/get-all-movies-for-show", authMiddleware, partnerMiddleware, getAllMoviesForShow);
export default movieRouter;
