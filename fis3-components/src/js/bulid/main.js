require.config({
  baseUrl: 'src/js',
  paths: {
      'jquery': 'libs/jquery-1.11.3.min',
      'tab': "comp/tab",
      'unslider': "comp/unslider",
      'pop': "comp/pop",
      'validate': "comp/validate",
      'cxscroll': "comp/cxscroll",
      'scrollTo': "comp/scrollTo"
  },
  shim: {
    'tab': ['jquery'],
    'unslider': ['jquery'],
    'pop': ['jquery'],
    'validate': ['jquery'],
    'cxscroll': ['jquery'],
    'scrollTo': ['jquery']
  }
})

require(['jquery', 'tab', 'unslider', 'pop', 'validate', 'cxscroll', 'scrollTo'], function($) {

  $(function(){

    $('.hj-tab').tab({
      event:"click"
    });

    $('.hj-unslider .unslider-main').unslider({
      dots: true,
      arrows: false,
      whatload: 0
    });

    $('.hj-cxscroll').cxScroll({
      auto: true,
      step:2,
      accel:1000
    });

    $(".hj-scrollTo a").click(function(e){
       e.preventDefault();
       $('html,body').scrollTo(this.hash,this.hash);
     });

    $("#form").validate({
    					debug:true,      //调试模式（并不会提交）
    					rules:{
    						username:{
    							required:true,        //开启必填项
    							rangelength:[2,12]    //请输入的数值在2至12位之间
    						},
    						number:{
    							required:true
    						},
    						email:{
    							required:true
    						},
    						password:{
    							required:true,
    							rangelength:[6,12]
    						},
    						url:{
    							required:true
    						},
    						date:{
    						},
    						"confirm-password":{
    							equalTo:"#password"     //必须密码相同
    						}
    					},
    					//自定义提示
    					messages:{
    						username:{
    							required:"用户名不能留空",      //用户名的必填项提示
    							rangelength:"请检查您输入的数值的长度是否在2至10之间"    //用户名的长度提示
    						},
    						password:{
    							rangelength:"账号或密码不正确，请重新输入"
    						}
    					}
    				});


  })
})
