const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

//compile sass to css
function style() {
  //1. Find sass file
  return gulp.src('./sass/**/*.sass')
  //2. Pass that sass to compiler
  .pipe(sass())
  //3. Where to save compiled css
  .pipe(gulp.dest('./css'))
  //4. String change to all browser
  .pipe(browserSync.stream());
}

function watch(){
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
  gulp.watch('./sass/**/*.sass', style);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
  gulp.watch('.js/**/*.js').on('change', browserSync.reload);

}

exports.style = style;
exports.watch = watch;
