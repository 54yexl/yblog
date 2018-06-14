<template>
  <div class="article">
      <!--搜索-->
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" v-model="filters">
         <el-form-item label="文章标签：" prop="tags">
            <el-select style="width: 150px" v-model="filters.tags"  clearable placeholder="请选择文章标签">
                <el-option
                v-for="item in formTags"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
          <el-form-item>
            <el-input  placeholder="搜索标题" v-model="filters.title"></el-input>
          </el-form-item>
          <el-form-item>
              <el-select clearable style="width: 120px" class="filter-item" v-model="filters.publish" placeholder="发布状态">
                <el-option   label="已发布" :value='true'></el-option>
                <el-option   label="未发布" :value="false"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="getArticlelist">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
       <!--table列表-->
      <el-table class="admintable" :data="tableData" border  style="width: 100%;" >
          <el-table-column type="index" >
          </el-table-column>
          <el-table-column prop="title" label="标题" >
          </el-table-column>
          <el-table-column prop="abstract" label="摘要" >
          </el-table-column>
          <el-table-column prop="content" label="内容" >
          </el-table-column>
          <el-table-column prop="publish" label="是否发布" :formatter="formatPublish">
          </el-table-column>
          <el-table-column prop="tags" label="标签" >
            <template slot-scope="scope">
              <el-tag v-for="tag in scope.row.tags"  :key="tag._id">
                  {{tag.name}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" >
          </el-table-column>
          <el-table-column label="操作" >
            <template slot-scope="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
              <el-button size="small" type='warning' @click="handlepublish(scope.$index, scope.row)">发布</el-button>
            </template>
          </el-table-column>
      </el-table>
      <!--分页-->
        <el-col :span="24" class="toolbar pagestyle" >
          <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :current-page="pages.current" :page-size="pages.size" :total="pages.total">
          </el-pagination>
        </el-col>
  </div>
</template>

<script>
import api from "@/api/api";
export default {
   data(){
     return{
       filters:{},
       pages:{
         total:0,
         size:10,
         current:1
        },
        formTags:[],
        tableData:[]
     }
   },
   methods:{
     //获取文章列表
     getArticlelist(){
        let para = {
          page: this.pages.current,
          size: this.pages.size,
          serachtitle: this.filters.title,
          publish:this.filters.publish,
          tags:this.filters.tags
        };
        api.requestArticleListPage(para).then(data => {
          this.pages.total=data.allPage;
          this.pages.current=data.page;
          this.tableData=data.articleArr;
        });
     },
     handleCurrentChange(val){
        this.pages.current=val;
     },
     //是否发布
     formatPublish(row, column){
        return row.publish == true ? '已发布' : row.publish == false ? '未发布' : '未知';
     },
     //获取所有标签
     getAllTags(){
        api.requestTaglist().then(data => {
            this.formTags = data.tagArr
        });
     },
     //编辑文章
     handleEdit(index, row){
        this.$router.push('/admin/addarticle/'+row.id);
     },
     //删除文章
     handleDel(index, row){
        api.requestDelArticle(row.id).then(data => {
            this.getArticlelist();
            this.$message({ type: "success", message: "删除成功" });
        });
     },
     //发布文章
     handlepublish(index, row){
        if(!row.publish){
          api.requestPublishArticle(row).then(data=>{
            this.getArticlelist();
            this.$message({ type: "success", message: "发布成功" });
          })
        }else{
          this.$message({ type: "error", message: "已发布成功，请勿再发布！" });
        }
     }
   },
   mounted(){
      this.getArticlelist();
      this.getAllTags()
   }
}
</script>

<style>

</style>
