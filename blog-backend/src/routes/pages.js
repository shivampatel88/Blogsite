const express = require('express');
const router = express.Router();

router.get('/about', (req, res) => {
    res.json({ title: "About Us", content: "This is a blogging platform for everyone." });
});

router.get('/contact', (req, res) => {
    res.json({ email: "support@blogapp.com", phone: "+91-1234567890" });
});

module.exports = router;
