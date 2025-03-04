const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');

// Load environment variables
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "vottakaistar123";

// ✅ ENDPOINT 1: Create User & Generate Auth Token
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('mail', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let success = false;
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        const { name, mail, password } = req.body;

        // Check if user already exists
        let existingUser = await User.findOne({ mail });
        if (existingUser) {
            success = false;
            return res.status(409).json({ success, error: "User already exists, please use another email!" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(password, salt);

        // Create user
        const newUser = await User.create({
            name,
            mail,
            password: secpass,
        });

        // Generate JWT token
        const data = { user: { id: newUser._id } };
        const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });
        success = true;
        return res.status(201).json({ success, authToken });

    } catch (error) {
        success = false;
        console.error("Error creating user:", error.message);
        return res.status(500).json({ success, error: "Internal Server Error" });
    }
});

// ✅ ENDPOINT 2: Login User & Return Auth Token
router.post('/login', [
    body('mail', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be empty').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { mail, password } = req.body;
    try {
        let user = await User.findOne({ mail });
        if (!user) {
            let success = false;
            return res.status(400).json({ error: "Invalid email or password!" });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            success = false;
            return res.status(400).json({ success, error: "Invalid email or password!" });
        }

        // Generate JWT token
        const data = { user: { id: user._id } };
        const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });
        success = true;
        return res.status(200).json({ success, authToken });

    } catch (error) {
        console.error("Error logging in:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ ENDPOINT 3: Get User Details (Requires Authentication)
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;