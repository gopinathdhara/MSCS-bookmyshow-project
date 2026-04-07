import express from "express";
import { addMovie, getAllMovies } from "../controllers/movieController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const movieRouter = express.Router();
movieRouter.post("/add-movie", authMiddleware, adminMiddleware, addMovie);
movieRouter.get(
  "/get-all-movies",
  authMiddleware,
  getAllMovies,
);

export default movieRouter;
