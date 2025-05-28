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
    console.log(req.body);

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
        return res
          .status(201)
          .json({ msg: "order place successfull", success: true });
      } else {
        //online payment
        return res.status(201).json({ msg: "online payment", success: true });
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

async function getAllOrderController(req, res) {
  try {
    const order = await orderModel
      .find({})
      .populate("userid")
      .populate("cartlist.productid");

    return res
      .status(200)
      .json({ success: true, msg: "order get successfull", data: order });
  } catch (error) {
    return res.status(500).json({ msg: error, success: false });
  }
}

module.exports = { orderController, getAllOrderController };
