const express = require('express');
const path = require('path');
const user = require('./userdetail');
const authentication = require("./authentication");
const wallet  = require("./wallet");
const payment = require("./payment");
const transaction = require("./transaction")
const search = require("./search")
const loan = require("./loan")

const router = express.Router();

router.use("/user",user);
router.use("/auth",authentication);
router.use("/wallet",wallet);
router.use("/payment",payment);
router.use("/transaction",transaction);
router.use("/search",search);
router.use("/loan",loan)
router.use("/healthz", (req, res) => {
    res.status(200).json({status:"ok"});
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});


module.exports = router;