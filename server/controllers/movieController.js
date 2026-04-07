import movie from "../models/movieModel.js";

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
