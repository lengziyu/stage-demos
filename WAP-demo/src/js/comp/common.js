$(function(){
  var docEl = document.documentElement,
    //当设备的方向变化（设备横向持或纵向持）此事件被触发。绑定此事件时，
    //注意现在当浏览器不支持orientationChange事件的时候我们绑定了resize 事件。
    //总来的来就是监听当然窗口的变化，一旦有变化就需要重新设置根字体的值
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
        //设置根字体大小
        docEl.style.fontSize = 20 * (docEl.clientWidth / 320) + 'px';
    };
//绑定浏览器缩放与加载时间
  window.addEventListener(resizeEvt, recalc, false);
  document.addEventListener('DOMContentLoaded', recalc, false);
})
