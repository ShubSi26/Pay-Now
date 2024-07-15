const express = require('express');
const bodyParser = require('body-parser');
const {JWTMiddleware} = require('../middleware/jwt');
const {transaction} = require('../db');


const router = express.Router();
router.use(bodyParser.json());

router.post("/get",JWTMiddleware,async (req,res)=>{
    const id = req.body._id;

    const resp = await transaction.find({$or:[{sender:id},{receiver:id}]}).sort({date:-1});

    if(!resp){
        res.status(400).json({error:"User not found"});
        res.end();
        return;
    }
    res.status(200).json({resp:resp});
})

module.exports = router;