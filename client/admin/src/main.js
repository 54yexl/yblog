import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/admin/src/assets/global.css'
import mavonEditor from 'mavon-editor'//编辑器
import 'mavon-editor/dist/css/index.css'
Vue.use(ElementUI)
Vue.use(mavonEditor)


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
