const express = require("express");
const authCheakMiddelware = require("../../middelware/authCheakMiddelware");
const {
  addtocartController,
  getUserBycartController,
  deleteUserBycartController,
  updatequantityController,
} = require("../../controllers/cartController");

const router = express.Router();

router.post("/addtocart", authCheakMiddelware, addtocartController);
router.get("/usercartlist/:id", getUserBycartController);
router.delete("/usercartdelete/:id", deleteUserBycartController);
router.patch("/updatequantity/:id", updatequantityController);

module.exports = router;
