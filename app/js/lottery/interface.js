import $ from 'jquery';

class Interface {
    /**
     * [getOmit 获取遗漏数据]
     * @param {string} issue  [当前的期号]
     */
    getOmit(issue) {
        let self = this;

        // 注意箭头函数中的this指向是在定义的时候就指定好了，而不是在运行的时候。
        return new Promise((resolve, reject) => {
            $.ajax({
                    url: '/get/omit',
                    data: {
                        issue: issue
                    },
                    dataType: 'json'
                })
                .done(function(res) {
                    // setOmit方法是将来lottery中会定义的方法
                    // 因为lottery类会多重继承4个类，所以可以用self
                    // 多模块数据共享
                    self.setOmit(res.data);
                    resolve.call(self, res);
                })
                .fail(function(err) {
                    reject.call(err);
                });
        });
    }

    /**
     * 
     * 获取开奖号码
     * @param {string} issue [当前的期号]
     * @memberof Interface
     */
    getOpenCode(issue) {
        let self = this;

        return new Promise((resolve, reject) => {
            $.ajax({
                    url: '/get/opencode',
                    data: {
                        issue: issue
                    },
                    dataType: 'json'
                })
                .done(function(res) {
                    // 多模块数据共享
                    self.setOpenCode(res.data);
                    resolve.call(self, res);
                })
                .fail(function(err) {
                    reject.call(err);
                });
        });
    }

    /**
     * 
     * 获取销售状态
     * @param {string} issue [当前的期号]
     * @memberof Interface
     */
    getState(issue) {
        let self = this;

        return new Promise((resolve, reject) => {
            $.ajax({
                    url: '/get/state',
                    data: {
                        issue: issue
                    },
                    dataType: 'json'
                })
                .done(function(res) {
                    // 因为state会涉及到期号的自动更新，不是简单的数据保存，所以交给下一步去处理
                    resolve.call(self, res);
                })
                .fail(function(err) {
                    reject.call(err);
                });
        });
    }
}

export default Interface;