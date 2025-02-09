const jwt = require('jsonwebtoken')
require('dotenv').config()
const authenticateUser = (req,res,next) => {
    const token = req.header('Authorization')
    if(!token) {
        return res.status(401).json({message: "Access Denied"})
    }

    try{
        // const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET_KEY);
        req.user = verified
        next()
    }catch(err){

        res.status(400).json({message: err.message})
    }
}

module.exports = authenticateUser