import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

// Импорт задач
import { reset } from "./gulp/tasks/reset.js";
import { copyPHP } from './gulp/tasks/copy.js';
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { styles } from './gulp/tasks/less.js';
import { img } from './gulp/tasks/img.js';
import { js } from './gulp/tasks/js.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';
import { svgSprive } from './gulp/tasks/svgSprite.js';


// Наблюдатель за изменениями в файлах
function watcher() {
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.less, styles);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.img, img);
}

export { svgSprive }

const mainTasks = gulp.parallel(html, styles, svgSprive, img, js, copyPHP);

// Сценарий выполнения
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip); 
const deployFTP = gulp.series(reset, mainTasks, ftp); 

// Экспорт сценариев
export { dev }
export { build }
export { deployZIP }

// Доступ по FTP
// ftp://vh328.timeweb.ru
export { deployFTP }

// Выполнение сценария по умолчанию
gulp.task('default', dev);
