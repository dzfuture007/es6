// 两种声明方式
{
  // 声明
  // 这种声明方法无法取变量的值
  // Symbol声明的变量永远不可能相等
  let a1 = Symbol();
  let a2 = Symbol();
  console.log(a1 === a2); // false

  // 另外一种声明方法
  // for的参数是一个key值，执行的时候会先检查这个key值是否在全局注册过，注册过就返回那个值，如果没有注册过就相当于Symbol()
  let a3 = Symbol.for('a3');
  let a4 = Symbol.for('a3');
  console.log(a3 === a4); // true 此时a4拿到的是a3的值
}

// 使用场景
{
  let a1 = Symbol.for('abc');
  let obj = {
    [a1]: '123',
    'abc': 345,
    'c': 456 
  };
  console.log('obj', obj); // {abc: 345, c: 456, Symbol(abc): "123"}

  // 用Symobl变量作为属性名，使用for in和for of是无法取得该属性值的
  for(let [key, value] of Object.entries(obj)) {
    console.log('let of', key, value); // let of abc 345 let of c 456
  }

  // Object.getOwnPropertySymbols()
  // 只获取Symbol的
  Object.getOwnPropertySymbols(obj).forEach(function(item) {
    console.log(obj[item]); // 123
  });

  // 通过Reflect.ownKyes()
  // 可以拿到所有类型的属性
  Reflect.ownKeys(obj).forEach(function(item) {
    console.log('ownkeys', item, obj[item]); // abc 345 c 456 Symbol(abc) 123
  });
}