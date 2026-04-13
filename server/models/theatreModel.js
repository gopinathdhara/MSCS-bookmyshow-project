import mongoose from "mongoose";

const theatreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{10}$/, "Phone must be 10 digits"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use valid email"],
      unique: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    
    // seat layout
    rows: {
      type: Number,
      required: true,
      min: 1,
    },

    columns: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true },
);

const Theatre = mongoose.model("theatres", theatreSchema);
export default Theatre;
