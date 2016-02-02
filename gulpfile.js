var gulp = require('gulp');
var tsc = require('gulp-typescript');
var tslint = require('gulp-tslint');
var sourcemaps = require('gulp-sourcemaps');
var config = require('./gulp.config')();
var tsProject = tsc.createProject('tsconfig.json');

gulp.task('ts-lint', function (){
  
  return gulp.src(config.allTs)
    .pipe(tslint())
    .pipe(tslint.report('prose',{
        emitError: false
    }))   
});

gulp.task('compile-ts', function () {
    var sourceTsFiles = [
        config.allTs,
        config.typings
    ];

    var tsResult = gulp.src(sourceTsFiles)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(tsc(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(config.tsOutputPath));

});