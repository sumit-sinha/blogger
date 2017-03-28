const gulp = require("gulp"),
      del = require("del"),
      fs = require("fs"),
      typescript = require("gulp-typescript"),
      sass = require('gulp-sass'),
      pump = require('pump'),
      uglify = require('gulp-uglify'),
      path = require('path'),
      nodemon = require('gulp-nodemon'),
      paths = {
        dist: 'dist/app',
        distLibs: 'dist/scripts',
        distFiles: 'dist/**/*',
        distJSLibs: 'dist/scripts/**/*.js',
        distJSFiles: 'dist/app/**/*.js',
        srcFiles: 'src/ui/**/*',
        srcTsFiles: 'src/ui/**/*.ts',
        srcSassFiles: 'src/ui/**/*.scss'
      };

/**
 * function to get destination folder for a file
 * @param folder {String} path to destination folder
 * @return {String}
 */
var getDestinationFolder = function(folder) {
  return path.join(__dirname + "/" + folder);
};

gulp.task('clean', function () {
  return del(paths.distFiles);
});

gulp.task('copy:static:scripts', ['clean'], function() {
  return gulp.src([
      'static/scripts/**/*.js',
      'static/scripts/**/*.css'
    ])
    .pipe(gulp.dest(function(file) {
      return getDestinationFolder('dist/scripts');
    }));
});

gulp.task('copy:static:images', ['clean'], function() {
  return gulp.src([
      'static/images/**/*.png',
      'static/images/**/*.jpg',
      'static/images/**/*.jpeg',
      'static/images/**/*.gif',
    ])
    .pipe(gulp.dest(function(file) {
      return getDestinationFolder('dist/images');
    }));
});

gulp.task('copy:static:fonts', ['clean'], function() {
  return gulp.src([
      'static/fonts/**/*.eot',
      'static/fonts/**/*.svg',
      'static/fonts/**/*.ttf',
      'static/fonts/**/*.woff',
      'static/fonts/**/*.woff2',
    ])
    .pipe(gulp.dest(function(file) {
      return getDestinationFolder('dist/fonts');
    }));
});

gulp.task('copy:static:css', ['clean'], function() {
  return gulp.src([
      'static/styles/**/*'
    ])
    .pipe(gulp.dest(function(file) {
      return getDestinationFolder('dist/styles');
    }));
});

gulp.task('copy:libs', ['clean'], function() {
  return gulp.src([
      'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
      'node_modules/@angular/core/bundles/core.umd.js',
      'node_modules/@angular/router/bundles/router.umd.js',
      'node_modules/@angular/compiler/bundles/compiler.umd.js',
      'node_modules/@angular/common/bundles/common.umd.js',
      'node_modules/@angular/http/bundles/http.umd.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/zone.js/dist/zone.min.js',
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/rxjs/util/*.js',
      'node_modules/rxjs/symbol/*.js',
      'node_modules/rxjs/operator/*.js',
      'node_modules/rxjs/observable/*.js',
      'node_modules/rxjs/add/operator/map.js',
      'node_modules/rxjs/add/operator/catch.js',
      'node_modules/rxjs/add/observable/throw.js',
      'node_modules/rxjs/*.js'
    ])
    .pipe(gulp.dest(function(file) {
      var separator = "/";
      if (file.path.indexOf(separator) === -1) {
        separator = "\\";
      }

      var destinationFile = file.path.replace("node_modules", paths.dist + separator + "node_modules"),
          destinationFolder = destinationFile.substring(0, destinationFile.lastIndexOf(separator));

      return destinationFolder;
    }));
});

gulp.task('sass:components', ['clean'], function () {
  return gulp.src(paths.srcSassFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(function(file) {
      return paths.dist;
    }));
});

gulp.task('compile', ['clean'], function () {
  const tscConfig = JSON.parse(fs.readFileSync('./tsconfig.json', 'UTF8'));
  return gulp
    .src(tscConfig.files)
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('compress:libs', ['prepare'], function(cb) {
  pump([gulp.src(paths.distJSLibs), uglify(), gulp.dest(paths.distLibs)], cb);
});

gulp.task('compress:source', ['prepare'], function(cb) {
  pump([gulp.src(paths.distJSFiles), uglify(), gulp.dest(paths.dist)], cb);
});

gulp.task('watch', ['compress'], function() {
  gulp.watch(paths.srcFiles, ['compress']);
});

gulp.task('nodemon', function() {
  nodemon({
    script: 'src/server/app.js',
    ext: 'js',
    env: {
      'NODE_ENV': 'development'
    }
  })
  .on('start', ['watch'])
  .on('change', ['watch'])
  .on('restart', function () {
    console.log('server restarted!!!');
  });
});

gulp.task('copy', ['copy:libs', 'copy:static:scripts', 'copy:static:fonts', 'copy:static:css', 'copy:static:images']);
gulp.task('prepare', ['clean', 'compile', 'copy', 'sass:components']);
gulp.task('compress', ['compress:libs', 'compress:source']);
gulp.task('default', ['compress']);
