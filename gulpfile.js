/*
 * gulpfile.js
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
/*var autoprefixer = require('autoprefixer');*/

gulp.task('nodemon', function(cb){
    var started = false;
    return nodemon({
        script: 'server.js'
    }).on('start', function() {
        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task('browserSync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: 'http://localhost:3000',
        files: ['public/**/*.*'],
        brower: 'google chrome',
        port: 5000,
    });
});

gulp.task('sass', function(){
    return gulp
        .src('public/scss/main.scss')
        .pipe(sass())
       /* .pipe(postcss([autoprefixer({browsers: ['last 2 version']})]))*/
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('watch', function(){
    gulp.watch('./data.json').on('change', browserSync.reload);
    gulp.watch('public/scss/**/*.scss',['sass']);
    gulp.watch('routes/*.*').on('change', browserSync.reload);
    gulp.watch('views/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'watch', 'browserSync']);
