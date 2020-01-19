const multer = require('multer');
const path = require('path'); // node  기본 객첵
const fs = require('fs'); // node 기본 객체

// https://www.npmjs.com/package/multer >> DiskStorage
const destination = (req, file, cb) => { // 폴더 세팅
    // cb(null, '/tmp/my-uploads');
    cb(null, getPath());
}

const filename = (req, file, cb) => { // 파일명 설정
    // cb(null, file.fieldname + '-' + Date.now());
    cb(null, getFile(file.fieldname).newName);
}

// const storage = multer.diskStorage({
//     destination: destination,
//     filename: filename
// });

const storage = multer.diskStorage({ // es6, 키과 값이 같으면 축약표현
    destination,
    filename
});

function getPath() {
    // __dirname, 파일의 절대경로를 알려줌
    let mewPath = path.join(__dirname, "../uploads/" + makePath());
    console.log(mewPath);
    return mewPath;
}

function makePath() {
    let d = new Date();
    let year = d.getFullYear(); //2020
    let month = d.getMonth(); // 0 ~ 11
    return year.substr(2) + zp(month + 1);
}

function zp(d) {
    return d < 10 ? "0" + d : d
}

function getFile(oriFile) {
    let ext = path.extname(oriFile); // .jpg 확장자 추출
    let name = path.basename(oriFile, ext); // 파일명 추출
    let f1 = makePath();
    // let f2 = new Date().getTime(); // time
    let f2 = Date.now(); // timestamp
    let f3 = Math.floor(Math.random() * 90) + 10; // 10 ~ 99
    return {
        newName: f1 + '-' + f2 + '-' + f3 + ext,
        newExt: ext,
        newFile: f1 + '-' + f2 + '-' + f3
    };
}
