const Product = require("../models/productModel");

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

exports.createProduct = async (req, res) => {
  try {
    const productData = req.body;

    const newProduct = await Product.create(productData);
    res.status(201).json({
      status: "success",
      data: {
        product: newProduct,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.productCategory = async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$category",
          averagePrice: { $avg: "$price" },
          totalProducts: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ];

    const result = await Product.aggregate(pipeline);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    console.log(req.params);
    const products = await Product.find({ category });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "Bad request",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(400).json({
        success: false,
        error: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
