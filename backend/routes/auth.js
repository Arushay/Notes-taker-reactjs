const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { findOne } = require('../models/User');
const bcrypt = require('bcryptjs');
const { scryRenderedDOMComponentsWithClass } = require('react-dom/test-utils');
const jwt = require('jsonwebtoken');


const JWT_SECRET = "BIG-SECRET";
// create a user using POST "/api/auth/createuser"  No login require
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
    }

})
module.exports = router

// npx nodemon index.js
