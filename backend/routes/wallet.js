const express = require('express');
const bodyParser = require('body-parser');
const {JWTMiddleware} = require('../middleware/jwt');
const {wallet} = require('../db');

const router = express.Router();

router.use(bodyParser.json());

router.post("/",JWTMiddleware,async (req,res)=>{
    const id = req.body.id;

    const resp = await wallet.find({user:id}).sort({date:-1});

    if(!resp){
        res.status(400).json({error:"Wallet not found"});
        res.end();
        return;
    }
    res.status(200).json(resp);
});

module.exports = router;