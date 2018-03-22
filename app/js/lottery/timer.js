class Timer {
    /*
     * end：截止时间，来自服务器。
     * update：时间更新的回调
     * handle: 倒计时结束之后的回调
     */
    countdown(end, update, handle) {
        const now = new Date().getTime();
        const self = this;

        // 倒计时结束了执行倒计时结束后的操作
        if (now - end > 0) {
            handle.call(self);
        } else {
            //  剩余时间，单位为毫秒
            let last_time = end - now;
            //每天是多少毫秒
            const px_d = 24 * 60 * 60 * 1000;
            // 每小时是多少毫秒
            const px_h = 60 * 60 * 1000;
            // 每分钟是多少毫秒
            const px_m = 60 * 1000;
            // 每秒是多少毫秒
            const px_s = 1000;

            // 剩余多少天
            let d = Math.floor(last_time / px_d);
            // 剩余多少小时
            let h = Math.floor((last_time - d * px_d) / px_h);
            // 剩余多少分钟
            let m = Math.floor((last_time - d * px_d - h * px_h) / px_m);
            // 剩余多少秒
            let s = Math.floor((last_time - d * px_d - h * px_h - m * px_m) / px_s);

            let arr = [];

            if (d > 0) {
                arr.push(`<em>${d}</em>天`);
            }

            if (arr.length || (h > 0)) {
                arr.push(`<em>${h}</em>时`);
            }

            if (arr.length || m > 0) {
                arr.push(`<em>${m}</em>分`);
            }

            if (arr.length || s > 0) {
                arr.push(`<em>${s}</em>秒`);
            }

            self.last_time = arr.join('');

            update.call(self, self.last_time);

            // 继续轮询倒计时
            setTimeout(function() {
                self.countdown(end, update, handle);
            }, 1000);
        }
    }
}

export default Timer;