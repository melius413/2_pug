// function init() {
//     getDays(function(d) {
//         console.log(d.getDay());
//     });
// }

// function getDays(fn) {
//     var d = new Date();
//     fn(d);
// }

// promise version
// function init() {
//     var date = getDays().then(function (d) {
//         //console.log(d.getDay());
//         console.log(d.getDate());
//     });
// }

// function getDays() {
//     var d = new Date();
//     return new Promise(function (resolve, reject) {
//         resolve(d); // 여기가 리턴문 역할
//     });
// }



// promise mdn 예제 참고
// async await version, promise 구조에서 추가된 기능
async function init() {
    var date = await getDays();
    console.log(date);
}

function getDays() {
    var d = new Date();
    return new Promise(function (resolve, reject) {
        resolve(d); // 여기가 리턴문 역할
    });
}

init();


// 콜백 버전
const promise1 = timer();

function timer() {
    setTimeout(function () {
        return 'foo1';
    }, 300);
}

console.log(promise1);

// 프로미스 버전 ... 장점은 콜백지옥 해방, 가독성
const promise2 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('foo2');
    }, 300);
});

console.log(promise2);
promise2.then(function (value) {
    console.log(value);
});


// 어싱크 어웨잇 버전 ... 프로미스모델을 동기화 해서 사용하는 기법
function getFoo() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('foo3');
        }, 300);
    });
}

async function foo() {
    var result = await getFoo();
    console.log(result);
}

foo();