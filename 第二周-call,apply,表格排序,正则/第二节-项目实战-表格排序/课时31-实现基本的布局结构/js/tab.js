// -> 想要操作谁，就先获取谁
var oTab = document.getElementById('tab');
var tHead = oTab.tHead;
var oThs = tHead.rows[0].cells;
var tBody = oTab.tBodies[0];
var oRows = tBody.rows;

var data = null;

// 1. 首先获取后台(data.txt)中的数据"JSON格式的字符串" -> Ajax
// 1) 首先创建一个Ajax对象
var xhr = new XMLHttpRequest();

// 2) 打开需要请求数据的那个文件地址
xhr.open('get', './json/data.txt', false);

// 3) 监听请求状态
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
        var val = xhr.responseText;
        data = utils.jsonParse(val);
        console.log(data);
    }
}

// 4) 发送请求
xhr.send(null);

// 2. 实现数据绑定
function bind() {
    var frg = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
        var cur = data[i];

        var oTr = document.createElement('tr'); // 每一次循环创建一个tr

        // 每一个tr中还需要创建4个td，因为每一个对象中有四组键值对
        for (var key in cur) {
            var oTd = document.createElement('td');
            // 对性别进行特殊处理
            if (key === 'sex') {
                oTd.innerHTML = cur[key] === 0 ? "男" : "女";
            } else {
                oTd.innerHTML = cur[key];
            }
            oTr.appendChild(oTd);
        }

        frg.appendChild(oTr);
    }
    tBody.appendChild(frg);
    frg = null;
}

bind();

// 实现各行变色
function changeBg() {
    for (var i = 0; i < oRows.length; i++) {
        oRows[i].className = i % 2 === 1 ? "bg" : null;
    }
}
changeBg();

// -> 编写表格排序的方法: 实现按照年龄这一列进行排序
function sort() {
    // 把存储所有行的数组转化为类数组
    var ary = utils.listToArray(oRows);

    // 给数组进行排序: 按照每一行的第二列的内容有小到大进行排序
    oThs[1].flag *= -1; // 每一次执行sort，进来的第一步就是先让flag的值乘以-1
    ary.sort(function (a, b) {
        return (parseFloat(a.cells[1].innerHTML) - parseFloat(b.cells[1].innerHTML)) * oThs[1].flag;
    });

    // 按照ary中的最新顺序，把每一行重新的添加到tBody中
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ary.length; i++) {
        fragment.appendChild(ary[i]);
    }
    tBody.appendChild(fragment);
    fragment = null;

    // 按照最新的顺序重新进行隔行变色
    changeBg();
}

// 点击第二列的时候，实现按年龄排序
oThs[1].flag = 1; // 给当前点击这一列增加一个自定义属性flag，存储的值是1
oThs[1].onclick = function () {
    sort();
}