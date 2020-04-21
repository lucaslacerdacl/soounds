'use strict';

const gulp = require('gulp');
const shell = require('gulp-shell');
const del = require('del');
const vinylPaths = require('vinyl-paths');

gulp.task('clean', () => {
  return gulp.src('./build', { read: false, allowEmpty: true })
    .pipe(vinylPaths(del));
});

gulp.task('compile', shell.task([
  'yarn compile',
]));

gulp.task('configs', () => {
  return gulp.src("src/config/config.json")
    .pipe(gulp.dest('./build/config'));
});

gulp.task('sounds', () => {
  return gulp.src("src/sounds/*.mp3")
    .pipe(gulp.dest('./build/sounds'));
});

gulp.task('images', () => {
  return gulp.src("src/images/*")
    .pipe(gulp.dest('./build/images'));
});


/**
 * Build the project.
 */
gulp.task('build', gulp.series('clean', 'compile', 'configs', 'sounds', 'images'));

gulp.task('default', gulp.series('build', () => { }));