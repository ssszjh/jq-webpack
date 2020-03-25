import '../css/index.css';
import '../common/common.css';
import   '../common/swiper.min.css';
import 'expose-loader?$!jquery';
import Swiper from '../common/swiper.min.js';
import '../common/common.js';



console.log('主页面');
$('.main').click(function(){
    window.location.href='index1.html';
})
// swiper加载
new Swiper('.swiper1', {
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