
~function () {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 640 * 100 + 'px';
}();

var bannerRender = (function () {
    let winW = document.documentElement.clientWidth,
        maxL = 0,
        minL = 0;
    let $banner = $('.banner'),
        $wrapper = $banner.children('.wrapper'),
        $slideList = $wrapper.children('.slide'),
        $imgList = $wrapper.find('img');
    let step = 1;

    function isSwipe(strX, strY, endX, endY) {
        return Math.abs(endX - strX) > 30 || Math.abs(endY - strY) > 30;
    }

    function swipeDir(strX, strY, endX, endY) {
        return Math.abs(endX - strX) >= Math.abs(endY - strY) ?
    }

    function dragStart(ev) {
        let point = ev.touches[0];
        $wrapper.attr({
            strL: parseFloat($wrapper.css('left')),
            strX: point.clientX,
            strY: point.clientY
        });
    }

    function dragIng(ev) {

    }

    function dratEnd(ev) {

    }

    function lazyImg() {
        let $cur = $slideList.eq(step),
            $tar = $cur.add($cur.prev()).add($cur.next());
        $tar.each(function (index, item) {
            let $img = $(item).children('img');
            if ($img.attr('isLoad') === 'true') {
                return;
            }
            let oImg = new Image;
            oImg.src = $img.attr('data-src');
            oImg.onload = function () {
                $img.attr({
                    src: this.src,
                    isLoad: true
                }).css('display', 'block');
                oImg = null;
            }
        });
    }

    return {
        init: function () {
            // -> init css style
            minL = -($slideList.length - 1) * winW;
            $wrapper.css('width', $slideList.length * winW);
            $slideList.css('width', winW);

            lazyImg();

            // swipe left or swipe right
            $banner.on('touchstart', dragStart)
                .on('touchmove', dragIng)
                .on('touchend', dratEnd);
        }
    }
})();

bannerRender.init();