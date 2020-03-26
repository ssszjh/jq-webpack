import '../css/index.css';
import '../common/common.css';
import '../common/swiper.min.css';
import 'expose-loader?$!jquery';
import '../common/common.js';
import Swiper from '../common/swiper.min.js';




console.log('主页面');
$('.main').click(function() {
    window.location.href = 'index1.html';
})
const a = 1;
console.log(a);
// swiper加载

// var swiper1 = new Swiper('.swiper1');
var swiper = new Swiper('.swiper1', {
    loop: true, // 循环模式选项
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    },
    effect: 'fade',
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
        currentClass: 'my-pagination-current', //分式类型分页器的当前索引的类名
        totalClass: 'my-pagination-total', //分式类型分页器总数的类名
    },
});