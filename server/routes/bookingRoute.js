import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import {
  bookShow,
  getAllMyBooking,
  getAllBooking,
  getPartnerBooking,
} from "../controllers/bookingController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { partnerMiddleware } from "../middlewares/partnerMiddleware.js";

const router = express.Router();

router.post("/book-show", authMiddleware, bookShow);
router.get("/get-my-bookings", authMiddleware, getAllMyBooking);
router.get("/get-all-bookings", authMiddleware, adminMiddleware, getAllBooking);
router.get(
  "/get-partner-bookings",
  authMiddleware,
  partnerMiddleware,
  getPartnerBooking,
);

export default router;
