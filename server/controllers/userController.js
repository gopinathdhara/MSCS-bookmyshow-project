import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { signToken } from "../utils/jwt.js";
import EmailHelper from "../utils/emailHelper.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // password hashing using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword, role });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // create jwt token by passing payload
    const token = signToken({ userId: user._id.toString(), role: user.role });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token: token,
        role: user.role,
        userId: user._id,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.userId;

    const userDetails = await User.findById(userId).select("-password");

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User details not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      data: {
        userDetails,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const otpGenerator = function () {
  return Math.floor(1000000 + Math.random() * 999999);
};

export const forgetpassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userDetails = await User.findOne({ email: email });

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = otpGenerator();
    userDetails.otp = otp;
    userDetails.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await userDetails.save();

    await EmailHelper(
      "otpTemplate.html",
      userDetails.email,
      "RESET PASSWORD Verification OTP",
      `
    RESET PASSWORD Verification OTP
    OTP: ${otp}

    `,
      {
        name: userDetails.name,
        otp: otp,
      },
    );

    res.status(200).json({
      success: true,
      message: "otp sent to your email",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const resetpassword = async (req, res, next) => {
  try {
    const resetDetails = req.body;
    const email = req.params.email;
    const userDetails = await User.findOne({ email: email });
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (!userDetails.otp || !userDetails.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "No OTP found. Please request a new OTP",
      });
    }

    if (Date.now() > userDetails.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "otp expired",
      });
    }
    if (resetDetails.otp !== userDetails.otp) {
      return res.status(400).json({
        success: false,
        message: "otp incorrect",
      });
    }
    const hashedPassword = await bcrypt.hash(resetDetails.password, 10);
    userDetails.password = hashedPassword;
    userDetails.otp = undefined;
    userDetails.otpExpiry = undefined;
    await userDetails.save();
    res.status(200).json({
      success: true,
      message: "password reset successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
