# stage-demos
脚手架项目

###⒈ fis3+webpack+jquery+jquery插件

#####用法：
- 请确保你已安装fis3；
- 局部安装webpack ：npm install webpack --save-dev； 
- 安装jquery和imports：npm install jquery imports-loader --save-dev；

#####功能：
- fis3          //编译sass/less、压缩、打包、Browser自动刷新...
- webpack       //管理js、查找依赖


<br>

###2. fis3+requirejs+jquery+jquery插件

#####用法：
- 请确保你已安装fis3；
- requirejs、jqueryjs以及插件在scripts/libs目录下，配置文件在bulid目录下的main.js；
- html插入:

 ```javascript
   <script data-main="bulid/main" src="scripts/libs/require.min.js"></script>
 ```

#####功能：
- fis3          //编译sass/less、压缩、打包、Browser自动刷新...
- requirejs       //管理js、查找依赖
