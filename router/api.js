const express = require('express');
const router = express.Router();
const {
    pool,
    sqlErr
} = require('../modules/mysql-conn');

/*
- 노드는 restful api를 다가지고 있음
get:    Read/Select
post:   Create/Insert
put:    Update/Update
delete: Delete/Delete

HTML은 get, post만 있음
method-override 모듈 사용 필요
*/

router.get(["/get", "/get/:id"], async (req, res) => {
    let sql = '';

    if (req.params.id) sql = "SELECT * FROM board WHERE id=" + req.params.id;
    else sql = "SELECT * FROM board ORDER BY id DESC";

    const connect = await pool.getConnection();
    const result = await connect.query(sql);
    connect.release();
    res.json(result[0]);
});

// router.post();
// router.put();
// router.delete();

module.exports = router;