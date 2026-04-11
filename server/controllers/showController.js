import Show from "../models/showModel.js";
import mongoose from "mongoose";

// add new show
export const addShow = async (req, res, next) => {
  const { movie, theatre, date, time } = req.body;

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
      .populate("movie")
      .sort({ createdAt: -1 });

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
      .sort({ createdAt: -1 });

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
