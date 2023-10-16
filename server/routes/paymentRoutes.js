const express = require("express");
const paymentController = require("../controller/payment.controller");
const paymentRouter = express.Router();
const crypto = require("crypto");

paymentRouter.post("/order", paymentController.createOrder);
paymentRouter.post("/verify", (req, res) => {
  console.log(req.body);
  const { orderCreationId, razorpay_payment_id, razorpay_signature } = req.body;

  const expectedSign = crypto.createHmac("sha256", "Pc1D3Fzc9uunGwCSOFraEibE");
  expectedSign.update(`${orderCreationId}|${razorpay_payment_id}`);

  if (razorpay_signature === expectedSign) {
    return res.status(200).json({ message: "success" });
  } else {
    return res.status(400).json({ message: "failed" });
  }
});

module.exports = paymentRouter;
