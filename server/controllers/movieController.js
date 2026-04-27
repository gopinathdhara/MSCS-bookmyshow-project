import movie from "../models/movieModel.js";
import mongoose from "mongoose";
import {
  movieCache,
  MOVIE_CACHE_KEYS,
  clearMovieCache,
} from "../utils/movieCache.js";

// add new movie
export const addMovie = async (req, res, next) => {
  try {
    const { title, language } = req.body;

    //check if same movie in same language already exists
    const existingMovie = await movie.findOne({
      title: { $regex: new RegExp(`^${title}$`, "i") }, // case-insensitive
      language: { $regex: new RegExp(`^${language}$`, "i") },
    });

    if (existingMovie) {
      return res.status(400).json({
        success: false,
        message: "Movie already exists",
      });
    }

    await movie.create(req.body);

    // Clear cache because new movie added
    clearMovieCache();

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
    // use cache to imporve performance
    const cacheKey = MOVIE_CACHE_KEYS.ALL_MOVIES;

    //  Check cache first
    if (movieCache.has(cacheKey)) {
      console.log("Movies fetched from cache");

      return res.status(200).json({
        success: true,
        message: "Movies fetched from cache",
        data: movieCache.get(cacheKey),
      });
    }

    //  If not in cache, fetch from MongoDB
    console.log("Movies fetched from database");

    let movies = await movie.find().sort({ createdAt: -1 });

    // Store result in cache
    movieCache.set(cacheKey, movies);

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

// list of latest movies
export const getLatestMovies = async (req, res, next) => {
  try {
    // use cache to imporve performance
    const cacheKey = MOVIE_CACHE_KEYS.LATEST_MOVIES;

    if (movieCache.has(cacheKey)) {
      console.log("Movies fetched from cache for Latest Movies");

      return res.status(200).json({
        success: true,
        message: "Latest movies fetched from cache",
        data: movieCache.get(cacheKey),
      });
    }

    console.log("Movies fetched from database for Latest Movies");

    const movies = await movie
      .find()
      .sort({ createdAt: -1 }) // latest first
      .limit(5);

    movieCache.set(cacheKey, movies);

    res.status(200).json({
      success: true,
      message: "Latest Movies fetched successfully",
      data: movies,
    });
  } catch (error) {
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

// all featured movie list

export const getAllFeaturedMovies = async (req, res, next) => {
  try {
    const cacheKey = MOVIE_CACHE_KEYS.FEATURED_MOVIES;

    // check cache
    if (movieCache.has(cacheKey)) {
      console.log("Movies fetched from cache for Featured Movies");

      return res.status(200).json({
        success: true,
        message: "Featured movies fetched from cache",
        data: movieCache.get(cacheKey),
      });
    }

    //  If not in cache, fetch from MongoDB
    console.log("Movies fetched from database for Featured Movies");

    let movies = await movie.find({ isFeatured: true }).sort({ createdAt: -1 });

    // store in cache
    movieCache.set(cacheKey, movies);

    if (movies.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No featured movies found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Featured movies fetched successfully",
      data: movies,
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

    // Clear cache because new movie added
    clearMovieCache();

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

    // Clear cache because new movie added
    clearMovieCache();

    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// fetch trending movies based on booking count
export const getTrendingMovies = async (req, res, next) => {
  try {
    const cacheKey = MOVIE_CACHE_KEYS.TRENDING_MOVIES;

    if (movieCache.has(cacheKey)) {
      console.log("Movies fetched from cache for Trending Movies");

      return res.status(200).json({
        success: true,
        message: "Trending movies fetched from cache",
        data: movieCache.get(cacheKey),
      });
    }

    //  If not in cache, fetch from MongoDB
    console.log("Movies fetched from database for Trending Movies");

    // time complexity O(m log m)
    const movies = await movie
      .find({}, "title posterUrl bookingCount genre language")
      .sort({ bookingCount: -1 })
      .limit(4);

    //store in cache
    movieCache.set(cacheKey, movies);

    res.status(200).json({
      success: true,
      message: "Trending movies fetched successfully",
      data: movies,
    });
  } catch (error) {
    next(error);
  }
};
