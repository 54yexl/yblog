<template>
<div class="login-container">
    <el-form :model="user" status-icon :rules="signRules" ref="loginFormRef" label-width="0px" label-position="left" class="loginstyle">
      <h3>后台系统登录</h3>
      <el-form-item  prop="username" >
          <el-input  type="text" v-model="user.username" placeholder="用户名">
            <i slot="prefix" class="el-input__icon el-icon-news"></i>
          </el-input>
      </el-form-item>
      <el-form-item  prop="password">
          <el-input type="password" v-model="user.password" placeholder="密码"  @keyup.enter.native="submitForm">
            <i slot="prefix" class="el-input__icon el-icon-setting"></i>
          </el-input>
      </el-form-item>
      <el-form-item>
          <el-button style="width:100%;margin-top:20px;"  type="primary" @click="submitForm()">提交</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
import api from "@/api/api";
import md5 from 'md5'
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      signRules: {
        password: [{ required: true, message: "请输入密码" }],
        username: [{ required: true, message: "请输入用户名" }],
      }
    };
  },
  mounted(){
    
  },
  methods: {
    //提交
    submitForm() {
        this.$refs.loginFormRef.validate((valid) => {
            if(valid){
               //请求登录接口
               let obj={
                 username:this.user.username,
                 password:md5(this.user.password).toUpperCase()
               }
               api.requestLogin(obj).then(data=>{
                //  sessionStorage.setItem('user', JSON.stringify(data.userId));
                 this.$message({ type: "success", message: "登录成功" });
                 this.$router.push('/admin/articlelist');
               })
            }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login-container{
    position: fixed;
    height: 100%;
    width: 100%;
   .loginstyle{
      position: absolute;
      left: 0;
      right: 0;
      -webkit-border-radius: 5px;
      border-radius: 5px;
      -moz-border-radius: 5px;
      background-clip: padding-box;
      margin: 200px auto;
      width: 450px;
      padding: 35px 35px 15px 35px;
      background: #fff;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
      text-align: center;
     & h3{
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
        font-size: 30px;
     }
   }
}
</style>

