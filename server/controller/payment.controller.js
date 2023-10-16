const Razorpay = require("razorpay");
// const instance = require("../utils/razorpay");
const crypto = require("crypto");

exports.createOrder = async (req, res) => {
  console.log(req.body);

  try {
    const options = {
      amount: req.body.amount,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    const instance = new Razorpay({
      key_id: "rzp_test_aQprQUbu7mdh26",
      key_secret: "Pc1D3Fzc9uunGwCSOFraEibE",
    });

    instance.orders.create(options, async (err, order) => {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong",
        });
      }
      return res.status(200).json(order);
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};

exports.verifyData = async (req, res, next, data) => {
  console.log(req.body);
  // const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
  //   req.body;

  // const sign = razorpay_order_id + "|" + razorpay_payment_id;

  // const expectedSign = crypto
  //   .createHmac("sha356", "Pc1D3Fzc9uunGwCSOFraEibEi")
  //   .update(sign.toString())
  //   .digest("hex");

  // if (razorpay_signature === expectedSign) {
  //   return res.status(200).json({ message: "success" });
  // } else {
  //   return res.status(400).json({ message: "failed" });
  // }
};
