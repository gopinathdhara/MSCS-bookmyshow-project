import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import { makePayment, bookShow } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/make-payment", authMiddleware, makePayment);
router.post("/book-show", authMiddleware, bookShow);

export default router;
