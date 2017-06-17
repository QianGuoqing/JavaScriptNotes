/**
 * 字符串拓展
 */

// 模板字符串
{
    let flag = true;
    let html = `
        <ul>
            <li>
                <span>${'首页'}</span>
                <span></span>
                <span class="${flag ? 'show' : 'hide'}"></span>
                <span></span>
            </li>
        </ul>
    `;
    console.log(html);
}

// 了解一些新增的属性

/**
 * 1. repeat
 * 2. includes(), startsWith(), endsWith()
 */
{
    let str1 = 'a';
    console.log(str1.repeat(3));
} {
    let str = 'miaov';
    console.log(str.includes('miao')); // true
    console.log(str.includes('aaa')); // false

    console.log(str.startsWith('m')); // true
    console.log(str.startsWith('a')); // false
    console.log(str.endsWith('v')); // true
    console.log(str.endsWith('a')); // false
}

/**
 * 数组的拓展
 */

// Array.from() 将类数组转为数组
{
    // let lis = document.querySelectorAll('li');
    // let lisAry = Array.from(lis);
}

// Array.of()
{
    const arr = Array.of(1);
    console.log(arr);
}

// find() findIndex()
{
    const arr = [1, 2, 3, 4];
    let res = arr.find(function(item) {
        return item < 2;
    })
}

// fill()
{
    const arr = [1, 2, 3, 4];
    arr.fill('abc');
    console.log(arr);
}

/**
 * 对象拓展
 */

// 对象的简介表示法
{
    let a = 1;

    // const obj = {
    //     a: a
    // }

    // 简写
    const obj = { a }
    console.log(obj);

    const obj2 = {
        fn() {
            console.log('fn');
        }
    }
    obj2.fn();
}

// Object.is() 
{
    console.log(Object.is(NaN, NaN)); // true
    console.log(Object.is(+0, -0)); // false
}

// Object.assign()
// 用于对象合并，将源对象的所有可枚举属性，复制到目标对象
{
    let obj1 = { a: 1 };
    let obj2 = { a: 2, b: 3 };
    let obj3 = { c: 'abc' }
    Object.assign(obj1, obj2, obj3);
    console.log(obj1);
}