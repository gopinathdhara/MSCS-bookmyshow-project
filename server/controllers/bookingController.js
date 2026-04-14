import express from "express";
import Booking from "../models/bookShow.js";
import Show from "../models/showModel.js";

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
