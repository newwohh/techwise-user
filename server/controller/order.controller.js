const Order = require("../models/orderModel");

exports.createOrder = async (req, res, next) => {
  try {
    const orderDetails = {
      user: req.body.user,
      products: req.body.products,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      status: "Pending",
      totalAmount: req.body.totalAmount,
      orderDate: new Date(),
    };

    console.log(orderDetails);

    const createOrderNew = await Order.create(orderDetails);

    if (createOrderNew) {
      res.status(200).json({
        status: "success",
        data: createOrderNew,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
