const orderModel = require("../models/orderModel");

async function orderController(req, res) {
  let {
    fullname,
    address,
    phone,
    paymentMethod,
    deliverycharge,
    cartlist,
    userid,
  } = req.body;
  try {
    let {
      fullname,
      address,
      phone,
      paymentMethod,
      deliverycharge,
      cartlist,
      userid,
    } = req.body;

    if (
      fullname &&
      address &&
      phone &&
      paymentMethod &&
      deliverycharge &&
      cartlist &&
      userid
    ) {
      if (paymentMethod == "COD") {
        //case on delivery
        let order = new orderModel({
          fullname,
          address,
          phone,
          paymentMethod,
          deliverycharge,
          cartlist,
          userid,
        });
        await order.save();
        return res.status(201).json({msg:"order place successfull", success:true});
      } else {
        //online payment
      }
    } else {
      return res
        .status(500)
        .json({ msg: "all fields are required", success: false });
    }
  } catch (error) {
    return res.status(500).json({ msg: error, success: false });
  }
}

module.exports = { orderController };
