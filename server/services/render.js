const axios = require("axios");

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

exports.addProductRoute = (req, res) => {
  res.render("_addProduct");
};

exports.updateProduct = (req, res) => {
  res.render("_updateProduct");
};
