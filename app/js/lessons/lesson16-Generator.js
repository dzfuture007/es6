{
    // generator基本定义
    // function和函数名之间有一个*
    // yield表达式定义不同的内部状态
    let tell = function* () {
        yield 'a';
        yield 'b';
        yield 'c';
    };

    // 通过next不断的去做函数体内部的几个阶段
    // 执行tell的时候，它会执行到第一个yield的时候停下来，执行完yield之前的语句
    // 当调用next()的时候它会执行第一个yield
    // 当再调用next()的时候它会执行第二个yield
    // .....
    // 从而保证了这个函数体内部看上去是一个异步操作的过程

    let k = tell ();

    console.log(k.next());
    console.log(k.next());
    console.log(k.next());
    console.log(k.next());
}

// generator函数和iterator接口的关系：
// 任意一个对象的iterator接口都是部署在Symbol.iterator这个属性上。
// generator函数就是遍历器生成函数，所以我们可以直接把它赋值给Symbol.iterator从而使这个对象也有了iterator接口。
{
    let object = {};

    // 通过创建generator函数的方式部署iterator接口
    object[Symbol.iterator] = function* () {
        yield '1';
        yield '2';
        yield '3';
    };

    for (let value of object) {
        console.log(value);        
    }
}

// 什么情况下generator函数能发挥最大的作用
// 状态机：在三种状态a, b, c之间循环，永远没有其他状态
{
    let state = function* () {
        while (1) {
            yield 'A';
            yield 'B';
            yield 'C';
        }
    };

    let status = state();
    console.log(status.next());
    console.log(status.next());
    console.log(status.next());
    console.log(status.next());
    console.log(status.next());
}


// 实例场景
// 1. 抽奖：前端做抽奖次数限制
{
    // 使用generator的好处：
    // 具体的抽奖逻辑与判断还有几次抽奖机会的逻辑完全隔离开来。
    // 抽奖次数没用存储在全局变量中。
    let draw = function(count) {
        // 具体抽奖逻辑
        console.log(`剩余${count}次`);
    };

    let residue = function* (count) {
        while (count > 0) {
            count--;
            yield draw(count);
        }
    };

    let star = residue(5);
    let btn = document.createElement('button');
    btn.id = 'start';
    btn.textContent = '抽奖';
    document.body.appendChild(btn);
    document.getElementById('start').addEventListener('click', function() {
        star.next();
    }, false);
}

// 长轮询或者WebSocket(浏览器兼容性不好)
// 服务端的某一个数据状态定期的变化，前端需要定时的去取这个状态。
// 通过generator把与业务逻辑相关的代码区分开
// 通过generator和Promise的结合把长轮询写的非常简单
{
    let ajax = function* () {
        yield new Promise(function(resolve, reject) {
            setTimeout(() => {
                resolve({code: 0});
            }, 200);
        });
    };

    let pull = function() {
        let generator = ajax();
        let step = generator.next();
        // step.value就是返回的promise实例
        step.value.then(function(d) {
            if (d.code !== 0) {
                setTimeout(() => {
                    console.info('wait');
                    pull();
                }, 1000);
            } else {
                console.log(d);                
            }
        });
    };

    pull();
}

{
    let ajax = function* () {
        yield new Promise(function(resolve, reject) {
            setTimeout(() => {
                resolve({code: 1});
            }, 200);
        });
    };

    let pull = function() {
        let generator = ajax();
        let step = generator.next();
        // step.value就是返回的promise实例
        step.value.then(function(d) {
            if (d.code !== 0) {
                setTimeout(() => {
                    console.info('wait');
                    pull();
                }, 1000);
            } else {
                console.log(d);                
            }
        });
    };

    pull();
}