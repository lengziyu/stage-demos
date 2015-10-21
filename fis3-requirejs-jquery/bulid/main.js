require.config({
    paths : {
        "jquery" : "../scripts/libs/jquery-1.11.1.min",
        "tab" : "../scripts/libs/jquery.tab"
    },
    shim: {
          'tab': ['jquery']
      }
})
require(['jquery', "tab"],function($){

  $(function($) {
    $("h1").html("This is works")
    //新闻内容tab切换
    $(".tab").tab({
      TabMenu:".menu",
      TabMain:".main",
      Auto:false
    });
  });
});
