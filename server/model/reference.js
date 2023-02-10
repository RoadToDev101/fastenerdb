const mongoose = require("mongoose");

const productionDrawingSchema = new mongoose.Schema({
  file: {
    type: Buffer,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const codeReportSchema = new mongoose.Schema({
  file: {
    type: Buffer,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const coatingSchema = new mongoose.Schema({
  coatingName: {
    type: String,
    unique: true,
    required: true,
  },
  layer: {
    type: Number,
    required: true,
  },
  thickness: {
    type: Number,
    required: true,
  },
});

const SKUSchema = new mongoose.Schema({
  SKUcode: {
    type: String,
    unique: true,
    required: true,
  },
  packagingQuantity: {
    type: Number,
    required: true,
  },
  isCollated: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const productSchema = new mongoose.Schema({
  productType: {
    type: String,
    required: true,
  },
  modelNumber: {
    type: String,
    unique: true,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  coatings: [coatingSchema],
  SKUs: [SKUSchema],
  productionDrawings: [productionDrawingSchema],
  codeReports: [codeReportSchema],
});

module.exports = mongoose.model("Product", productSchema);
