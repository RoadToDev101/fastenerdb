const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  modelNumber: {
    type: String,
    unique: true, // `model number` must be unique
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true, // `username` must be unique
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Product, User };
