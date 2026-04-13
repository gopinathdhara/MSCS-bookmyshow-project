import mongoose from "mongoose";

// validate add show
export const validateAddShow = (req, res, next) => {
  try {
    const { movie, theatre, date, time, ticketPrice } = req.body;

    if (!movie || !theatre || !date || !time || ticketPrice === undefined) {
      return res.status(400).json({
        success: false,
        message: "movie, theatre, date, time and ticketPrice are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(movie)) {
      return res.status(400).json({
        success: false,
        message: "Invalid movie id",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(theatre)) {
      return res.status(400).json({
        success: false,
        message: "Invalid theatre id",
      });
    }

    if (
      typeof date !== "string" ||
      date.trim() === "" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      isNaN(new Date(date).getTime())
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Use YYYY-MM-DD",
      });
    }

    if (typeof time !== "string" || time.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Invalid time",
      });
    }

    if (Number(ticketPrice) <= 0) {
      return res.status(400).json({
        success: false,
        message: "ticketPrice must be greater than 0",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

// validate theatreId query
export const validateGetShowsByTheatre = (req, res, next) => {
  try {
    const { theatreId } = req.query;

    if (!theatreId) {
      return res.status(400).json({
        success: false,
        message: "theatreId is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(theatreId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid theatre id",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

// validate movieId and date query
export const validateGetShowsByMovie = (req, res, next) => {
  try {
    const { movieId, date } = req.query;

    if (!movieId || !date) {
      return res.status(400).json({
        success: false,
        message: "movieId and date are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid movie id",
      });
    }

    if (
      typeof date !== "string" ||
      date.trim() === "" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      isNaN(new Date(date).getTime())
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Use YYYY-MM-DD",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

// check showId for seat booking
export const validateGetShowById = (req, res, next) => {
  try {
    const { showId } = req.query;

    if (!showId) {
      return res.status(400).json({
        success: false,
        message: "showId is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(showId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid showId",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};