// 构建整个项目（压缩）
/* 
注意安装事项：
npm install gulp-babel@7.0.1 babel-core babel-preset-es2015
npm install gulp-uglify

*/

const babel = require("gulp-babel");
const uglify = require("gulp-uglify")
const cleanCSS = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");
const autoprefixer = require("gulp-autoprefixer");

const {src,dest,series} = require("gulp");

// gulp.task('cssmin', done => {//参数添加done
//     gulp.src('./src/css/*.less')
//       .pipe(less())
//       .pipe(gulp.dest('dist/css'))
//     done()//结尾加上结束回调done()
//   })
  
//es6转es5
function toES5(){
    return src("./js/*.js")
    //转es5
    .pipe(babel({
        presets: ["ES2015"]
    }))
    //压缩js
    .pipe(uglify())
    .pipe(dest("./publish/js/"))
}

//添加css前缀并压缩css
function doCSS(){
    return src("./css/*.css")
    //添加css前缀，使之兼容更多浏览器
    //注意：一定要在package.json中添加需要兼容的浏览器，本例中，添加了
    // "browserslist": [
    //     "last 2 versions",
    //     "iOs > 7",
    //     "Firefox > 14"
    //   ]
    .pipe(autoprefixer())
    //压缩css
    .pipe(cleanCSS())
    .pipe(dest("./publish/css/"))
}

//压缩html
function doHTML(){
    return src("./html/*.html")
    //压缩html
    .pipe(htmlmin({
        "collapseWhitespace": true,
        "minifyCSS": true,
        "minifyJS": true,
        "removeEmptyAttributes": true
    }))
    .pipe(dest("./publish/html/"))
}

//压缩index.html
function doIndexHTML(){
    return src("./index.html")
    //压缩html
    .pipe(htmlmin({
        "collapseWhitespace": true,
        "minifyCSS": true,
        "minifyJS": true,
        "removeEmptyAttributes": true
    }))
    .pipe(dest("./publish/"))
}

module.exports.start = series([toES5,doCSS,doHTML,doIndexHTML]);
