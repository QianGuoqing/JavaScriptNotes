// Map: 字典 -> 键值对存储数据

// 1. 如何创建一个Map
{
    let map = new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3],
    ]);
    console.log(map); // Map { 'a' => 1, 'b' => 2, 'c' => 3 }
}

// 2. Map类的属性 size
{
    let map = new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3],
    ]);
    console.log(map.size); // 3
}

// 3. Map类的方法
{
    // 1. map.set(key, value) 设置键名key对应的键值为value，然后返回整个Map结构。
    //                    如果key已经有值，则键值会被更新，否则就生成新的键值对
    let map = new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3],
    ]);
    map.set('miaov', 'class').set('es', '6').set('miaov', 'lesson');
    console.log(map);

    // 2. map.get(key) get方法读取key对应的键值，如果找不到key，返回undefined
    console.log(map.get('miaov'));

    // 3. map.delete(key) 删除某个键，返回true，如果删除失败，返回false
    console.log(map.delete('a')); // true
    console.log(map);
    console.log(map.delete('a')); // false
    console.log(map);

    // 4. map.has(key) 返回一个布尔值，若某个键存在map对象中，返回true，否则返回false
    console.log(map.has('miaov')); // true
    console.log(map.has('a')); // false

    // 5. map.clear() 清除所有数据，没有返回值
    map.clear();
    console.log(map);

    // 6. keys() 返回键名的遍历器
    console.log(map.keys());

    // 7. values() 返回键值的遍历器
    console.log(map.values());

    // 8. entries() 返回键值对的遍历器
    console.log(map.entries());

    // 9. forEach() 使用回调函数遍历每个成员
    map.forEach(function(value, key, map) {
        console.log(key, value);
    });
}

// Map在使用中的注意事项
{
    let map = new Map();
    map.set(NaN, 10).set(NaN, 100);
    console.log(map); // Map { NaN => 100 }

    map.set({}, 'x').set({}, 'y');
    console.log(map); // Map { NaN => 100, {} => 'x', {} => 'y' }

    // Map中key的排列顺序是按照添加顺序来排列的
}