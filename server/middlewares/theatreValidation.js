import mongoose from "mongoose";

// validate add theatre
export const validateAddTheatre = (req, res, next) => {
  try {
    const { name, address, city, phone, email } = req.body;

    if (!name || !address || !city || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: "name, address, city, phone and email are required",
      });
    }

    if (typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Invalid theatre name",
      });
    }

    if (typeof address !== "string" || address.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Invalid address",
      });
    }

    if (typeof city !== "string" || city.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Invalid city",
      });
    }

    if (typeof phone !== "string" || phone.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Invalid phone",
      });
    }

    // simple 10-digit phone validation
    if (!/^\d{10}$/.test(phone.trim())) {
      return res.status(400).json({
        success: false,
        message: "Phone must be a valid 10-digit number",
      });
    }

    if (typeof email !== "string" || email.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

// validate approve theatre
export const validateApproveTheatre = (req, res, next) => {
  try {
    const { theatreId } = req.body;

    if (!theatreId) {
      return res.status(400).json({
        success: false,
        message: "Theatre ID required",
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
