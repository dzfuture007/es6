// ************************Set************************
// 1. 定义有两种形式：有参数，无参数
// 2. 特性：元素不能重复
// 3. 常用方法
// 4. 遍历

// 集合中元素具有唯一性
// add()方法和size属性
{
    let list = new Set();
    list.add(5);
    list.add(7);

    console.log('size', list.size); // 2
}

{
    let arr = [1, 2, 3, 4, 5];
    let list = new Set(arr);

    console.log('size', list.size); // 5
}

{
    // Set中元素有唯一性，不能重复
    let list = new Set();
    list.add(1);
    list.add(2);
    list.add(1);

    console.log('list', list); // Set(2) {1, 2}

    // 应用场景数组去重
    // 在对比元素是否相等的时候不会做类型转换
    let arr = [1, 2, 3, 1, '2'];
    let list1 = new Set(arr);

    console.log('unique', list1); // Set(4) {1, 2, 3, "2"}
}

// Set实例的常用方法
// add
// delete
// clear
// has
{
    let arr = ['add', 'delete', 'clear', 'has'];
    let list = new Set(arr);

    console.log('has', list.has('add')); // true
    console.log('delete', list.delete('add'), list); // true {"delete", "clear", "has"}
    list.clear();
    console.log('list', list); // {}
}

// Set的遍历
// key和value一样
{
    let arr = ['add', 'delete', 'clear', 'has'];
    let list = new Set(arr);

    for (let key of list.keys()) {
        console.log('keys', key); // add delete clear has
    }

    for (let value of list.values()) {
        console.log('values', value); // add delete clear has
    }

    for (let [key, value] of list.entries()) {
        console.log('value', key, value);
    }

    list.forEach(function(item) {
        console.log(item);
    });
}

// ************************WeakSet************************
// WeakSet和Set有何区别
// 1. 它们支持的数据类型不一样，WeakSet的元素必须是对象。
// 2. WeakSet对象中的对象都是弱引用，它不会检测这个引用地址是否已经被垃圾回收掉了。
// 3. 没有size属性，没有clear()方法
// 4. 不能遍历

// ************************map************************
// map的特性就是它的key可以是任何类型，而对象的key只能是字符串
// 定义方式
// 第一种定义方式
{
    let map = new Map();
    let arr = ['123'];

    map.set(arr, 456);
    console.log('map', map, map.get(arr)); //{Array(1) => 456}
}

// 第二种定义方式
// new Map([[key, value], ...])
// 属性和常用方法
// size
// get
// set
// delete
// clear
{
    let map = new Map([
        ['a', 123],
        ['b', 456]
    ]);
    console.log('map args', map); // {"a" => 123, "b" => 456}
    console.log('size', map.size); //2
    console.log('delete', map.delete('a'), map); // delete true {"b" = > 456}
    console.log('clear', map.clear(), map); // clear undefined {}
}

// 遍历与set一模一样

// ************************WeakMap************************
// WeakMap和Map有何区别
// 1. 它们支持的数据类型不一样，WeakMap的key必须是对象。
// 2. 没有size属性，没有clear()方法
// 3. 不能遍历
{
    let weakmap = new WeakMap();
    let o = {};
    weakmap.set(o, 123);
    console.log(weakmap);
    console.log(weakmap.get(o)); // 123
}