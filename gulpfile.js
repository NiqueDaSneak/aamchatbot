'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const gutil = require('gulp-util')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const html2pug = require('gulp-html2pug')


gulp.task('sass', function(){
  return gulp.src('./public/stylesheets/sass/index.sass')
        .pipe(sass({style: 'compressed'}))
        .pipe(postcss([ autoprefixer() ]))
        .on('error', gutil.log)
        .pipe(gulp.dest('./public/stylesheets/css'))
})

gulp.task('pug', function() {
  return gulp.src('views/index.html')
  .pipe(html2pug())
  .pipe(gulp.dest('views'));
});

gulp.task('watch', function(){
  gulp.watch('views/*.html', ['pug'])
  gulp.watch('public/stylesheets/sass/*.sass', ['sass'])
})

gulp.task('default', ['watch', 'sass', 'pug'])
