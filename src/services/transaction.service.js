const Razorpay = require("razorpay");
const Order = require("../models/Orders");
const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});
require("dotenv").config();

async function createOrderService({ amount, organisationId, id }) {
  const orderData = {
    amount,
    currency: "INR",
    receipt: "order_rcptid_11",
    payment_capture: 1,
  };

  const order = await instance.orders.create(orderData);
  const saveOrder = await Order.create({
    userId: id,
    orderId: order.id,
    amount: order.amount,
    receipt: order.receipt,
    status: order.status,
    organisationId,
  });
  return {
    error: false,
    message: "order created successfully!",
    data: saveOrder,
  };
}

async function webhookService(data) {
  console.log(data);
  return;
}

module.exports = {
  createOrderService,
  webhookService,
};
