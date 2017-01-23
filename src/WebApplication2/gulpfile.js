// Sass configuration
var gulp = require('gulp');
sass = require('gulp-sass');
gulp.task('sass', function() {    
    gulp.src('./wwwroot/sass/**/*.scss')
        //.pipe(sass({outputStyle: 'compressed'}))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./wwwroot/css'));
    });
gulp.task('default', ['sass'], function() {
    gulp.watch('./wwwroot/sass/**/*.scss', ['sass']);
});