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
    let findcart = await cartModel.find({ userid: id }).populate("productid");
    res
      .status(200)
      .json({ success: true, data: findcart })
      .populate("productid");
  } catch (error) {
    return res.status(500), json({ success: false, msg: error });
  }
}

async function deleteUserBycartController(req, res) {
  try {
    const { id } = req.params;
    const { userid } = req.body;
    if (userid) {
      await cartModel.findOneAndDelete({ _id: id });
      return res
        .status(200)
        .json({ msg: "cart deleted successfull", success: true });
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: error });
  }
}

async function incrementquantityController(req, res) {
  try {
    const { id } = req.params;
    await cartModel.findOneAndUpdate(
      { _id: id },
      {
        $inc: { quantity: 1 },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ msg: "quantity increment successfull", success: true });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error });
  }
}

async function decrementquantityController(req, res) {
  try {
    const { id } = req.params;

    // Fetch the cart item to check current quantity
    const cartItem = await cartModel.findOne({ _id: id });
    if (!cartItem) {
      return res
        .status(404)
        .json({ success: false, msg: "Cart item not found" });
    }

    // Ensure quantity does not go below 1
    if (cartItem.quantity <= 1) {
      return res
        .status(400)
        .json({ success: false, msg: "Quantity cannot be less than 1" });
    }

    await cartModel.findOneAndUpdate(
      { _id: id },
      {
        $inc: { quantity: -1 },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ msg: "quantity decrement successfull", success: true });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error });
  }
}

module.exports = {
  addtocartController,
  getUserBycartController,
  deleteUserBycartController,
  incrementquantityController,
  decrementquantityController,
};
