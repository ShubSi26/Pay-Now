const express = require('express');
const {user} = require('../db');
const bodyParser = require('body-parser');
const {JWTMiddleware} = require('../middleware/jwt');

const router = express.Router();
router.use(bodyParser.json());

router.post("/",JWTMiddleware,async (req,res)=>{
    const id = req.body.id;

    const resp = await user.findOne({_id:id});

    if(!resp){
        res.status(400).json({error:"User not found"});
        res.end();
        return;
    }
    res.status(200).json({resp:resp});
})


module.exports = router;