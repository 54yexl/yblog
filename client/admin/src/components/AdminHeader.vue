<template>
  <div class="main">
    <el-menu class="el-menu-vertical-demo" :default-active="$route.path" :router="true" :unique-opened="true" :collapse="isCollapse"  @open="handleOpen" @close="handleClose"  background-color="#304156" text-color="#bfcbd9" active-text-color="#20a0ff">
      <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
        <el-submenu :index="index+''" v-if="!item.leaf" :key="item.name">
          <template slot="title"><i :class="item.iconCls"></i><span>{{item.name}}</span></template>
          <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
        </el-submenu>
        <!--单个节点-->
        <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" :key="item.name">
          <i :class="item.iconCls"></i><span>{{item.children[0].name}}</span>
        </el-menu-item>
      </template>
    </el-menu>

      <!--右侧-->
      <div class="main-containter" v-bind:class="{ activecollapse: isCollapse }">
        <!--头部-->
        <div class="main-containter-head">
          <span class="fa fa-bars" @click="clickcollapse"></span>
          <span>{{$route.name}}</span>
          <el-dropdown class="main-containter-head-right">
              <span class="el-dropdown-link">
                叶某某<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>返回首页</el-dropdown-item>
                <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!--内容-->
        <div class="main-containter-content">
            <router-view></router-view>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'NavLeftBar',
    data() {
      return {
        isCollapse: false
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      //收缩左侧栏
      clickcollapse(){
        this.isCollapse=!this.isCollapse;
      },
      //退出登录
      logout(){
        this.$router.push('/admin/login');
      }
    },
    mounted(){
    },
  }
</script>

<style lang="less" scoped>
  .main{
    width: 100%;
    height: 100%;
      & .el-menu-vertical-demo{     
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        overflow: hidden;
        border-right:none;
        z-index: 99;
        &:not(.el-menu--collapse){
          width: 200px;
        }
      }
      &-containter{
         margin-left: 200px;
         height: 100%;
         &.activecollapse{
            margin-left: 64px!important;
         }
         &-head{
            height: 50px;
            line-height: 50px;
            padding: 0 10px;
            border-bottom: 1px solid #e6e6e6;
            font-size: 18px;
            background: #eff2f7;
            & .fa-bars{
              padding: 0px 15px 0 5px;
              cursor: pointer;
              font-size: 20px;
            }
            &-right{
              float: right;
              width: 70px;
              text-align: center;
              cursor: pointer;
            }
         }
         &-content{
           padding: 20px;
           height: calc(100% - 50px);
           overflow-y: auto;
         }
      }
  }
</style>
