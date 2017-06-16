// 集合：由无序，唯一的项组成。

// 1. 如何创建一个集合
{
    let set = new Set([1, 2, 3, 3]);
    console.log(set); // 1 2 3
}

// 2. Set类的属性
{
    let set = new Set([1, 2, 3, 3]);
    console.log(set.size); // 3
}

// 3. Set类的基本方法
{
    let set = new Set([1, 2, 3, 3]);

    // 1. set.add(value) 添加一个数据，返回Set结构本身
    set.add('a').add('b').add('c');
    console.log(set); // 1 2 3 a b c

    // 2. set.delete(value) 删除指定数据，返回一个布尔值，表示删除是否成功
    console.log(set.delete('a')); // true
    console.log(set); // 1 2 3 b c
    console.log(set.delete('a')); // false

    // 3. set.has(value) 判断该值是否为Set成员，返回一个布尔值
    console.log(set.has('a')); // false
    console.log(set.has(1)); // true

    // 4. set.clear() 清除所有数据，没有返回值
    // set.clear();
    // console.log(set); // Set {}

    // 5. keys() 返回键名的遍历器
    console.log(set.keys());

    // 6. values() 返回键值的遍历器
    console.log(set.values());

    // 7. entries() 返回键值对的遍历器
    console.log(set.entries());

    // 8. forEach() 使用回调函数遍历每个成员
    set.forEach(function(value, key, set) {
        console.log(value + ' miaov');
    });
    console.log(set);
}

{
    // 用Set对数组去重
    let ary = [1, 1, 2, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 5, 6, 7, 7, 8];
    let set = new Set(ary);
    console.log(set);
}