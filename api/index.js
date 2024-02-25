import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/user.route.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose
  .connect("mongodb://127.0.0.1:27017/mern-bloging-application")
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Error connected to Database", err);
  });

app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((err,req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).send({
    success: false,
    statusCode,
    message,
  });
})