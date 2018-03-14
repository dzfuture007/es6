// unicode表示法
{
    console.log('a', `\u0061`); // a a
    // 值如果已经超过了0xFFF，无法正常显示
    console.log('s', `\u20BB7`);
    // 添加{}
    console.log('s', `\u{20BB7}`); // s 𠮷
}

// 取码值：codePointAt
{
    let s = '𠮷';
    console.log('length', s.length); // 因为它的码值是大于2个字节的，这时候就处理成4个字节了，在处理长度的时候每两个字节就是一个长度

    // ES5: charAt & charCodeAt
    console.log('0', s.charAt(0)); //乱码
    console.log('1', s.charAt(1)); //乱码
    console.log('at0', s.charCodeAt(0)); // charCodeAt只去两个字节
    console.log('at1', s.charCodeAt(1));

    // ES6: codePointAt对于第一个字符的处理是完整的
    let s1 = '𠮷a';
    console.log('length', s1.length); // 3
    console.log('code0', s1.codePointAt(0)); // codePointAt方法会自动计算4个字节的码值
    console.log('code0', s1.codePointAt(0).toString(16)); // 20bb7
    console.log('code1', s1.codePointAt(1)); // 只取了后两个字节，而不是在4个字节之后再去取
    console.log('code2', s1.codePointAt(2)); // 97 是 a的码值
}

// fromCodePoint：它可以正确处理大于0xFFF的字符
{
    console.log(String.fromCharCode('0x20bb7')); //乱码
    console.log(String.fromCodePoint('0x20bb7')); // 𠮷
}

// 字符串遍历器接口: for...of
// 高频
{
    // ES5
    let str = '\u{20bb7}abc';
    for (let i = 0; i < str.length; i++) {
        console.log('es6', str[i]);
    }
}
{
    // ES6
    let str = '\u{20bb7}abc';
    for (let code of str) {
        console.log('es6', code);
    }
}

// includes：判断字符串是否包含某个字符串
// startsWith：判断字符串是否以某个字符串开始
// endsWith：判断字符串是否以某个字符串结束
{
    let str = "string";
    console.log("include", str.includes("r")); // true
    console.log("start", str.startsWith("str")); // true
    console.log("end", str.endsWith("ing")); // true
}

// repeat：字符串复制
{
    let str = "abc";
    console.log(str.repeat(2)); //abcabc
}

// String.raw
// raw对所有的斜杠进行了转义
// 使用频率不高，了解即可
{
    console.log(String.raw`Hi\n${1+2}`); // Hi\n3
    console.log(`Hi\n${1+2}`); // Hi 换行 3
}

// 模板字符串
// 高频
{
    let name = "list";
    let info = "hello world";
    let tpl = `i am ${name}, ${info}.`;
    console.log(tpl);
}

// ES7草案，但是使用频率很高，引入补丁之后就可以在ES6中使用了
// 字符串补全功能
// padStart：向前补白
// padEnd：向后补白
// 使用场景：处理日期格式，小于10的加0
{
    console.log('1'.padStart(2, '0'));
    console.log('1'.padEnd(2, '0'));
}

// 标签模板
// 作用：
//      1. 在过滤html字符串，放置XSS攻击的时候。
//      2. 多语言转换的时候：用一套模板，通过不同的return返回不同的结果。
{
    let user = {
        name: 'list',
        info: 'hello world'
    };
    console.log(abc`i am ${user.name}, ${user.info}`);
    function abc(s, v1, v2) {
        console.log(s, v1, v2);
        return s+v1+v2;
    }
}