// ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示
// ES6中大小写都可以
{
    console.log('B', 0B111110111);
    console.log(0o767);
}

// isFinite和isNaN
// 不常用了解即可
{
    console.log('15', Number.isFinite(15)); // true
    console.log('NaN', Number.isFinite(NaN)); // false 
    console.log('1/0', Number.isFinite(1/0)); // false
    console.log('NaN', Number.isNaN(NaN)); // true
    console.log('0', Number.isNaN(0)); // false
}

//常用
// Number.isInteger()
// 判断是不是整数
// 参数必须是数字类型
{
    console.log('25', Number.isInteger(25)); // true
    console.log('25.0', Number.isInteger(25.0)); // true
    console.log('25.1', Number.isInteger(25.1)); // false
    console.log('25.1', Number.isInteger("25")); // false
}

//常用
// Number.isSafeInteger()
// Number.MAX_SAFE_INTEGER
// Number.MIN_SAFE_INTEGER
// 判断一个数字是不是在全区范围之内：-2的53次方<x<2的53次方
{
    console.log(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
    console.log('10', Number.isSafeInteger(10)); // true
    console.log('a', Number.isSafeInteger('a')); // false
}

//常用
// Math.trunc()
// 返回一个小数的整数部分
// ES5中Math.floor()和Math.cell()
{
    console.log(4.1, Math.trunc(4.1)); // 4
    console.log(4.1, Math.trunc(4.9)); // 4
}

//常用
// Math.sign()
// 判断一个数是正数，负数，还是0
{
    console.log('-5', Math.sign(-5)); // -1
    console.log('0', Math.sign(0)); // 0
    console.log('5', Math.sign(5)); // 1
    console.log('50', Math.sign('50')); // 1 发生了类型转换
    console.log('foo', Math.sign('foo')); // NaN
}

// 立方根
// Math.cbrt()
{
    console.log('8', Math.cbrt(8)); // 2
}

// 增加了很多三角函数和对数方法