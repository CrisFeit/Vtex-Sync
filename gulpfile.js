"use strict";

// ---------------------------------- Configuration ---------------------------------------

const storeName  =  'Perfumaria';
const vtex       =  './app/dist/arquivos';
const folders    =  '{common,desktop,mobile}';
const scripts    =  `./app/src/${folders}/js/**.js`;
const styles     =  `./app/src/${folders}/sass/**/*.scss`;
const sprites     =  './app/assets/images/*.png';

// ------------------------------------- Modules -------------------------------------------

const gulp          = require('gulp');
const sass          = require('gulp-sass');
const prefixer      = require('gulp-autoprefixer');
const uglify        = require('gulp-uglify');
const browserify    = require('browserify');
const babelify      = require('babelify');
const source        = require('vinyl-source-stream');
const buffer        = require('vinyl-buffer');
const glob          = require('glob');
const stream        = require('event-stream');
const del           = require('del');
const browserSync   = require("browser-sync").create();
const spritesmith   = require('gulp.spritesmith');

// ------------------------------------ Development ---------------------------------------

function sprite() {
        return gulp.src(sprites)
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.css'
            }))
            .pipe(gulp.dest('./app/dist'));
}

function sync(){
    browserSync.init({
        open: true,
        https: true,
        host: 'edbr'+'.vtexlocal.com.br',
        startpath: '/admin/login/',
        proxy: 'https://'+'edbr'+'.vtexcommercestable.com.br',
        serveStatic: [{
            route: '/arquivos',
            dir: [vtex]
        }]
    })
}

function scss(){
    return glob(styles, function(err,element){
        if(err) done(err);
        return gulp.src(element)
            .pipe(sass())
            .pipe(gulp.dest(vtex))
            .pipe(browserSync.stream())
    });
};

function babel(done) {
    return glob(scripts, function(err,folder) {
        if(err) done(err);
        let files = folder.map((file) => file.split('js/')[1])
        let tasks = files.map(function(entry) {
          return browserify({ entries: [folder] })
                .transform(babelify, { presets: ["@babel/preset-env"] })
                .bundle()
                .pipe(source(entry))
                .pipe(buffer())
                .pipe(gulp.dest(vtex));
        });
        stream.merge(tasks).on('end', done);
    })
};

function watch() {
    gulp.watch(styles, css);
    gulp.watch(scripts, js).on('change', browserSync.reload);
}
// ------------------------------------- Production ---------------------------------------

function css(done){
    return glob(styles, function(err,folder){
        if(err) done(err);
        let builds = folder.map((file) => file.split(storeName)[0].replace('src','dist').replace('sass','css'))
        let tasks  = folder.map(function(entry,index) {
             return gulp.src(entry)
                .pipe(sass({
                    outputStyle : 'compressed'
                }))
                .pipe(prefixer({
                    browsers: ['last 4 versions'],
                    cascade: false
                }))
                .pipe(gulp.dest(builds[index]))
            });
            stream.merge(tasks).on('end', done);
        });
};

function js(done) {
    return glob(scripts , function(err,folder) {
        if(err) done(err);
        let files  = folder.map((file) => file.split('js/')[1])
        let builds = folder.map((file) => file.split(storeName)[0].replace('src','dist'))
        let tasks  = files.map(function(entry,index) {
            return browserify({ entries: [folder] })
                .transform(babelify, { presets: ["@babel/preset-env"] })
                .bundle()
                .pipe(source(entry))
                .pipe(buffer())
                .pipe(uglify())
                .pipe(gulp.dest(builds[index]));
        });
        stream.merge(tasks).on('end', done);
    })
};


function clean() {
    return del([ 'app/dist' ]);
}
// ------------------------------------- Tasks ---------------------------------------

const dev = gulp.series(clean,gulp.parallel(sync,scss,babel,watch));
exports.watch = dev;

const prod = gulp.series(clean,gulp.parallel(css,js));
exports.default = prod;

const smith = gulp.series(clean,gulp.parallel(sprite));
exports.sprite = smith;

