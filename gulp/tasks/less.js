import less from "gulp-less";
import autoprefixer from 'gulp-autoprefixer';

import rename from "gulp-rename";

export const styles = () => {
    return app.gulp.src(app.path.src.less, { sourcemaps: true })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "LESS",
                message: "Error: <% error.message %>"
            })
        ))
        .pipe(less())
        .pipe(autoprefixer({
            grid: true,
            overrideBrowserlist: ["last 3 version"],
            cascade: true
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}
