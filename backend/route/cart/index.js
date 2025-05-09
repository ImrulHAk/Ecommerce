const express = require("express");
const authCheakMiddelware = require("../../middelware/authCheakMiddelware");
const {
  addtocartController,
  getUserBycartController,
} = require("../../controllers/cartController");

const router = express.Router();

router.post("/addtocart", authCheakMiddelware, addtocartController);
router.get("/usercartlist/:id", getUserBycartController);

module.exports = router;
