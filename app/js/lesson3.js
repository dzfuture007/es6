// 够惨函数发生的改变
{
    // ES5
    let regex = new RegExp('xyz', 'i');
    let regex2 = new RegExp(/xyz/i); //ES5中这种写法必须是一个参数

    console.log(regex.test('xyz123'), regex2.test('xyz123'));

    // ES6中允许第一个参数是正则表达式的方式，允许第二个参数再去填写修饰符
    // 结果：参数中的修饰符会覆盖正则表达式中的修饰符
    let regex3 = new RegExp(/xyz/ig, 'i');
    console.log(regex3.flags); // i
}

/*
 *  y修饰符
 *  y和g修饰符的异同：
 *  相同点：y和g都是全局匹配
 *  不同点：
 *      1. g修饰符是从上一次匹配的位置继续寻找直到找到匹配的位置开始，它不强调是必须在匹配的下一个字符开始匹配，
 *        它不强调必须是从第一个就开始必须匹配上，中间任何位置匹配上都算。
 *      2. y修饰符匹配的第一个必须是紧跟着的下一个字符开始匹配成功才算。
*/
{
    let s = 'bbb_bb_b';
    let a1 = /b+/g;
    let a2 = /b+/y;

    console.log('one', a1.exec(s), a2.exec(s));
    console.log('two', a1.exec(s), a2.exec(s));

    // 如何判断正则对象有没有开启粘连模式，就是y修饰符的模式
    console.log(a1.sticky, a2.sticky); // false, true
}

/*
 * u修饰符
 */