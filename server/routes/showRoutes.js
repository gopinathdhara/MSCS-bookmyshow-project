import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { partnerMiddleware } from "../middlewares/partnerMiddleware.js";
import {
  addShow,
  getShowsByTheatre,
  getShowsByMovie,
} from "../controllers/showController.js";
import {
  validateAddShow,
  validateGetShowsByTheatre,
  validateGetShowsByMovie,
} from "../middlewares/showValidation.js";

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  partnerMiddleware,
  validateAddShow,
  addShow,
);

router.get(
  "/get-by-movie",
  authMiddleware,
  validateGetShowsByMovie,
  getShowsByMovie,
);
router.get(
  "/get-by-theatre",
  authMiddleware,
  validateGetShowsByTheatre,
  getShowsByTheatre,
);

export default router;
