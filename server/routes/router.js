const express = require("express");
const router = express.Router();

const services = require("../services/render.js");
const userController = require("../controller/userController.js");
const productController = require("../controller/productController.js");
/**
 *@description Root Route
 * @method GET /
 */
router.get("/", services.homeRoute);

/**
 *@description add products route
 * @method GET /
 */
router.get("/addProduct", services.addProductRoute);

// API
router.post("/api/users", userController.create);
router.get("/api/users", userController.findAll);
router.get("/api/users/:userId", userController.findOne);
router.put("/api/users/:username", userController.update);
router.delete("/api/users/:userId", userController.delete);

router.post("/api/products", productController.create);
router.get("/api/products", productController.findAll);
router.get("/api/products/:productId", productController.findOne);
router.put("/api/products/:productId", productController.update);
router.put("/api/products/:modelNumber", productController.update);
router.delete("/api/products/:productId", productController.delete);

module.exports = router;
