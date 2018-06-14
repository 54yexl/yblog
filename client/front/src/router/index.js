import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/front/src/page/Home.vue'
import ArticleDetails from '@/front/src/page/ArticleDetails.vue'
import Tag from '@/front/src/page/Tag.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
        {
          path: '/front',
          component:Home
        },
        {
          path:'/front/articledetails/:id',
          component:ArticleDetails
        },
        {
          path:'/tag',
          component:Tag
        },
        {
          path: '*',
          redirect: '/front'
        }
  ]
})