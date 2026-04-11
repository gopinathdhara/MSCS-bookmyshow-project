import express from "express";
import { register, login,getCurrentUser } from "../controllers/userController.js";
import {
  registerValidate,
  loginValidate,
} from "../middlewares/userValidation.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/users/register", registerValidate, register);
router.post("/users/login", loginValidate, login);
router.get("/users/me", authMiddleware, getCurrentUser);

export default router;
