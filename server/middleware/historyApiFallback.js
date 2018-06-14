//代理请求返回前端的一个指定页面
//http://blog.lsqy.space/2017/03/28/170328%E5%8D%95%E9%A1%B5%E9%9D%A2%E5%BA%94%E7%94%A8%E7%9A%84History%E8%B7%AF%E7%94%B1%E6%A8%A1%E5%BC%8Fexpress%E5%90%8E%E7%AB%AF%E4%B8%AD%E9%97%B4%E4%BB%B6%E9%85%8D%E5%90%88/
function historyApiFallback (options) {
  //connect-history-api-fallback是express的控件
    const expressMiddleware = require('connect-history-api-fallback')(options)
    const url = require('url')
    return (ctx, next) => {
        let parseUrl = url.parse(ctx.req.url)
      // 添加path match，让不匹配的路由可以直接穿过中间件
        if(!parseUrl.pathname.match(options.path)) {
            return next()
        }
      // 修改content-type
      ctx.type = 'html'
      return expressMiddleware(ctx.req, ctx.res, next)
    }
  }
  
  module.exports = historyApiFallback
  