// Array.of
// 把一组数据变量转换为数组类型
{
    let arr = Array.of(3, 1, 2, 4);
    console.log('arr=', arr); // arr=[3, 1, 2, 4]
    // 不传参数返回的就是空数组
    let empty= Array.of();
    console.log('empty', empty); // empty []
}

// Array.from
// 两种用法
{
    // 1. 只有一个参数
    // Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。
    let p = document.querySelectorAll('p');
    // 把集合转换成了数组，才能使用数组的forEach
    let pArr = Array.from(p);
    pArr.forEach(function(item) {
        console.log(item.textContent);
    });

    //2. 两个参数：相当于map
    console.log(Array.from([1, 3, 5], function(item) {
        return item * 2;
    })); // [2, 6, 10]
}

// fill()
// 使用给定值，填充一个数组
{
    // 1. 只有一个参数，会替换数组中的所有元素
    console.log('fill-7', [1, 'a', undefined].fill(7)); // [7, 7, 7]
    // 2. 接受第二个和第三个参数，用于指定填充的起始位置和结束位置，不包含终止位置
    console.log('fill-7', [1, 'a', undefined, 4, 5].fill(7, 1, 3)); // [1, 7, 7, 4, 5]
}

// keys()：获取数组的索引
// values()：有兼容性问题，须引入了babel-polyfill才可以使用
// entries()：获取索引同时也获取值
{
    for (let index of ['1', 'c', 'ks'].keys()) {
        console.log('keys', index); // 0 1 2
    }
    for (let value of ['1', 'c', 'ks'].values()) {
        console.log('values', value); // 1 c ks
    }
    for (let [index, value] of ['1', 'c', 'ks'].entries()) {
        console.log('index values', index, value); 
    }
}

// find()：查找出数组中是第一个满足条件的元素
// findIndex()：查找出数组中是第一个满足条件的元素的下标
{
    console.log([1, 2, 3, 4, 5, 6].find(function(item) {
        return item > 3; // 4
    }));
    console.log([1, 2, 3, 4, 5, 6].findIndex(function(item) {
        return item > 3; // 3
    }));
}

// includes
// 判断一个数组中是否包含指定元素
// 可以找到NaN
{
    console.log('number', [1, 2, NaN].includes(1)); // true
    console.log('number', [1, 2, NaN].includes(NaN)); // true
}

// 不常用
// copyWithin()