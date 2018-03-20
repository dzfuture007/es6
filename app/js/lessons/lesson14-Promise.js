// ES5通过回调函数处理异步操作
{
    let ajax = function (callback) {
        console.log("执行");
        setTimeout(function () {
            callback && callback.call();
        }, 1000);
    };

    ajax(function () {
        console.log("timeout1");
    });
}

// 使用回调函数的缺点：
// 1. 如果过程比较复杂，比如先执行a，再执行b，....d，代码用回调写起来会非常复杂。
// 2. 代码不容易看懂，很难一眼看出哪个操作在前哪个在后，后期维护困难。

// ES6用Promise改写
{
    let ajax = function () {
        console.log("执行2");

        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve();
            }, 1000);
        });
    };

    // then的第一个参数是resolve，第二个参数是reject。
    ajax().then(function () {
        console.log('resolve', 'timeout2');
    });
}

// 较复杂的过程
// Promise是一个复杂度位1的方式但是能达到串联操作的效果。
{
    let ajax = function () {
        console.log("执行3");

        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve();
            }, 1000);
        });
    };

    ajax()
        .then(function () {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve();
                }, 2000);
            });
        })
        .then(function() {
            console.log('timeout3')
        });
}

// 在串行操作出现错误的时候捕获异常
{
    let ajax = function(num) {
        console.log("执行4");

        return new Promise(function (resolve, reject) {
            if (num > 5) {
                resolve();
            } else {
                throw new Error('出错了');
            }
        });
    };

    ajax(6)
        .then(function() {
            console.log('log', 6);
        })
        .catch(function(err) {
            console.log('catch', err);
        });

    ajax(3)
        .then(function() {
            console.log('log', 6);
        })
        .catch(function(err) {
            console.log('catch', err);
        });
}

// Promise.all应用场景
// 等所有图片都加载完成再添加到页面上。
// Promise.all([promise1, promise2, ...promiseN])
// 它表示将多个Promise实例当做一个Promise实例
// 它返回的是一个Promise实例
// 当所有的Promise实例状态发生改变的时候，新的Promise实例才发跟着发生变化
{
    function loadImg(src) {
        return new Promise((resolve, reject) => {
            let img = document.createElement('img');
            img.src = src;
            img.onload = function() {
                resolve(img);
            };
            img.onerror = function(err) {
                reject(err);
            };
        });
    }

    function showImgs(imgs) {
        imgs.forEach(img => {
            document.body.appendChild(img);
        });
    }

    Promise.all([
        loadImg('http://i4.buimg.com/567571/df1ef0720bea6832.png'),
        loadImg('http://i4.buimg.com/567751/2b07ee25b08930ba.png'),
        loadImg('http://i2.muimg.com/567751/5eb8190d6b2a1c9c.png')
    ]).then(showImgs);
}

// Promise.race
// 有一个图片加载完就显示在页面上
// 场景：我这个位置需要加载一张图片，但是我有三张图片我也不知道哪个加载快，哪个到了我就显示哪个
{
    function loadImg(src) {
        return new Promise((resolve, reject) => {
            let img = document.createElement('img');
            img.src = src;
            img.onload = function() {
                resolve(img);
            };
            img.onerror = function(err) {
                reject(err);
            };
        });
    }

    function showImgs(img) {
        let p = document.createElement('p');
        p.appendChild(img);
        document.body.appendChild(p);
    }

    Promise.race([
        loadImg('http://i4.buimg.com/567571/df1ef0720bea6832.png'),
        loadImg('http://i4.buimg.com/567751/2b07ee25b08930ba.png'),
        loadImg('http://i2.muimg.com/567751/5eb8190d6b2a1c9c.png')
    ]).then(showImgs);
}
