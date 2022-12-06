import less from "gulp-less";
import autoprefixer from 'gulp-autoprefixer'; // Добавляет префиксы
import cssmin from "gulp-cssmin"; // Сжимает файлы
import webpcss from 'gulp-webpcss'; // Выводит WEBP изображения

import rename from "gulp-rename";

export const styles = () => {
    return app.gulp.src(app.path.src.less, { sourcemaps: app.isBuild })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "LESS",
                message: "Error: <% error.message %>"
            })
        ))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(less())
        // .pipe(webpcss(
        //     {
        //         webpClass: ".webp",
        //         noWebpClass: ".no-webp"
        //     }
        // ))
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    grid: true,
                    overrideBrowserlist: ["last 3 version"],
                    cascade: true
                })
            )
        )
        // Не сжатый файл стилей
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(
            app.plugins.if(
                app.isBuild,
                cssmin()
            )
        )
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}
