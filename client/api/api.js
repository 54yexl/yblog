import request from './request.js';

export default{
    requestLogin(params) {
        return request.post('/api/login',params);
    },
    requestCreatTags(params) {
        return request.post('/api/creattags',params);
    },
    requestTaglist(params) {
        return request.get('/api/tagslist',params);
    },
    requestDelTag(params) {
        return request.delete('/api/deletetag/'+ params);
    },
    requestCreatArticle(params) {
        return request.post('/api/createarticle/', params);
    },
    requestArticleListPage(params){
        return request.get('/api/articleslist',{ params: params });
    },//请求所有文章列表+模糊搜索标题
    requestDelArticle(params) {
        return request.delete('/api/deletearticles/'+ params);
    },
    requestPublishArticle(params) {
        return request.post('/api/publishArticles/'+ params.id,{publish:true});
    },
    requestArticleDetails(params) {
        return request.get('/api/getArticleDetail/'+ params);
    },
    
}