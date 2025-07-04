const orderModel = require("../models/orderModel");
const { v4: uuidv4 } = require("uuid");
const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = process.env.store_id;
const store_passwd = process.env.store_passwd;
const is_live = false; //true for live, false for sandbox

async function orderController(req, res) {
  try {
    let {
      fullname,
      address,
      phone,
      paymentMethod,
      deliverycharge,
      cartlist,
      userid,
      totalPrice,
    } = req.body;

    if (
      fullname &&
      address &&
      phone &&
      paymentMethod &&
      deliverycharge &&
      cartlist &&
      userid &&
      totalPrice
    ) {
      if (paymentMethod == "COD") {
        //case on delivery
        let order = new orderModel({
          fullname,
          address,
          phone,
          paymentMethod,
          paymentstatus: "Pending",
          deliverycharge,
          cartlist,
          userid,
          totalPrice,
        });
        await order.save();
        return res
          .status(201)
          .json({ msg: "order place successfull", success: true });
      } else {
        //online payment
        const uid = uuidv4();
        const data = {
          total_amount: totalPrice,
          currency: "BDT",
          tran_id: uid, // use unique tran_id for each api call
          success_url: `${process.env.base_url}/order/paysuccess/${uid}`,
          fail_url: `${process.env.base_url}/order/payfail/${uid}`,
          cancel_url: `${process.env.base_url}/order/paycancel/${uid}`,
          ipn_url: `${process.env.base_url}/order/payipn`,
          shipping_method: "Courier",
          product_name: "Computer.",
          product_category: "Electronic",
          product_profile: "general",
          cus_name: "Customer Name",
          cus_email: "customer@example.com",
          cus_add1: "Dhaka",
          cus_add2: "Dhaka",
          cus_city: "Dhaka",
          cus_state: "Dhaka",
          cus_postcode: "1000",
          cus_country: "Bangladesh",
          cus_phone: "01711111111",
          cus_fax: "01711111111",
          ship_name: "Customer Name",
          ship_add1: "Dhaka",
          ship_add2: "Dhaka",
          ship_city: "Dhaka",
          ship_state: "Dhaka",
          ship_postcode: 1000,
          ship_country: "Bangladesh",
        };
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        sslcz.init(data).then(async (apiResponse) => {
          // Redirect the user to payment gateway
          let GatewayPageURL = apiResponse.GatewayPageURL;

          const gateway = GatewayPageURL.split("/");
          const url = gateway[gateway.length - 1];
          let order = new orderModel({
            fullname,
            address,
            phone,
            paymentMethod: "Online",
            paymentstatus: "Pending",
            deliverycharge,
            cartlist,
            userid,
            totalPrice,
            transaction_id: uid,
          });
          await order.save();

          return res.status(200).json({ success: true, id: url });
        });
      }
    } else {
      return res.status(500).json({
        msg: "all fields are required",
        success: false,
        data: req.body,
      });
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
      .populate({
        path: "cartlist",
        populate: {
          path: "productid",
          model: "Product",
        },
      });

    return res
      .status(200)
      .json({ success: true, msg: "order get successfull", data: order });
  } catch (error) {
    return res.status(500).json({ msg: error, success: false });
  }
}

async function PaySuccessController(req, res) {
  const { id } = req.params;
  const updateOrder = await orderModel.findOneAndUpdate(
    { transaction_id: id },
    { paymentstatus: "Paid" }
  );

  res.redirect(`${process.env.vite_base_url}/paysuccess`);
}

async function PayFailController(req, res) {
  const { id } = req.params;
  const updateOrder = await orderModel.findOneAndUpdate(
    { transaction_id: id },
    { paymentstatus: "Pending" }
  );

  res.redirect(`${process.env.vite_base_url}/payfail`);
}

async function PayCancelController(req, res) {
  const { id } = req.params;
  const updateOrder = await orderModel.findOneAndUpdate(
    { transaction_id: id },
    { paymentstatus: "Pending" }
  );

  res.redirect(`${process.env.vite_base_url}/paycancel`);
}

async function PayIPNcontroller(req, res) {
  res.redirect(`${process.env.vite_base_url}/payipn`);
}

module.exports = {
  orderController,
  getAllOrderController,
  PaySuccessController,
  PayFailController,
  PayCancelController,
  PayIPNcontroller,
};
