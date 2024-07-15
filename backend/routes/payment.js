const express = require('express');
const bodyParser = require('body-parser');
const {JWTMiddleware} = require('../middleware/jwt');
const {user,wallet,transaction,paymentRequest} = require('../db');
const { mongo, default: mongoose } = require('mongoose');

const router = express.Router();
router.use(bodyParser.json());


router.post("/addmoney",JWTMiddleware,async (req,res)=>{
    const id = req.body._id;
    const amount = req.body.amount;

    const txid = Math.floor(Math.random()*1030600);

    const resp = await user.updateOne({_id:id},{$inc:{balance:amount}});

    if(!resp){
        res.status(400).json({error:"User not found"});
        res.end();
        return;
    }

    const walet = await wallet.create({id:txid,amount:amount,user:id,date:new Date()});
    if(!walet){
        res.status(400).json({error:"Error in updating wallet"});
        res.end();
        return;
    }
    res.status(200).json({txid:txid});

});

router.post("/verifyDetails",JWTMiddleware,async (req,res)=>{

    const type = req.body.type;

    switch(type){
        case "uid":{
            const f = req.body.receiver;
            const resp = await user.findOne({uid:f},{name:1,_id:1});
            if(!resp){
                res.status(400).json({error:"User with UID not found"});
                res.end();
                return;
            }
            res.status(200).json({resp:resp.name,_id:resp._id});
            break;
        }
        case "email":{
            const f = req.body.receiver;
            const resp = await user.findOne({email:f},{name:1,_id:1});
            if(!resp){
                res.status(400).json({error:"User with email not found"});
                res.end();
                return;
            }
            res.status(200).json({resp:resp.name,_id:resp._id});
            break;
        }
        case "number":{
            const f = (req.body.receiver);

            let num = Number(f);
            if(isNaN(num)){
                res.status(400).json({error:"Invalid number"});
                res.end();
                return;
            }
            const resp = await user.findOne({number:f},{name:1,_id:1});
            if(!resp){
                res.status(400).json({error:"User with number not found"});
                res.end();
                return;
            }
            res.status(200).json({resp:resp.name,_id:resp._id});
            break;
        }
        default:{
            res.status(400).json({error:"Invalid type"});
            res.end();
            return;
        }
    }
});


router.post("/sendmoney",JWTMiddleware,async (req,res)=>{

        const sender = req.body.sender;
        const receiver = req.body.receiver;
        const senderName = req.body.senderName;
        const receiverName = req.body.receiverName;
        const amount = req.body.amount;
        const pin = req.body.pin;

        const txid = Math.floor(Math.random()*1030600);
        const resp = await user.findOne({_id:sender},{balance:1,pin:1});

        if( resp.pin != pin){
            res.status(400).json({error:"wrong pin"});
            res.end();
            return;
        }

        if(resp.balance < amount){
            res.status(400).json({error:"Insufficient balance"});
            res.end();
            return;
        }

        const session = await mongoose.startSession();

         try
         {
            session.startTransaction();

            const resp1 = await user.updateOne({_id:sender},{$inc:{balance:-amount}});
            const resp2 = await user.updateOne({_id:receiver},{$inc:{balance:amount}});

            const trans = await transaction.create({id:txid,sender:sender,receiver:receiver,amount:amount,receiverName:receiverName,senderName:senderName});
            if(!trans || !resp1 || !resp2){
                res.status(400).json({error:"Error in updating wallet"});
                res.end();
                await session.abortTransaction();
                session.endSession();
                return;
            }

            await session.commitTransaction();
            res.status(200).json({txid:txid});
        }
        catch(err){
            await session.abortTransaction();
            console.log(err);
            res.status(400).json({error:"Error"});
            res.end();
        }
        finally{
            session.endSession();
        }
});

router.post("/sendRequest",JWTMiddleware,async (req,res)=>{

    const pushdata = {
         sender : req.body.sender,
         receiver : req.body.receiver,
         senderName : req.body.senderName,
         receiverName : req.body.receiverName,
         amount : req.body.amount
    }

    const resp = await paymentRequest.create(pushdata);

    if(!resp){
        res.status(400).json({error:"Error in sending request"});
        res.end();
        return;
    }
    res.status(200).json({txid:resp._id});
})

router.post("/getRequests",JWTMiddleware,async (req,res)=>{
    const id = req.body._id; 
    const resp = await paymentRequest.find({receiver:id});

    if(!resp){
        res.status(400).json({error:"No requests found"});
        res.end();
        return;
    }
    res.status(200).json({resp});
});

router.post("/removeRequest",JWTMiddleware,async (req,res)=>{
    const id = req.body._id;
    const resp = await paymentRequest.deleteOne({_id:id});

    if(!resp){
        res.status(400).json({error:"No requests found"});
        res.end();
        return;
    }
    res.status(200).json({resp});
});

module.exports = router;