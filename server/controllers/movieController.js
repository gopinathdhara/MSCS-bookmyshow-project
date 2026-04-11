import movie from "../models/movieModel.js";
import mongoose from "mongoose";

// add new movie
export const addMovie = async (req, res, next) => {
  try {
    await movie.create(req.body);
    res.status(201).json({
      success: true,
      message: "Movie inserted successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// list of all movies
export const getAllMovies = async (req, res, next) => {
  try {
    //Latest movie first
    let movies = await movie.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "all Movie fetched successfully",
      data: movies,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// get single movie
export const getMovieByID = async (req, res, next) => {
  try {
    //find movie by id
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid movie ID",
      });
    }
    let movieData = await movie.findById(id);
    if (!movieData) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Movie fetched successfully",
      data: movieData,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// update movie
export const updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid movie ID",
      });
    }

    const updatedMovie = await movie.findByIdAndUpdate(id, req.body, {
      new: true, // return updated data
      runValidators: true, // run schema validation
    });
    if (!updatedMovie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      data: updatedMovie,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// delete movie
export const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid movie ID",
      });
    }

    const deletedMovie = await movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
