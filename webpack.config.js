const webpack = require('webpack');
const path = require('path');
const htmlPlugin = require('html-webpack-plugin'); //生成html模板
const extractTextPlugin = require('extract-text-webpack-plugin'); //分离css从js里
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩css
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //清除打包的
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //压缩js
var configReq = require('./config.js'); //读取配置


var config = {
    mode: 'production',
    entry: configReq.entry,
    output: {
        filename: 'js/[name]-[hash].js',
        path: __dirname + '/dist',
        publicPath: '/'
    },
    devServer: {
        contentBase: "./dist", //本地服务器所加载的页面所在的目录
        port: "8080", //设置默认监听端口，如果省略，默认为"8080"
        inline: true, //实时刷新
        historyApiFallback: true, //不跳转
        proxy: {
            //把/api/t转发到target，但是转发的是http://xxx/api/t
            //不要/api,用pathRewrite
            '/api': {
                target: 'http://xxx',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    module: {
        rules: [
            //对js里引入css，提取到js里
            {
                test: /\.(css)$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                    }, ]
                })
            },
            //压缩图片
            {
                test: /\.(png|jpg|gif|jpeg)/, //是匹配图片文件后缀名
                use: [{
                    loader: 'url-loader', //指定使用的loader和loader的配置参数
                    options: {
                        limit: 5 * 1024, //是把小于5KB的文件打成Base64的格式，写入JS
                        outputPath: './image/' //打包后的图片放到img文件夹下
                    }
                }]
            },
            //打包html的图片
            {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new CleanWebpackPlugin(),
        new extractTextPlugin("css/[name]-[hash].css"), //提取CSS行内样式，转化为link引入

    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        //打包公共模块
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial', //initial表示提取入口文件的公共部分
                    minChunks: 2, //表示提取公共部分最少的文件数
                    minSize: 0, //表示提取公共部分最小的大小
                    name: 'commons' //提取出来的文件命名
                }
            }
        }
    }
};
module.exports = config;
//生成模版文件
configReq.htmlConfig.forEach((val, i) => {
    var hcoging = {
        template: "./src/" + val.name + ".html", //new 一个这个插件的实例，并传入相关的参数
        filename: val.name + ".html",
        chunks: [val.name, "commons"],
        inject: true,
        minify: { //压缩HTML文件
            removeComments: true, //移除HTML中的注释
            removeAttributeQuotes: true, //removeAttrubuteQuotes是去掉属性的双引号。
            collapseWhitespace: false //删除空白符与换行符
        }
    }
    config.plugins.push(new htmlPlugin(hcoging));
})