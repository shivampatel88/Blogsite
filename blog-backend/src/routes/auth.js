const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const User  = require('/models/User');

const router = express.Router();

router.post('/singup',async(req,res) => {
    const {username,email,password} = req.body;
    try {
        const hased = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hased
        });
        await newUser.save();
        res.status(201).json({msg : "user created successfully"});
    }
    catch(err){
        res.status(500)/json({error: err.message})
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: "Wrong password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;