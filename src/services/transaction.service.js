const Razorpay = require("razorpay");
const Order = require("../models/Orders");
const Payment = require("../models/Payments");
const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});
require("dotenv").config();

async function createOrderService({ amount, organisationId, id }) {
  const orderData = {
    amount: amount * 100,
    currency: "INR",
    receipt: "order_rcptid_11",
    payment_capture: 1,
    notes: { userId: id, organisationId },
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

async function webhookService(data, headers) {
  const {
    payload: {
      payment: {
        entity: { id, amount, method },
      },
    },
  } = data;
  const {
    payload: {
      payment: {
        entity: {
          notes: { userId, organisationId },
        },
      },
    },
  } = data;

  if (
    Razorpay.validateWebhookSignature(
      JSON.stringify(data),
      headers["x-razorpay-signature"],
      process.env.WEBHOOK_SECRET
    )
  ) {
    await Payment.create({
      userId,
      organisationId,
      transactionId: id,
      amount,
      method,
    });
    return null;
  }
}

module.exports = {
  createOrderService,
  webhookService,
};
