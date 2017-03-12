/**
 * Created by qianguoqing on 17/3/12.
 */
var utils = (function () {
    return {
        listToArray: function (likeArray) {
            var ary = [];
            try {
                ary = [].prototype.slice.call(likeArray);
            } catch (e) {
                for (var i = 0; i < likeArray.length; i++) {
                    ary[ary.length] = likeArray[i];
                }
            }
            return ary;
        },

        formatJSON: function (jsonStr) {
            var jsonData = null;
            try {
                jsonData = JSON.parse(jsonStr);
            } catch (e) {
                jsonData = eval('(' + jsonData + ')');
            }
            return jsonData;
        },

        getCSS: function (curEle, attr) {
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
        },

        offset: function (curEle) {
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
        },

        win: function (attr, value) {
            if (typeof value === 'undefined') {
                return document.documentElement[attr] || document.body[attr];
            }
            document.documentElement[attr] = value;
            document.body[attr] = value;
        },

        // -> children: 获取currentElement下所有的元素子节点，兼容所有浏览器
        // 如果传递了tagName，可以在获取的集合中进行二次筛选，
        // 把指定标签名的获取到
        children: function (currentElement, tagName) {
            var ary = [];
            if (/MSIE (6|7|8)/i.test(navigator.userAgent)) {
                var nodeList = currentElement.childNodes;
                for (var i = 0; i < nodeList.length; i++) {
                    var curNode = nodeList[i];
                    curNode.nodeType === 1 ? ary[ary.length] = curNode : null;
                }
                nodeList = null;
            } else {
                ary = this.listToArray(currentElement.children);
            }

            if (typeof tagName === 'string') {
                for (var k = 0; k < ary.length; k++) {
                    var curEleNode = ary[k];
                    if (curEleNode.nodeName.toLowerCase() !== tagName.toLowerCase()) {
                        ary.slice(k, 1);
                        k--;
                    }
                }
            }

            return ary;
        }
    }
})();
