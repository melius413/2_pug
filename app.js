const express = require('express');
const app = express();
const port = 3000;
const host = '127.0.0.1';

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
            vals.lists = [
                {id:1, title: "첫번째 글", writer: "관리자", wdate: "2020-01-03", rnum: 5},
                {id:2, title: "두번째 글", writer: "관리자2", wdate: "2020-01-04", rnum: 6},
                {id:3, title: "세번째 글", writer: "관리자3", wdate: "2020-01-05", rnum: 4}
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