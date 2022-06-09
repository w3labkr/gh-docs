const gulp = require('gulp');
const { src, dest, watch, series, parallel } = require('gulp');

const del = require('del');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const header = require('gulp-header');
const sourcemaps = require('gulp-sourcemaps');
const mergeStream = require('merge-stream');

const fileinclude = require('gulp-file-include');
const beautify = require('gulp-jsbeautifier');
const imagemin = require('gulp-imagemin');

const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const pkg = require('./package.json');
const banner = [
  '/**',
  ' * Copyright (c) <%= new Date().getFullYear() %> <%= pkg.author %>',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  '',
].join('\n');

function clean() {
  return del(['dist/', 'docs/']);
}

function htmlTranspile() {
  return src(['src/index.html', 'src/templates/**/*.html'])
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(beautify())
    .pipe(dest('docs'));
}

function imageTranspile() {
  return src(['src/assets/images/**/*']).pipe(imagemin()).pipe(dest('docs/assets/images'));
}

function cssTranspile() {
  return src('src/assets/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('gh-docs.css'))
    .pipe(postcss([autoprefixer()]))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('docs/assets/css'));
}

function cssMinify() {
  return src('src/assets/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('gh-docs.css'))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('docs/assets/css'));
}

function jsTranspile() {
  return src('src/assets/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('gh-docs.js'))
    .pipe(babel())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('docs/assets/js'));
}

function jsMinify() {
  return src('src/assets/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('gh-docs.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('docs/assets/js'));
}

function publish() {
  return mergeStream(
    src(['src/data/**/*']).pipe(dest('docs/data')),
    src(['docs/assets/css/**/*', 'docs/assets/js/**/*']).pipe(dest('dist'))
  );
}

exports.watch = function () {
  watch('src/**/*.html', htmlTranspile);
  watch('src/assets/images/**/*', imageTranspile);
  watch('src/assets/sass/**/*.scss', cssMinify);
  watch('src/assets/js/**/*.js', jsMinify);
};

exports.build = series(
  clean,
  parallel(htmlTranspile, imageTranspile, cssTranspile, cssMinify, jsTranspile, jsMinify),
  publish
);
