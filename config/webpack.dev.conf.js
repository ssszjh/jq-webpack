//引入webpack-merge插件进行合并
const merge = require('webpack-merge');
//引入webpack.base.conf.js文件
const base = require('./webpack.base.conf');
//引入webpack
const webpack = require('webpack');
//进行合并，将webpack.base.conf.js中的配置合并到这
module.exports = merge(base, {
    //模块参数
    mode: 'development',
    devServer: {
        contentBase: "./dist", //本地服务器所加载的页面所在的目录
        port: "8089", //设置默认监听端口，如果省略，默认为"8080"
        inline: true, //实时刷新
        historyApiFallback: true, //不跳转
        //代理转发接口
        proxy: {
            //把/api/t转发到target，但是转发的是http://xxx/api/t
            //不要/api,用pathRewrite
            '/api': {
                target: 'xxx', //(跨域的地址)
                changeOrigin: true, // target是域名的话，需要这个参数，
                secure: false, // 设置支持https协议的代理
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    //启用source-map方便调试
    devtool: 'source-map',
    plugins: [
        //定义全局变量
        new webpack.DefinePlugin({
            //这里必须要解析成字符串进行判断，不然将会被识别为一个变量
            DEV: JSON.stringify('dev')
        })
    ]
});