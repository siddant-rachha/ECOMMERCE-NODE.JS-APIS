const router = require("express").Router();

router.get("/api/user/usertest", (req, res) => {
    res.send("data")
})

module.exports = router