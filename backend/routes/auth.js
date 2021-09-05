const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { findOne } = require('../models/User');
const bcrypt = require('bcryptjs');
const { scryRenderedDOMComponentsWithClass } = require('react-dom/test-utils');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = "BIG-SECRET";

// ROUTE 1: create a user using POST "/api/auth/createuser"  No login require
router.post('/createuser', [
    body('name', 'Enter username').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be at least 5 chars long').isLength({ min: 5 }),
], async (req, res) => {
    // if there is error,return bad request 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // check if user already existed
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ errors: 'Email is not valid!' });
        }

        // secure password method
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user: {
                id: user.id,
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }

})


// ROUTE 2: Authenticate a user using POST "/api/auth/createuser"  No login require
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be at least 5 chars long').exists(),

], async (req, res) => {

    // if there is error,return bad request 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
        let user = await user.findOne({email});
        if (!user) {
            return res.status(400).json({error: "Log in to join"})
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({error: "Log in to join"})
        }
        const data = {
            user: {
                id: user.id,
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

// ROUTE 3: GET login user details using POST "/api/auth/getuser"   login require
router.post('/getuser', fetchuser, async (req, res) => {
try {
    userId = req.user.id;
    const user = await user.findById(userId).select("-password");
    res.send(user)
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error")
}
})
module.exports = router

// npx nodemon index.js
