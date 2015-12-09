var gulp = require('gulp'),
  prefix = require('gulp-autoprefixer'),
  babel = require('gulp-babel'),
  connect = require('gulp-connect'),
  jade = require('gulp-jade'),
  sass = require('gulp-sass'),
  svgmin = require('gulp-svgmin');


var config = {
  src: 'src',
  build: 'build'
}

gulp.task('watch', function() {
  gulp.watch(['./' + config.src + '/*'],['jade']);
  gulp.watch(['./' + config.src + '/style/*.s?(a|c)ss'],['sass']);
  gulp.watch(['./' + config.src + '/script/*.js'],['babel']);
  gulp.watch(['./' + config.src + '/imgs/!(*.svg)'],['imgs']);
  gulp.watch(['./' + config.src + '/imgs/*.svg'],['svg']);
});


gulp.task('babel', function(){
  gulp.src(config.src + '/script/*.js')
    .pipe(babel())
    .pipe(gulp.dest(config.build + '/script/'))
    .pipe(connect.reload());
});

gulp.task('imgs', function(){
  gulp.src(config.src + '/imgs/!(*.svg)')
    .pipe(gulp.dest(config.build + '/imgs/'))
    .pipe(connect.reload());
})

gulp.task('svg', function(){
  gulp.src(config.src + '/imgs/*.svg')
    .pipe(svgmin({
      removeComments: true,
      cleanupNumbericValues: {
        floatPrecision: 1
      },
      convertColors: {
        names2hex: true,
        rgb2hex: true
      }
    }))
    .pipe(gulp.dest(config.build + '/imgs/'))
    .pipe(connect.reload());
})

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
    .pipe(jade({
      pretty: true
    }))
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
