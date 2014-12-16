/*******************************************************************************
0. DEPENDENCIES
*******************************************************************************/

var gulp = require('gulp'), // gulp core
	imagemin = require('gulp-imagemin'), // imagemin
	concat = require('gulp-concat'), // concatinate js
	uglify = require('gulp-uglify'), // uglifies the js
    sass = require('gulp-sass'),
    compass = require('gulp-compass'),
    minifyCSS = require('gulp-minify-css'),
    mainBowerFiles = require('main-bower-files'),
	prettify = require('gulp-prettify'), // prettify spaces and tabs
	spritesmith = require('gulp.spritesmith'); //


var paths = {  
    'dev': {
        'less': './public/dev/less',
        'scss': './public/dev/scss',
        'js': './public/dev/js',
        'img': './public/dev/img',
        'vendor': './public/dev/vendor'
    },
    'assets': {
        'css': './public/assets/css',
        'js': './public/assets/js',
        'img': './public/assets/img',
        'vendor': './public/assets/bower_vendor'
    }

};

gulp.task('compass', function() {
    gulp.src(paths.dev.scss + '/*.scss')
        .on('error', console.log) // Если есть ошибки, выводим и продолжаем)
        .pipe(compass({
            css: paths.assets.css,
            sass: paths.dev.scss,
            image: paths.assets.img
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest(paths.assets.css + '/')); 
});

/*******************************************************************************
 3. JS TASKS
 *******************************************************************************/
// minify & concatinate js
gulp.task('js-concat', function() {
    gulp.src([paths.dev.js + '/**/*.js', '!' + paths.dev.js + '/libs/**/*.js'])
        .pipe(uglify()) // uglify the files
        .pipe(concat('main.min.js')) // Собираем все JS, кроме тех которые находятся в ./assets/js/libs/**
        .pipe(gulp.dest(paths.assets.js));
});

/*******************************************************************************
 4. IMAGES TASKS
 *******************************************************************************/
gulp.task('sprite', function() {
	var spriteData = gulp.src(paths.assets.img + '/sprite/*.png').pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: 'sprite.css',
		padding: 10,
		cssOpts: {
			cssClass: function(item) {
				return '.sp-' + item.name;
			}
		}
	}));
	spriteData.img.pipe(gulp.dest(paths.assets.img + "/"));
	spriteData.css.pipe(gulp.dest(paths.assets.css + "/"));

	var spriteDataStyl = gulp.src(paths.assets.img + '/sprite/*.png').pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: 'sprite.scss',
		padding: 10,
		cssOpts: {
			cssClass: function(item) {
				return '.sp-' + item.name;
			}
		}
	}));
	spriteData.img.pipe(gulp.dest(paths.assets.css + "/"));
	spriteDataStyl.css.pipe(gulp.dest(paths.dev.scss + "/"));
});

// optimize images and paste them into build images folder
gulp.task('imagemin', function() {
	return gulp.src(paths.dev.img + "/**/*") // get the images
		.pipe(imagemin({
			progress: true,
			progressive: true,
			interlaced: true,
			optimizationLevel: 4
		}))
		.pipe(gulp.dest(paths.assets.img + "/"));
});

gulp.task('libs', function() {

    var jsFilter = gulpFilter('*.js');
    var cssFilter = gulpFilter('*.css');
    var scssFilter = gulpFilter('*.scss');
    var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);

    return gulp.src(mainBowerFiles())

        // grab vendor js files from bower_components, minify and push in /public
        .pipe(jsFilter)
        .pipe(gulp.dest(dest_path + '/js/vendor'))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(dest_path + '/js/vendor'))
        .pipe(jsFilter.restore())

        // grab vendor css files from bower_components, minify and push in /public
        .pipe(cssFilter)
        .pipe(gulp.dest(dest_path + '/css'))
        .pipe(minifycss())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(dest_path + '/css'))
        .pipe(cssFilter.restore())

        .pipe(scssFilter)
        .pipe(gulp.dest(dest_path + '/scss'))
        .pipe(scssFilter.restore())
        .pipe(minifycss())

        // grab vendor font files from bower_components and push in /public
        .pipe(fontFilter)
        .pipe(flatten())
        .pipe(gulp.dest(dest_path + '/fonts'))
});

gulp.task('watch', function() {  
  gulp.watch(paths.dev.scss + '/', ['compass']);
  gulp.watch(paths.dev.js + '/', ['js-concat']);
  gulp.watch(paths.dev.img + '/**/*', ['imagemin']);
});

gulp.task('default', ['compass', 'js-concat', 'watch']);
