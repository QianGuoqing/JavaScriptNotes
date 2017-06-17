// ES6中新增了类的概念，可以使用class关键字声明一个类，之后可以使用这个类来实例化对象

class Miaov {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        return this;
    }

    print() {
        console.log(this.a + ' ' + this.b);
    }
}

const miaov = new Miaov('es6', 'class');
console.log(miaov.print());

// 1. Miaov中的constructor方法是构造方法，this关键字则代表实例对象，也就是说，ES5的构造函数Miaov，对应ES6的Miaov这个类的构造方法。

// 2. Miaov这个类除了构造方法，还定义了一个print方法。注意，定义”类“的方法的时候，不需要function关键字，直接把函数定义放进去就可以了。另外，方法之间不要逗号分隔。

// 3. 构造函数的prototype属性，在ES6的”类“上继续存在，而且类的所有方法都定义在类的prototype属性上面

// 4. 定义在类中的方法都是不可以被枚举的

// 5. constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显示定义，一个空的constructor是会被默认添加。

// 6. 生成类的实例对象的写法，与ES5完全一样，也是通过new命令。如果忘记加上new，像函数那样调用class，将会报错