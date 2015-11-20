require(['jquery','compa'], function($) {
$(".tab").tab();
  var btn = $('#btn');
  btn.on('click',function() {
    require(['./comp/1-1.js']);
  });
});
