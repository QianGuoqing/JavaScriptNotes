/**
 * 函数的拓展：
 * 1. 为函数参数指定默认值
 * 2. 函数的rest参数
 * 3. 箭头函数
 */

// 1. 为函数参数指定默认值
{
    function fn(a, b) {
        a = a || 10;
        b = b || 20;
        console.log(a + b);
    }

    function fn(a = 10, b = 20) {
        console.log(a + b);
    }

    console.log(fn());
    console.log(fn(11, 22));
}

// 2. 函数的rest参数
{
    // function sum() {
    //     let args = arguments;
    //     let res = 0;
    //     for (let i = 0; i < args.length; i++) {
    //         res += args[i];
    //     }
    //     console.log(res);
    // }
    // console.log(sum(1, 2, 3, 4, 5));

    // rest改写
    function sum(...rest) {
        let sum = 0;
        for (let i = 0; i < rest.length; i++) {
            sum += rest[i];
        }
    }
    console.log(sum(11, 22, 33, 44, 55));
}

// 3. 箭头函数
{
    const fn = a => a;
    // 等价于
    const fn2 = function(a) { return a; }
    console.log(fn(1), fn2(2));

    const fn3 = (a, b) => a + b;
    console.log(fn3(1, 2));

    const fn4 = (a, b) => {
        a = a * 2;
        b = b * 2;
        return a + b;
    }
    console.log(fn4(10, 20));

    let ary = [11, 2, 3, 4];
    ary.sort((a, b) => a - b);
    console.log(ary);
}

// 注意事项
// 1. 箭头函数体内没有自己的this对象，所以在使用的时候，其内部的this就是定义时所在环境的对象，而不是使用时所在的环境对象
{
    function fn() {
        setTimeout(function() {
            console.log(this); // window
        }, 1000);

        setTimeout(() => {
            console.log(this); // obj
        }, 1000);
    }

    let obj = { a: 1 };
    fn.call(obj);
}

// 不能给箭头函数使用 call, apply, bind 去改变其内部的this引用

// 2. 箭头函数体内没有arguments对象，如果要用，可以使用rest参数代替
{
    function fn() {
        setTimeout(() => {
            console.log(arguments);
        }, 1000);
    }
}

// 3. 不可以当做构造函数，不可以使用new命令，否则会抛出错误