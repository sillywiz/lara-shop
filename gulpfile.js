var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    mainBowerFiles = require('main-bower-files'),
    del = require('del'),
    ngClassify = require('gulp-ng-classify'),
    gulpFilter = require('gulp-filter'),
    flatten = require('flatten'),
    coffee = require('gulp-coffee'),
    gutil = require('gulp-util'),
    compass = require('gulp-compass');


var paths = {
  'src': 'public/src',
  'bowerDir': 'bower_vendor',
  'assets': 'public/assets'
};

gulp.task('compass', function() {
  gulp.src(paths.src + '/scss/*.scss')
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(compass({
        css: paths.assets + '/css',
        sass: paths.src + '/scss',
        import_path: [
        paths.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
        paths.bowerDir + '/fontawesome/scss'
        ]
        }))
    .on('error', console.log) // Если есть ошибки, выводим и продолжаем)
    .pipe(gulp.dest(paths.assets + '/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest(paths.assets + '/css'))
    .on('error', function (err) { console.log(err.message); });
});

gulp.task('angular-coffee', function () {
    return gulp.src(paths.src + '/coffee/ang/**/*.coffee')
    .pipe(ngClassify())
    .on('error', function (err) { console.log(err.message); })
    .pipe(gulp.dest(paths.src + '/coffee/serv'))
    .pipe(notify({ message: 'Angular scripts task complete' }));
});

gulp.task('coffee', ['angular-coffee'], function() {
  gulp.src([paths.src + '/coffee/**/*.coffee', '!' + paths.src + '/coffee/ang/*.coffee'])
    .pipe(coffee({bare: true}))
    .on('error', function (err) { console.log(err.message); })
    .pipe(gulp.dest(paths.src + '/js'))
    .pipe(notify({ message: 'Coffee task complete' }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.assets + '/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.assets + '/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});
 
// Scripts
gulp.task('scripts', ['angular-coffee', 'coffee'], function() {
  return gulp.src(paths.src + '/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.assets + '/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.assets + '/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});
 
// Images
gulp.task('images', function() {
  return gulp.src(paths.src + '/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(paths.assets + '/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('libs', function() {

    var jsFilter = gulpFilter('*.js');
    var cssFilter = gulpFilter('*.css');
    var scssFilter = gulpFilter('*.scss');
    var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);

    return gulp.src(mainBowerFiles())

      // grab vendor js files from bower_components, minify and push in /public
      .pipe(jsFilter)
      .pipe(gulp.dest(paths.assets + '/vendor/js'))
      .pipe(uglify())
      .pipe(rename({
          suffix: ".min"
      }))
      .pipe(gulp.dest(paths.assets + '/vendor/js'))
      .pipe(jsFilter.restore())

      // grab vendor font files from bower_components and push in /public
      .pipe(fontFilter)
      .pipe(gulp.dest(paths.assets + '/vendor/fonts'))
});
 
// Clean
gulp.task('clean', function(cb) {
    del([paths.assets + '/css', paths.assets + '/js', paths.assets + '/img'], cb)
});
 
// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('angular-coffee', 'coffee', 'compass', 'images');
});
 
// Watch
gulp.task('watch', function() {
 
  // Watch coffee files
  gulp.watch(paths.src + '/coffee/ang/**/*.coffee', ['angular-coffee']);
  gulp.watch([paths.src + '/coffee/**/*.coffee', '!' + paths.src + '/coffee/ang/**/*.coffee'], ['coffee']);
 
  // Watch .scss files
  gulp.watch(paths.src + '/scss/**/*.scss', ['styles']);
 
  // Watch .js files
  gulp.watch(paths.src + '/js/**/*.js', ['compass']);
 
  // Watch image files
  gulp.watch(paths.src + '/img/**/*', ['images']);
 
});