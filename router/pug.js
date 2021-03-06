const express = require('express');
const router = express.Router();
const dateTime = require('date-time');
const path = require('path');
const {
    pool,
    sqlErr
} = require(path.join(__dirname, '../modules/mysql-conn')); // js(확장자 생력가능), mysql2 모듈 버전
const {
    upload
} = require(path.join(__dirname, '../modules/multer-conn'));

console.log(__dirname); // pug.js의 절대경로

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
            for (let v of result[0]) { // es6
                if (v.realfile) {
                    v.fileIcon = true;
                }
            }
            const resultData = result[0].map((v) => {
                // v.wdate = dateTime(v.wdate);
                v.wdate = dateTime({date: v.wdate});
                return v;
            });
            vals.lists = resultData;
            // res.json(vals.lists);
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
    if (vals.data.realfile) {
        let file = vals.data.realfile.split('-');
        let filepath = "/uploads/" + file[0] + '/' + vals.data.realfile;
        vals.data.filepath = filepath;
        let img = ['.jpg', '.jpeg', '.gif', '.png'];
        let ext = path.extname(vals.data.realfile).toLowerCase();
        if (img.indexOf(ext) > -1) vals.data.fileChk = "img";
        else vals.data.fileChk = "file";
    } else vals.data.fileChk = "";
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

// multer.single("upfile") >> 파일 하나 올릴때
// upload.single("upfile")도 인수 req가 들어간다. (미들웨어)
// 미들웨어의 결과는 req에 포함되어 다음 함수에전달된다.
router.post('/create', upload.single("upfile"), async (req, res) => {
    console.log("post create");
    // console.log("req.fileUploadChk", req.fileUploadChk); // undefined(user didnot), false(ban), true
    let oriFile = '';
    let realFile = '';
    if (req.file) {
        oriFile = req.file.originalname;
        realFile = req.file.filename;
    } else { // req.file == undefined
    }
    let sql = 'INSERT INTO board SET title=?, writer=?, wdate=?, content=?, orifile=?, realfile=?';
    let val = [req.body.title, req.body.writer, new Date(), req.body.content, oriFile, realFile];
    const connect = await pool.getConnection();
    const result = await connect.query(sql, val);
    connect.release(); // pool에게 돌려주기(반납)
    // res.json(result);
    res.redirect('/pug');
});

router.get("/download/:id", async (req, res) => {
    let id = req.params.id;
    let sql = "SELECT realfile, orifile FROM board WHERE id=" + id;
    const connect = await pool.getConnection();
    const result = await connect.query(sql);
    // res.json(result[0][0]);
    // let filepath = path.join(__dirname, "../uploads/", result[0][0].realfile.split("-")[0]);
    let filepath = path.join(__dirname, "../uploads/" + result[0][0].realfile.split("-")[0]);
    let file = filepath + '/' + result[0][0].realfile;
    res.download(file, result[0][0].orifile); // express에서 지원해주는 다운로드 기능(이름을 바꾸어 내려보냄)
});

module.exports = router;