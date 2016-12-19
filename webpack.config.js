var path = require('path')
var webpack = require('webpack')
var HappyPack = require('happypack');
var os=require('os');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
console.log(os);
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                // vue-loader options go here
            }
        }, {
            test: /\.css$/,
            loader: 'happypack/loader?id=css',
        }, {
            test:/\.scss/,
            loader:'style-loader!css-loader!sass-loader',
            exclude:/node_modules/
        }, {
            test: /\.js$/,
            loader: 'happypack/loader?id=js',
            exclude: /node_modules/

        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]?[hash]'
            }
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options:{
                name:'fonts/[hash].[ext]'
            }
        }]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    devtool: '#eval-source-map',
    plugins:[
        new HappyPack({
            id:'js',
            loaders: ['babel-loader'],
            threadPool: happyThreadPool,
            cache: true,
            verbose: true
        }),
        new HappyPack({
            id:'css',
            loaders: ['style-loader!css-loader'],
            threadPool: happyThreadPool,
            cache: true,
            verbose: true
        })
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            /**
             * 在这里引入 manifest 文件
            */
            manifest: require('./manifest.json')
        })
    ])
}