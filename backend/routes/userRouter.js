const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userRouter = express.Router()

userRouter.post('/users/signup', async (req,res) => {
    try{
        const {name,email,password} = req.body;
        const existingUser = await User.findOne({
            where: { email: email }
          });

        if(existingUser){
            return res.status(400).json({error: "User email already exists!"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await User.create({name,email,password: hashPassword});


        return res.status(201).json({message: "User is registered successfully "})
    }catch(err){
        return res.status(500).json({ error: err.message });
    }
})

userRouter.post('/users/login', async(req,res) => {
    try{
        const {email, password} = req.body;

        // Find Existing user by email
        const user = await User.findOne({
            where: { email: email }
        });
        if(!user){
            return res.status(400).json({error: "Invalid Credentials!"});
        }

        // Check Password 
        const validPw = await bcrypt.compare(password, user.password);
        if(!validPw) {
            return res.status(400).json({error: "Invalid Credentials!"})
        }

        // Generate Token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "1h",
        });
        return res.json({token});

    }catch(err){
        res.status(500).json({error: err.message})
    }
})

// routes/authRoutes.js (add this endpoint)
userRouter.post("/users/logout", async (req, res) => {
  return res.json({ message: "Logged out successfully" });
});

module.exports = userRouter

