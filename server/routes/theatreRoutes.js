import express from "express";
import {
  addTheatre,
  getMyTheatres,
  approveTheatre,
  getAllTheatres,
} from "../controllers/theatreController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { partnerMiddleware } from "../middlewares/partnerMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const theatreRouter = express.Router();

/* ========== for partner ============ */

theatreRouter.post(
  "/add-theatre",
  authMiddleware,
  partnerMiddleware,
  addTheatre,
);
theatreRouter.get(
  "/get-my-theatres",
  authMiddleware,
  partnerMiddleware,
  getMyTheatres,
);

/* ======================= */

/* ========== for admin ============ */

theatreRouter.get(
  "/get-all-theatres",
  authMiddleware,
  adminMiddleware,
  getAllTheatres,
);

theatreRouter.patch(
  "/approve-theatre",
  authMiddleware,
  adminMiddleware,
  approveTheatre,
);

/* ======================= */

export default theatreRouter;
