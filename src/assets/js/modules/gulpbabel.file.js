var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var scriptsPath = 'src/scripts';

function getFolders(dir) {
    return fs.readdirSync(dir) // --> scripst Path
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

gulp.task('scripts', function(done) {
   var folders = getFolders(scriptsPath);
   if (folders.length === 0) return done(); // nothing to do!
   var tasks = folders.map(function(folder) {
      return gulp.src(path.join(scriptsPath, folder, '/**/*.js'))
        // concat into foldername.js
        .pipe(concat(folder + '.js'))
        // write to output
        .pipe(gulp.dest(scriptsPath))
        // minify
        .pipe(uglify())
        // rename to folder.min.js
        .pipe(rename(folder + '.min.js'))
        // write to output again
        .pipe(gulp.dest(scriptsPath));
   });

   // process all remaining files in scriptsPath root into main.js and main.min.js files
   var root = gulp.src(path.join(scriptsPath, '/*.js'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(scriptsPath))
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest(scriptsPath));

   return merge(tasks, root);
});