/// <binding Clean='clean' />
"use strict";
var environment_prod = false;

var gulp = require("gulp"),
    gulp_clean = require("gulp-clean"),
    gulp_if = require("gulp-if"),
    gulp_concat = require("gulp-concat"),
    gulp_uglify = require("gulp-uglify"),
    gulp_cssmin = require("gulp-cssmin"),
    gulp_inject = require("gulp-inject"),
    gulp_order = require("gulp-order"),
    runSequence = require("run-sequence");
    

var paths = {
    webroot: "./wwwroot/",
    bower: "./bower_components/"
};

paths.app = paths.webroot + "app.html";
paths.index = paths.webroot + "index.html";
paths.resources = paths.webroot + "resources/";
paths.resources_fonts = paths.resources + "fonts/";
paths.allcss = paths.webroot + "**/*.css";
paths.resources_css = paths.resources + "css/";
paths.resources_css_all = paths.resources + "css/all.css";
paths.resources_js = paths.resources + "js/";
paths.resources_js_all = paths.resources + "js/all.js";
paths.resources_js_alljs = paths.resources + "js/**/*.js";
paths.resources_libs = paths.resources + "libs/";
paths.resources_libs_all = paths.resources + "libs/all.js";
paths.resources_libs_alljs = paths.resources + "libs/*.js";

paths.libs = [
    paths.bower + "jquery/dist/jquery.js",
    paths.bower + "bootstrap/dist/js/bootstrap.js",
    paths.bower + "system.js/dist/system.js"
];

paths.libs_css = [  
    paths.bower + "bootstrap/dist/css/bootstrap.css"
];

paths.libs_fonts = [
    paths.bower + "bootstrap/dist/fonts/*"
];

gulp.task("clean:libs", function (cb) {
    return gulp.src(paths.resources_libs_all)
        .pipe(gulp_clean());
});

gulp.task("clean:js", function (cb) {
    return gulp.src(paths.resources_js_all)
        .pipe(gulp_clean());
});

gulp.task("clean:css", function (cb) {
    return gulp.src(paths.resources_css_all)
        .pipe(gulp_clean());
});

gulp.task("copy:libs", ['clean:libs'], function (cb) {
    return gulp.src(paths.libs)
        .pipe(gulp.dest(paths.resources_libs))
        .on('finish', function () {
            return gulp.src(paths.libs_css)
            .pipe(gulp.dest(paths.resources_css))
            .on('finish', function () {
                return gulp.src(paths.libs_fonts)
                .pipe(gulp.dest(paths.resources_fonts));
            });
        });
});

gulp.task('generate:libs', ['clean:libs'], function () {
    var sequence = [
        '**/jquery.js',       
        '**/*.js'
    ];
    return gulp.src(paths.resources_libs_alljs)
    .pipe(gulp_order(sequence))
    .pipe(gulp_if(environment_prod, gulp_concat(paths.resources_libs_all)))
    .pipe(gulp_if(environment_prod, gulp_uglify()))
    .pipe(gulp.dest("."))
    .on('finish', function () {
        return gulp.src(paths.app)
        .pipe(gulp_inject(gulp.src(environment_prod ? paths.resources_libs_all : paths.resources_libs_alljs, { read: false }).pipe(gulp_order(sequence)), { starttag: '<!-- inject:libs:js -->' }))
        .pipe(gulp.dest(paths.webroot));
    });
});

gulp.task('generate:js', ['clean:js'], function () {
    return gulp.src(paths.resources_js_alljs)   
    .pipe(gulp_if(environment_prod, gulp_concat(paths.resources_js_all)))
    .pipe(gulp_if(environment_prod, gulp_uglify()))
    .pipe(gulp.dest("."))
    .on('finish', function () {
        return gulp.src(paths.app)
        .pipe(gulp_inject(gulp.src(environment_prod ? paths.resources_js_all : paths.resources_js_alljs, { read: false })))
        .pipe(gulp.dest(paths.webroot));
    });
});

gulp.task('generate:css', ['clean:css'], function () {
    return gulp.src(paths.allcss)
    .pipe(gulp_if(environment_prod, gulp_concat(paths.resources_css_all)))
    .pipe(gulp_if(environment_prod, gulp_cssmin()))
    .pipe(gulp_if(environment_prod, gulp.dest(".")))
    .on('finish', function () {
        return gulp.src(paths.app)
        .pipe(gulp_inject(gulp.src(environment_prod ? paths.resources_css_all : paths.allcss, { read: false })))
        .pipe(gulp.dest(paths.webroot));
    });
});

gulp.task("build", function (cb) {
    runSequence('copy:libs', 'generate:libs', 'generate:css', 'generate:js', cb);
});

gulp.task('build:dev', function (callback) {
    environment_prod = false;
    gulp.start('build');

});

gulp.task('build:prod', function (callback) {
    environment_prod = true;    
    gulp.start('build');
});


//gulp.task("clean:js", function (cb) {
//    rimraf(paths.concatJsDest, cb);
//});

//gulp.task("clean:css", function (cb) {
//    rimraf(paths.concatCssDest, cb);
//});

//gulp.task("clean", ["clean:js", "clean:css"]);

//gulp.task("min:js", function () {
//    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
//        .pipe(concat(paths.concatJsDest))
//        .pipe(uglify())
//        .pipe(gulp.dest("."));
//});

//gulp.task("min:css", function () {
//    return gulp.src([paths.css, "!" + paths.minCss])
//        .pipe(concat(paths.concatCssDest))
//        .pipe(cssmin())
//        .pipe(gulp.dest("."));
//});

//gulp.task("min", ["min:js", "min:css"]);
