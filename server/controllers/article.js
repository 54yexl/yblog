const Article = require('../models/article');
//数据库查询条件https://www.jianshu.com/p/554a5bf67b31
class ArticleController {
//创建文章
static async createArticle(ctx) {
  const title = ctx.request.body.title;
  const abstract=ctx.request.body.abstract;
  const content = ctx.request.body.content;
  const publish = ctx.request.body.publish;
  const tags = ctx.request.body.tags;
  const createTime = new Date();
  if (!title) {
      ctx.body={
          success:false,
          message:'标题不能为空'
      }
  }
  if(!abstract){
      ctx.body={
          success:false,
          message:'摘要不能为空'
      }
  }
  if (!content) {
      ctx.body={
          success:false,
          message:'文章内容不能为空'
      }
  }
  if (!tags || tags.length == 0) {
      ctx.body={
          success:false,
          message:'标签名不存在'
      }
  }
  const article = new Article({
      title,
      abstract,
      content,
      publish,
      tags,
      createTime,
  })
  let createResult = await article.save().catch(err => {
    ctx.throw(500, 'server error !!!')
  });
  await Article.populate(createResult, {
    path: 'tags'
  }, function (err, result) {
    createResult = result;
  });//跨表查询 语法'Query.populate(path, [select], [model], [match], [options])'
  //path:要查询的表 select：可选指定要查询的字段
  ctx.body = {
    success: true,
    article: createResult
  }
}
//获取+搜索所有文章
static async getAllArticles(ctx) {
    const tags = ctx.query.tags;//搜索标签
    const page = +ctx.query.page;//当前页
    const limit = +ctx.query.size || 4;//分页大小
    const searchTitle=ctx.query.serachtitle;//搜索标题
    const publish = ctx.query.publish//是否发布   
    let skip = 0;//skip()用来跳过指定数量的数据
    let articleArr;//前端显示文章数组
    let allPage;//所有页面
    let allNum; //所有数据总数
    let queryStr={}//搜索参数整合
    if (page !== 0) {
      skip = limit * (page - 1)
    }
    if(publish){
       queryStr.publish=publish;
    }
    if(tags){
      let tagArr=tags.split(',')
      // queryStr.tags={"$all":tagArr};
      queryStr.tags={"$in":tagArr};
    }
    if(searchTitle){
      queryStr.title={"$regex":new RegExp(searchTitle)};//模糊查询参数
    }
    // console.log(queryStr)

    articleArr = await Article.find(queryStr).populate("tags")
      .sort({
        createTime: -1
      })
      .limit(limit)//从mongodb中读取记录的条数
      .skip(skip).catch(err => {
        ctx.throw(500, 'server error !!!')
      })//skip来跳过指定数量的数据
    allNum = await Article.find(queryStr).count().catch(err => {
      ctx.throw(500, 'server error !!!')
    })
    allPage = Math.ceil(allNum / limit)
    ctx.body = {
      success: true,
      articleArr,
      allPage,
      page,
      allNum
    }
  }




//删除文章
static async deleteArticle(ctx) {
  const id = ctx.params.id;
  const article = await Article.findByIdAndRemove(id).catch(err => {
    if (err.name === 'CastError') {
      ctx.body={
          success:false,
          message:'文章id不存在'
      }
    } else {
      this.throw(500, 'server error !!!')
    }
  });
  ctx.body = {
    success: true
  }
}
//发布文章
static async publishArticle(ctx) {
  const id = ctx.params.id;
  //添加已发布返回已发布请不要重复发布。
  //未发布更新数据库
  const article = await Article.findByIdAndUpdate(id, {
    $set: ctx.request.body//mongodb字段更新
  }).catch(err => {
    if (err.name === 'CastError') {
      ctx.body={
          success:false,
          message:'文章id不存在'
      }
    } else {
      this.throw(500, 'server error !!!')
    }
  });
  ctx.body = {
    success: true
  }
}

//获取文章详情
static async getArticleDetail(ctx) {
  const id = ctx.params.id;
  if (id == '') {
    ctx.body={
        success:false,
        message:'文章id不存在'
    }
  }

  const article = await Article.findById(id).populate('tags').catch(err => {
    if (err.name === 'CastError') {
      ctx.body={
          success:false,
          message:'文章id不存在'
      }
    } else {
      ctx.throw(500, 'server error !!!')
    }
  });
  ctx.body = {
    success: true,
    article: article
  }
}








}





module.exports = ArticleController
