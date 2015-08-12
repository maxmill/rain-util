var gulp = require('gulp');
var esnext = require('gulp-esnext');

gulp.task('default', function () {
    gulp.run('transpile');
});

gulp.task('transpile', function () {
    return gulp.src(['./lib/*.js'])
        .pipe(esnext())
        .pipe(gulp.dest('bin/'));
});