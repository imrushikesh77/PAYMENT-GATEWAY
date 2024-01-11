const express = require("express");
const router = express.Router();

const {
    postCheckoutSession,
    postPaymentVerification,
    getSuccess
} = require("../controllers/paymentController.js");

router.post("/checkout",postCheckoutSession);
router.post("/payment-verification", postPaymentVerification);
router.get("/success", getSuccess);

module.exports = router;