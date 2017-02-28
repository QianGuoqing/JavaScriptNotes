/**
 * Created by qianguoqing on 17/2/23.
 */
// 第一步：分析需求的思路
// 选项卡实现思路：
// 鼠标滑到某一个li上，先让所有的li和div都没有select样式，然后在让当前的有这个select

// 第二步：要操作谁就先获取谁
var oTab = document.getElementById('tab');
var oLis = oTab.getElementsByTagName('li');
var oDivs = oTab.getElementsByTagName('div');

// 第三步：制定一个功能方法，实现我们的需求
// nIndex：是我们定义的形参，代表当前被选中元素的索引
function tabChange(nIndex) {
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].className = '';
        oDivs[i].className = '';
    }
    oLis[nIndex].className = 'select';
    oDivs[nIndex].className = 'select';
}

// 第四步：给li绑定鼠标移上去的事件
for (let i = 0; i < oLis.length; i++) {
    oLis[i].onmouseover = function () {
        tabChange(i);
    }
}

// js加载完成后（for循环也完成 -> for循环加载完成 -> i = 3），我们才会手动的触发onmouseover事件

