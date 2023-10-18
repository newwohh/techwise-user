const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dtddoyv3j",
  api_key: "731522692223294",
  api_secret: "oNnKUvTxNuS3NjpbP4HwDSFONdQ",
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

module.exports = { cloudinary, opts };
