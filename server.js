const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const fs = require("fs");

const app = express();

// Serve static files from the "public" directory
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/index.html");
});

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const config = require("./config/config.json");

const dbUsername = config.dbUsername;
const dbPassword = config.dbPassword;

const url = `mongodb+srv://${dbUsername}:${dbPassword}@sst.eyg8ymj.mongodb.net/products`;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.log(error));

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
const Product = mongoose.model("Product", productSchema);
// CREATE
app.post("/products", (req, res) => {
  console.log(req.body);
  const newProduct = new Product({
    modelNumber: req.body.modelNumber,
    productType: req.body.productType,
    material: req.body.material,
  });
  newProduct
    .save()
    .then((product) => {
      res.send(product);
      console.log(`New product have been added: ${product.modelNumber}`);
    })
    .catch((error) => res.send(error));
});

// READ
app.get("/products", (req, res) => {
  Product.find()
    .then((products) => res.send(products))
    .catch((error) => res.send(error));
});

// UPDATE
app.put("/products/:_id", (req, res) => {
  Product.findByIdAndUpdate(
    req.params._id,
    {
      modelNumber: req.body.modelNumber,
      productType: req.body.productType,
      material: req.body.material,
    },
    { new: true }
  )
    .then((product) => {
      res.send(product);
      console.log(`A product have been updated: ${product.modelNumber}`);
    })
    .catch((error) => res.send(error));
});

// DELETE
app.delete("/products/:_id", (req, res) => {
  Product.findByIdAndRemove(req.params._id)
    .then((product) => {
      res.send(product);
      console.log(`A product have been deleted: ${product.modelNumber}`);
    })
    .catch((error) => res.send(error));
});
const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
