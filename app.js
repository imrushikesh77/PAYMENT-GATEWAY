const express = require("express");
const app = express();
const cors = require("cors");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(`./public`));

// Routes
const paymentRouter = require("./routes/payment.js");

//Utils
const generateKey = require("./utils/generateKey.js");

app.get("/api/v1/payment/generate-key", generateKey);
app.use("/api/v1/payment", paymentRouter);
app.get("/", (req, res)=>{
    res.status(200).render("payment");
})

module.exports = app;