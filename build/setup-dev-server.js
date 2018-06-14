const path = require('path')//node路径获取模块
const webpack = require('webpack');
const clientConfig = require('./webpack.client.config');



module.exports = function setupDevServer (app, cb) {
    let bundle
    let template
    const clientCompiler = webpack(clientConfig)//创建的编译器实例，注册调用插件
    const filePath = path.join(clientConfig.output.path, 'front.html');
    const devMiddleware = require('../build/koa2devmiddleware.js')(clientCompiler, {
            publicPath: clientConfig.output.publicPath,
            // quiet: true , //向控制台显示任何内容 
            index: filePath
        })
    app.use(devMiddleware);

    //判断客户端是否打包完成
    clientCompiler.plugin('done', () => {
        const fs = devMiddleware.fileSystem
        const filePath = path.join(clientConfig.output.path, 'front.html')
        if (fs.existsSync(filePath)) {
            template = fs.readFileSync(filePath, 'utf-8')
            if (bundle) {
              console.log('bundle1111111111111111111111 ok')
              cb(bundle, template)
            }
        }
    })
//   hot middleware
  app.use(require('../build/koa2hotmiddleware.js')(clientCompiler))


}