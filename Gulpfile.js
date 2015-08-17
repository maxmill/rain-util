var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', function () {
    gulp.run('transpile');
});

gulp.task('transpile', function () {
    return gulp.src(['./lib/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('bin/'));
});