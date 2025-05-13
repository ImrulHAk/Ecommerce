const express = require("express");
const authCheakMiddelware = require("../../middelware/authCheakMiddelware");
const {
  addtocartController,
  getUserBycartController,
  deleteUserBycartController,
  incrementquantityController,
  decrementquantityController,
} = require("../../controllers/cartController");

const router = express.Router();

router.post("/addtocart", authCheakMiddelware, addtocartController);
router.get("/usercartlist/:id", getUserBycartController);
router.delete("/usercartdelete/:id", deleteUserBycartController);
router.patch("/incrementquantity/:id", incrementquantityController);
router.patch("/decrementquantity/:id", decrementquantityController);

module.exports = router;
