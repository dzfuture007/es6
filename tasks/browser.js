import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import args from './util/args';

gulp.task('browser', (cb) => {
  if (!args.watch) return cb();

  // 当app中的js文件，ejs文件和cssw文件发生变化的时候要启动scripts任务
  gulp.watch('app/**/*.js', ['scripts']);
  gulp.watch('app/**/*.ejs', ['pages']);
  gulp.watch('app/**/*.css', ['css']);

  // app中的文件修改完都会在server中生成对应的文件
  // 为了安全起见，在重新生成拷贝的时候要把原目录清空
})