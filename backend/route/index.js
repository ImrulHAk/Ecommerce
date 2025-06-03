const express = require("express");
const router = express.Router();
const auth = require("./auth");
const category = require("./category");
const product = require("./product");
const cart = require("./cart");
const order = require("./order");
const banner = require("./banner");

//localhost:8899/auth
router.use("/auth", auth);

//localhost:8899/category
router.use("/category", category);

//localhost:8899/product
router.use("/product", product);

//localhost:8899/cart
router.use("/cart", cart);

//localhost:8899/order
router.use("/order", order);

//localhost:8899/banner
router.use("/banner", banner);

module.exports = router;
