import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import { makePayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/make-payment", authMiddleware, makePayment);

export default router;
