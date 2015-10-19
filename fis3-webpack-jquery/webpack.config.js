var webpack = require('webpack');

module.exports = {
  entry: {
    app: './scripts/entry.js',
    vendor: ['jquery'],
  },
  output: {
    filename: './bulid/bundle.js'
  },

    plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    }),
     new webpack.optimize.CommonsChunkPlugin('vendor', './bulid/vendor.js')//这是妮第三方库打包生成的文件
    ]
};