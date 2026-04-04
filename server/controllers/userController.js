import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { signToken } from "../utils/jwt.js";

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
      data: "User registered successfully",
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
    const token = signToken({ userId: user._id.toString() });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
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
