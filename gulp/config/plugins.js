import plumber from "gulp-plumber";
import notify from "gulp-notify";
import browsersync from "browser-sync";
import replace from "gulp-replace";

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync
}