const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar')

module.exports = {
    //入口配置项
    entry: {
        index: './src/index.js'
    },

    //打包出口配置项
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]_[hash:6].main.js'
    },

    //devtool配置项：增加开发环境打包代码的可读性配置
    // devtool: 'source-map',

    //插件配置项
    plugins: [
        //配置多个应用
        new HtmlWebpackPlugin({
            title: '首页',   //指定页面的标题
            filename: 'index.html',  //指定打包后的文件名
            template: './public/index.html',  //配置指定的模版
            chunks: ['index']     //chunks指定需要引入的入口模块的健名
        }),
        new CleanWebpackPlugin(),
        new WebpackBar()
    ],

    //loader转换详细配置项
    module: {
        rules: [
            //处理js/jsx模块的配置项
            {
                test: /\.jsx?$/,
                exclude: /(node_modules | bower_components)/,  //打包时忽略掉的文件夹
                use: {
                    loader: 'babel-loader',  //指定要处理的loader
                }
            },

            //url-loader图片处理配置项
            {
                test: /\.(png|jpg|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            // publicPath: './../img',
                            outputPath: 'img/'
                        }
                    }
                ]
            },

            //服务器端字体配置项
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    // publicPath: './../fonts',
                    outputPath: 'fonts/'
                }
            }
        ]
    },

    //配置组件扩展名及忽略扩展名
    resolve: {
        extensions: ['.jsx', '.less', '.css', '.js']
    }
}