# jq-webpack
多页面（jq）项目用webpack打包

运行npm run server

打包npm run build


1.创建json，npm int

2.引入的依赖用cnpm install xx --save-dev

或者npm install xx --save-dev


3.用到的loader和plugin有

"clean-webpack-plugin": "^3.0.0",//清理上次打包的文件

        "css-loader": "^2.1.1",//对js里引入css，导出到js里
        
        "extract-text-webpack-plugin": "^4.0.0-beta.0",//分离css从js里
        
        "file-loader": "^3.0.1",//生成的图片的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名。
        
        "html-webpack-plugin": "^3.2.0",//生产html模板
        
        "html-withimg-loader": "^0.1.16",//打包html里的，没被依赖的图片
        
        "optimize-css-assets-webpack-plugin": "^5.0.0",//压缩css
        
        "style-loader": "^0.23.1",//对js里引入css，导出到js里
        
        "uglifyjs-webpack-plugin": "^2.2.0",//压缩js
        
        "url-loader": "^1.1.2",//压缩图片文件指定大小的图片道js里
        
        "webpack": "^4.30.0",//webpack
        
        "webpack-dev-server": "^3.10.3"//本地服务器
        
 
4.入口（多入口）（待优化）

entry: {
        index1: './src/js/index1.js',
        index2: './src/js/index2.js',
    },
    
    
 优化：引入配置文件
entry: configReq.entry,
 
 
5.出口（指定在dist里，hash避免缓存）

output: {
        filename: 'js/[name]-[hash].js',
        path: __dirname + '/dist',
    },
 
 
6.本地服务器

 devServer: {
 
        contentBase: "./dist", //本地服务器所加载的页面所在的目录
        
        port: "8080", //设置默认监听端口，如果省略，默认为"8080"
        
        inline: true, //实时刷新
        
        historyApiFallback: true //不跳转
    },
 
 
7.loader


 module: {
 
        rules: [
            //对js里引入css，导出到js里
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
 
8.plugins

 plugins: 
 
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new CleanWebpackPlugin(),//清理上次打包的文件
　　//html模板（待优化）
    //    new htmlPlugin({
       //     filename: 'index.html',
      //      minify: { //对html文件进行压缩
       //         removeAttributeQuotes: true, //removeAttrubuteQuotes是去掉属性的双引号。
        //    },
       //     chunks: ['index1'], //每个html只引入对应的js和css
       //     inject: true,
        //    template: './src/index1.html' //打包html模版的路径和文件名称。
      //  }),
     //   new htmlPlugin({
     //       filename: 'index2.html',
     //       minify: { //对html文件进行压缩
       //         removeAttributeQuotes: true, //removeAttrubuteQuotes是去掉属性的双引号。
       //     },
       //     chunks: ['index2'],
       //     inject: true,
    //        template: './src/index2.html' //打包html模版的路径和文件名称。
    //    }),
        new extractTextPlugin("css/[name]-[hash].css"), //提取CSS行内样式，转化为link引入
    ],
    optimization: {
    
        minimizer: [
　　//压缩js
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
//压缩css
            new OptimizeCSSAssetsPlugin({})
        ]
    }
 
//html模板优化的
//生成模版文件

configReq.htmlConfig.forEach((val, i) => {

    var hcoging = {
        template: "./src/" + val.name + ".html", //new 一个这个插件的实例，并传入相关的参数
        filename: val.name + ".html",
        chunks: [val.name],
        inject: true,
        minify: { //压缩HTML文件
            removeComments: true, //移除HTML中的注释
            removeAttributeQuotes: true, //removeAttrubuteQuotes是去掉属性的双引号。
            collapseWhitespace: false //删除空白符与换行符
        }
    }
    config.plugins.push(new htmlPlugin(hcoging));
})
 
//配置文件config.js

const webpack = require('webpack');

//入口配置 
var entry = {

        index1: './src/js/index1.js',
        index2: './src/js/index2.js',
    }
    //页面配置
var htmlConfig = [{

    name: "index1",
    src: __dirname + "/app/page/index.js",
}, {

    name: "index2",
    src: __dirname + "/app/page/list.js",
}];
module.exports = {

    entry: entry,
    htmlConfig: htmlConfig
}
//引入配置
var configReq = require('./config.js'); //读取配置
module.exports = config;//config为webpack配置文件
 
//还剩公共的方法的处理
//注：这里公共并不是编译前的公共代码，而是指多入口里公共的代码提出出来
处理公共的方法，用webpack+自带的splitChunks与minimizer同级
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
//还要在html模板里的chunks改成
 chunks: [val.name, "commons"],
//引入jq
先安装加载器expose-loader，用于将插件暴露到全局中供其他模块使用:

npm i expose-loader --save-dev
安装JQuery:

npm install jquery --save-dev
在需要的页面的js

require("expose-loader?$!jquery");即可
 
//引入第三方本地插件
如：swiper 即可
import Swiper from '../common/swiper.min.js';
