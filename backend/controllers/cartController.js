const { json } = require("express");
const cartModel = require("../models/cartModel");

async function addtocartController(req, res) {
  let { productid, quantity, userid } = req.body;
  try {
    let cart = new cartModel({
      productid,
      quantity,
      userid,
    });
    await cart.save();
    res
      .status(201)
      .json({ success: true, msg: "Product add to cart successful" });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error });
  }
}

async function getUserBycartController(req, res) {
  try {
    let { id } = req.params;
    let findcart = await cartModel.find({ userid: id });
    res
      .status(200)
      .json({ success: true, data: findcart })
      .populate("productid");
  } catch (error) {
    return res.status(500), json({ success: false, msg: error });
  }
}

module.exports = { addtocartController, getUserBycartController };
