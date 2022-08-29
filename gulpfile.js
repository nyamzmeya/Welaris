const { src, dest, watch, series, parallel } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const del = require("del");
const cssImport = require("gulp-cssimport");

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
  });
}

function cleanDist() {
  del("dist");
}

function images() {
  return src("app/images/**/*")
    // .pipe(
    //   imagemin()
    // )
    .pipe(dest("dist/images"));
}

function styles() {
  return src("app/scss/**/*.scss")
    .pipe(scss())
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(cssImport())
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function watching() {
  watch(["app/scss/**/*.scss"], styles);
  watch(["app/js/**/*.js"]).on("change", browserSync.reload);
  watch(["app/*.html"]).on("change", browserSync.reload);
}



exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;


exports.images = images;
exports.cleanDist = cleanDist;

exports.default = parallel(styles, browsersync, watching);
