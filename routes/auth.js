const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");



const User = require("../models/User.js")

//register
router.post("/register", async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_ENCRYPT).toString()
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

//login
router.post("/login", async (req, res) => {

    try {

        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            res.status(401).json("wrong username");
            return
        }

        var bytes = CryptoJS.AES.decrypt(user.password, process.env.PASS_ENCRYPT);
        var originalPass = bytes.toString(CryptoJS.enc.Utf8);

        if (originalPass != req.body.password) {
            res.status(401).json("wrong password");
            return
        }

        //success
        
        //generate token
        const accessToken = jwt.sign({
            id: user._id, 
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET, { expiresIn: "3d" })
        
        user._doc.password = ""
        user._doc.accessToken = accessToken

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

module.exports = router