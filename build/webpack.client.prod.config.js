const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')//合并webpack配置
const baseConfig = require('./webpack.base.config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')//生成dist,index文件

module.exports = merge(baseConfig, {
  output: {
    filename: '[name].[chunkhash].js', // 文件名称加上 chunkhash 值
  },
  plugins: [
    //提取第三方库vendor、manifest
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor_admin',
        chunks: ['admin'],
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor_front',
        chunks: ['front'],
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: "manifest",
        minChunks: Infinity
    }),
    new HtmlWebpackPlugin({//生成多个html文件，多页面配置
      filename: 'front.html',
      template: './client/front/index.html',
      chunks: ['manifest', 'vendor_front','front'],//多入口文件对应生成编译后的js
      inject: true//script标签位于html文件的 body 底部
    }),
    new HtmlWebpackPlugin({
      filename: 'admin.html',
      template: './client/admin/index.html',
      chunks: ['manifest', 'vendor_admin','admin'],//admin打包生成对应的js文件
      inject: true//script标签位于html文件的 body 底部
    })
  ]
})