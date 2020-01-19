const express = require('express');
const router = express.Router();
const {
    pool,
    sqlErr
} = require('../modules/mysql-conn'); // js(확장자 생력가능), mysql2 모듈 버전

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

// router.get('/sample', (req, res) => {
//     res.send("/router/sample");
// });


// 멀티 페이지 라우터
router.get(['/', '/:page'], async (req, res) => {
    console.log("get /");
    let page = req.params.page ? req.params.page : "list";
    let vals = {};

    switch (page) {
        case "list":
            vals.title = "게시글 리스트";
            let sql = "SELECT * FROM board ORDER BY id DESC";
            const connect = await pool.getConnection();
            const result = await connect.query(sql);
            connect.release();
            vals.lists = result[0];
            res.render("list.pug", vals);
            break;
        case "write":
            vals.title = "게시글 작성";
            res.render("write.pug", vals);
            break;
        default:
            res.redirect('/pug'); // location.href랑 같음
            break;
    }
});

router.get('/view/:id', async (req, res) => {
    console.log("get view");
    let vals = {
        title: "게시글 상세 보기",
    };
    // 클라이언트 IP 확인하기
    // console.log(req.headers['x-forwarded-for']);
    // console.log(req.headers.host); // 서버주소
    // console.log(req.connect.remoteAddress);
    // console.log(req.ip);
    let id = req.params.id;
    const connect = await pool.getConnection();
    let sql = "UPDATE board SET rnum = rnum + 1 WHERE id =" + id;
    let result = await connect.query(sql);
    sql = "SELECT * FROM board WHERE id=" + id;
    result = await connect.query(sql);
    connect.release();
    vals.data = result[0][0];
    // res.json(result[0][0]);
    res.render("view.pug", vals);
});

router.get("/delete/:id", async (req, res) => {
    console.log("get delete");
    let id = req.params.id;
    let sql = "DELETE FROM board WHERE id=" + id;
    const connect = await pool.getConnection();
    const result = await connect.query(sql);
    connect.release();
    if (result[0].affectedRows == 1) {
        res.redirect("/pug");
    } else {
        res.send("삭제에 실패하였습니다.");
    }
});

router.get("/update/:id", async (req, res) => {
    console.log("get update");
    const vals = {
        title: "게시글 수정",
    }
    const id = req.params.id;
    const sql = "SELECT * FROM board WHERE id=" + id;
    const connect = await pool.getConnection();
    const result = await connect.query(sql);
    connect.release();
    //res.json(result[0]);
    vals.data = result[0][0];
    res.render("update.pug", vals);
});

router.post("/update", async (req, res) => {
    console.log("post update");
    const sqlVals = [];
    sqlVals.push(req.body.title);
    sqlVals.push(req.body.content);
    sqlVals.push(req.body.id);
    const sql = "UPDATE board SET title=?, content=? WHERE id=?";
    const connect = await pool.getConnection();
    const result = await connect.query(sql, sqlVals);
    connect.release();
    //res.json(result[0]);
    if (result[0].changedRows == 1) {
        res.redirect("/pug");
    } else {
        res.send("수정에 실패하였습니다.");
    }
});

router.post('/create', async (req, res) => {
    console.log("post create");
    let sql = 'INSERT INTO board SET title=?, writer=?, wdate=?, content=?';
    let val = [req.body.title, req.body.writer, new Date(), req.body.content];
    const connect = await pool.getConnection();
    const result = await connect.query(sql, val);
    connect.release(); // pool에게 돌려주기(반납)
    // res.json(result);
    res.redirect('/pug');
});

module.exports = router;
