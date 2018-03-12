import gulp from 'gulp';
import gulpSequence from 'gulp-sequence'; // 处理任务之间的关联关系和先后顺序

// 注意serve一定要放在最后面执行
gulp.task('build', gulpSequence('clean', 'css', 'pages', 'scripts', ['browser', 'serve']));