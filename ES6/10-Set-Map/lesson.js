{
    let list = new Set();
    list.add(5);
    list.add(7);
    console.log('size', list.size);
}

{
    let arr = [1, 2, 3, 4, 5];
    let list = new Set(arr);

    console.log('size', list.size);
}

{
    let list = new Set();
    list.add(1);
    list.add(2);
    list.add(1);

    console.log('list', list);

    let arr = [1, 2, 3, 1, 2];
    let list2 = new Set(arr);
    console.log('list2', list2);
}

{
    let arr = ['add', 'delete', 'clear', 'has'];
    let list = new Set(arr);

    console.log('has', list.has('has'));
    console.log('delete', list.delete('delete'), list);
    console.log('clear', list.clear(), list);
}

{
    let arr = ['add', 'delete', 'clear', 'has'];
    let list = new Set(arr);

    for (let key of list.keys()) {
        console.log('keys', key);
    }

    for (let value of list.values()) {
        console.log('values', value);
    }

    for (let value of list) {
        console.log('values', value);
    }

    list.forEach((item) => {
        console.log('item', item);
    });
}

{
    let weakList = new WeakSet();

    let args = {};
    weakList.add(args);
    console.log('weakList', weakList);
}

{
    let map = new Map();
    let arr = ['123'];

    map.set(arr, 456);
    console.log('map', map);
}

{
    let map = new Map([
        ['a', 123],
        ['b', 456]
    ]);
    console.log('map', map);
    console.log('map size', map.size);
    console.log('delete', map.delete('a'));
    console.log('clear', map.clear());
}

{
    let weakMap = new WeakMap();
}

{
    // 数据结构横向对比：增删改查
    let map = new Map();
    let array = [];

    // 增
    map.set('t', 1);
    array.push({ t: 1 });
    console.log('map-array', map, array);

    // 查
    let map_exist = map.has('t');
    let array_exist = array.find(item => item.t);
    console.log(map_exist, array_exist);

    // 改
    map.set('t', 2);
    array.forEach(item => item.t ? item.t = 2 : '');

    // 删
    map.delete('t');
    let index = array.findIndex(item => item.t);
    array.splice(index, 1);
}

{
    // set和array的对比
    let set = new Set();
    let array = [];

    // 增
    set.add({ t: 1 });
    array.push({ t: 1 });
    console.log('set-array', set, array);

    // 查
    let set_exist = set.has({ t: 1 });
    let array_exist = array.find(item => item.t);
    console.log('set-array', set_exist, array_exist);

    // 改
    set.forEach(item => item.t ? item.t = 2 : '');
    array.forEach(item => item.t ? item.t = 2 : '');
    console.log('set-array-modify', set, array);

    // 删
    set.forEach(item => item.t ? delete(item) : '');
    let index = array.findIndex(item => item.t);
    array.splice(index, 1);
}

{
    // map,set,object对比
    let item = { t: 1 };
    let map = new Map();
    let set = new Set();

    // 增
    map.set('t', 1);
    set.add(item);
    obj['t'] = 1;
    console.log('map-set-obj', obj, map, set);

    // 查
    console.log({
        map_exist: map.has('t'),
        set_exist: set.has(item),
        obj_exist: 't' in obj
    });

    // 改
    map.set('t', 2);
    item.t = 2;
    obj['t'] = 2;

    // 删除
    map.delete('t');
    set.delete(item);
    delete obj['t'];
}