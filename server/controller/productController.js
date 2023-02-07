const { Product } = require("../model/model");

// Create and save product into the database
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Product object to be created
  const newProduct = new Product({
    modelNumber: req.body.modelNumber,
    productType: req.body.productType,
    material: req.body.material,
  });

  // Create a new product into the database
  Product.create(newProduct, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product.",
      });
    else {
      res.send(data);
      console.log(`New Product Created! Product: ${newProduct.modelNumber}`);
    }
  });
};

// Find all products
exports.findAll = (req, res) => {
  Product.find({}, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    else {
      res.send(data);
      console.log(`All Products Retrieved!`);
    }
  });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
  Product.findById(req.params.productId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found product with id ${req.params.productId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving product with id " + req.params.productId,
        });
      }
    } else res.send(data);
  });
};

// Update product with the specified productId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Exclude the _id field from the update
  const { _id, ...updatedProduct } = req.body;

  Product.findByIdAndUpdate(
    req.params.productId,
    { $set: updatedProduct },
    { new: true },
    (err, data) => {
      if (err) {
        console.error(err);
        if (err.kind === "not_found") {
          return res.status(404).send({
            message: `Not found product with id ${req.params.productId}.`,
          });
        } else {
          return res.status(500).send({
            message: "Error updating product with id " + req.params.productId,
          });
        }
      } else {
        console.log("Successful update", data);
        return res.send(data);
      }
    }
  );
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Update product with the specified modelNumber in the request
  Product.findOneAndUpdate(
    { modelNumber: req.body.modelNumber },
    { $set: req.body },
    { new: true },
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send({
          message:
            "Error updating product with modelNumber " + req.body.modelNumber,
        });
      } else {
        console.log("Successful update", data);
        res.send(data);
      }
    }
  );
};

// Delete a product with the specified productId in the request
exports.delete = (req, res) => {
  Product.findByIdAndDelete(req.params.productId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found product with id ${req.params.productId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete product with id " + req.params.productId,
        });
      }
    } else res.send({ message: `product was deleted successfully!` });
  });
};
