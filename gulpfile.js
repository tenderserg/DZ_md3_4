var gulp = require('gulp'),
    notify = require("gulp-notify"),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    clean = require('gulp-dest-clean'),
    gulpSequence = require('gulp-sequence'),
    browserSync = require('browser-sync').create();

/* Compile SASS */
gulp.task('styles', function () {
  return gulp.src('./dev/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 4 versions']}))
    .pipe(gulp.dest('./prod/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(csso())
    .pipe(gulp.dest('./prod/css'))
    .pipe(notify({ message: 'Styles task complete' }))
    .pipe(browserSync.reload({stream: true}));
});

/* Scripts */
gulp.task('scripts', function() {
    return gulp.src(['./dev/js/*.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./prod/js/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./prod/js/'))
        .pipe(notify({ message: 'Scripts task complete' }))
        .pipe(browserSync.reload({stream: true}));
});

/* Commpress Image */
gulp.task('images', () =>
    gulp.src('./dev/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./prod/img'))
        .pipe(notify({ message: 'Images task complete' }))
);

/* Fonts to Dist */
gulp.task('fonts', function() {
    gulp.src('./dev/fonts/*.*')
    .pipe(gulp.dest('./prod/fonts'));
});

/* Clean Prod Dir */
gulp.task('clean', function() {
 return gulp.src('./dev')
 .pipe(clean('./prod'));
});

/* Browser sync Static server */
gulp.task('browser-synh', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Nitch"
    });
});

/* Build Task*/
gulp.task('build', gulpSequence('clean', 'fonts', 'styles', 'scripts', 'images'));


/* Watcher */
gulp.task('watch', ['browser-synh'] , function() {
    gulp.watch('./dev/sass/main.scss', ['styles']);
    gulp.watch('./dev/js/main.js', ['scripts']);
    gulp.watch("*.html").on("change", browserSync.reload);
});

/* Default Task */
gulp.task('default', gulpSequence('build', 'watch'));


