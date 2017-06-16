// 1. 数组的解构赋值
{
    // let a = 1;
    // let b = 2;
    // let c = 3;

    // 以上三句话等价于下面这句
    let [a, b, c] = [1, 2, 3];
    console.log(a, b, c);
}

{
    let [a, [
        [b], c
    ]] = [1, [
        [2], 3
    ]];
    console.log(a, b, c); // 1, 2, 3
}

{
    let [, , c] = [1, 2, 3];
    console.log(c); // 3
}

{
    let [x] = [];
    console.log(x); // undefined -> 解构不成功
}

{
    let [y = 1] = [];
    console.log(y); // 1
}

// 对象的解构赋值
{
    let { a, b } = { b: 'bbb', a: 'aaa' };
    console.log(a, b); // aaa, bbb
}

{
    let { a: b } = { a: 1 }
    // console.log(a, b);
    console.log(b); // 1
}

// 3. 基本类型的解构赋值
{
    let [a, b, c, d] = '1234';
    console.log(a, b, c, d); // 1 2 3 4
}

{
    let { length: len } = 'miaov';
    console.log(len); // 5
}

{
    let { toString: ts } = 1;
    let { toString: bs } = true;
    console.log(ts, bs); // [Function: toString] [Function: toString]
    console.log(ts === Number.prototype.toString); // true
    console.log(bs === Boolean.prototype.toString); // true
}

{
    // null和undefined不能进行解构赋值
    // let [a] = null; // error
}