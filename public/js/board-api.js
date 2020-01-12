function delList(id) {
    $.ajax({
        url: '/api/delete',
        type: "DELETE",
        dataType: "json",
        data: {id: id},
        success: function(res) {
            console.log('success');
            console.log(res);
            getData();
        },
        error: function(xhr) {
            console.log(xhr);
        }
    });
}

$('#btSave').click(function () {
    console.log('btSave');
    var id = document.form1.id.value;
    var type = 'POST'; // CREATE
    var url = '/api/post'
    if (id != "") {
        type = 'PUT'; // UPDATE
        url = '/api/put';
    }
    console.log(document.form1.content.value);
    $.ajax({
        url: url,
        type: type,
        dataType: "json",
        data: {
            id: id,
            title: document.form1.title.value,
            content: document.form1.content.value,
            writer: document.form1.writer.value,
        },
        success: function (res) {   // 함수명을 연결하면, respose가 파라미터로 들어감
            document.form1.reset();
            if(res.serverStatus == 2) getData();
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
});

function getData(id) {
    if (id) url = "api/get/" + id; // params 전송
    else url = "api/get/";
    $.ajax({ // ajax를 이용하여 API 통신, 카멜표기법사용
        url: url, // es6(노드)에서는 키와 값이 같으면, url로 표기 가능, 브라우저(es5)라 못씀
        type: "GET",
        dataType: "json",
        // data: {},
        success: function (res) { // 통신 성공하면
            console.log('sucess:' + res);
            if (id) viewList(res);
            else makeList(res);
        },
        error: function (xhr, status, err) { // 통신 실패하면
            console.log(xhr);
        },
    });
}

function makeList(res) {
    console.log('makeList');
    console.log(res);
    $('#title').html(res.title);
    var html = '';
    for (var i in res.data) {
        html += '<tr>';
        html += '<td>' + res.data[i].id + '</td>';
        html += '<td onclick="getData(' + res.data[i].id + ');">' + res.data[i].title + '</td>';
        html += '<td>' + res.data[i].writer + '</td>';
        html += '<td>' + res.data[i].wdate + '</td>';
        html += '<td>' + res.data[i].rnum + '</td>';
        html += '<td><button class="btn btn-sm btn-danger" onclick="delList(' + res.data[i].id + ')">삭제</button></td>';
        html += '</tr>';
    }
    $('#listTb>tbody').html(html);
    // 돔생성된 이유에 핸들러 연결해야함
}

function viewList(res) {
    console.log('viewList');
    console.log(res);
    var f = document.form1;
    f.id.value = res.data[0].id;
    f.title.value = res.data[0].title;
    f.content.value = res.data[0].content;
    f.writer.value = res.data[0].writer;
}

getData();