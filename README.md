# my-app

[![Build Status](https://travis-ci.org/Stevenzwzhai/vue2.0-elementUI-axios-vueRouter.svg?branch=master)](https://travis-ci.org/Stevenzwzhai/vue2.0-elementUI-axios-vueRouter)
[![language](https://img.shields.io/badge/language-javascript-green.svg?style=flat)]()

> my light app

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
#### 在使用时要记得在config中配置url
#### 由于使用了路由，所以webpack配置文件中要修改为，这样才能使用template
resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
}
#### 此处使用的是webpack-simple,所以关于字体库要自己配置，并使用url-loader
#### 加载css每次都最好加上style-loader和css-loader，而且要注意书写顺序，尤其是使用sass或less
#### 关于elementUI的坑，自己去实践吧，总体还是不错的。
#### 使用happypack和DllReferencePlugin，构建速度提升很多，从11s到3s，还是不错的

#### 前几天看到有人说项目报错：DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic, see https://github.com/webpack/loader-utils/issues/56 parseQuery() will be replaced with getOptions() in the next major version of loader-utils.这个是node的错误提醒，关掉就好了，在webpack配置文件中设置process.noDeprecation=true即可。可参考https://github.com/vuejs/vue-loader/issues/666
#### pwa文件中有关于pwa应用开发的简单配置，可以供参考,https://github.com/Stevenzwzhai/zhihu-daily 这个项目是比较完整的一个pwa项目。
