const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userId: {
      type: String,
    },
    organisationId: {
      type: String,
    },
    orderId: {
      type: String,
    },
    amount: {
      type: Number,
    },
    receipt: {
      type: String,
    },
    status:{
        type: String
    }
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
