const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    userId: {
      type: String,
    },
    organisationId: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    amount: {
      type: Number,
    },
    method:{
        type: String
    }
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
