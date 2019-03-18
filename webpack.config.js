const webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var _root = path.resolve(__dirname, '..');

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}


module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendors': './src/vendors.ts',
        'app': './src/main.ts'
    },
    mode: 'development',
    performance: {
        hints: false
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: '[name].js'
    },
    module: {
        rules: [{
                test: /\.ts$/,
                loaders: [{
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: 'tsconfig.json'
                    }
                }, 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                use: [
                    "css-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|cur|ttf|eot|woff)$/,
                use: [{
                    loader: 'file-loader'
                }]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2
                }
            }
        }
    },
    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            root('./src'), // location of your src
            {} // a map of your routes
        ),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};