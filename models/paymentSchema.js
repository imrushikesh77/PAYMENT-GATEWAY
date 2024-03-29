const mongoose = require('mongoose');
const schema = mongoose.Schema;

const paymentSchema = new schema({
    razorpay_order_id: {
        type: String,
        required: true
    },
    razorpay_payment_id: {
        type: String,
        required: true
    },
    razorpay_signature: {
        type: String,
        required: true
    },
});

const paymentModel = mongoose.model("payment", paymentSchema);

module.exports = paymentModel;