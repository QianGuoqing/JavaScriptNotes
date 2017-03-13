~function () {

    function TabChange(container, defaultIndex) {
        return this.init(container, defaultIndex);
    }

    TabChange.prototype = {
        constructor: TabChange,

        defaultIndexEven: function () {
            utils.addClass(this.oLis[this.defaultIndex], "select");
            utils.addClass(this.divList[this.defaultIndex], "select");
        },

        liveClick: function () {
            var _this = this;
            this.tabFirst.onclick = function (e) {
                e = e || window.event;
                e.target = e.target || e.srcElement;
                if (e.target.tagName.toLowerCase() === "li") {
                    _this.detailFn(e.target);
                }
            };
        },
        detailFn: function (curEle) {
            var index = utils.index(curEle);
            utils.addClass(curEle, "select");
            for (var i = 0; i < this.divList.length; i++) {
                i === index ? utils.addClass(this.divList[i], "select") : (utils.removeClass(this.divList[i], "select"), utils.removeClass(this.oLis[i], "select"));
            }
        },

        init: function (container, defaultIndex) {
            this.container = container || null;
            this.defaultIndex = defaultIndex || 0;
            this.tabFirst = utils.firstChild(this.container);
            this.oLis = utils.children(this.tabFirst);
            this.divList = utils.children(this.container, "div");

            this.defaultIndexEven();
            this.liveClick();

            return this;
        }
    };

    window.zhufengTab = TabChange;
}();

