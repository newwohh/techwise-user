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

    if (products) {
      res.status(200).json({
        success: true,
        data: products,
      });
    }
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

    const productFromModel = await Product.findById(id).populate({
      path: "reviews.user",
      select: "fullName",
    });

    if (!productFromModel) {
      return res.status(400).json({
        success: false,
        error: "Product not found",
      });
    }

    const product = productFromModel.toObject();
    product.averageRating = productFromModel.averageRating;

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

exports.addReview = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { rating, comment, user } = req.body;

    const reviewAddedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $push: {
          reviews: [
            {
              user,
              rating,
              comment,
            },
          ],
        },
      },
      { new: true }
    );

    if (!reviewAddedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    await reviewAddedProduct.save();

    return res
      .status(201)
      .json({ message: "Review added successfully", data: reviewAddedProduct });
  } catch (error) {
    res.status(200).json({
      message: "failed",
    });
  }
};
