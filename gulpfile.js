const gulp = require("gulp");
const prefix = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const clean_css = require("gulp-clean-css");
const concat = require("gulp-concat");
const livereload = require("gulp-livereload");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const del = require("del");
const htmlmin = require("gulp-htmlmin");

// Image compression
const imagemin = require("gulp-imagemin");
const imgPngQuant = require("imagemin-pngquant");
const imgJpgRecompress = require("imagemin-jpeg-recompress");

// Zmienne lokalne
const SCRIPT_PATH = "src/js/*.js";
const SCSS_PATH = "src/scss/*.scss";
const DEST_PATH = "build/";
const HTML_PATH = "src/*.html";
const IMAGES_PATH = "src/images/**/*.{png,jpeg,jpg,svg,gif}";

const handleError = err => {
  console.log(err);
};

function images(done) {
  gulp
    .src(IMAGES_PATH)
    .pipe(
      imagemin([
        imagemin.gifsicle(),
        imagemin.jpegtran(),
        imagemin.optipng(),
        imagemin.svgo(),
        imgPngQuant(),
        imgJpgRecompress()
      ])
    )
    .pipe(gulp.dest(DEST_PATH + "/images"));
  done();
}

function scripts(done) {
  gulp
    .src(SCRIPT_PATH)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/preset-env"]
      })
    )
    .pipe(uglify())
    .pipe(concat("index.js"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DEST_PATH))
    .pipe(livereload());

  done();
}

function style(done) {
  gulp
    .src(SCSS_PATH)
    .pipe(plumber())
    .on("error", handleError)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "compressed"
      })
    )
    .pipe(prefix())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DEST_PATH))
    .pipe(livereload());
  done();
}

function dom(done) {
  gulp
    .src(HTML_PATH)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(DEST_PATH))
    .pipe(livereload());
  done();
}

function clean(done) {
  del.sync([DEST_PATH + "/*.{css,js}"]);
  done();
}

function watch() {
  gulp.watch(SCRIPT_PATH, scripts);
  gulp.watch(SCSS_PATH, style);
  gulp.watch(HTML_PATH, dom);
}

gulp.task("images", images);
gulp.task("scripts", scripts);
gulp.task("style", style);
gulp.task("dom", dom);
gulp.task("clean", clean);
gulp.task("watch", watch);

// gulp.task("default", gulp.series(a, b)); // wykonuje się jeden za drugim
// gulp.task("default", gulp.parallel(a, b)); // wykonuję wszystko na raz w tym samym czasie

gulp.task(
  "default",
  gulp.series(clean, gulp.parallel(dom, images, scripts, style))
);
