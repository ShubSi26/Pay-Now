const Razorpay = require("razorpay");
const dotenv = require("dotenv");
dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

console.log("Razorpay initialized");

module.exports = razorpay; 
