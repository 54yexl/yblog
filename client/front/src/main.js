import Vue from 'vue'
import App from './App'
import router from './router'
import '@/front/src/assets/css/global.css'
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})