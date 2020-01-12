/*
const mysql = require('mysql');
const conn = mysql.createPool({ // 실무에서 많이씀
    // 동접자(동시접속) 처리 가능
    host: 'localhost',
    user: 'root',
    password: '000000',
    port: 3307,
    database: 'node',
    connectionLimit: 10
});

// 프론트 es6 문번
// exports.default??

module.exports = {
    //mysql: mysql, // 속성명과 값이 같으면.. 아래처럼 가능 (es6)
    mysql,
    conn
}
*/
// const mysql = require('mysql2');    // 기존방식 버전 mysql2/index.js
const mysql = require('mysql2/promise');    // 프로미스 방식 버전 mysql2/promise.js
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '000000',
    port: 3307,
    database: 'node',
    connectionLimit: 10
});

const sqlErr = (err) => {
    console.error(err);
};

module.exports = {
    pool,
    sqlErr
};

