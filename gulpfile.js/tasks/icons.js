const gulp = require('gulp');
const plumber = require('gulp-plumber');
const errorHandler = require('gulp-plumber-error-handler');
const rename = require('gulp-rename');
const svgSymbols = require('gulp-svg-symbols');
const imagemin = require('gulp-imagemin');

module.exports = () => (
    gulp.src('app/static/icons/**/*.svg')
    .pipe(plumber({ errorHandler: errorHandler('Error in icons task') }))
    .pipe(svgSymbols({
      title: false,
      id: 'icon_%f',
      className: '%f',
      templates: ['default-svg'],
    }))
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          { optimizationLevel: 3 },
          { progessive: true },
          { interlaced: true },
          { removeViewBox: false },
          { removeUselessStrokeAndFill: false },
          { cleanupIDs: false },
          { cleanupAttrs: true },
          { removeMetadata: true },
          { removeTitle: true },
        ],
      }),
    ]))
    .pipe(rename('icon.svg'))
    .pipe(gulp.dest('dist/assets/images/'))
);
