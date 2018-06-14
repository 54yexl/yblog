<template>
  <div id="app">
     <FrontHeader></FrontHeader>
     <div class="content">
       <router-view/>
     </div>
     
  </div>
</template>

<script>
import FrontHeader from "./components/FrontHeader.vue";
export default {
  name: 'app',
  components:{FrontHeader},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
</style>
