const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const { getUser } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.route("/:userId").get(verifyToken, getUser);

module.exports = userRouter;
