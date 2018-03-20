{
    // 方法的修饰
    // 三个点
    // 1. 修饰器是一个函数
    // 2. 修改行为
    // 3. 修改类的行为
    let readonly = function(target, name, descriptor) {
        descriptor.writable = false;
        return descriptor;
    };

    class Test {
        @readonly
        time () {
            return '2017-03-11';
        }
    }

    let test = new Test();
    console.log(test.time());    

    // 报错
    // test.time = function() {
    //     console.log('reset time');        
    // };    
}

// 类的修饰
// 在类外面进行操作
// 注意一定要在类的前面，其他地方都不可以
{
    // 这个修饰器的目标是在类上添加一个静态属性myname，而不是在类的实例上添加属性
    let typename = function(target) {
        target.myname = 'hello';
    };

    @typename
    class Test {

    }

    // myname是类的静态属性
    console.log('类修饰符', Test.myname);
}

// 第三方修饰器的js库： core-decorators

// 使用场景
// 日志统计
// 通常的做法是在埋点都写在业务逻辑中
// 用修饰器实现一个不一样的写法
// 好处：
// 1. 把埋点逻辑抽离出来变成一个可复用的模块，保证了代码的可复用性。
// 2. 埋点代码从业务逻辑中拆离出去，业务代码的简洁度和可维护性就增强了很多。
{
    let log = (type) => {
        return function(target, name, descriptor) {
            // 保存所要修饰的方法
            let src_method = descriptor.value;

            descriptor.value = (...arg) => {
                // 执行所修饰方法对应的业务逻辑
                src_method.apply(target.arg);

                // 埋点逻辑
                console.log(`log ${type}`);
            }
        }
    };

    class AD {
        @log('show')
        show() {
            // 具体的业务逻辑
            console.info('ad is show');
        }

        @log('click')
        click() {
            // 具体的业务逻辑
            console.info('ad is click');
        }
    };

    let ad = new AD();
    ad.show();
    ad.click();
}
