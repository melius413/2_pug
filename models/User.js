const path = require('path');
const {
    sequelize,
    Sequelize
} = require(path.join(__dirname, "../modules/sequelize_conn")); // 접속된 시퀄라이즈(sequelize)를 받았음
// } = require(path.join(__dirname, "index"));

// es6 class를 사용하는 방법
const Model = Sequelize.Model;
class User extends Model {} // 상속

// method 1
// User.init({ // 인자2개: 필드정보(username), 
//     username: {
//         type: Sequelize.STRING
//     },
//     userid: {
//         type: Sequelize.STRING
//     },
//     age: {
//         type: Sequelize.INTEGER
//     }
// }, {
//     sequelize,
//     modelName: "user" // 설정안하면 기본적으로 모델이름+s
// });

// method 1
// User.sync(); // 접속정보(sequelize, 두번째인자)를 가지고 필드(첫번째인자)를 성생한다.(테이블 생성)
// User.sync({
//     // force: true // 기존의 것을 지우고 다시 생성
//     force: false
// });
// 실행하면 실행한 쿼리문을 다 출력해준다.


// method 2
sequelize.authenticate().then(() => { // 여기서 접속, promise > 실행완료후 then 실행
    User.init({
        username: {
            type: Sequelize.STRING
        },
        userid: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER
        },
    }, {
        sequelize,
        modelName: "user"
    });
    User.sync({
        force: false
    });
});

module.exports = User;