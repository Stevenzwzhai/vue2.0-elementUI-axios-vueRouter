# my-app

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
