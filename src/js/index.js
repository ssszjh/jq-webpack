import '../css/index.css';
import {test,Swiper} from '../common/common.js';



let currentPage = 1;
let pageSize = 10;
console.log(currentPage);

function render() {
    setPage(currentPage, Math.ceil(66 / pageSize), render);

}


render()

/**
 *
 * @param pageCurrent 当前所在页
 * @param pageSum 总页数
 * @param callback 调用ajax
 */
function setPage(pageCurrent, pageSum, callback) {
    $(".pagination").bootstrapPaginator({
        size: "normal",
        //设置版本号
        bootstrapMajorVersion: 3,
        // 显示第几页
        currentPage: pageCurrent,
        // 总页数
        totalPages: pageSum,
        //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
        onPageClicked: function(event, originalEvent, type, page) {
            // 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
            currentPage = page
            callback && callback()
        }
    })
}
test();
$.message({
    message: '成功提示',
    type: 'success',
});
console.log('主页面');
$('.main').click(function () {
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