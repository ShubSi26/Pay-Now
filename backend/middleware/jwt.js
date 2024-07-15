const jwt = require("jsonwebtoken");
require('dotenv').config();
const jwtSecret = process.env.secret;

const JWTMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({data:"Unauthorized Access"});
    }

    const token = authHeader;

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.id = decoded.key;
        next();
    } catch (err) {
        return res.status(403).json({data:"Unauthorized Access"});
    }
};

module.exports = {JWTMiddleware}