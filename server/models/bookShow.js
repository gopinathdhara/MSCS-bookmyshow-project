import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    show: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shows",
      required: true,
    },

    seats: {
      type: [Number], // 💺 seat numbers
      required: true,
    },

    transactionId: {
      type: String, // Stripe transaction Id
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["SUCCESS", "FAILED"],
      default: "SUCCESS",
    },
  },
  { timestamps: true },
);

const Booking = mongoose.model("bookings", bookingSchema);

export default Booking;
