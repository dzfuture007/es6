class Calculate {
    /**
     * 
     * 计算注数
     * @param {number} active 当前选中的号码 
     * @param {string} play_name 当前的玩法标识 
     * @return {number} 注数
     */
    computeCount(active, play_name) {
        let count = 0;
        // play_list是一个map类型
        const exist = this.play_list.has(play_name);
        // ES6声明数组的方法
        // 传入数组长度，再用fill填充
        const arr = new Array(active).fill(0);

        if (exist && play_name.at(0) === 'r') {
            // combine是一个静态方法
            count = Calculate.combine(arr, play_name.split('')[1]).length;
        }

        return count;
    }

    /**
     * 组合运算 
     * @static
     * @param {array} arr 参与组合运算的数组
     * @param {number} size 组合运算的基数
     * @return {number} 计算注数
     */
    static combine(arr, size) {
        let allResult = [];

        (function f(arr, size, result) {
            let arrLen = arr.length;

            if (size > arrLen) {
                return;
            }

            if (size === arrLen) {
                allResult.push([].concat(result, arr))
            } else {
                for (let i = 0; i < arrLen; i++) {
                    let newResult = [].concat(result);
                    newResult.push(arr[i]);
                    if (size === 1) {
                        allResult.push(newResult)
                    } else {
                        let newArr = [].concat(arr);
                        newArr.splice(0, i + 1);
                        f(newArr, size - 1, newResult)
                    }
                }
            }
        })(arr, size, []);

        return allResult;
    }

    /**
     * [computeBonus 奖金范围预测]
     * @param  {number} active    [当前选中的号码]
     * @param  {string} play_name [当前的玩法标识]
     * @return {array}           [奖金范围]
     */
    computeBonus(active, play_name) {
        const play = play_name.split('');
        const self = this;
        let arr = new Array(play[1] * 1).fill(0);
        let min, max;

        if (play[0] === 'r') {
            let min_active = 5 - (11 - active);

            if (min_active > 0) {
                if (min_active - play[1] >= 0) {
                    arr = new Array(min_active).fill(0);
                    min = Calculate.combine(arr, play[1]).length;
                } else {
                    if (play[1] - 5 > 0 && active - play[1] >= 0) {
                        arr = new Array(active - 5).fill(0);
                        min = Calculate.combine(arr, play[1] - 5).length;
                    } else {
                        min = active - play[1] > -1 ? 1 : 0;
                    }
                }
            } else {
                min = active - play[1] > -1 ? 1 : 0;
            }

            let max_active = Math.min(active, 5);

            if (play[1] - 5 > 0) {
                if (active - play[1] >= 0) {
                    arr = new Array(active - 5).fill(0);
                    max = Calculate.combine(arr, play[1] - 5).length;
                } else {
                    max = 0;
                }
            } else if (play[1] - 5 < 0) {
                arr = new Array(Math.min(active, 5)).fill(0);
                max = Calculate.combine(arr, play[1]).length;
            } else {
                max = 1;
            }
        }

        return [min, max].map(item => item * self.play_list.get(play_name).bonus);
    }
}

export default Calculate;

/**
 * 所用到ES6知识
 * 1. this.play_list是一个map结构，使用它的has方法来判断存在。
 * 2. ES6可以通过传入一个长度length创建一个数组，并通过fill方法填充指定值。
 * 3. 使用了字符串扩展的at()方法。
 * 4. 箭头函数的使用。
 * 5. Map中get()方法的使用。
 * 6. static声明静态函数。
 */