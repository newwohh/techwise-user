const express = require("express");
const paymentController = require("../controller/payment.controller");
const paymentRouter = express.Router();

paymentRouter.post("/order", paymentController.createOrder);

module.exports = paymentRouter;
