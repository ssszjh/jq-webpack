const webpack = require('webpack');
//入口配置 ssdsd
var entry = {
        index: './src/js/index.js',
        index1: './src/js/index1.js',
        index2: './src/js/index2.js',
    }
    //页面配置
var htmlConfig = [{
    name: "index",
}, {
    name: "index1",
}, {
    name: "index2",
}];
module.exports = {
    entry: entry,
    htmlConfig: htmlConfig
}