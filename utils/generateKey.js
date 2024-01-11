const apiResponce = require("./apiResponce.js");
const dotenv = require("dotenv");
dotenv.config();
const generateKey = (req, res) => {
    const key = process.env.RAZORPAY_KEY_ID;
    return res.status(200).json(
        new apiResponce(200, key, "Key generated", true)
    );
};

module.exports = generateKey;