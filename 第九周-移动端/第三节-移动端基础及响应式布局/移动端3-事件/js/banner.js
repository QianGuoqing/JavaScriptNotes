
~function () {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 640 * 100 + 'px';
}();

var bannerRender = (function () {
    let winW = document.documentElement.clientWidth;
    let $banner = $('.banner'),
        $wrapper = $banner.children('.wrapper'),
        $slideList = $wrapper.children('.slide'),
        $imgList = $wrapper.find('img');
    let step = 1;

    function lazyImg() {

    }

    return {
        init: function () {
            // -> init css style
            $wrapper.css('width', $slideList.length * winW);
            $slideList.css('width', winW);

            lazyImg();
        }
    }
})();

bannerRender.init();