<template>
  <div class="hcon">
    <ul class="hcon-list">
        <router-link v-for="item in articleList" :key="item.id" :to="'/front/articledetails/'+item.id"  tag="li">
            <!--标题-->
            <div class="hcon-list-title">{{item.title}}</div>
            <!--摘要-->
            <div class="hcon-list-section">
                <section>{{item.abstract}}.....</section>
            </div>
            <div class="hcon-list-label">
                <div class="hcon-list-label-tag"><span v-for="tag in item.tags" :key="tag.id">#{{tag.name}}</span></div>
                <div class="hcon-list-label-time">{{item.lastEditTime}}</div>
            </div>
            <div class="hcon-list-reading"><a>continue reading</a></div>
       </router-link>
    </ul>
  </div>
</template>

<script>
import api from "@/api/api";
export default {
  data(){
     return{
       pages:{
         total:0,
         size:10,
         current:1
       },
       articleList:[] //文章列表 
     }
  },
  methods:{
      //获取文章列表
     getArticlelist(){
        let para = {
          page: this.pages.current,
          size: this.pages.size,
          publish:true,
        };
        api.requestArticleListPage(para).then(data => {
          this.pages.total=data.allPage;
          this.pages.current=data.page;
          this.articleList=data.articleArr;
        });
     },
  },
  mounted(){
      this.getArticlelist();
  }


}
</script>

<style lang="less" scoped>
.hcon{
  width: 80%;
  max-width: 880px;
  margin:50px auto;
  &-list{
     & li{
        //  box-shadow: -1px 4px 25px #dadada;
        box-shadow: 1px 1px 10px rgba(26, 26, 26, .5);
         padding: 0 25px;
         position: relative;
         border-radius: 5px;
         cursor: pointer;
         margin-bottom: 40px;
     }
     &-title{
         font-size: 0.22rem;
         text-align: center;
         padding: 35px 0 10px 0;
     }
     &-section{
          padding: 10px 0px;
        & section{
            padding: 0 15px;
            border-left: solid 4px #18bc9c;
            font-size: 0.16rem;
            text-align: justify;
            line-height: 1.6;
            color: #666;
        }
     }
     &-label{
         display: flex;
         display: -webkit-flex;
         padding-top: 10px;
         &-tag{
            flex: 1;
            & span{
                padding: 3px 10px;
                margin: 0 3px;
                border-radius: 4px;
                background: #f1f1f1;
                &:hover{
                   background: #18bc9c;
                   color: #fff;
                }
            }
         }
         &-time{
            color: #9c9c9c;
            font-size: 0.14rem;
         }
     }
     &-reading{
         padding: 15px 0;
         font-size: 0.16rem;
         text-align: center;
         & a{
            display: inline-block;
            color: #18bc9c;
            padding: 4px 15px;
            border-radius: 5px;
            transition: all .5s;
            border: 1px solid #18bc9c;
            &:hover{
                background: #18bc9c;
                color: #fff;
            }
         }
     }
  }
}
</style>
