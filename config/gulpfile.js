"use strict";

// ---------------------------------- Configuration ---------------------------------------

const storeName  =  'Perfumaria';
const folders    =  '{Common,Desk,Mobile}';
const vtex       =  './dist/arquivos/';
const paths = {
        styles: {
            src   : './src/assets/sass/**/*.scss',
            dest  : './dist/css'
        },
        scripts: {
            src   : './src/assets/js/',
            dest  : './dist/js'
        },
  };
// ------------------------------------- Modules -------------------------------------------

let merge           = require('merge-stream');
const gulp          = require('gulp');
const sass          = require('gulp-sass');
const prefixer      = require('gulp-autoprefixer');
const uglify        = require('gulp-uglify');
const imagemin      = require('gulp-imagemin');
const browserify    = require('browserify');
const babelify      = require('babelify');
const source        = require('vinyl-source-stream');
const buffer        = require('vinyl-buffer');
const glob          = require('glob');
const stream        = require('event-stream');
const del           = require('del');
const browserSync   = require("browser-sync").create();

function scss(){
    return glob(`./src/${folders}/sass/**/*.scss`, function(err,element){
        if(err) done(err);
        return gulp.src(element)
            .pipe(sass())
            .pipe(gulp.dest(vtex))
            .pipe(browserSync.stream())
    });
};

function es(done) {
    return glob(`./src/${folders}/js/**.js`, function(err,folder) {
        if(err) done(err);
        let files = folder.map((file) => file.split('js/')[1])
        let tasks = files.map(function(entry) {
          return browserify({ entries: [folder] })
                .transform(babelify, { presets: ["@babel/preset-env"] })
                .bundle()
                .pipe(source(entry))
                .pipe(buffer())
                .pipe(gulp.dest(vtex ));
        });
        stream.merge(tasks).on('end', done);
    })
};

// ------------------------------------ Development ---------------------------------------

function sync(){
    browserSync.init({
        open: true,
        https: true,
        host: storeName  + '.vtexlocal.com.br',
        startpath: '/admin/login/',
        proxy: 'https://' + storeName  + '.vtexcommercestable.com.br',
        serveStatic: [{
            route: '/arquivos',
            dir: [vtex]
        }]
    })
}

// function es(done) {
//     return glob(`${paths.scripts.src}${storeName}-**.js`, function(err,folder) {
//         if(err) done(err);
//         let files = folder.map((file) => file.split('js/')[1])
//         let tasks = files.map(function(entry) {
//           return browserify({ entries: [ paths.scripts.src + entry] })
//                 .transform(babelify, { presets: ["@babel/preset-env"] })
//                 .bundle()
//                 .pipe(source(entry))
//                 .pipe(buffer())
//                 .pipe(gulp.dest(vtex ));
//         });
//         stream.merge(tasks).on('end', done);
//     })
// };

// function scss() {
//     return gulp.src(paths.styles.src)
//         .pipe(sass())
//         .pipe(gulp.dest(vtex ))
//         .pipe(browserSync.stream());
// };

function watch() {
    gulp.watch(['src/assets/Mobile/sass/**/*.scss', 'src/assets/Desk/sass/**/*.scss'], css);
    gulp.watch(['src/assets/Mobile/js/**/*.js', 'src/assets/Desk/js/**/*.js'], js).on('change', browserSync.reload);
}
// ------------------------------------- Production ---------------------------------------

function js(done) {
    return glob(`${paths.scripts.src}${storeName}-**.js`, function(err,folder) {
        if(err) done(err);
        let files = folder.map((file) => file.split('js/')[1])
        var tasks = files.map(function(entry) {
          return browserify({ entries: [ paths.scripts.src + entry] })
                .transform(babelify, { presets: ["@babel/preset-env"] })
                .bundle()
                .pipe(source(entry))
                .pipe(buffer())
                .pipe(uglify())
                .pipe(gulp.dest('./dist/js'));
        });
        stream.merge(tasks).on('end', done);
    })
};

function img() {
    return gulp.src('./src/assets/img/*.png')
        .pipe(imagemin(
            { optimizationLevel: 5 },
        ))
        .pipe(gulp.dest('./dist/img'))
}

function css() {
    return gulp.src(paths.styles.src)
        .pipe(sass({
            outputStyle : 'compressed'
        }))
        .pipe(prefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.styles.dest));
}

function clean() {
    return del([ 'dist' ]);
}

// ------------------------------------- Tasks ---------------------------------------

const dev = gulp.series(clean,gulp.parallel(sync,img,scss,es,watch));
exports.watch = dev;

const prod = gulp.series(clean,gulp.parallel(css,js,img));
exports.default = prod;
