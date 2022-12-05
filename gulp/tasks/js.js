// import webpack from "webpack-stream"; 

export const js = () => {
    return app.gulp.src(app.path.src.js, { sourcemaps: true })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "LESS",
                message: "Error: <% error.message %>"
            })
         ))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browsersync.stream());
}