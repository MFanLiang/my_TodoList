const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.config.base')

module.exports = merge(base, {
    //devtool配置项：增加开发环境打包代码的可读性配置
    // devtool: 'source-map',

    //指定webpack打包方式是开发环境
    mode: "development",

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
                        loader: 'style-loader',
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
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,   //支持less模块化开发
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
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
        ]
    },
    //配置测试服务器dev-server
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true, //压缩所有来自根路径下的dist目录的文件
        port: 9090,
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            "/data": {
                "target": "http://bjlink32.com/data.php",
                // secure: false,   //如果是https接口，需要配置这个参数
                "changeOrigin": true,  //开启跨域
                "pathRewrite": { "^/data": "" }
            }
        }
    }
})