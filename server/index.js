import express from "express";
import userRoute from "./routes/userRoutes.js";
import { logger } from "./middlewares/loggerMiddleware.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import movieRouter from "./routes/movieRoutes.js";
import theatreRouter from "./routes/theatreRoutes.js";
import showRouter from "./routes/showRoutes.js";
import paymentRouter from "./routes/paymentRoute.js";
import bookingRouter from "./routes/bookingRoute.js";
import { Server } from "socket.io";
import http from "http";

dotenv.config();

// connect database
connectDB();

const app = express();

// ============ webscoket ===========

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

//=========================

// allow origin using cors
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

// GLOBAL MIDDLEWARE
app.use(express.json());

// GLOBAL MIDDLEWARE
app.use(logger);

//  =========== socket connection =========
//Backend receives connection

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-admin", () => {
    // only for admin
    socket.join("admins");
    console.log("Admin joined admins room");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

//===========================================

app.use("/api", userRoute);
app.use("/api/movies", movieRouter);
app.use("/api/theatres", theatreRouter);
app.use("/api/shows", showRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/booking", bookingRouter);

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

// app.listen(5002, () => {
//   console.log("I am listening");
// });

server.listen(5002, () => {
  // NEW
  console.log("I am listening on port 5002");
});
