////node后台与客户端热部署联通中间件dev-middleware是express中间件需转化为koa2中间件 
// 路由一旦跳出了就回退一步原因:https://segmentfault.com/a/1190000004883199?utm_source=tuicool&utm_medium=referral
const devMiddleware = require('webpack-dev-middleware');

module.exports = (compiler, opts) => {
  const expressMiddleware = devMiddleware(compiler, opts)
  let nextFlag = false;
  function nextFn() {
    nextFlag = true;
  }
  function devFn(ctx, next) {
    expressMiddleware(ctx.req, {
        end: (content) => {
          ctx.body = content
        },
        setHeader: (name, value) => {
          ctx.headers[name] = value
        }
      }, nextFn)
    if(nextFlag) {
      nextFlag = false;
      return next();
    }
  }
  devFn.fileSystem = expressMiddleware.fileSystem
  return devFn;
}
