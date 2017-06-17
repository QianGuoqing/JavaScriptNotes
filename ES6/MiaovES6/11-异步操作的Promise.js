// Promise

/**
 * 基本概念
 * Promise: 是ES6中新增的异步编程解决方案，体现在代码中它是一个对象，可以通过Promise构造函数来实例化
 * 
 * - new Promose(cb) ==> 实例的基本使用 Pending, Resolved, Rejected
 * 
 * > 两个原型方法：
 *  - Promise.prototype.then()
 *  - Promose.prototype.catch()
 * 
 * > 两个常用的静态方法：
 *  - Promise.all()
 *  - Promise.resolve()
 */

// new Promise(cb)
// Pending（进行中） ==> Resolved（已完成）
// Pending（进行中） ===> Rejected（已失败）

{
    const imgs = [
        'img1',
        'img2',
        'img3'
    ];

    const promise = new Promise((resolve, reject) => {
        // resolve: 成功后执行
        // reject: 失败后执行
        const img = new Image();
        img.src = imgs[0];
        img.onload = function() {
            resolve(this);
        }
        img.onerror = function() {
            reject(new Error('图片加载失败'));
        }
    });

    // resolve成功后执行then
    promise.then((img) => {
        document.body.appendChild(img);
    });

    // reject执行的时候执行catch
    promise.catch((error) => {
        console.log(error);
    });

    // 链式操作
    promise.then((img) => {
        document.body.appendChild(img);
    }).catch((error) => {
        console.log(error);
    });
}

{
    function loadImage(url) {
        const promise = new Promise((resolve, reject) => {
            // resolve: 成功后执行
            // reject: 失败后执行
            const img = new Image();
            img.src = url;
            img.onload = function() {
                resolve(this);
            }
            img.onerror = function() {
                reject(new Error('图片加载失败'));
            }
        });
        return promise;
    }

    loadImage(imgs[0]).then((img) => {
        document.body.appendChild(img);
    }).catch((error) => {
        console.log(error);
    })
}

/**
 * Promise.all 可以将多个Promise实例包装成一个新的Promise实例
 * 
 * - 当所有Promise实例的状态都变成resolved，Promise.all的状态才会变成resolved，此时返回值组成一个数组，传递给then中的resolve函数
 * - 只要有个数被rejected，Promise.all的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数 
 */
{
    const allDone = Promise.all([loadImage(imgs[0]), loadImage(imgs[1], loadImage(imgs[3]))]);
    allDone.then(function(datas) {
        console.log(datas);
        datas.forEach(function(item, index) {
            document.body.appendChild(item);
        });
    }).catch(function(error) {
        console.log(error);
    });
}

// Promise.resolve()
Promise.resolve(loadImage(imgs[0])).then((img) => {
    document.body.appendChild(img);
});

Promise.resolve({
    then(resolve, reject) {
        const img = new Image();
        img.src = imgs[1];
        img.onload = function() {
            resolve(this);
        }
    }
}).then((img) => {
    document.body.appendChild(img);
});

Promise.resolve('miaov').then((str) => {
    console.log(str);
});