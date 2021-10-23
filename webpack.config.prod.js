const merge = require('webpack-merge')
const base = require('./webpack.config.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(base, {
    //插件配置项
    plugins: [
        //配置多个应用
        new MiniCssExtractPlugin({
            filename: 'css/[name]_[hash:6].css',
            chunkFilename: '[id].css'
        }),
    ],

    //模块loader配置项
    module: {
        rules: [
            {
                test: /\.jsx?$/,  //处理js模块的配置
                exclude: /(node_modules | bower_components)/,  //打包时忽略掉的文件夹
                use: {
                    loader: 'babel-loader',  //指定要处理的loader
                }
            },

            //css模块loader处理配置项
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // publicPath: '../'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false  //是否支持css模块化开发，true表示支持，false表示不支持
                        }
                    }
                ]
            },

            //less模块loader处理配置项
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // publicPath: '../'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,   //支持less模块化开发
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },

            //sass模块loader处理配置项
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },

    //指定webpack打包方式是生产环境
    mode: 'production',

    //性能优化及css生产环境压缩
    optimization: {
        minimize: true, //使用 TerserPlugin 压缩js,默认true
        minimizer: [   //自定义 TerserPlugin压缩
            new TerserPlugin({
                cache: true, //缓存 优化速度
                parallel: true
            }),
            new OptimizeCSSAssetsPlugin({})  //css压缩
        ]
    },
})