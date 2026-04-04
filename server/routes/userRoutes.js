import express from "express";
import { register, login } from "../controllers/userController.js";
import {
  registerValidate,
  loginValidate,
} from "../middlewares/validateMiddleware.js";

const router = express.Router();

router.post("/users/register", registerValidate, register);
router.post("/users/login", loginValidate, login);

export default router;
