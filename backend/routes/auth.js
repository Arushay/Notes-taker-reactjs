const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = "$ecret";

// Create a new user using: POST "api/auth/createuser" & does not require authentication
router.post('/createuser', [
    body('name', 'name must be at least 3 chars long').isLength({ min: 3 }),
    body('email', 'email must be unique').isEmail(),
    body('password', 'password must be at least 5 chars long').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    // if there is error,  return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // check if user already exixt
    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({success,  error: "User already exixts" })
        }
        const salt = await bcrypt.genSalt(10);
        secPassword = await bcrypt.hash(req.body.password, salt);
        // create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error");
    }
})

// Authenticate a user using: POST "api/auth/login" & does not require authentication
router.post('/login', [
    body('email', 'Email must be unique').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

    let success = false;
    // if there is error,  return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ errors: "Please login to join" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        success = false;
        if (!passwordCompare) {
            return res.status(400).json({ success, errors: "Please login to join" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error");
    }
});

// Get logged in user details using: POST "api/auth/getuser",  require authentication
router.post('/getuser', fetchUser , async (req, res) => {

try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
    
} catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error");
}

});
module.exports = router
