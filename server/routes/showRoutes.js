import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { partnerMiddleware } from "../middlewares/partnerMiddleware.js";
import { addShow, getShowsByTheatre } from "../controllers/showController.js";

const router = express.Router();

router.post("/add", authMiddleware, partnerMiddleware, addShow);

// router.get("/get-by-movie", authMiddleware, getShowsByMovie);
router.get("/get-by-theatre", authMiddleware, getShowsByTheatre);

export default router;
