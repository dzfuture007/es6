{
    let arr = ['hello', 'world'];
    // 数组内部已经帮我们实现了iterator接口
    let map = arr[Symbol.iterator]();

    // 两个属性，一个value，一个done
    // done是false表示还有下一步，done是true表示已经完了，没有下一步了，循环已经截止了。
    console.log(map.next()); // {value: "hello", done: false}
    console.log(map.next()); // {value: "hello", done: false}
    console.log(map.next()); // {value: undefined, done: true}
}

//自定义实现iterator接口
// Object并没有部署iterator接口，因为Object的数据是我们填充的，它不知道是什么样的数据，所以就不知道怎么遍历
{
    let obj = {
        start: [1, 3, 2],
        end: [7, 9, 8],
        [Symbol.iterator]() {
            let self = this;
            let index = 0;
            let arr = self.start.concat(self.end);
            let len = arr.length;

            // iterator接口部署的时候一定要有next()方法
            // 这个接口返回的是一个有next()方法的对象
            return {
                // next返回值包含两个属性：value和done
                next() {
                    if (index < len) {
                        return {
                            // 遍历没有完成
                            value: arr[index++],
                            done: false
                        }
                    } else {
                        // 遍历完成
                        return {
                            value: arr[index++],
                            done: true
                        }
                    }
                }
            }
        }
    };

    for (let key of obj) {
        console.log(key);
    }
}