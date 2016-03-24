require.config({
  baseUrl: 'src/js',
  paths: {
      'zepto': 'libs/zepto-1.1.6',
      'fastclick': "libs/fastclick-1.0.6",
      'common': "comp/common",
      '1': "comp/1"

  },
  shim: {
    'fastclick': ['zepto'],
    'common': ['zepto'],
    '1': ['zepto']
  }
})

require(['zepto', 'common', 'fastclick', '1'], function($) {
  //dosomething
  
})
