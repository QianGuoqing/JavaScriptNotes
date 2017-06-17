/**
 * iterator是一种接口，为各种不同的数据结构提供统一的访问机制.
 * 任何数据结构只要部署Iterator接口，就可以完成遍历操作，而且这种遍历操作是依次处理数据结构中的所有成员
 * 
 * Iterator遍历器的作用：
 * - 为各种数据结构提供一个统一的、简便的访问接口
 * - 使得数据结构的成员能够按照某种次序排列
 * - ES6新增了 for..of 循环，Iterator接口主要提供 for..of 消费
 */

// 1. 手写Iterator接口
{
    const ary = [1, 2, 3, 4, 5, 6];

    function iterator(ary) {
        let index = 0;
        return {
            next: function() {
                return index < ary.length ? { value: ary[index], done: false } : { value: undefined, done: true }
            }
        }
    }

    const it = iterator(ary);
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
}

/**
 * Iterator遍历过程：
 * - 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上就是一个指针对象。
 * - 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员
 * - 第二次调用指针对象next方法，指针就指向数据结构的第二个成员
 * - 不断调用指针对象的next方法，直到它指向数据结构的结束位置
 * 
 * 每一次调用next方法，都会放回数据结构当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。
 */

// 2. 凡是具有Symbol.iterator 属性的数据结构都具有Iterator接口
{
    const ary = [1, 2, 4];
    const set = new Set(['a', 'b', 'c']);
    const map = new Map([
        ['a', 1]
    ]);

    const itAry = ary[Symbol.iterator]();
    const itSet = set[Symbol.iterator]();
    const itMap = map[Symbol.iterator]();

    console.log(itAry);
    console.log(itSet);
    console.log(itMap);

    console.log(itSet.next());
    console.log(itSet.next());
    console.log(itSet.next());
    console.log(itSet.next());

    const obj = {};
    console.log(obj[Symbol.iterator]);
}

/**
 * 3. 具备iterator接口的数据结构都可以进行如下操作
 *  - 解构赋值
 *  - 扩展运算符
 */
{
    const set = new Set(['a', 'b', 'c']);
    let [x, y] = set;
    console.log(x, y);
}

// 
{
    let str = 'miaov';
    let aryStr = [...str];
    console.log(aryStr);
}

{
    const ary = [{}, 1, 'a', 1, 'a', 'b', []];
    const set = new Set(ary);
    console.log(set);
}

// 4. for..of循环
{
    const ofAry = [1, 2, 3, 4];
    for (let i of ofAry) {
        console.log(i);
    }

    const m = new Map();
    m.set('a', 1).set('b', 2).set('c', 3);
    for (let data of m) {
        console.log(data);
    }

    for (let [key, value] of m) {
        console.log(key, value);
    }
}