const Product = require("../models/product.model");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (products) {
      res.status(200).json({
        status: "success",
        data: {
          products,
        },
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
