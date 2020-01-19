const Sequelize = require("sequelize");
const sequelize = new Sequelize({ // config 안쓰는 방법
    host: "localhost",
    port: 3307,
    dialect: 'mysql',
    username: 'root',
    password: '000000',
    database: "node",
    pool: {
        max: 10,
        min: 0
    }
});

(async () => {
    await sequelize.authenticate(); // 접속하는 명령
    console.log("success");
})();

module.exports = {
    sequelize,
    Sequelize
};