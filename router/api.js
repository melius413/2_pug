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

router.get(["/", "/get", "/get/:id"], async (req, res) => {
    let sql = '';
    const vals = {
        title: "API 게시판"
    };
    if (req.params.id) sql = "SELECT * FROM board WHERE id=" + req.params.id;
    else sql = "SELECT * FROM board ORDER BY id DESC";
    const connect = await pool.getConnection();
    const result = await connect.query(sql);
    vals.data = result[0];
    connect.release();
    //res.json(result[0]);
    res.json(vals);
});

router.post("/post", async (req, res) => { // CREATE
    console.log("post");
    console.log(req.body.writer);
    let title = req.body.title;
    let content = req.body.content;
    let writer = req.body.writer;
    let wdate = new Date();
    let sql = "INSERT INTO board SET title=?, content=?, writer=?, wdate=?";
    let sqlVals = [title, content, writer, wdate];
    let connect = await pool.getConnection();
    let result = await connect.query(sql, sqlVals);
    connect.release();
    res.json(result[0]);
});

router.delete('/delete', async (req, res) => {
    let sql = "DELETE FROM board WHERE id=" + req.body.id;
    let connect = await pool.getConnection();
    let result = await connect.query(sql);
    connect.release();
    res.json(result[0]);
});

router.put("/put", async (req, res) => {
    console.log("put");
    let id = req.body.id;
    let title = req.body.title;
    let content = req.body.content;
    let writer = req.body.writer;
    let sql = "UPDATE board SET title=?, content=?, writer=? WHERE id=?";
    let sqlVals = [title, content, writer, id];
    let connect = await pool.getConnection();
    let result = await connect.query(sql, sqlVals);
    connect.release();
    res.json(result[0]);
});

module.exports = router;