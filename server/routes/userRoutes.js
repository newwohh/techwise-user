const express = require("express");
const userController = require("../controller/user.controller");
const authRouter = express.Router();

authRouter.get("/logout", userController.logout);
authRouter.post("/login", userController.loginUser);
authRouter.post("/signup", userController.createUser);
authRouter.post("/update", userController.updateUser);
authRouter.put("/addAddress", userController.addAddress);
authRouter.put("/removeAddress", userController.removeAddress);
authRouter.post("/updateProfilePic", userController.uploadProfilePic);
authRouter.post("/becomePlus", userController.becomePlus);

module.exports = authRouter;
