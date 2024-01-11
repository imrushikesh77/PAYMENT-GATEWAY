const apiResponse = require("../utils/apiResponce.js");
const instance = require("../utils/razorpayInstance.js");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();
const paymentModel = require("../models/paymentSchema.js");

const postCheckoutSession = async (req, res) => {
    const amount = req.body.amount;

    try {
        const options = {
            amount: Number(amount * 100),  // amount in the smallest currency unit
            currency: "INR",
        };
        const order = await instance.orders.create(options);
        return res.status(200).json(new apiResponse(200, order, "checkout session created", true));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new apiResponse(500, null, "Internal Server Error"));
    }
};

const postPaymentVerification = async (req, res) => {
    try {
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
        } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");
        const isSignatureValid = expectedSignature === razorpay_signature;
        if(isSignatureValid){
            const newPayment = await paymentModel.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            });
            return res.redirect(`http://localhost:5001/api/v1/payment/success?reference=${razorpay_payment_id}`);
        }
        else{
            return res.status(400).json(new apiResponse(400, null, "Payment Unsuccessful", false));
        }
    } catch (error) {
        console.log(error.message);
        res.send("error");
    }
};

const getSuccess = async (req, res) => {
    try {
        const {reference} = req.query;
        return res.status(200).render("success.ejs", {reference});
    } catch (error) {
        console.log(error.message);
        res.send("error");
    }
}

module.exports = {
    postCheckoutSession,
    postPaymentVerification,
    getSuccess
};
