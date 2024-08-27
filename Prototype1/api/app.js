require("express-async-errors");
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./database/connectDB");
const authRouter = require("./routes/authRouter");
const errorHandler = require("./middleware/errorHandler");
const userRouter = require("./routes/userRouter");
const uploadRouter = require("./routes/uploadRouter");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/upload", uploadRouter);
app.use(errorHandler);
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(port, () => {
      console.log("Server is running on port", port);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
