var gulp = require("gulp");
var sourceStream = require("vinyl-source-stream");
var browserify = require("browserify");
var gulpRubySass = require("gulp-ruby-sass");

gulp.task('default', function () {
        console.log("GULP is doing it's task")
    }
);

gulp.task('compile_js', function () {
        var bundle = browserify("./app/src/lib/js/main.js").bundle();
        return bundle.pipe(sourceStream("main.js")).
            pipe(gulp.dest('./app/public/assets/js'));
    }
);

gulp.task('compile_sass', function () {
        return gulpRubySass("./app/src/lib/scss/*.scss").
            on('error', gulpRubySass.logError).
            pipe(gulp.dest('./app/public/assets/css'));
    }
);

gulp.task('watch', ["compile_js", "compile_sass"], function () {
        gulp.watch(["./app/src/lib/js/**/*.js"], ["compile_js"]);
        gulp.watch(["./app/src/lib/scss/**/*.scss"], ["compile_sass"]);
    }
);