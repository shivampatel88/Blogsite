const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const User  = require('../models/User');

const router = express.Router();

router.post('/signup',async(req,res) => {
    const {firstname,lastname,email,password} = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    try {
        const hashed = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashed
        });
        await newUser.save();
        res.status(201).json({msg : "user created successfully"});
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: "Wrong password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token,user: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      }, });
    } catch (err) {
        console.error("Signin error:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;