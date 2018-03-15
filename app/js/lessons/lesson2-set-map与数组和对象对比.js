// 数据结构横向对比：增 查 改 删
// *******************Map与Array的对比*******************
{
    let map = new Map();
    let array = [];

    // Add
    map.set('t', 1);
    array.push({ t: 1 });
    console.info("map-array-add", map, array); // {"t" => 1} [{t: 1}]

    // Retrieve：数据结构中有没有这个值？
    let map_exist = map.has('t'); // true
    let array_exist = array.find(item => item.t); // {t: 1}
    console.info("map-array-exist", map_exist, array_exist);

    // Update
    map.set('t', 2);
    array.forEach(item => item.t ? item.t = 2 : "");
    console.info("map-array-update", map, array); // {"t" => 2} [{t:2}]

    // Delete
    map.delete('t');
    // 删除数组成员需要先查出该成员在数组中的索引，再调用splice()方法
    // 获得index
    let index = array.findIndex(item => item.t);
    array.splice(index, 1);
    console.info("map-array-delete", map, array); // {} []
}

// *******************Set与Array的对比*******************
{
    let set = new Set();
    let array = [];

    // Add
    set.add({ t: 1 });
    array.push({ t: 1 });
    console.info("set-array-add", set, array);

    // Retrieve
    // 肯定是false，因为set中是对象的引用，这里是新声明的一个对象
    // 如果想要查询到，查询的对象必须是被保存过的，通过查对象的地址就可以查到了
    let set_exist = set.has({ t: 1 });
    let array_exist = array.find(item => item.t); // {t: 1}
    console.info("set-array-exist", set_exist, array_exist);

    // Update
    set.forEach(item => item.t ? item.t = 2 : "");
    array.forEach(item => item.t ? item.t = 2 : "");
    console.info("set-array-update", set, array); // {"t" => 2} [{t:2}]

    // Delete
    set.forEach(item => item.t ? set.delete(item) : "");
    // 删除数组成员需要先查出该成员在数组中的索引，再调用splice()方法
    // 获得index
    let index = array.findIndex(item => item.t);
    array.splice(index, 1);
    console.info("set-array-delete", set, array); // {} []
}

// *******************Map,Set与Object的对比*******************
{
    let item = { t: 1 }; // 为了set的查询
    let map = new Map();
    let set = new Set();
    let obj = {};

    // Add
    map.set('t', 1);
    set.add(item);
    obj['t'] = 1;
    console.info('map-set-obj-add', map, set, obj);

    // Retrieve
    console.info({
        map_exist: map.has('t'),
        set_exist: set.has(item),
        obj_exist: 't' in obj
    });

    // Update
    map.set('t', 2);
    // 两种情况
    // 1. 如果存储过了，直接修改数据本身
    // 2. 如果没有存储过，那么就需要使用forEach循环，找到再修改
    item.t = 2; // 因为set是保存的引用
    obj['t'] = 2;
    console.info('map-set-obj-update', map, set, obj);

    // Delete
    map.delete('t');
    // 1. 如果存储过了，直接删除
    // 2. 如果没有存储过，那么就需要使用forEach循环，找到再删除
    set.delete(item);
    delete obj['t'];
    console.info('map-set-obj-delete', map, set, obj);
}