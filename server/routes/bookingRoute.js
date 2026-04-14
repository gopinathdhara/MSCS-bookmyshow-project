import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import { bookShow } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/book-show", authMiddleware, bookShow);

export default router;