/*
 * gulpfile.js
 */

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('task-name', function() {

});

gulp.task('sass', function(){
    return gulp.src('public/scss/styles.scss')
        .pipe(sass())
	.pipe(gulp.dest('public/css'))
});
