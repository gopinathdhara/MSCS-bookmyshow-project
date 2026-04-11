import Theatre from "../models/theatreModel.js";
import mongoose from "mongoose";

// add new Theatre
export const addTheatre = async (req, res, next) => {
  try {
    const existingTheatre = await Theatre.findOne({
      name: req.body.name.trim(),
      owner: req.userId,
    });

    if (existingTheatre) {
      return res.status(400).json({
        success: false,
        message: "Theatre already exists",
      });
    }

    await Theatre.create({ ...req.body, owner: req.userId });
    res.status(201).json({
      success: true,
      message: "Theatre inserted successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// list of my Theatres
export const getMyTheatres = async (req, res, next) => {
  try {
    //Latest Theatres first
    let theatres = await Theatre.find({ owner: req.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      message: "all My Theatres fetched successfully",
      data: theatres,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// list of all Theatres
export const getAllTheatres = async (req, res, next) => {
  try {
    let theatres = await Theatre.find().populate("owner", "name email").sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      message: "all Theatres fetched successfully",
      data: theatres,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// approve Theatres by admin
export const approveTheatre = async (req, res, next) => {
  try {
    const { theatreId } = req.body;

    const theatre = await Theatre.findByIdAndUpdate(
      theatreId,
      { isApproved: true },
      {
        new: true, // return updated data
      },
    );

    if (!theatre) {
      return res.status(404).json({
        success: false,
        message: "Theatre not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Theatre approved successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
