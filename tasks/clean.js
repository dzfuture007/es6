// app中的文件修改完都会在server中生成对应的文件
// 为了安全起见，在重新生成拷贝的时候要把原目录清空
// 所以需要清空命令
import gulp from 'gulp';
import del from 'del';
import args from './util/args';

gulp.task('clean', () => {
  return del(['server/public', 'server/views']);
})

