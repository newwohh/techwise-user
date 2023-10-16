const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controller/order.controller");

orderRouter.post("/create", orderController.createOrder);

module.exports = orderRouter;
