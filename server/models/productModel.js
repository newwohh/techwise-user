const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  screenSize: {
    type: Number,
    required: true,
  },
  processor: {
    type: String,
    required: true,
  },
  storageCapacityGB: {
    type: Number,
    required: true,
  },
  RAMGB: {
    type: Number,
    required: true,
  },
  cameraMP: {
    type: Number,
    required: true,
  },
  operatingSystem: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  images: [
    {
      type: String,
    },
  ],
});

productSchema.virtual("averageRating").get(function () {
  if (this.reviews.length === 0) {
    return 0;
  }
  const totalRating = this.reviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  return totalRating / this.reviews.length;
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
