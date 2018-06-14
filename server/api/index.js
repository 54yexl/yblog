const Router = require('koa-router')
const UserController = require('../controllers/user')
const TagController = require('../controllers/tag')
const ArticleController = require('../controllers/article')

const config=require('./../config/config.js')
const router = new Router({
  prefix: config.app.baseApi
})


//后台接口

UserController.initUser();
router.post('/login', UserController.postLogin)//登录
router.post('/creattags', TagController.createTag)  // 创建tag
router.get('/tagslist', TagController.getAllTag)  // 获取所有tag
router.delete('/deletetag/:id', TagController.deleteTag)  //删除tag
router.post('/createarticle', ArticleController.createArticle)//创建文章
router.get('/articleslist', ArticleController.getAllArticles)//获取所有文章+搜索
router.delete('/deletearticles/:id', ArticleController.deleteArticle)//删除文章
router.post('/publishArticles/:id',ArticleController.publishArticle)//发布文章
router.get('/getArticleDetail/:id',ArticleController.getArticleDetail)//获取文章详情



//前台接口



module.exports = router;