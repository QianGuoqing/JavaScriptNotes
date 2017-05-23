
// rem
~function () {
    let desW = 640,
        winW = document.documentElement.clientWidth,
        ratio = winW / desW,
        oMain = document.querySelector('.main');
    if (winW > desW) {
        oMain.style.margin = '0 auto';
        oMain.style.width = desW + 'px';
        return;
    }
    document.documentElement.style.fontSize = ratio * 100 + 'px';
}();

// 初始化swiper
new Swiper('.swiper-container', {
    direction: 'vertical',
    loop: true,
    onSlideChangeEnd: function (swiper) {
        let slideAry = swiper.slides;
        let curIn = swiper.activeIndex;
        let total = slideAry.length;

        // 计算ID是PAGE?
        let targetId = 'page';
        switch (curIn) {
            case 0:
                targetId += total - 2;
                break;
            case total - 1:
                targetId += 1;
                break;
            default:
                targetId += 1;
                break;
        }

        // 给当前的活动块设置ID，还要把其余的移除
        Array.from(slideAry).forEach(function (slide, index) {
            if (curIn === index) {
                slide.id = targetId;
                return;
            }
            slide.id = null;
        });
    }
});