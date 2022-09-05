const { src, dest, watch, series, parallel } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const plumber = require("gulp-plumber");
const cssImport = require("gulp-cssimport");
const mincss = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
  });
}

function images() {
  return src(["app/png"])
    .pipe(imagemin())
    .pipe(webp())
    .pipe(dest("app/images/webp"))
    .pipe(browserSync.stream());
}

function png() {
  return src(["app/png"])
    .pipe(imagemin())
    .pipe(dest("app/images/png"))
    .pipe(browserSync.stream());
}

function styles() {
  return src("app/scss/**/*.scss")
    .pipe(scss())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      mincss({
        compatibility: "ie8",
        level: {
          1: {
            specialComments: 0,
            removeEmpty: true,
            removeWhitespace: true,
          },
          2: {
            mergeMedia: true,
            removeEmpty: true,
            removeDuplicateFontRules: true,
            removeDuplicateMediaBlocks: true,
            removeDuplicateRules: true,
            removeUnusedAtRules: false,
          },
        },
      })
    )

    .pipe(rename({ suffix: ".min" }))
    .pipe(cssImport())
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function scripts() {
  return src([
    "app/js/main.js",
    "app/js/methods.js",
    "app/js/direction.js",
    "app/js/direction_program.js",
    "app/js/about.js",
  ])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

function watching() {
  watch(["app/scss/**/*.scss"], styles);
  watch(["app/js/**/*.js", "!app/js/**/*.min.js"]).on("change", scripts);
  watch(["app/*.html"]).on("change", browserSync.reload);
  watch(["app/png"]).on("change", images, png);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.script = scripts;

exports.images = images;

exports.default = parallel(browsersync, watching, styles, scripts, images, png);
