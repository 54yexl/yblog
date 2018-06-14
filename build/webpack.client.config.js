const webpack = require('webpack')
const merge = require('webpack-merge')//合并webpack配置
const baseConfig = require('./webpack.base.config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')//生成dist,index文件

module.exports = merge(baseConfig, {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 开启全局的模块热替换(HMR)
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({//生成多个html文件，多页面配置
      filename: 'front.html',
      template: './client/front/index.html',
      chunks: ['front'],//多入口文件对应生成编译后的js
      inject: true//script标签位于html文件的 body 底部
    }),
    new HtmlWebpackPlugin({
      filename: 'admin.html',
      template: './client/admin/index.html',
      chunks: ['admin'],//admin打包生成对应的js文件
      inject: true//script标签位于html文件的 body 底部
    })
  ]
})