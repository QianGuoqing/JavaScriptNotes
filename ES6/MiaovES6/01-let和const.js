// 1. 使用let声明的变量，所声明的变量只在命令所在的代码块中有效
{
    let a = 1;
    var b = 2;
    console.log(a); // 1
}

// console.log(a); // a is not defined
console.log(b);

// 2. 使用let命令声明的变量在域解析的时候不会被提升
console.log(a); // undefined
var a = 1;

// console.log(b); // error
// let b = 1;

// typeof c;
// let c = 10; // error

let f = 10;

function fn() {
    f = 7;
    let f = 2; // f is not defined
}

fn();

// 3. let不允许在同一个作用域下声明已经存在的变量
// var a = 1;
// let a ; // error

// let b = 1;
// let b = 2; // error

// let在for循环中的应用
let btns = document.querySelectorAll('button');
for (let i = 0; i < btns.length; i++) {
    btns[i].onclick = function() {
        console.log(i);
    }
}
// 在循环语句中是一个父作用域，在循环体中的是一个子作用域
for (let i = 0; i < 3; i++) {
    let i = 10;
    console.log(i); // 输出 10 10 10
}

// const拥有上面let的 1、2、3点性质，它自有的特性是：
// 1. 声明的时候必须赋值

// 2. 声明的变量存储简单的数据类型时候不可改变其值，如果存储的是对象，那么引用不发生改变，至于对象里面的数据发生了变化，则是没有关系的