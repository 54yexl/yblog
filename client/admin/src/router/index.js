import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/admin/src/page/Login.vue'
import Home  from '@/admin/src/page/Home.vue'
import AddTag  from '@/admin/src/page/AddTag.vue'
import ArticleList  from '@/admin/src/page/ArticleList.vue'
import AddArticle  from '@/admin/src/page/AddArticle.vue'
Vue.use(Router)

export default new Router({
//   mode: 'history',
  routes: [
        {
            path: '/admin/login',
            component:Login,
            hidden: true
        },
        {
            path: '/admin',
            component: Home,
            iconCls: 'el-icon-goods',
            leaf: true,//只有一个节点    
            children: [
                { path: '/admin/articlelist',name: '文章列表',component:ArticleList}
            ]
        },
        {
            path: '/admin',
            component: Home,
            iconCls: 'el-icon-setting',
            leaf: true,//只有一个节点    
            children: [
                { path: '/admin/tag',name: '添加标签',component:AddTag}
            ]
        },
        {
            path: '/admin',
            component: Home,
            iconCls: 'el-icon-plus',
            leaf: true,//只有一个节点    
            children: [
                { path: '/admin/addarticle/:id',name: '添加文章',component:AddArticle}
            ]
        },
        {
          path: '*',
          redirect: '/admin',
          hidden: true
        }
  ]
})