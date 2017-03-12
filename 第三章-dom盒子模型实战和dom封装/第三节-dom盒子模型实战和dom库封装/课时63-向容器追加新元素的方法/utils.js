var utils = (function () {
    var flag = "getComputedStyle" in window;

    //->listToArray:把类数组集合转换为数组
    function listToArray(likeAry) {
        if (flag) {
            return Array.prototype.slice.call(likeAry, 0);
        }
        var ary = [];
        for (var i = 0; i < likeAry.length; i++) {
            ary[ary.length] = likeAry[i];
        }
        return ary;
    }

    //->formatJSON:把JSON格式字符串转换为JSON格式对象
    function formatJSON(jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
    }

    //->offset:获取页面中任意元素距离BODY的偏移
    function offset(curEle) {
        var disLeft = curEle.offsetLeft, disTop = curEle.offsetTop, par = curEle.offsetParent;
        while (par) {
            if (navigator.userAgent.indexOf("MSIE 8") === -1) {
                disLeft += par.clientLeft;
                disTop += par.clientTop;
            }
            disLeft += par.offsetLeft;
            disTop += par.offsetTop;
            par = par.offsetParent;
        }
        return {left: disLeft, top: disTop};
    }

    //->win:操作浏览器的盒子模型信息
    function win(attr, value) {
        if (typeof value === "undefined") {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }

    //->getCss:获取元素的样式值
    function getCss(curEle, attr) {
        var val = null, reg = null;
        if (flag) {
            val = window.getComputedStyle(curEle, null)[attr];
        } else {
            if (attr === "opacity") {
                val = curEle.currentStyle["filter"];
                reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        reg = /^(-?\d+(\.\d+)?)(px|pt|em|rem)?$/;
        return reg.test(val) ? parseFloat(val) : val;
    }

    //->children:获取所有的元素子节点
    function children(curEle, tagName) {
        var ary = [];
        if (!flag) {
            var nodeList = curEle.childNodes;
            for (var i = 0, len = nodeList.length; i < len; i++) {
                var curNode = nodeList[i];
                curNode.nodeType === 1 ? ary[ary.length] = curNode : null;
            }
            nodeList = null;
        } else {
            ary = this.listToArray(curEle.children);
        }
        if (typeof tagName === "string") {
            for (var k = 0; k < ary.length; k++) {
                var curEleNode = ary[k];
                if (curEleNode.nodeName.toLowerCase() !== tagName.toLowerCase()) {
                    ary.splice(k, 1);
                    k--;
                }
            }
        }
        return ary;
    }

    // -> prev: 获取上一个哥哥元素节点
    // -> 首先获取当前元素的上一个哥哥元素，判断是否为元素节点，不是的话基于当前的继续找到上面的哥哥节点..
    //    直到找到哥哥元素节点为止，如果没有哥哥元素节点，则返回null
    function prev(curEle) {
        if (flag) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    }

    // -> next: 获取下一个弟弟元素节点
    function next(curEle) {
        if (flag) {
            return curEle.nextElementSibling;
        }
        var nex = curEle.nextSibling;
        while (nex && nex.nodeType !== 1) {
            nex = nex.nextSibling;
        }
        return nex;
    }

    // -> prevAll: 获取所有的哥哥元素节点
    function prevAll(curEle) {
        var ary = [];
        var pre = this.prev(curEle);
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary;
    }

    // -> nextAll: 获取所有的弟弟节点
    function nextAll(curEle) {
        var ary = [];
        var nex = this.next(curEle);
        while (nex) {
            ary.push(nex);
            nex = this.next(nex);
        }
        return ary;
    }

    // -> sibling: 获取相邻的两个元素节点
    function sibling(curEle) {
        var pre = this.prev(curEle);
        var nex = this.next(curEle);
        var ary = [];
        pre ? ary.push(pre) : null;
        nex ? ary.push(nex) : null;

        return ary;
    }

    // -> siblings: 获取所有的兄弟元素节点
    function siblings(curEle) {
        return this.prevAll(curEle).concat(this.nextAll(curEle));
    }

    // -> index: 获取当前元素的索引
    function index(curElem) {
        return this.prevAll(curElem).length;
    }

    // -> firstChild: 获取第一个元素子节点
    function firstChild(curElem) {
        var childrenNodes = this.children(curElem);
        return childrenNodes.length > 0 ? childrenNodes[0] : null;
    }

    // -> lastChild: 获取最后一个元素子节点
    function lastChild(curElem) {
        var childrenNodes = this.children(curElem);
        return childrenNodes.length > 0 ? childrenNodes[childrenNodes.length - 1] : null;
    }

    // -> append: 向指定容器的末尾增加元素
    function append(newEle, container) {
        container.appendChild(newEle);
    }

    // -> prepend: 向指定元素开头追加元素 -> 把新的元素添加到容器中第一个子元素节点的前面
    // 如果一个元素子节点都没有，就放在末尾即可
    function prepend(newEle, container) {
        var fir = this.firstChild(container);
        if (fir) {
            container.insertBefore(newEle, fir);
            return;
        }
        container.appendChild(newEle);
    }

    // -> insertBefore: 向容器中指定元素(oldEle)的前面追加
    function insertBefore(newEle, oldEle) {
        oldEle.parentNode.insertBefore(newEle, oldEle);
    }

    // insertAfter: 向容器中指定元素的末尾追加
    // -> 相当于追加到oldElm弟弟元素的前面
    // 如果弟弟不存在，也就是当前元素已经是最后一个了，则把新的元素放在最末尾即可
    function insertAfter(newEle, oldEle) {
        var nex = this.next(oldEle);
        if (nex) {
            oldEle.parentNode.insertBefore(newEle, nex);
            return;
        }
        oldEle.parentNode.appendChild(newEle);
    }

    //->把外界需要使用的方法暴露给utils
    return {
        win: win,
        offset: offset,
        listToArray: listToArray,
        formatJSON: formatJSON,
        getCss: getCss,
        children: children,
        prev: prev,
        next: next,
        prevAll: prevAll,
        nextAll: nextAll,
        sibling: sibling,
        siblings: siblings,
        index: index,
        firstChild: firstChild,
        lastChild: lastChild,
        append: append,
        prepend: prepend,
        insertBefore: insertBefore,
        insertAfter: insertAfter
    }
})();