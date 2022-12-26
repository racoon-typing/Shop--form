import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist';
const srcFolder = './source';

export const path = {
    build: {
        files: `${buildFolder}/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
        img: `${buildFolder}/img/`,
        js: `${buildFolder}/`,
    },
    src: {
        files: `${srcFolder}/files/**/*.*`,
        less: `${srcFolder}/less/style.less`,
        html: `${srcFolder}/*.html`,
        img: `${srcFolder}/img/**/*.{jpg,jpeg,png,webp}`,
        svg: `${srcFolder}/img/**/*.svg`,
        svgicons: `${srcFolder}/svgicons/*.svg`,
        js: `${srcFolder}/**/*.js`,
    },
    watch: {
        html: `${srcFolder}/*.html`,
        less: `${srcFolder}/**/*.less`,
        img: `${srcFolder}/img/**/*.{jpg,jpeg,png,webp,svg}`,
        js: `${srcFolder}/js/*.js`
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: 'test-5-corners/public_html'
}