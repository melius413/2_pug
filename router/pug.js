const express = require('express');
const router = express.Router();

/*
url:/pug/update/4 요청처리시
1. 라우터 없이 사용
app.get('/pug/update/4', (req, res) => {});

2. 라우터 적용시
----app.js----
const pugRouter = require('./router/pug');
app.use('/pug', pugRouter);

----pug.js----
router.get('/update/4', (req, res) => {});
module.exports = router;
*/

router.get('/sample', (req, res) => {
    res.send("/router/sample");
});

module.exports = router;
