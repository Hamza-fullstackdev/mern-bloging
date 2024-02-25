import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose
  .connect('mongodb://127.0.0.1:27017/mern-bloging-application')
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Error connected to Database", err);
  });


app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
