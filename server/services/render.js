const axios = require("axios");

// Render home page
exports.homeRoute = (req, res) => {
  // Make a get request to /api/products
  axios
    .get("http://localhost:3000/api/products")
    .then(function (response) {
      // console.log(response);
      res.render("index", { products: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// Render add product page
exports.addProductRoute = (req, res) => {
  res.render("_addProduct");
};

// Update a product
exports.updateProductRoute = (req, res) => {
  // Make a get request to /api/products
  axios
    .get(`http://localhost:3000/api/products/${req.query.id}`)
    // Get the product with the id in the url
    .then(function (productData) {
      res.render("_updateProduct", { product: productData.data });
      //console.log(productData.data);
    })
    .catch((err) => {
      res.send(err);
    });
};

// Render show product page
exports.viewProductRoute = (req, res) => {
  // Make a get request to /api/products
  axios
    .get(`http://localhost:3000/api/products/${req.query.id}`)
    // Get the product with the id in the url
    .then(function (productData) {
      res.render("_viewProduct", { product: productData.data });
      //console.log(productData.data);
    })
    .catch((err) => {
      res.send(err);
    });
};
