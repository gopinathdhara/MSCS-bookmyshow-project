import Show from "../models/showModel.js";
import mongoose from "mongoose";

// add new show
export const addShow = async (req, res, next) => {
  try {
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
    }).populate("movie").sort({ createdAt: -1 });

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
