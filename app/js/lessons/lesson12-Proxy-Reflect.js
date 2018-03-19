// *******************Proxy*******************
{
    // 用户不能直接操作原始对象，需要通过代理根据不同业务的需要去读和写原始对象
    // 目标对象
    let obj = {
        time: '2017-03-11',
        name: 'net',
        _r: 123
    };

    // 代理对象
    let monitor = new Proxy(obj, {
        // get, 拦截对象属性的读取
        get(target, key) {
            return target[key].replace('2017', '2018');
        },

        // set, 拦截对象赋值属性
        set(target, key, value) {
            // 只允许修改name属性
            if (key === 'name') {
                return target[key] = value;
            } else {
                return target[key];
            }
        },

        // has, 拦截判断是否包含某个属性，in操作
        has(target, key) {
            // 只暴露name属性
            if(key === 'name') {
                return target[key];
            } else {
                return false;
            }
        },

        // delete，拦截删除属性操作
        deleteProperty(target, key) {
            if(key.indexOf('_') > -1) {
                delete target[key];
                return true;
            } else {
                return target[key];
            }
        },

    // 拦截Object.keys, Object.getOwnPropertySymbols, Object.getOwnPropertyNames操作
    ownKeys(target) {
        return Object.keys(target).filter(item => item!='time');
    }
    });

    // 用户通过操作monitor来间接操作obj
    console.log('get', monitor.time); // 2018-03-11

    monitor.time = '2018';
    monitor.name = 'mukewang';
    console.log('set', monitor.time, monitor); // time没有变化，name发生变化

    // 通过has拦截，屏蔽了对time的查找
    console.log('has', 'name' in monitor, 'time' in monitor); // true  false

    // delete monitor.time;
    // console.log('delete', monitor);

    // delete monitor._r;
    // console.log('delete', monitor);

    console.log('ownKeys', Object.keys(monitor));
}

// 应用场景：校验数据
// 实例：实现一个与业务解耦的校验模块
{
    // 返回一个Proxy对象
    function validator(target, validator) {
        return new Proxy(target, {
            _validator: validator,
            set(target, key, value, proxy) {
                if (target.hasOwnProperty(key)) {
                    let keyValidateRule = this._validator[key]; // 得到对应属性的校验方法
                    if (keyValidateRule(value)) {
                        return Reflect.set(target, key, value, proxy);
                    } else {
                        throw Error(`不能设置${key}到${value}`);
                    }
                } else {
                    throw Error(`${key} 不存在`);
                }
            }
        });
    }

    // validator对象：里面包含了各种对象的校验规则
    // 以属性名命名
    // 扩展：只需要这里添加新增属性对应的校验规则即可。
    const personValiators = {
        name(val) {
            return typeof val === 'string';
        },
        age(val) {
            return typeof val === 'number' && val > 18;
        }
    }

    // 为什么修改name的时候会报错呢？
    // 是因为这里返回的不再是this了，而是this的代理。
    class Person{
        constructor(name, age) {
            this.name = name;
            this.age = age;
            return validator(this, personValiators);
        }
    }

    const person = new Person('lilei', 30);

    console.log(person);

    // 这里抛出异常
    person.name = 48;
}

// *******************Reflect*******************
// Proxy有的方法Reflect都有，而且名称参数一模一样。
{
    let obj = {
        time: '2017-03-11',
        name: 'net',
        _r: 123
    };

    console.log('Reflect get', Reflect.get(obj, 'time'));

    Reflect.set(obj, 'name', 'mukewang');
    console.log(obj);
    console.log('has', Reflect.has(obj, 'name'));
}