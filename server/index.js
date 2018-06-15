const Koa = require('koa');
const static = require('koa-static')
const config = require('./config/config.js');
const mongoose = require('mongoose');
const koalogger =require( 'koa-logger')//报错日志
const bodyParser=require('koa-bodyparser')//请求数据解析
const historyApiFallback =require( './middleware/historyApiFallback')//vue走history路由
const koaconvert =require( 'koa-convert')//它应该能够将任何传统的生成器中间件转换为现代承诺中间件
const router = require('koa-router')()
const api=require('./api')//koa2路由

mongoose.Promise = Promise;//mongoose promise化
// 连接 mongodb
mongoose.connect(config.mongodb.url, config.mongodbSecret);
mongoose.connection.on('error', console.error)//mongodb连接失败
mongoose.connection.once('open', function (callback) {});//mongodb连接成功
const app = new Koa();
app.use(koalogger());
app.use(bodyParser());

const staticPath = './dist'
app.use(static(staticPath))
// 创建渲染器，开启组件缓存
let renderer;

function createRenderer(bundle, template) {
    return createBundleRenderer(bundle, {
        template,
        cache: require('lru-cache')({
            max: 1000,
            maxAge: 1000 * 60 * 15,
        }),
        runInNewContext: false,
    });
}

//不走请求服务端的路由直接走historyApiFallback中间件返回指定页面
//服务端启动带动客户端热加载,刷新跳404不存在页面
//https://mmxiaowu.com/article/589af63fe9be1c5b21ef8e9b
app.use(koaconvert(historyApiFallback({
  verbose: true,//开启日志
  rewrites: [
    { from: /^\/front$/, to: '/front.html' },
    { from: /^\/front\/login/, to: '/front.html' },
    { from: /^\/admin$/, to: '/admin.html' },
    { from: /^\/admin\/login/, to: '/admin.html' },
  ],
})))



//判断环境的打包入口
if (process.env.NODE_ENV === 'production') {
   console.log('读取生产环境配置')
   app.use(static(staticPath))
} else {
  console.log('读取开发环境配置')
  require('../build/setup-dev-server')(app, (bundle, template) => {
    renderer = createRenderer(bundle, template)
  })
  
}





//koa2路由
app.use(api.routes()).use(api.allowedMethods());
app
  .use(router.routes())
  .use(router.allowedMethods());
// 开启服务
app.listen(config.app.port, () => {
    console.log('The server is running at http://localhost:' + config.app.port);
});