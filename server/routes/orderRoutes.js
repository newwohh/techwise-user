const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controller/order.controller");

orderRouter.post("/create", orderController.createOrder);
orderRouter.post("/cancel", orderController.cancelOrder);
orderRouter.get("/trend", orderController.trendingProducts);
orderRouter.get("/all/:id", orderController.getAllOrders);

module.exports = orderRouter;
