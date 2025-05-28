const express = require("express");
const {
  orderController,
  getAllOrderController,
} = require("../../controllers/orderController");
const router = express.Router();

router.post("/placeorder", orderController);
router.get("/getallorder", getAllOrderController);

module.exports = router;
