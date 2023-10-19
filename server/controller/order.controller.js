const Order = require("../models/orderModel");
const Product = require("../models/productModel");

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

exports.cancelOrder = async (req, res, next) => {
  try {
    const orderId = req.body.orderId;

    const cancelledOrder = await Order.findByIdAndUpdate(orderId, {
      status: "Cancelled",
    });

    if (cancelledOrder) {
      res.status(200).json({
        status: "success",
        order: cancelledOrder,
      });
    } else {
      res.status(500).send("failed");
    }
  } catch (error) {
    res.status(500).send("failed");
    console.log(error.message);
  }
};

exports.trendingProducts = async (req, res) => {
  try {
    const results = await Order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.product",
          totalQuantitySold: { $sum: "$products.quantity" },
        },
      },
      { $sort: { totalQuantitySold: -1 } },
      { $limit: 10 },
    ]);

    const topSoldProducts = [];

    for (const result of results) {
      const product = await Product.findById(result._id);
      if (product) {
        console.log(product.category);
        topSoldProducts.push({
          _id: product._id,
          name: product.name,
          picture: product.images[0],
          price: product.price,
          totalQuantitySold: result.totalQuantitySold,
          category: product.category,
        });
      }
    }

    res.status(200).json({
      status: "success",
      data: topSoldProducts,
    });
  } catch (error) {
    console.error("Error:", error);
  }
};
