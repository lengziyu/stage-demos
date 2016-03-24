/*
* jquery.tab 0.0.2
* Copyright (c) 2015 lengziyu http://lengziyu.com/
* Date: 2015-09-24
* 使用jquery.tab方便地使用切换功能，支持点击和经过事件，自动切换和手动切换，还有一些可自定义参数
*/
;(function($){
  $.fn.tab = function(opts){
    var defaults = {
      //默认按钮菜单
      menu:".tab-navs",
      //默认切换
      main:".tab-contents",
      //当前项
      active:"active",
      //默认自动切换时间
      delay:"5000",
      //默认点击切换事件，mouseenter可以设置鼠标划过事件
      event:"click",
      //是否自动播放
      auto:false,
      //懒加载
      lazyload:false

    };

    var opts = $.extend(defaults, opts);


    this.each(function(){
      //获取元素
      var t = $(this),
            menu = t.find(opts.menu),
            main = t.find(opts.main),
            ec = menu.children(),
            ac = main.children(),
            i = 0,
            canmove = true;

      //懒加载
      function lazy(){
          if(!opts.lazyload == false){
            var src = ac.eq(i).find('img.lazy').attr("data-src");
            ac.eq(i).find('img.lazy').attr("src",src).removeAttr("data-src");
          }
      }


      //点击切换
      menu.on(opts.event,"li",function(){
        canmove = false;
        clearInterval(li_delay);
        i = $(this).index();
        //设置当前类名
        $(this).addClass(opts.active).siblings().removeClass(opts.active);
        ac.eq(i).addClass(opts.active).show().siblings().removeClass(opts.active).hide();
        lazy();
        return false
      });



      //鼠标放上去则停止自动播放，否则自动播放
      t.mouseenter(function(){
        canmove = false;
      }).mouseleave(function(){
          canmove = true;
      });

      //多少时间后切换函数
      function li_delay(){
        if(canmove){
          i++;
          //如果是最后一个，则跳回第一个
          var len = menu.children().length;
          if(i == len){
            i = 0;
          }
          ec.eq(i).addClass(opts.active).siblings().removeClass(opts.active);
          ac.eq(i).addClass(opts.active).show().siblings().removeClass(opts.active).hide();
          lazy();
        }
      }

      //如果auto是true则自动播放（setInterval），否则（clearInterval）
      if(opts.auto == true){
        setInterval(li_delay,opts.delay);
      }else{
        clearInterval(li_delay,opts.delay);
      }
    });
  };
})(jQuery);
