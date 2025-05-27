const express = require("express");
const { orderController } = require("../../controllers/orderController");
const router = express.Router();

router.post("/placeorder", orderController)

module.exports = router;
