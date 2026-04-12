import Show from "../models/showModel.js";
import Theatre from "../models/theatreModel.js";
import Movie from "../models/movieModel.js";
import mongoose from "mongoose";

// add new show
export const addShow = async (req, res, next) => {
  const { movie, theatre, date, time } = req.body;

  // check if Theatre found
  const theatreInfo = await Theatre.findById(theatre);

  if (!theatreInfo) {
    return res.status(404).send({
      success: false,
      message: "Theatre not found",
      data: null,
    });
  }

  // check if Theatre approved
  if (theatreInfo.isApproved !== true) {
    return res.status(400).send({
      success: false,
      message: "Theatre is not approved yet",
      data: null,
    });
  }

  // check theatre owner same as user logged in
  if (theatreInfo.owner.toString() !== req.userId.toString()) {
    return res.status(403).send({
      success: false,
      message: "Forbidden",
      data: null,
    });
  }

  // check if Movie found
  const movieInfo = await Movie.findById(movie);

  if (!movieInfo) {
    return res.status(404).send({
      success: false,
      message: "Movie not found",
      data: null,
    });
  }

  //dupliacte show check
  try {
    const existingShow = await Show.findOne({
      theatre,
      movie,
      date,
      time,
    });

    if (existingShow) {
      return res.status(400).json({
        success: false,
        message: "Show already exists",
      });
    }

    await Show.create(req.body);
    res.status(201).json({
      success: true,
      message: "Show inserted successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// get shows for specific theatre
export const getShowsByTheatre = async (req, res, next) => {
  try {
    const { theatreId } = req.query;

    const shows = await Show.find({
      theatre: theatreId,
    })
      .populate("movie", "title language")
      .sort({ date: 1, time: 1 });

    res.status(200).json({
      success: true,
      message: "Shows fetched successfully",
      data: shows,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//find show by movie id and selected date
export const getShowsByMovie = async (req, res, next) => {
  try {
    const { movieId, date } = req.query;

    const shows = await Show.find({
      movie: movieId,
      date: date,
    })
      .populate("theatre")
      .sort({ date: 1, time: 1 });

    res.status(200).json({
      success: true,
      message: "Shows fetched successfully",
      data: shows,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
