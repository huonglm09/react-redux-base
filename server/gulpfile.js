process.env.DISABLE_NOTIFIER = true;
var elixir = require('laravel-elixir');
var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var svgstore = require('gulp-svgstore');
var rename = require('gulp-rename');

require('laravel-elixir-livereload');

elixir.config.sourcemaps = false;
elixir(function (mix) {
    //===== combine vendor scripts =====
    mix.scripts([
        'bowers/jquery/jquery.min.js',
        'bowers/bootstrap/dist/js/bootstrap.min.js',
        'bowers/jquery-backstretch/jquery.backstretch.min.js',
    ], 'public/builds/js/vendor.js', 'resources/assets');

    //===== combine manual scripts =====
    mix.scriptsIn('resources/assets/frontend/js', 'public/builds/js/main.js', 'resources/assets');

    //===== combine vendor scripts =====
    mix.styles([
        'bowers/bootstrap/dist/css/bootstrap.min.css',
        'bowers/components-font-awesome/css/font-awesome.min.css'
    ], 'public/builds/css/vendor.css', 'resources/assets');

    //===== combine manual scripts =====
    mix.sass('./resources/assets/frontend/sass/', 'public/builds/css/main.css');

    //===== combine vendor scripts =====
    mix.scripts([
        'bowers/jquery/jquery.min.js',
        'bowers/moment/min/moment.min.js',
        'bowers/moment/min/moment-with-locales.min.js',
        'bowers/bootstrap/dist/js/bootstrap.min.js',
        'bowers/bootbox.js/bootbox.js',
        'bowers/jquery-backstretch/jquery.backstretch.min.js',
        'bowers/jquery.nicescroll/jquery.nicescroll.min.js',
        'bowers/blueimp-file-upload/js/vendor/jquery.ui.widget.js',
        'bowers/blueimp-file-upload/js/jquery.iframe-transport.js',
        'bowers/blueimp-file-upload/js/jquery.fileupload.js'
    ], 'public/builds/js/vendor.admin.js', 'resources/assets');

    //===== combine manual scripts =====
    mix.scriptsIn('resources/assets/backend/js', 'public/builds/js/main.admin.js', 'resources/assets');

    //===== combine vendor scripts =====
    mix.styles([
        'bowers/bootstrap/dist/css/bootstrap.min.css',
        'bowers/components-font-awesome/css/font-awesome.min.css'
    ], 'public/builds/css/vendor.admin.css', 'resources/assets');
    
    mix.copy('./resources/assets/bowers/bootstrap/dist/css/bootstrap.min.css.map', './public/builds/css');
    mix.copy('./resources/assets/bowers/bootstrap-datepicker/**/*', './public/builds/plugins/bootstrap-datepicker');
    mix.copy('./resources/assets/bowers/eonasdan-bootstrap-datetimepicker/**/*', './public/builds/plugins/eonasdan-bootstrap-datetimepicker');
    //===== combine manual scripts =====
    mix.sass('./resources/assets/backend/sass/', 'public/builds/css/main.admin.css');

    //==== livereload ====
    mix.livereload([
        'public/**/*',
        'resources/assets/frontend/**/*',
        'resources/assets/backend/**/*',
        'resources/assets/backend/**/**/*.scss',
        'resources/views/**/*',
        'modules/**/views/**/*',
        'modules/**/controllers/**/*'
    ]);
});

gulp.task('sprite', function () {
    var spriteData =
            gulp.src('./resources/assets/images/sprite/*.*') // source path of the sprite images
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.css'
            }));

    spriteData.img.pipe(gulp.dest('./public/builds/sprite/')); // output path for the sprite
    spriteData.css.pipe(gulp.dest('./public/builds/sprite/')); // output path for the CSS
});

gulp.task('svgstore', function () {
    return gulp
            .src('./resources/assets/images/svgs/*.svg')
            .pipe(rename({prefix: 'i-svg-'}))
            .pipe(svgstore())
            .pipe(gulp.dest('./public/builds/sprite/'));
});

//---- fonts ----
gulp.task('fonts', function() {
    gulp.src('./resources/assets/bowers/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}').pipe(gulp.dest('./public/builds/fonts/'));
    gulp.src('./resources/assets/bowers/components-font-awesome/fonts/*.{eot,svg,ttf,woff,woff2}').pipe(gulp.dest('./public/builds/fonts/'));
});

gulp.task('ckeditor', function() {    
    gulp.src('./resources/assets/bowers/ckeditor/**/*').pipe(gulp.dest('./public/builds/plugins/ckeditor/'));
});