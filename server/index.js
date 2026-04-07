import express from "express";
import userRoute from "./routes/userRoutes.js";
import { logger } from "./middlewares/loggerMiddleware.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import movieRouter from "./routes/movieRoutes.js";

dotenv.config();

// connect database
connectDB();

const app = express();

// allow origin using cors
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// GLOBAL MIDDLEWARE
app.use(express.json());

// GLOBAL MIDDLEWARE
app.use(logger);

app.use("/api", userRoute);
app.use("/api/movies", movieRouter);

//404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler MIDDLEWARE - runs after controller
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

app.listen(5001, () => {
  console.log("I am listening"); 
});
