<template>
    <div class="article">
        <div class="article-con">
            <h2 class="article-con-title">💃{{articleDetails.title}}</h2>
            <div class="article-con-PublishTime">{{articleDetails.lastEditTime}}</div>
            <div class="article-con-tag"><span v-for="tag in articleDetails.tags" :key="tag.id">#{{tag.name}}</span></div>
            <div  class="article-con-detail">{{articleDetails.content}}</div>
            <div class="article-con-foot">转载请注明来源：<span>修链子</span></div>
        </div>
    </div>
</template>

<script>
import api from "@/api/api";
export default{
data(){
     return{
       articleDetails:{
           tag:[]
       }//文章详情
     }
  },
  methods:{
     getArticleDetails(){
        api.requestArticleDetails(this.$route.params.id).then(data => {
               this.articleDetails=data.article;
        });
     }
  },
  mounted(){
      this.getArticleDetails();//获取文章详情
  }
}
</script>

<style lang="less" scoped>
  .article{
      width: 80%;
      max-width: 880px;
      font-size: 0.16rem;
      padding-top: 40px;
      margin: auto;
      line-height: 1.6;
      &-con{
          box-shadow: 1px 1px 10px rgba(26, 26, 26, .5);
          position: relative;
          padding: 0 20px;
          text-align: justify;
          background: #FFF;
          border-radius: 5px;
          &-title{
            text-align: center;
            padding: 40px 0 15px;
            line-height: 1.225;
            font-weight: bold;
          }
          &-PublishTime{
            position: absolute;
            left: 0;
            top: 0;
            border-bottom: solid 1px #18bc9c;
            padding: 4px 5px 0;
            font-size: 0.14rem;
            color: #18bc9c;
          }
          &-tag{
             position: absolute;
             right: 0px;
             top: 0px;
             background: #f1f1f1;
             & span{
                 padding:3px 5px;
             }
          }
          &-detail{
            padding: 10px 10px 20px 10px;
            word-break: break-all;
          }
          &-foot{
              text-align: right;
              font-size: 0.12rem;
              font-weight: bold;
              color: #666;
              padding: 10px;
              & span{
                  color:#999;
              }
          }
      }
      /*适配手机*/
      @media (max-width: 767px) {
          &-con{
              box-shadow: 1px 1px 10px rgba(26, 26, 26, .2);
          }
      }
  }
</style>