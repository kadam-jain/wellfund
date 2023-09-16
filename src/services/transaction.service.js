const Razorpay = require("razorpay");
const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});
require("dotenv").config();

async function createOrderService(amount) {
  const orderData = {
    amount,
    currency: "INR",
    receipt: "order_rcptid_11",
    payment_capture: 1,
  };

  const order = await instance.orders.create(orderData);
  return {
    error: false,
    message: "order created successfully!",
    data: order,
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
