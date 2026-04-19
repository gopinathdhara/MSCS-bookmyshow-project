import Show from "../models/showModel.js";
import Theatre from "../models/theatreModel.js";
import Movie from "../models/movieModel.js";
import mongoose from "mongoose";

// add new show by partner
export const addShow = async (req, res, next) => {
  try {
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
    if (theatreInfo.status !== "approved") {
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

    // duplicate show check
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

// get shows for specific theatre of partner
export const getShowsByTheatre = async (req, res, next) => {
  try {
    const { theatreId } = req.query;

    const theatreInfo = await Theatre.findById(theatreId);

    if (!theatreInfo) {
      return res.status(404).json({
        success: false,
        message: "Theatre not found",
      });
    }

    if (theatreInfo.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: "Theatre is not approved",
      });
    }

    // fetch shows only for approved theatre
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

//find show by movie id and selected date for front end user
export const getShowsByMovie = async (req, res, next) => {
  try {
    const { movieId, date } = req.query;

    const shows = await Show.find({
      movie: movieId,
      date: date,
      status: "active",
    })
      .populate({
        path: "theatre",
        match: { status: "approved" },
      })
      .sort({ date: 1, time: 1 });

    const filteredShows = shows.filter((show) => show.theatre !== null);

    console.log("raw shows:", filteredShows);

    //console.log(shows);

    res.status(200).json({
      success: true,
      message: "Shows fetched successfully",
      data: filteredShows,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// get show details for seat booking
export const getShowsById = async (req, res, next) => {
  const { showId } = req.query;

  try {
    const shows = await Show.findById(showId)
      .populate("movie")
      .populate("theatre");

    if (!shows) {
      return res.status(404).send({
        success: false,
        message: "Shows not found",
        data: null,
      });
    }
    if (shows.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "This show is not available for booking",
      });
    }

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

// update show status for partner

export const updateShowStatus = async (req, res, next) => {
  try {
    const { showId } = req.params;
    const { status } = req.body;

    // validate status
    const allowedStatus = ["active", "cancelled", "completed"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const showDetails = await Show.findById(showId).populate("theatre");

    if (!showDetails) {
      return res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }

    if (showDetails.theatre.owner.toString() != req.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
        data: null,
      });
    }

    // check if Theatre approved
    if (showDetails.theatre.status !== "approved") {
      return res.status(400).send({
        success: false,
        message: "Theatre is not approved yet",
        data: null,
      });
    }

    showDetails.status = status;
    showDetails.save();

    return res.status(200).json({
      success: true,
      message: `Show marked as ${status}`,
      data: showDetails,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
