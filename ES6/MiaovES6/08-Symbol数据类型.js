/**
 * 1. 什么是Symbol?
 *  Symbol，表示独一无二的值，是JavaScript中第七种数据类型
 */

{
    let symbol = Symbol();
    let symbol2 = Symbol();
    console.log(typeof symbol); // symbol
    console.log(symbol === symbol2); // false
}

// Symbel函数前面不能使用new，否则会报错。原因在于Symbol是一个原始类型的值，不是对象
{
    // let sym = new Symbol(); // error
}

{
    let symbol = Symbol();
    let symbol2 = Symbol();
    let symbol3 = Symbol('miaov');
    let symbol4 = Symbol('class');

    console.log(symbol3, symbol4);
}

// Symbol函数接收一个字符串作为参数，表示Symbol的描述，主要是为了在控制台显示，或者转为字符串的时候，比较容易区分
{
    let symbol3 = Symbol('miaov');
    let symbol4 = Symbol('class');
    console.log(Symbol('aa') === Symbol('aa')); // false
}

/**
 * 2. Symbol数据类型转换
 */
{
    console.log(String(Symbol('miaov')));
    console.log(Symbol('miaov').toString());
    console.log(!!Symbol()); // true
    // console.log(Number(Symbol())); // error
}

// 不能使用运算符运算
{
    // console.log(Symbol('aaa') + 'bbb'); // error
    // console.log(Symbol('aaa' * 100)); // error
}

/**
 * 3. 作为对象的属性名
 */
{
    let yyy = Symbol('yyy');
    const obj = {};
    obj[yyy] = 'hello';
    console.log(obj);
    console.log(obj[yyy]);
}

{
    let ss = Symbol('ss');
    const data = {
        [ss]: 'miaov'
    }
    console.log(data);
}

{
    const data = {
        [Symbol()]: 123,
        a: 1,
        b: 2
    }
    console.log(data);
    console.log(data[Symbol()]);

    for (let [key, value] in data) {
        console.log(key, value);
    }
}