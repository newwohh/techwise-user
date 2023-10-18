const express = require("express");
const productController = require("../controller/product.controller");
const productRouter = express.Router();

productRouter.get("/all", productController.getAllProducts);
productRouter.get("/:id", productController.getProduct);
productRouter.post("/new", productController.createProduct);
productRouter.get(
  "/category/:category",
  productController.getProductsByCategory
);
productRouter.get("/categories", productController.getProductsByCategory);
productRouter.post("/:productId/reviews", productController.addReview);

module.exports = productRouter;
