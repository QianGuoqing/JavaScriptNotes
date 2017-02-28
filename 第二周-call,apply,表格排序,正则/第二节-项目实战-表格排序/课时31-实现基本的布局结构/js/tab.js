// -> 想要操作谁,就先获取谁
var oTab = document.getElementById('tab');
var tHead = oTab.tHead;
var oThs = tHead.rows[0].cells;
var tBody = oTab.tBodies[0];
var oRows = tBody.rows;

// 1. 首先获取后台(data.txt)中的数据 -> "JSON格式字符串" -> AJAX
// 1) 首先创建一个Ajax对象
var xhr = new XMLHttpRequest();

// 2) 打开我们需要请求数据的那个文件地址
xhr.open('get', '../json/data.txt', true);

// 3) 监听请求状态
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
        var val = xhr.responseText;
        data = utils.jsonParse(val);
    }
}

// 4) 发送请求
xhr.send(null);

// 2. 实现我们的数据绑定

