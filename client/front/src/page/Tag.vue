<template>
  <div class="tag" >
      <div class="tag-seach"><input v-model="filters.serachtitle" placeholder="回车搜索标题" @keyup.enter="getSeachArticle"/></div>
      <div class="tag-eltag">
          <span v-for="(tag,index) in TagsList" v-bind:class="{active:tag.active}" :key="tag.id" @click="selectTag(index)">{{tag.name}}</span>
      </div>
      <ul class="tag-list">
          <router-link v-for="item in articleList" :key="item.id" :to="'/front/articledetails/'+item.id"  tag="li">
            {{item.lastEditTime}}   💃{{item.title}}
          </router-link>
      </ul>
  </div>
</template>

<script>
import api from "@/api/api";
export default {
data(){
    return{
      filters:{
          selectTags:'',
          serachtitle:''
      },//搜索条件
      pages:{
         total:0,
         size:10,
         current:1
      },
      TagsList:[],//标签列表
      articleList:[] //文章列表 
    }
},
methods:{
    //获取所有标签
     getAllTags(){
        api.requestTaglist().then(data => {
            //初始化标签未选中
            data.tagArr.map((value,index,array)=>{
                data.tagArr[index].active = false;
            });
            this.TagsList = data.tagArr;
        });
     },
     //搜索文章
     getSeachArticle(){
       let para = {
          page: this.pages.current,
          size: this.pages.size,
          serachtitle: this.filters.serachtitle,
          publish:true,
          tags:this.filters.selectTags
        };
        api.requestArticleListPage(para).then(data => {
          this.pages.total=data.allPage;
          this.pages.current=data.page;
          this.articleList=data.articleArr;
        });
     },
     //点击标签
     selectTag(index){
         var check = this.TagsList[index].active;
         this.TagsList[index].active = check === true ? false :true;
         let arrayselect=[];
         this.TagsList.map((value,index,array)=>{
             if(value.active){
                arrayselect.push(value.id);
             }
         });
         this.filters.selectTags=arrayselect.join(",");
         this.getSeachArticle();
     }
},
mounted(){
    this.getAllTags();
    this.getSeachArticle();
}

}
</script>

<style lang="less" scoped>
.tag{
    width: 80%;
    max-width: 880px;
    margin:50px auto;
    &-seach{
        font-size: 0.16rem;
        margin-bottom: 22px;
        text-align: center;
        & input{
            background-color: #fff;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            color: #606266;
            display: inline-block;
            font-size: inherit;
            height: 40px;
            line-height: 40px;
            padding: 0 15px;
            border: solid 1px #18bc9c;
        }
    }
    &-eltag{
        & span{
            margin: 0 10px 20px 0; 
            padding: 0 10px;
            height: 32px;
            line-height: 30px;
            font-size: 12px;
            border-radius: 4px;
            box-sizing: border-box;
            color: #000;
            border: solid 1px #bfbfbf;
            white-space: nowrap;
            text-align: center;
            cursor: pointer;
            &:hover{
               border: 1px solid #18bc9c;
            }
            &.active{
               border: 1px solid #18bc9c;
               color: #fff;
               background-color: #18bc9c;
            }
        }
    }
    &-list{
        & li{
            line-height: inherit;
            font-size: 0.16rem;
            border-bottom: 1px dashed #ccc;
            list-style-type: disc;
            padding: 15px 0;
            cursor: pointer;
            &:hover{
                color: #18bc9c;
            }
         }
    }
}
</style>
