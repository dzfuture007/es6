// 函数参数的默认值
// 注意：默认值后面不能再有没有默认值的参数
{
    function test(x, y = "world") {
        console.log('默认值', x, y);
    }
    test('hello'); // hello world
    test('hello', 'kill'); // hello kill
}

//作用域
{
    let x = 'test';

    function test2(x, y = x) {
        console.log('作用域', x, y);
    }
    test2('kill'); // kill kill
    test2(); // undefined， undefined
} {
    let x = 'test';

    function test2(c, y = x) {
        console.log('作用域', c, y);
    }
    test2('kill'); // kill test
    test2(); // undefined， test
}

// rest参数
// 注意rest参数之后不允许有其他参数，否则会编译报错
{
    function test3(...arg) {
        for (let v of arg) {
            console.log('rest', v);
        }
    }

    test3(1, 2, 3, 4, 'a');
}

// 扩展运算符
{
    console.log(...[1, 2, 3]); // 1 2 3
    console.log('a', ...[1, 2, 3]); // a 1 2 3
}

// 箭头函数
// 三要素
//      1. 函数名 arrow
//      2. 函数参数 v
//      3. 函数返回值 v * 2
// 如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。
// 使用箭头函数的时候一定要注意this绑定。
{
    let arrow = v => v * 2;
    let arrow2 = () => 5;
    console.log(arrow);
    console.log(arrow(3)); // 6
    console.log(arrow2()); // 5
}

// 尾调用
// 什么是尾调用：函数的最后一句是不是一个函数？
// 尾调用有什么作用：提升性能的
// 什么时候用尾调用：如果你在做性能优化的过程中，发现某一个过程是不断的嵌套别的函数或者说这个函数依赖另外一个函数的操作
// 这时候建议最好写成尾调用的形式
{
    function tail(x) {
        console.log('tail', x);
    }

    function fx(x) {
        return tail(x);
    }

    fx(123); // tail 123
}