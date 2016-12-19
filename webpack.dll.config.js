var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry:{
		vender:['vue-router','axios','element-ui']
	},
	output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        library: '[name]',
    },
	module: {
        rules: [
        {
        	test:/\.json$/,
        	loader:'json-loader',
        	include:/node_modules/
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
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
	plugins:[
		new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        })
	]
}