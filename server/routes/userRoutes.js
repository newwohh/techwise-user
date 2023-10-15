const express = require("express");
const userController = require("../controller/user.controller");
const authRouter = express.Router();

authRouter.get("/logout", userController.logout);
authRouter.post("/login", userController.loginUser);
authRouter.post("/signup", userController.createUser);
authRouter.post("/update", userController.updateUser);
authRouter.put("/addAddress", userController.addAddress);
authRouter.delete("/removeAddress", userController.removeAddress);

module.exports = authRouter;
