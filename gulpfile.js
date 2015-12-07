var gulp = require('gulp'),
  sass = require('gulp-sass'),
  prefix = require('gulp-autoprefixer'),
  jade = require('gulp-jade'),
  connect = require('gulp-connect'),
  babel = require('gulp-babel');


var config = {
  src: 'src',
  build: 'build'
}

gulp.task('watch', function() {
  gulp.watch(['./' + config.src + '/*'],['jade']);
  gulp.watch(['./' + config.src + '/style/*.s?(a|c)ss'],['sass']);
  gulp.watch(['./' + config.src + '/script/*.js'],['babel']);
});


gulp.task('babel', function(){
  gulp.src(config.src + '/script/*.js')
    .pipe(babel())
    .pipe(gulp.dest(config.build + '/script/'))
    .pipe(connect.reload());
});


gulp.task('sass', function() {
  gulp.src(config.src + '/style/*.s?(a|c)ss')
    .pipe(sass({
      style: 'compressed'
    }))
    .pipe(prefix({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest(config.build + '/style/'))
    .pipe(connect.reload());
});


gulp.task('jade', function() {
  gulp.src(config.src + '/*.jade')
    .pipe(jade())
    .pipe(gulp.dest(config.build))
    .pipe(connect.reload());
});


gulp.task('connect', function() {
  connect.server({
    root: config.build,
    port: 9000,
    livereload: true
  });
});


gulp.task('serve', ['connect', 'watch']);
