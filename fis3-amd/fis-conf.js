// 启用插件
fis.hook('relative');

// 让所有文件，都使用相对路径。
fis.match('*', {
  relative: true
})

//开启MD5戳
fis.match('*.{js,scss,css,png,jpg}', {
	useHash: true
});﻿

//编译
fis.match('*.scss', {
  parser: fis.plugin('sass'),
  rExt: '.css'
});

//压缩
fis.match('*.js', {
  optimizer: fis.plugin('uglify-js')
});
fis.match('*.scss', {
  optimizer: fis.plugin('clean-css')
});
fis.match('*.css', {
  optimizer: fis.plugin('clean-css')
});
fis.match('*.png,*.jpg', {
  optimizer: fis.plugin('png-compressor')
});

// amd配置
fis.hook('amd', {
    baseUrl: 'src/scripts',
    paths: {
        'jquery': 'libs/jquery-1.11.3',
        'compa': "comp/1-0"
    },
    shim: {
      'compa': ['jquery']
    }
})

fis.match('src/scripts/*.js', {
    isMod: true, // 设置 comp 下都是一些组件，组件建议都是匿名方式 define
    release: '/comp/$0'
});

fis.match('::package', {
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'amd',
        useInlineMap: false // 资源映射表内嵌
    })
})
