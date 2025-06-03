const { default: mongoose, Schema } = require("mongoose");
const orderSchema = new Schema(
  {
    cartlist: [
      {
        productid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: String,
        },
      },
    ],
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "Online"],
      required: true,
    },
    paymentstatus: {
      type: String,
      enum: ["Pending", "Paid"],
    },
    fullname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: String,
      required: true,
    },
    transaction_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
