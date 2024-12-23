const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Addre = require('../models/Addr');

const jwtSecret = "Myqwertyuiopasdfghjklzxcvbnmqwer";

// Rate limit constants
const LOGIN_BUCKET_CAPACITY = 3; // Number of attempts
const LOGIN_REFILL_TIME = 60 * 1000; // 1 minute in milliseconds

// In-memory store for rate limiting (for demonstration purposes)
let loginRateLimit = new Map();

// Middleware for login rate limiting
const loginRateLimiter = (req, res, next) => {
    const email = req.body.email; // Using email as the unique identifier
    const currentTime = Date.now();

    if (!loginRateLimit.has(email)) {
        // Initialize the bucket for the user
        loginRateLimit.set(email, {
            tokens: LOGIN_BUCKET_CAPACITY, // Initial bucket capacity
            lastRefill: currentTime, // Timestamp of last refill
        });
    }

    const bucket = loginRateLimit.get(email);
    const timeElapsed = currentTime - bucket.lastRefill;

    // Calculate tokens to refill based on elapsed time
    if (timeElapsed > LOGIN_REFILL_TIME) {
        bucket.tokens = LOGIN_BUCKET_CAPACITY; // Refill the bucket completely
        bucket.lastRefill = currentTime;
    }

    // Check if the user has enough tokens
    if (bucket.tokens > 0) {
        bucket.tokens -= 1; // Consume a token
        loginRateLimit.set(email, bucket); // Update the bucket
        next(); // Allow the request
    } else {
        // Reject the request with status 429 and the Retry-After header
        const timeRemaining = Math.ceil((LOGIN_REFILL_TIME - timeElapsed) / 1000); // Convert milliseconds to seconds
        res.setHeader('Retry-After', timeRemaining); // Set the Retry-After header
        return res.status(429).json({
            error: `Too many login attempts. Please try again in ${timeRemaining} seconds.`,
        });
    }
};

// User creation endpoint
router.post("/createuser", [
    body('email', 'incorrect email').isEmail(),
    body('name').isLength({ min: 4 }),
    body('password', 'incorrect password').isLength({ min: 4 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt);
    try {
        await User.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: secPass
        }).then(user => {
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            res.json({ success: true, authToken });
        })
            .catch(err => {
                console.log(err);
                res.json({ error: "Please enter a unique value." })
            });
    } catch (error) {
        console.error(error.message);
    }
});


// Login endpoint with rate limiting middleware
router.post("/login", loginRateLimiter, [
    body('email', 'incorrect email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 4 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
        let userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "Try login with correct details" })
        }
        const pwCompare = await bcrypt.compare(req.body.password, userData.password);
        if (!pwCompare) {
            return res.status(400).json({ errors: "Try login with correct details" })
        }
        const data = {
            user: {
                id: userData.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret);
        return res.status(200).json({ success: true, authToken: authToken });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
router.post("/address", [
    body('address'),
    body('town'),
    body('street'),
    body('state'),
], async (req, res) => {


    try {
        await Addre.create({
            Address: req.body.Address,
            street: req.body.street,
            town: req.body.town,
            state: req.body.state

        }).then(
            res.json({ success: true }))
        
    } catch (error) {
        console.error(error.message);
    }
});

module.exports = router;
