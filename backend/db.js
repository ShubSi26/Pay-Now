const mongoose = require('mongoose');
require('dotenv').config();
const { Schema } = mongoose;
const databaseurl = process.env.databaseurl;

mongoose.connect(databaseurl)

console.log("Connected to database");

const userschema = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /^\S+@\S+\.\S+$/,
      },
      password: {
        type: String,
        required: true,
        minlength: 6, 
      },
      number: {
        type: Number,
        required: true,
        min: 1000000000,
        max: 9999999999,
        unique: true,
      },
      balance: {
        type: Number,
        default: 0,
      },
      address: {
        type: String,
        default: "",
        trim: true,
      },
      uid:{
        type:String,
        required:true,
        unique:true
      },
      pin:{
        type:Number,
        required:true
      }

})

const transactionSchema = new mongoose.Schema({
    id:{type:Number,required:true},
    sender:{type:String,required:true},
    receiver:{type:String,required:true},
    senderName:{type:String,required:true},
    receiverName:{type:String,required:true},
    amount:{type:Number,required:true},
    date:{type:Date,default:() => Date.now()},
})

const walletTransactionSchema = new mongoose.Schema({
  id:{type:String,required:true,unique:true},
  amount:{type:Number,required:true},
  date:{type:Date, default:() => Date.now()},
  user:{type:String,required:true}
})

const paymentRequestSchema = new mongoose.Schema({
  sender:{type:String,required:true},
  receiver:{type:String,required:true},
  senderName:{type:String,required:true},
  receiverName:{type:String,required:true},
  amount:{type:Number,required:true},
  date:{type:Date,default:() => Date.now()},
})
const loanApplication = new mongoose.Schema({
  id:{type:String,required:true},
  amount:{type:Number,required:true},
  duration:{type:Number,required:true},
  loanpurpose:{type:String,required:true},
  anualincome:{type:Number,required:true}
})

const user = mongoose.model('userInfo',userschema);

const transaction= mongoose.model('transaction',transactionSchema);

const wallet = mongoose.model('walletTransaction',walletTransactionSchema);

const paymentRequest = mongoose.model('paymentRequest',paymentRequestSchema);

const loan = mongoose.model('loanApplication',loanApplication)

module.exports = {user,transaction,wallet,paymentRequest,loan};