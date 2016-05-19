var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    babel = require('gulp-babel');

// Babel
gulp.task('js', function () {
  return gulp.src("assets/main.js")
    .pipe(babel())
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest("dist"));
});

gulp.task('watch', function () {
  return gulp.watch('assets/*.js', ['js']);
});

// Serve
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        files: "./assets" 
    });

});


gulp.task('default', ['js', 'watch', 'serve']);
