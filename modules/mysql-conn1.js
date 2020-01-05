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