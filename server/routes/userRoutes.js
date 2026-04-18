import express from "express";
import {
  register,
  login,
  getCurrentUser,
  forgetpassword,
  resetpassword,
} from "../controllers/userController.js";
import {
  registerValidate,
  loginValidate,
  validateResetPassword,
} from "../middlewares/userValidation.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/users/register", registerValidate, register);
router.post("/users/login", loginValidate, login);
router.get("/users/me", authMiddleware, getCurrentUser);
router.post("/users/forgetpassword", forgetpassword);
router.patch(
  "/users/resetpassword/:email",
  validateResetPassword,
  resetpassword,
);

export default router;
