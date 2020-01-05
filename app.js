const express = require('express');
const app = express();
const port = 3000;
const host = '127.0.0.1';

const mysql = require('mysql');

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

const conn = mysql.createPool({ // 실무에서 많이씀
    // 동접자(동시접속) 처리 가능
    host: 'localhost',
    user: 'root',
    password: '000000',
    port: 3307,
    database: 'node',
    connectionLimit: 10
});

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
app.get(['/pug', '/pug/:page'], (req, res) => {
    let page = req.params.page ? req.params.page : "list";
    let vals = {};

    switch (page) {
        case "list":
            vals.title = "게시글 리스트 입니다.";
            vals.lists = [{
                    id: 1,
                    title: "첫번째 글",
                    writer: "관리자",
                    wdate: "2020-01-03",
                    rnum: 5
                },
                {
                    id: 2,
                    title: "두번째 글",
                    writer: "관리자2",
                    wdate: "2020-01-04",
                    rnum: 6
                },
                {
                    id: 3,
                    title: "세번째 글",
                    writer: "관리자3",
                    wdate: "2020-01-05",
                    rnum: 4
                }
            ];
            res.render("list.pug", vals);
            // res.render("layout/list.pug", vals); // 경로라면 이렇게??
            break;
        case "write":
            vals.title = "게시글 작성 입니다.";
            res.render("write.pug", vals);
            break;
        default:
            res.redirect('/'); // location.href랑 같음
            break;
    }
});

app.get("/sqltest", (req, res) => {
    let connect = conn.getConnection((err, connect) => { // connectionLimit: 10 개 중에 하나 를 connect로 줌
        if (err) {
            res.send("Database 접속에 실패했습니다.");
        } else {
            let sql = 'INSERT INTO board SET title="테스트입니까?", writer="관리자", wdate="2020-01-05 14:55:00"';
            connect.query(sql, (err, result) => {
                if (err) {
                    res.send("SQL문이 실패하였습니다.");
                } else {
                    res.json(result);
                }
            });
        }
    });
});