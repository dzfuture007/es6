import gulp from 'gulp';
import gulpif from 'gulp-if';
import liveserver from 'gulp-live-server';
import args from './util/args';

gulp.task('serve', (cb) => {
  if (!args.watch) return cb();

  var server = liveserver.new(['--harmony', 'server/bin/www']);
  server.start();

  // 监听server目录下面的js和ejs文件发生改变的时候浏览器自动刷新
  gulp.watch(['server/public/**/*.js', 'server/views/**/*.ejs'], function(file) {
    server.notify.apply(server, [file]);
  })

  // 监听需要重启服务的文件
  gulp.watch(['server/routes/**/*.js', 'server/app.js'], function() {
    server.start.bind(server)();
  })
})