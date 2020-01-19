const express = require("express");
const path = require("path");
const User = require(path.join(__dirname, "../models/User"));
const router = express.Router();

router.get("/create", async (req, res) => {
    let result = await User.create({ // INSERT
        // username: '홍식이',
        // userid: 'hong',
        // age: 25
        username: req.query.username,
        userid: req.query.userid,
        age: req.query.age
    });
    res.json(result);
});

router.get("/get", async (req, res) => {
    let result = await User.findAll({ // SELECT
        order: [["id", "desc"]] // 내림차순. 2차배열
    });
    res.json(result);
});


module.exports = router;