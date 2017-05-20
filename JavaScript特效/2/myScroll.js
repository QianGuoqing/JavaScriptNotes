function scroll() {
    if (window.pageYOffset) {
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }

    if (document.documentElement.scrollTop) {
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }

    if (document.body.scrollTop) {
        return {
            left: document.body.scrollLeft,
            top: document.body.scrollTop
        }
    }
    return 0;
}