'use strict';
var gulp = require('gulp');

var siteRoot = "httpdocs";
var cssDir = siteRoot + "/css/dist"
var jsDir = siteRoot + "/js/dist"

var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var rename = require("gulp-rename");

var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');

gulp.task('sass', function () {
	return gulp.src(siteRoot + '/css/src/**/*.scss') // Gets all files ending with .scss and child dirs
		.pipe(sourcemaps.init()) // initialise sourcemaps before we process the sass files	
		.pipe(sass().on('error', sass.logError)) // compile sass
		.pipe(autoprefixer()) // run autoprefixer (autoprefixer takes its rules from the "browserslist" entry in the package file)
		.pipe(sourcemaps.write('.')) // now make the sourcemaps and write them to same location as below
		.pipe(gulp.dest(cssDir)) // write all css files here
});

gulp.task('minify-css', function () {
	return gulp.src([siteRoot + '/css/dist/*.css', '!' + siteRoot + '/css/dist/*.min.css']) // ignore already minified files
		.pipe(cleancss({ debug: true }, (details) => {
			console.log(`${details.name} original: ${details.stats.originalSize} bytes`);
			console.log(`${details.name} minified: ${details.stats.minifiedSize} bytes`);
		}))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(cssDir));
});

// this is expecting only 1 file
gulp.task('js', function () {
	return (browserify(siteRoot + '/js/src/main.js') // first allow includes/require
		.transform("babelify", { presets: ["@babel/preset-env"] }) // then use babelify with a browserify transform to transpile to ES5 with preset environment defined
		.bundle()) // combines all files and dependencies into a single file
		.pipe(source('main.js')) // now it's all bundled, convert readable/(text) stream to vinyl stream gulp is expecting, this needs to be named again as the stream from browserify has no name
		.pipe(streamify(uglify())) // use streamify to allow uglify to support streams
		.pipe(gulp.dest(jsDir))
});

// watch task
gulp.task('watch', function () {
	gulp.watch(siteRoot + '/css/src/**/*.scss', { ignoreInitial: false }, gulp.series(['sass']));
	gulp.watch(siteRoot + '/js/src/**/*.js', { ignoreInitial: false }, gulp.series(['js']));
});

gulp.task('buildcss', gulp.series(['sass', 'minify-css']));