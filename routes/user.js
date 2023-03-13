const { verifyToken, verifyTokenAndAuthorisation, verifyTokenAndAdmin } = require("./verifyToken.js")
const User = require("../models/User.js")

const router = require("express").Router();

//update user
router.put("/:id", verifyTokenAndAuthorisation, async (req, res) => {

    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_ENCRYPT).toString()
    }

    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        return res.status(200).json(updateUser);

    } catch (error) {
        return res.status(500).json(error);
    }
})

//delete user
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json("user deleted");

    } catch (error) {
        return res.status(500).json(error);
    }
})


//get user
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const getUser = await User.findById(req.params.id)

        return res.status(200).json(getUser);

    } catch (error) {
        return res.status(500).json(error);
    }
})

//get all user or new 5 users
router.get("/", verifyTokenAndAdmin, async (req, res) => {

    const query = req.query.new

    try {
        const getAllUser = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find()

        return res.status(200).json(getAllUser);

    } catch (error) {
        return res.status(500).json(error);
    }
})


// router.get("/api/users/gettest", (req, res) => {
//     res.send("get data")
// })

// router.post("/api/users/posttest", (req, res) => {
//     res.send(req.body)
// })


module.exports = router