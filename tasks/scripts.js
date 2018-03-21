import gulp from 'gulp';
import gulpif from 'gulp-if'; // 在gulp语句中做if判断
import concat from 'gulp-concat'; // 在gulp中处理文件拼接
import webpack from 'webpack'; // 打包
import gulpWebpack from 'webpack-stream'; // gulp处理的是文件流，是stream
import named from 'vinyl-named'; // 对文件重命名做标志的
import livereload from 'gulp-livereload'; // 热更新：文件修改以后自动刷新
import plumber from 'gulp-plumber'; // 用来处理文件信息流
import rename from 'gulp-rename'; // 文件重命名
import uglify from 'gulp-uglify'; // 文件压缩
import {
    log,
    colors
} from 'gulp-util'; // 在命令行工具输出的包
import args from './util/args'; // 自己编写的对命令行参数进行解析的

gulp.task('scripts', () => {
    return gulp.src(['app/js/index.js']) // 打开该文件
        .pipe(plumber({
            // 处理常规的错误逻辑，改变默认处理错误的机制
            // 因为按照gulp规定的错误处理每一个pipe的时候都要抛出异常
            // 处理脚本文件要经过很长的流程，为了避免在某一个环节出错抛出异常，所以要集中处理错误
            errorHandle: function () {

            }
        }))
        .pipe(named())
        // 对文件编译
        .pipe(gulpWebpack({
            module: {
                loaders: [{
                    test: /\.js$/,
                    loader: 'babel-loader'
                }]
            }
        }), null, (err, stats) => {
            // 处理错误
            log(`Finished '${colors.cyan('scripts')}'`, stats.toString({
                chunks: false
            }))
        })
        // 编译完之后文件的存储位置
        // 因为server中要拿到最新的js才能跑起来
        .pipe(gulp.dest('server/public/js'))
        // 重新复制一份刚才编译好的文件并重命名
        .pipe(rename({
            basename: 'cp',
            extname: 'min.js'
        }))
        // 压缩文件
        .pipe(uglify({
            compress: {
                properties: false
            },
            output: {
                'quote_keys': true
            }
        }))
        // 存储压缩好的文件
        .pipe(gulp.dest('server/public/js'))
        // 监听文件，当文件变化的时候自动刷新页面
        // 判断命令行中是否有watch这个参数如果有的话就执行热更新
        .pipe(gulpif(args.watch, livereload()));
})