const express = require("express");
const {
  addtocartController,
  getUserBycartController,
} = require("../../controllers/cartController");
const router = express.Router();

router.post("/addtocart", addtocartController);
router.get("/usercartlist/:id", getUserBycartController);

module.exports = router;
