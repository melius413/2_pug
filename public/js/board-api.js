function getData(id) {
    if(id) url = "api/get/" + id; // params 전송
    else url = "api/get/";
    $.ajax({ // ajax를 이용하여 API 통신, 카멜표기법사용
        url: url, // es6(노드)에서는 키와 값이 같으면, url로 표기 가능, 브라우저(es5)라 못씀
        type: "GET",
        dataType: "json",
        data: {},
        success: function (res) { // 통신 성공하면
            console.log('sucess:' + res);
            if(id) makeList(res);
            else viewList(res);
        },
        error: function (xhr, status, err) { // 통신 실패하면
            console.log(xhr);
        },
    });
}

function makeList(res) {}

function viewList(res) {}
