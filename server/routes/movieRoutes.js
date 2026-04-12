import express from "express";
import {
  addMovie,
  getAllMovies,
  getMovieByID,
  updateMovie,
  deleteMovie,
  getAllFeaturedMovies,
} from "../controllers/movieController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const movieRouter = express.Router();
movieRouter.post("/add-movie", authMiddleware, adminMiddleware, addMovie);
movieRouter.get("/get-all-movies", getAllMovies);
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
export default movieRouter;
