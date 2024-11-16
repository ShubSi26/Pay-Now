const express = require('express')
const bodyParser = require('body-parser');
const {JWTMiddleware} = require('../middleware/jwt');
const {loan,user} = require('../db')

const router = express.Router();
router.use(bodyParser.json());

router.post("/",JWTMiddleware,async(req,res)=>{
    console.log(req.body)
    const {amount,duration,loanpurpose,anualincome} = req.body;
    
    const id = req.id;
    console.log(id)
    const respone = await loan.create({id:id, amount:amount,duration:duration,loanpurpose:loanpurpose,anualincome:anualincome});
    if(!respone){
        res.status(400).json({message:"Error"})
        return
    }
    const r = await user.updateOne({_id:id},{$inc:{balance:amount}});
    if(!r){
        res.status(400).json({message:"Error"})
        return
    }
    res.status(200).json({message:"Loan Approved"})


})

module.exports = router;