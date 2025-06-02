const express = require("express");
const {
  orderController,
  getAllOrderController,
  PaySuccessController,
  PayFailController,
  PayCancelController,
  PayIPNcontroller,
} = require("../../controllers/orderController");
const router = express.Router();

router.post("/placeorder", orderController);
router.get("/getallorder", getAllOrderController);
router.post("/paysuccess", PaySuccessController);
router.post("/payfail", PayFailController);
router.post("/paycancel", PayCancelController);
router.post("/payipn", PayIPNcontroller);

module.exports = router;
