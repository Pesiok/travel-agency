var gulp = require('gulp'),
webpack = require('webpack');

gulp.task('scripts',['modernizr'], function(callback) {
    webpack(require('../../webpack.config.js'), function(err, stats) {
        if (err) {
            console.log(err.toString());
        }
        
        console.log(stats.toString());
        //running whatever was pass to this function afterwards in order to make sure that webpack() has finished
        callback();
    });
});