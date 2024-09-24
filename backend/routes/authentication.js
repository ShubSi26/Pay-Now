const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const zod = require('zod');
const { user } = require('../db');
require('dotenv').config();


const router = express.Router();

router.use(bodyParser.json());

const schema = zod.object({
    email: zod.string().email({ message: "Invalid email address" }),
    password: zod.string().min(6, { message: "Password must be at least 6 characters long" }),
    name: zod.string().nonempty({ message: "Name cannot be empty" }),
    number: zod.string().min(10, { message: "Number must be at least 10 characters long" })
});

/*regestration*/

router.post('/register', async (req, res) => {

    const { success, error } = schema.safeParse(req.body);

    if (!success) {
        res.status(400).json({ error: error.errors[0].message });
        res.end();
        return;
    }
    const search = await user.findOne({ email: req.body.email });

    if (search) {
        res.status(400).json({ error: "User with this email already exists" });
        res.end();
        return;
    }

    const search2 = await user.findOne({ number: req.body.number });

    if (search2) {
        res.status(400).json({ error: "User with this number already exists" });
        res.end();
        return;
    }
    req.body.balance = 0;
    req.body.uid = req.body.number + "@paynow";
    try {
        const resp = await user.create(req.body);

        if (!resp) {
            res.status(400).json({ error: "User already exists" });
            res.end();
            return;
        }
        const token = jwt.sign({ key: resp._id }, process.env.secret);

        console.log(resp.name + " registered");

        res.status(200).json({ token, resp });
        res.end();
    }
    catch(err){
        console.log(err);
        res.status(400).json({ error: "Invalid Data" });
        res.end();
        return;
    }

});


/*login*/

const loginschema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
})

router.post("/login", async (req, res) => {


    const { success } = loginschema.safeParse(req.body);

    if (!success) {
        res.status(400).json({ error: "Invalid data" });
        res.end();
        return;
    }
    const resp = await user.findOne({ email: req.body.email, password: req.body.password });

    if (!resp) {
        res.status(400).json({ error: "E-mail address or Password is wrong" });
        res.end();
        return;
    }

    const token = jwt.sign({ key: resp._id }, process.env.secret);

    console.log(resp.name + " logged");

    res.status(200).json({ token, resp });
    res.end();
})

module.exports = router;