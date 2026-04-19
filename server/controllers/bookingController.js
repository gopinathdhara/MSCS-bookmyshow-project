import express from "express";
import Booking from "../models/bookShow.js";
import Show from "../models/showModel.js";
import EmailHelper from "../utils/emailHelper.js";
import movie from "../models/movieModel.js";

export const bookShow = async (req, res, next) => {
  try {
    // get show detais
    const showDetails = await Show.findById(req.body.show);

    if (!showDetails) {
      return res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }

    // check if seat is already booked
    const alreadyBooked = req.body.seats.some((seat) =>
      showDetails.bookedSeats.includes(seat),
    );

    if (alreadyBooked) {
      return res.status(400).json({
        success: false,
        message: "Some seats already booked",
      });
    }

    // insert booking records

    const newBooking = await Booking.create({ ...req.body, user: req.userId });

    // checking and updating booked seats for show

    const updatedBookedSeats = [
      ...showDetails.bookedSeats,
      ...req.body.seats,
    ].sort((a, b) => a - b);
    await Show.findByIdAndUpdate(req.body.show, {
      bookedSeats: updatedBookedSeats,
    });

    // update booking count for movie
    await movie.findByIdAndUpdate(showDetails.movie, {
      $inc: { bookingCount: req.body.seats.length },
    });

    const populatedBooking = await Booking.findById(newBooking._id)
      .populate("user")
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });
    console.log(populatedBooking);

    // using websocket for notification to admin
    console.log("Emitting new-booking to admins room");
    const io = req.app.get("io");

    // send notification only for admin
    io.to("admins").emit("new-booking", {
      message: "New booking completed",
      bookingId: newBooking._id,
      movieTitle: populatedBooking.show.movie.title,
      theatreName: populatedBooking.show.theatre.name,
      seats: populatedBooking.seats.join(", "),
      totalAmount: populatedBooking.totalAmount,
      Showdate: populatedBooking.show.date,
      time: populatedBooking.show.time,
    });
    console.log("new-booking event emitted successfully");

    // sending email
    await EmailHelper(
      "ticketTemplate.html",
      populatedBooking.user.email,
      `Booking Confirmed - ${populatedBooking.show.movie.title}`,
      `
Booking Confirmed

Movie: ${populatedBooking.show.movie.title}
Theatre: ${populatedBooking.show.theatre.name}
Date: ${populatedBooking.show.date}
Time: ${populatedBooking.show.time}
Seats: ${populatedBooking.seats.join(", ")}
Amount: ₹ ${populatedBooking.seats.length * populatedBooking.show.ticketPrice}
Transaction ID: ${populatedBooking.transactionId}
`,
      {
        name: populatedBooking.user.name,
        movie: populatedBooking.show.movie.title,
        theatre: populatedBooking.show.theatre.name,
        date: populatedBooking.show.date,
        time: populatedBooking.show.time,
        seats: populatedBooking.seats.join(", "),
        amount:
          populatedBooking.seats.length * populatedBooking.show.ticketPrice,
        transactionId: populatedBooking.transactionId,
      },
    );

    res.status(201).json({
      success: true,
      message: "New Booking completed successfully",
      data: newBooking,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// fetch all booking for logged in  user
export const getAllMyBooking = async (req, res, next) => {
  try {
    const userId = req.userId;
    const bookingDetails = await Booking.find({ user: userId })
      .populate("user")
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      })
      .sort({ createdAt: -1 });
    if (bookingDetails.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No bookings found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Booking information fetched successfully",
      data: bookingDetails,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// get all booking for admin
export const getAllBooking = async (req, res, next) => {
  try {
    const bookingDetails = await Booking.find()
      .populate("user")
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      })
      .sort({ createdAt: -1 });

    if (bookingDetails.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No bookings found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "All Booking information fetched successfully",
      data: bookingDetails,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// fetch all booking for partners

export const getPartnerBooking = async (req, res, next) => {
  try {
    const partnerId = req.userId;
    const bookingDetails = await Booking.find()
      .populate("user")
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      }).sort({ createdAt: -1 });

    // filter recors only for partner
    const bookingFilter = bookingDetails.filter((booking) => {
      return booking.show.theatre.owner.toString() === partnerId;
    });

    if (bookingFilter.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No bookings found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Booking information fetched successfully",
      data: bookingFilter,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};


