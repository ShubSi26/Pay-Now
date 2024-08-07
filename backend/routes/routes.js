const express = require('express');
const user = require('./userdetail');
const authentication = require("./authentication");
const wallet  = require("./wallet");
const payment = require("./payment");
const transaction = require("./transaction")
const search = require("./search")

const router = express.Router();

router.use("/user",user);
router.use("/auth",authentication);
router.use("/wallet",wallet);
router.use("/payment",payment);
router.use("/transaction",transaction);
router.use("/search",search);


module.exports = router;