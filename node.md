# h1
## h2
### h3

~~~js
var a = 10;
~~~
~~~c
int a = 10;
~~~

#이 bash 주석

# Node.js를 사용하기 위한 셋팅
## node.js 설치

1. node.js org에서 node를 다운받는다.
2. 다운로드 한 후 기본값으로 설치한다.
3. 설치 후 cmd(terminal)을 실행하여 아래의 명령을 수행해 보다.
~~~
node --version
~~~
4. 프로젝트 폴더 생성하고, VSCode로 폴더를 연다.
5. app.js파일을 생성하고, VSCode에서 터미널창을 ctrl+j로 열어서 아래의 코드를 입력한다.
~~~bash
# 한번만 설치하면 되는 global 모듈
npm i -g supervisor nodemon #node개발할때 사용하는 데몬 (둘중에 하나만)
npm i -g pm2 # 배포할때 사용하는 데몬
 
# npm 프로젝트를 설치하고, package.json을 생성해 준다.
npm init -y

# express모듈을 설치한다.
npm i express

# pug를 설치한다.
npm i pug
~~~

6. app.js파일을 열고 아래의 코드를 입력한다.
~~~js
// express가 퍼그도 가지고 있다.
// 퍼그 require는 필요없음.
const express = require('express'); // 경로없이 모듈명만 적으면 node_modules 폴더에서 찾는다.
const app = express();
const port = 3000;
const host = '127.0.0.1';
// body parser setting method 1 ... node 10 버전부터 express에 bodyParser포함됨
// const bodyParser = require('bodyParser');

// 서버 구동
app.listen(port, () => {
    console.log(`http://${host}:${port}`);
});

// express 세팅 및 미들웨어 세팅 (변수명, 값)
app.set('view engine', 'pug');
app.set('views', './views');    // 상대경로, 상대경로가 안먹는 서버도 있다.
// 항상 절대 좌표를 사용하는걸 권장

// 정적 라우터 세팅
app.use('/', express.static('./public'));

// body parser setting method 2
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.locals.pretty = true; // 브라우즈에서 소스를 보기좋게

// (req, res, next)
app.get('/user', (req, res) => {
    // http://127.0.0.1:3000/user?id=10
    let queryId = req.query.id; // get방식 주소줄을 통해 요청된 변수접근
});

app.get('/user/:id', (req, res) => {
    let paramId = req.params.id;    // sematic방식 주소줄을 통해 요청된 변수접근
});

app.post('/user', (req, res) => {
    let bodyId = req.body.id;   // post 방식으로 요청된 변수접근
});
~~~
