// 数组解构赋值
{
    let a, b;
    [a, b] = [1, 2];
    console.log(a, b); // 1, 2
}

{
    let a, b, rest;
    [a, b, ...rest] = [1, 2, 3, 4, 5, 6];
    console.log(a, b, rest); // 1, 2, [3, 4, 5, 6]
}

{
    let a, b, c;
    [a, b, c] = [1 , 2];
    // 默认值
    // [a, b, c=3] = [1 , 2]; // 1, 2, 3
    console.log(a, b, c) // 1, 2, undefined
}

// 使用场景
// 1. 变量交换
{
    let a = 1;
    let b = 2;
    [a, b] = [b, a];
    console.log(a, b); // 2, 1
}

// 2. 读取函数返回的多个值
{
    function f() {
        return [1, 2];
    }

    let a, b;
    [a, b] = f();
    console.log(a, b); // 1, 2
}

// 3. 选择性的接收函数返回的某些值
{
    function f() {
        return [1, 2, 3, 4, 5];
    }

    let a, b, c;
    [a,,,b] = f();
    console.log(a, b); // 1, 4
}

// 4. 不知道函数返回的数组长度是多少，只关心第一个，其他的让它放在一个数组里
{
    function f() {
        return [1, 2, 3, 4, 5];
    }

    let a, b, c;
    [a, , ...b] = f();
    console.log(a, b); // 1, [2, 3, 4, 5]
}

// 对象解构赋值
{
    let o = { p: 42, q: true };
    let { p, q } = o;
    console.log(p, q); // 42, true
}

// 默认值
{
    let {a=10, b=5} = { a: 3 };
    console.log(a, b); // 3, 5
}

// 特别常用的使用场景：解析服务器端返回的json对象
{
    let metaData = {
        title: 'abc',
        test: [{
            title: 'test',
            desc: 'description'
        }]
    };
    let {title:esTitle, test:[{title: cnTitle}]} = metaData;

    console.log(esTitle, cnTitle);
}