const express = require('express');
const bodyParser = require('body-parser');
const {user} = require('../db');
const {JWTMiddleware} = require('../middleware/jwt');


const router = express.Router();
router.use(bodyParser.json());

router.post('/',JWTMiddleware, async(req, res) => {
    const key = req.body.key;
    const type = req.body.type;

    if(type === "name"){
        const resp = await user.find({ name: { $regex: new RegExp(key, 'i') } },{name:1,_id:1,number:1}).sort({name:1});
        if(!resp){
            res.status(400).json({error:"User with name not found"});
            res.end();
            return;
        }
        res.status(200).json({resp:resp});
    }
    else if(type === "number"){

        console.log(key);

        let num = Number(key);
        if(isNaN(num)){
            res.status(400).json({error:"Invalid number"});
            res.end();
            return;
        }

        const resp = await user.findOne({number:Number(key)},{name:1,_id:1,number:1}).sort({name:1});
        if(!resp){
            res.status(400).json({error:"User with number not found"});
            res.end();
            return;
        }
        res.status(200).json({resp:[resp]});
    }
    else{
        res.status(400).json({error:"Invalid type"});
    }
});


module.exports = router;