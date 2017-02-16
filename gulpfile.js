const gulp = require("gulp");
const del = require("del");
const fs = require("fs");
const typescript = require("gulp-typescript");

const paths = {
  dist: 'static/app',
  distFiles: 'static/app/**/*',
  srcFiles: 'src/ui/**/*',
  srcTsFiles: 'src/ui/**/*.ts',
}

gulp.task('clean', function () {
  return del(paths.distFiles);
});

gulp.task('compile', ['clean'], function () {
  const tscConfig = JSON.parse(fs.readFileSync('./tsconfig.json', 'UTF8'));
  return gulp
    .src(tscConfig.files)
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('prepare', ['clean', 'compile']);
gulp.task('default', ['prepare']);
