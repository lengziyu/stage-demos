/**
 *   Unslider by @idiot and @damirfoy
 *   Contributors:
 *   - @ShamoX
 *
 */

(function($, f) {
	var Unslider = function() {
		//  Object clone
		var _ = this;

		//  Set some options
		_.o = {
			speed: 500,     // animation speed, false for no transition (integer or boolean)
			delay: 5000,    // delay between slides, false for no autoplay (integer or boolean)
			init: 0,        // 初始化延迟，无延迟/false（整数或布尔）
			pause: !f,      // 暂停悬停（布尔值）
			loop: !f,       // 无限循环
			keys: !f,        // keyboard shortcuts (boolean)
			dots: f,        // display dots pagination (boolean)
			arrows: f,      // display prev/next arrows (boolean)
			prev: '&larr;', // text or html inside prev button (string)
			next: '&rarr;', // same as for prev option
			fluid: f,       // is it a percentage width? (boolean)
			starting: f,    // invoke before animation (function with argument)
			complete: f,    // invoke after animation (function with argument)
			items: '>ul',   // slides container selector
			item: '>li',    // slidable items selector
			easing: 'swing',// easing function to use for animation
			autoplay: true,  // enable autoplay on initialisation
      lazyload: true,	//是否开启懒加载
			whatload: 1,		//以什么形式懒加载？0表示img，1表示background
			shape: 0			//
		};

		_.init = function(el, o) {
			//  我们检查是否在任何选项传递到unslider
			_.o = $.extend(_.o, o);

			_.el = el;
			_.ul = el.find(_.o.items);
			_.max = [el.outerWidth() | 0, el.outerHeight() | 0];
			_.li = _.ul.find(_.o.item).each(function(index) {

				var me = $(this),
					width = el.parent().width(),
					height = el.parent().height();

				//  设置最大值
				if (width > _.max[0]) _.max[0] = width;
				if (height > _.max[1]) _.max[1] = height;
			});


			//  缓存变量
			var o = _.o,
				ul = _.ul,
				li = _.li,
				len = li.length;

			//  Current indeed
			_.i = 0;

			//随浏览器窗口改变而改变



			//  设置主元素
			el.css({width: _.max[0], height: li.first().outerHeight(), overflow: 'hidden'});

			//  设置相对宽度
			ul.css({position: 'relative', left: 0, width: (len * 100) + '%'});
			if(o.fluid) {
				li.css({width: (100 / len) + '%'});
			} else {
				li.css({width: (_.max[0]) + 'px'});
			}

			//  自动幻灯片
			o.autoplay && setTimeout(function() {
				if (o.delay | 0 && len !== 1) {
					_.play();
					if (o.pause) {
						el.on('mouseover mouseout', function(e) {
							_.stop();
							e.type === 'mouseout' && _.play();
						});
					};
				};
			}, o.init | 0);

			//  按键
			if (o.keys) {
				$(document).keydown(function(e) {
					switch(e.which) {
						case 37:
							_.prev(); // Left
							break;
						case 39:
							_.next(); // Right
							break;
						case 27:
							_.stop(); // Esc
							break;
					};
				});
			};

			//  点分页
			o.dots && nav('dot');

			//  箭头支持
			o.arrows && nav('arrow');

			//  流体宽度滑块补丁。拧那些家伙。
			o.fluid && $(window).resize(function() {
				_.r && clearTimeout(_.r);

				_.r = setTimeout(function() {
					var styl = {height: li.eq(_.i).outerHeight()},
						width = el.outerWidth();
					ul.css(styl);
					styl['width'] = Math.min(Math.round((width / el.parent().width()) * 100), 100) + '%';
					el.css(styl);

				}, 50);
			}).resize();

			//  移动端支持
			if ($.event.special['move'] || $.Event('move')) {
				el.on('movestart', function(e) {
					if ((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) {
						e.preventDefault();
					}else{
						el.data("left", _.ul.offset().left / el.width() * 100);
					}
				}).on('move', function(e) {
					var left = 100 * e.distX / el.width();
				        var leftDelta = 100 * e.deltaX / el.width();
					_.ul[0].style.left = parseInt(_.ul[0].style.left.replace("%", ""))+leftDelta+"%";

					_.ul.data("left", left);
				}).on('moveend', function(e) {
					var left = _.ul.data("left");
					if (Math.abs(left) > 30){
						var i = left > 0 ? _.i-1 : _.i+1;
						if (i < 0 || i >= len) i = _.i;
						_.to(i);
					}else{
						_.to(_.i);
					}
				});
			};

			return _;
		};

		//  unslider移动到幻灯片指数
		_.to = function(index, callback) {
			if (_.t) {
				_.stop();
				_.play();
	                }
			var o = _.o,
				el = _.el,
				ul = _.ul,
				li = _.li,
				current = _.i,
				target = li.eq(index),
				geshu = 1,
				dots = el.find('.dots'),
				dotNum = dots.children().length,
				dotWidth = dots.children().eq(0).width();

			$.isFunction(o.starting) && !callback && o.starting(el, li.eq(current));

			//  滑动或不滑动
			if ((!target.length || index < 0) && o.loop === f) return;

			//  检查是否有界
			if (!target.length) index = 0;
			if (index < 0) index = li.length - 1;
			target = li.eq(index);

			//轮播区的当前项
			target.addClass('active').siblings().removeClass('active');

		//开启懒加载
		if(o.lazyload === true){
			var imgLzay = target.attr("data-src");
			if(imgLzay != undefined){
				if(o.whatload === 0){
					target.find('.lazyload').prop('src',imgLzay).parent().parent().removeAttr("data-src");
				}else if(o.whatload === 1){
					target.css({'background-image':'url('+imgLzay+')'}).removeAttr("data-src");
				}
			}
		};



			var speed = callback ? 5 : o.speed | 0,
				easing = o.easing,
				obj = {height: target.outerHeight()};

			if (!ul.queue('fx').length) {
				//  处理那些讨厌的点

				el.find('.dot').eq(index).addClass('active').siblings().removeClass('active');

				el.animate(obj, speed, easing) && ul.animate($.extend({left: '-' + index + '00%'}, obj), speed, easing, function(data) {
					_.i = index;
					$.isFunction(o.complete) && !callback && o.complete(el, target);
				});

				if(o.shape != 0){
							var imgLzay = el.find('.dot').eq(index).children('.dot_img2').find('img').attr("data-src");
							if(imgLzay != undefined){
								el.find('.dot').eq(index).children('.dot_img1').find('img').attr('src',imgLzay).removeAttr("data-src");

							}

					if(index == 0){
						var ds = 0;
					}else{
						var ds = dotWidth;
					}
				el.animate(obj, 400, easing) && dots.animate($.extend({left: '-' + (index-3)*ds + 'px',width:dotNum*dotWidth+'px'}, obj), 400, easing, function(data) {
					_.i = index;
					$.isFunction(o.complete) && !callback && o.complete(el, target);
				});

			};

			};
		};

		//  自动播放功能
		_.play = function() {
			_.t = setInterval(function() {
				_.to(_.i + 1);
			}, _.o.delay | 0);
		};

		//  停止自动播放
		_.stop = function() {
			_.t = clearInterval(_.t);
			return _;
		};

		//  移动到上一页/下一页幻灯片
		_.next = function() {
			return _.stop().to(_.i + 1);
		};

		_.prev = function() {
			return _.stop().to(_.i - 1);
		};

		//  创建点和箭头
		function nav(name, html) {
			var o = _.o;
			if(o.shape == 0){

			if (name == 'dot') {

				html = '<ol class="dots">';
					$.each(_.li, function(index) {
						html += '<li class="' + (index === _.i ? name + ' active' : name) + '"></li>';
					});
				html += '</ol>';

			} else {
				html = '<div class="';
				html = html + name + 's">' + html + name + ' prev"></div>' + html + name + ' next"></div></div>';
			};
			_.el.addClass('has-' + name + 's').append(html).find('.' + name).click(function() {
				var me = $(this);
				me.hasClass('dot') ? _.stop().to(me.index()) : me.hasClass('prev') ? _.prev() : _.next();
			});
		}else{

			_.el.addClass('has-dots').append(html).find('.dot').mouseenter(function() {
				var me = $(this);
				me.hasClass('dot') ? _.stop().to(me.index()) : me.hasClass('prev') ? _.prev() : _.next();
			});
			_.el.addClass('has-arrows').append(html).find('.arrow').click(function() {
				var me = $(this);
				me.hasClass('dot') ? _.stop().to(me.index()) : me.hasClass('prev') ? _.prev() : _.next();
			});

		}

		};


	};

	//  创建的jQuery插件
	$.fn.unslider = function(o) {

		var len = this.length;

		//  启用多个滑块支持
		return this.each(function(index) {
			//  Cache a copy of $(this), so it
			var me = $(this),

				key = 'unslider' + (len > 1 ? '-' + ++index : ''),
				instance = (new Unslider).init(me, o);

			//  调用一个unslider实例
			me.data(key, instance).data('key', key);
		});
	};

	Unslider.version = "1.0.0";
})(jQuery, false);
