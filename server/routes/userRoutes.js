const express = require("express");
const userController = require("../controller/user.controller");
const authRouter = express.Router();

authRouter.post("/signup", userController.createUser);
authRouter.post("/login", userController.loginUser);

module.exports = authRouter;
