import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist';
const srcFolder = './source';

export const path = {
    build: {
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
        img: `${buildFolder}/img/`,
        js: `${buildFolder}/`,
        video: `${buildFolder}/video`,
        php: `${buildFolder}/`

    },
    src: {
        less: `${srcFolder}/less/style.less`,
        html: `${srcFolder}/*.html`,
        img: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg}`,
        js: `${srcFolder}/**/*.js`,
        video: `${srcFolder}/video/*.mp4`,
        php: `${srcFolder}/*.php`
    },
    watch: {
        html: `${srcFolder}/*.html`,
        less: `${srcFolder}/**/*.less`,
        js: `${srcFolder}/js/*.js`
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: 'shop--form/publick_html'
}