const express = require('express');
const app = express();
const port = 3000;
const host = '127.0.0.1';
// const { mysql, conn } = require('./modules/mysql-conn'); // js(확장자 생력가능)
const {
    pool,
    sqlErr
} = require('./modules/mysql-conn'); // js(확장자 생력가능), mysql2 모듈 버전

// { mysql, conn } = ... 객체속성 바로 할당가능 ex6문법
// { mysql, conn } = { mysql:'fafdsf', conn:'fafdsf' };
// mysql, conn 대입된 변수는 전역변수

// const conn = mysql.createConnection({ // 리미트가 없음
//     // 다쓰면 해제해줘야한다. release
//     // 안해주면 쌓인다. 계속 쌓이면 서버 문제생김
//     host: 'localhost',
//     user: 'root',
//     password: '000000',
//     port: 3307,
//     database: 'node'
//     // 동접자 처리안됨
//     // 끊어져야 다른사람 접속가능
// });

// 모듈로 분리
// const mysql = require('mysql');
// const conn = mysql.createPool({ // 실무에서 많이씀
//     // 동접자(동시접속) 처리 가능
//     host: 'localhost',
//     user: 'root',
//     password: '000000',
//     port: 3307,
//     database: 'node',
//     connectionLimit: 10
// });

app.listen(port, () => {
    console.log(`http://${host}:${port}`);
});

app.set('view engine', 'pug');
app.set('views', './views');
app.use('/', express.static('./public'));

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.locals.pretty = true;

// 멀티 페이지 라우터
app.get(['/pug', '/pug/:page'], async (req, res) => {
    let page = req.params.page ? req.params.page : "list";
    let vals = {};

    switch (page) {
        case "list":
            vals.title = "게시글 리스트";
            let sql = "SELECT * FROM board ORDER BY id DESC"; // 세미콜론 생략?
            const connect = await pool.getConnection();
            const result = await connect.query(sql);
            // res.json(result);  // res.render 동시에 못쓴다 res.응답메소드는 한번만
            // res.json(result[0]);
            vals.lists = result[0];
            /*
            vals.lists = [
                { id: 1, title: "첫번째 글", writer: "관리자", wdate: "2020-01-03", rnum: 5 },
                { id: 2, title: "두번째 글", writer: "관리자2", wdate: "2020-01-04", rnum: 6 },
                { id: 3, title: "세번째 글", writer: "관리자3", wdate: "2020-01-05", rnum: 4 }
            ];
            */
            res.render("list.pug", vals);
            // res.render("layout/list.pug", vals); // 경로라면 이렇게??
            break;
        case "write":
            vals.title = "게시글 작성";
            res.render("write.pug", vals);
            break;
        default:
            res.redirect('/'); // location.href랑 같음
            break;
    }
});

// mysql 모듈 버전
// app.get("/sqltest", (req, res) => {
//     conn.getConnection((err, connect) => { // connectionLimit: 10 개 중에 하나 를 connect로 줌
//         if (err) {
//             res.send("Database 접속에 실패했습니다.");
//         } else {
//             let sql = 'INSERT INTO board SET title="테스트입니까??", writer="관리자", wdate="2020-01-05 14:55:00"';
//             connect.query(sql, (err, result) => {
//                 if (err) {
//                     res.send("SQL문이 실패하였습니다.");
//                 } else {
//                     res.json(result);
//                 }
//             });
//         }
//     });
// });

// mysql2 모듈 버전
app.get("/sqltest", async (req, res) => { // 비동기 쓸수 있다는 뜻 async
    // let sql = 'INSERT INTO board SET title="테스트", writer="개발자", wdate="2020-01-05 13:35:00"';
    let sql = 'INSERT INTO board SET title=?, writer=?, wdate=?';
    let sqlVals = ["테스트", "개발자", "2020-01-05 15:55:00"];
    const connect = await pool.getConnection(); // await에서 답을 받을때까지 대기함(해당함수가 async선언 필요). 동기처럼 행동함
    // console.log(connect);
    // await은 try catch 로 에러처리
    // try { } catch(err) { sqlErr(err); }
    const result = await connect.query(sql, sqlVals);
    connect.release(); // pool에게 돌려주기(반납)
    res.json(result);
    // connect.release(); // 밑에 해줘도 됨... res.send가 리턴문은 아니기 때문
});

app.post('/board', async (req, res) => {
    let sql = 'INSERT INTO board SET title=?, writer=?, wdate=?';
    let val = [req.body.title, req.body.writer, new Date()];
    const connect = await pool.getConnection();
    const result = await connect.query(sql,val);
    connect.release(); // pool에게 돌려주기(반납)
    // res.json(result);
    res.redirect('/pug');
});
