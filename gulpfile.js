const gulp = require('gulp'),
      fs = require('fs'),
      path = require('path'),
      del = require('del'),
      uglify = require('gulp-uglify'),
      pump = require('pump'),
      cleanCSS = require('gulp-clean-css'),
      paths = { dist: 'dist' };

/**
 * function to get separator based on OS format
 * @param file {String} path to current file
 * @return {String}
 */
var getSeparator = function(file) {
  var separator = '/';
  if (file.path.indexOf(separator) === -1) {
    separator = '\\';
  }

  return separator;
};

/**
 * function to get destination folder for a file
 * @param folder {String} path to destination folder
 * @return {String}
 */
var getDestinationFolder = function(folder) {
  return path.join(__dirname + '/' + folder);
};

gulp.task('copy:static:scripts', function() {
  return gulp.src([
      'static/scripts/**/*.js',
      'static/scripts/**/*.css'
    ])
    .pipe(gulp.dest(function(file) {
      return getDestinationFolder(paths.dist + '/scripts');
    }));
});

gulp.task('copy:static:images', function() {
  return gulp.src([
      'static/images/**/*.png',
      'static/images/**/*.jpg',
      'static/images/**/*.jpeg',
      'static/images/**/*.gif',
    ])
    .pipe(gulp.dest(function(file) {
      return getDestinationFolder(paths.dist + '/images');
    }));
});

gulp.task('copy:static:fonts', function() {
  return gulp.src([
      'static/fonts/**/*.eot',
      'static/fonts/**/*.svg',
      'static/fonts/**/*.ttf',
      'static/fonts/**/*.woff',
      'static/fonts/**/*.woff2',
    ])
    .pipe(gulp.dest(function(file) {
      return getDestinationFolder(paths.dist + '/fonts');
    }));
});

gulp.task('copy:static:css', function() {
  return gulp.src([
      'static/styles/**/*'
    ])
    .pipe(gulp.dest(function(file) {
      return getDestinationFolder(paths.dist + '/styles');
    }));
});

gulp.task('update:index', function() {
  fs.readFile(paths.dist + '/index.html', "utf-8", function(err, _data) {

    let pugFile = 'views/index.pug';
    let scripts = _data.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gm);

    del([paths.dist + '/index.html']);
    fs.readFile(pugFile, "utf-8", function(err, _data) {

      _data = _data.substring(0, _data.indexOf('<!-- injected content -->') + 25);
      for (let i = 0; i < scripts.length; i++) {
        _data += '\r\n		' + scripts[i].replace('src="', 'src="/');
      }

      fs.writeFile(pugFile, _data, function(err) {
        if(err) {
          return console.log(err);
        }
      });
    });
  });
});

gulp.task('compressjs', ['copy:static:scripts'], function (cb) {
  pump([
    gulp.src(paths.dist + '/scripts/**/*.js'),
    uglify(),
    gulp.dest(function (file) {
        return file.base;
    })
  ],cb );
});

gulp.task('compresscss', ['copy:static:css'], function () {
  return gulp.src(paths.dist + '/styles/**/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(function (file) {
        return file.base;
    }));
});

gulp.task('copy', ['copy:static:scripts', 'copy:static:fonts', 'copy:static:css', 'copy:static:images']);
gulp.task('default', ['copy', 'update:index', 'compressjs', 'compresscss']);
