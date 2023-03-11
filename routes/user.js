const { json } = require("express");

const router = require("express").Router();

router.get("/api/users/gettest", (req, res) => {
    res.send("get data")
})

router.post("/api/users/posttest", (req, res) => {
    res.send(req.body)
})

module.exports = router