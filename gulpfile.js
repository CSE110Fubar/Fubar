var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    nodemon = require('gulp-nodemon');

const paths = {
  src: [
    'src/server/**/*.js',
    'src/assets/js/**/*.js',
    'src/assets/scss/**/*.scss'
  ]
};

gulp.task('css', function () {
  console.log('Generating css');
  return gulp.src('src/assets/scss/fubar.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer('last 4 version'))
  .pipe(gulp.dest('src/assets/public/css'))
  .pipe(cssnano())
  .pipe(rename({ suffix: '.min' }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('src/assets/public/css'))
  .pipe(browserSync.reload({stream:true}));
});

gulp.task('js',function(){
  gulp.src('src/assets/js/scripts.js')
    .pipe(sourcemaps.init())
    .pipe(gulp.dest('src/assets/public/js'))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/assets/public/js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('nodemon', ['css', 'js'], function(cb) {
  return nodemon({
    script: 'src/server/index.js',
    ext: 'js html scss css',
    watch: paths.src,
    legacyWatch: true,    
    env: {
      'NODE_ENV': 'development',
      'PORT': 3000
    }
  })
  .once('start', function() {
    cb();
  })
  .on('restart', function() {
    gulp.start('css', 'js');
  });
});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    port: 8000,
    proxy: {
      target: 'localhost:3000'
    },
    open: false
  });
});
gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['css', 'js', 'browser-sync'], function () {
  gulp.watch("src/scss/**/*.scss", ['css']);
  gulp.watch("src/js/*.js", ['js']);
  gulp.watch("app/*.html", ['bs-reload']);
});