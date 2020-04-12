import '../css/index1.css';
import '../common/common.js';

$(function () {
    // 提取封装的方法
    layui.config({
        base: '/assets/layui/module/'//模块存放的目录
    }).use(['layer', 'form', 'mymod'], function () { //定义一个模块
        var layer = layui.layer
            , form = layui.form
            , mymod = layui.mymod;
        console.log(1);
        //  lay-ui的localStorage
        layui.data('test', {
            key: 'nickname'
            , value: '贤心'
        });
        var localTest = layui.data('test');
        console.log(localTest.nickname);
        layui.data('test', null);
        // 获取设备信息
        var device = layui.device();
        console.log(device);
        $('.img').click(function () {
            window.location.href = 'index2.html';
        })
        layer.msg('Hello World');
        mymod.hello('World!');
        //监听提交
        form.on('submit(formDemo)', function (data) {
            layer.msg(JSON.stringify(data.field));
            return false;
        });
    });
})

