const express = require("express");
const router = express.Router();
const User = require("./userSchema");
const Contact=require("./contactSchema")
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.token

router.post("/signup",
    body("email", "Enter Correct Email").isEmail(),
    body("name", "Name Must contain 5 letters").isLength({ min: 5 }),
    body("password",).isStrongPassword({
        minLength: 6,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);

        let secPassword = await bcrypt.hash(req.body.password, salt);
        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
            });
            res.json({ success: true, message: 'User created successfully Click to login' });
        } catch (err) {
            console.log("error", err);
            res.json({ success: false });
        }
    }
);
router.post(
    "/login", body("email", "Enter Correct Email").isEmail(),
    body("password").isStrongPassword({
        minLength: 6,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Enter correct email" });
            }
            const pwdCompare = await bcrypt.compare(
                req.body.password,
                userData.password
            );
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Enter correct password" });
            }
            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            const name = userData.name;
            return res.json({ success: true, authToken: authToken, name: name });
        } catch (err) {
            console.log("error", err);
            res.json({ success: false });
        }
    }
);
router.post(
    "/contact", 
    async (req, res) => {
        try {
            await Contact.create({
                name: req.body.name,
                email: req.body.email,
                phone:req.body.phone,
                message:req.body.message
            });
            res.json({ success: true, message: 'contacted successfully' });
        } catch (err) {
            console.log("error", err);
            res.json({ success: false });
        }
    }
);


module.exports = router;
