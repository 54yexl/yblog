<template>
  <div class="addarticle">
     <h3>添加文章</h3>
     <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addFormRef">
        <el-form-item label="文章标签：" prop="tags">
            <el-select  v-model="addForm.tags" multiple  clearable placeholder="请选择文章标签">
                <el-option
                v-for="item in formTags"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="文章标题：" prop="title">
          <el-input v-model="addForm.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="文章摘要：" prop="abstract">
          <el-input type="textarea" v-model="addForm.abstract" placeholder="请输入文章摘要"></el-input>
        </el-form-item>
        <el-form-item label="文章内容：" prop="content">
            <mavon-editor ref=md  :toolbars='toolbars'  class="editorstyle" @imgAdd="$imgAdd"   v-model="addForm.content"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" icon="el-icon-edit" @click.native="addSubmit()">保存</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from "@/api/api";
export default {
   data(){
       return{
          addForm: {tags:[]},
          addFormRules: {
            //   tags: [{ required: true, message: '请输入文章标签', trigger: 'blur' }],
              title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
              abstract: [{ required: true, message: '请输入文章摘要', trigger: 'blur' }],
              content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
          },
          formTags:[],//标签列表
          toolbars:{
            bold: true, // 粗体
            header: true,// 标题
            mark: true, // 标记
            superscript: true, // 上角标
            subscript: true, // 下角标
            quote: true, // 引用
            ol: true, // 有序列表
            ul: true, // 无序列表
            link: true, // 链接
            imagelink: true, // 图片链接
            code: true, // code
            table: true, // 表格
            fullscreen: true, // 全屏编辑
            alignleft: true, // 左对齐
            aligncenter: true, // 居中
            alignright: true, // 右对齐
            trash: true, // 清空
            htmlcode: true,// 展示html源码
          },//编辑器
       }
   },
   watch:{
       "$route":'changetheme'//路由写在addarticle组件里，只能监听addarticle里面组件routerview路由的变化
   },//监听路由变化+mouncted渲染与清空文章编辑器
   methods:{
     //获取所有标签
     getAllTags(){
        api.requestTaglist().then(data => {
            this.formTags = data.tagArr
        });
     },
     //编辑器上传图片
      $imgAdd(pos, $file){
        //    var formdata = new FormData();
        //    formdata.append('image', $file);
        //    editoruploadImage(formdata).then(data => {
        //        this.$refs.md.$img2Url(pos,data[0]);
        //    });
      },
      addSubmit(){
          this.$refs.addFormRef.validate((valid) => {
			  if (valid) {
                  api.requestCreatArticle(this.addForm).then(data=>{
                     this.$message({ type: "success", message: "保存成功" });
                     this.$router.push('/admin/articlelist');
                 })
              }
          })
      },
      changetheme(){
          //判断是否是编辑入口
          if(this.$route.params.id&&this.$route.params.id!=':id'){
                    api.requestArticleDetails(this.$route.params.id).then(data => {
                        this.addForm.title=data.article.title;
                        this.addForm.abstract=data.article.abstract;
                        this.addForm.content=data.article.content;
                        data.article.tags.map((value,index,array)=>{
                            this.addForm.tags.push(value.id)
                        })
                    });
            }else{
                this.addForm={
                    tags:[]
                };
            }
      }
   },
   mounted(){
      this.getAllTags();
      this.changetheme();//当dom元素没变化时，vue生命周期是从beforeupload开始继续渲染，所以没走mounted
   }




}
</script>

<style lang="less">
.addarticle{
   & h3{
       font-size: 18px;
       padding: 0 0 30px 9px;
       font-weight: bold;
   }
   & .editorstyle{
        border:solid 1px #dcdfe6!important;
        border-radius: 3px;
        .op-icon-divider{
            height: 0px!important;
        }
        .v-note-op{
            border:solid 1px #dcdfe6;
            border-bottom: 0;
            box-shadow: 0 0px 0px rgba(0,0,0,0.157), 0 0px 0px rgba(0,0,0,0.227)!important;
        }
        .v-note-panel{
            box-shadow: 0 0px 0px rgba(0,0,0,0.157), 0 0px 0px rgba(0,0,0,0.227)!important;
            border:solid 1px #dcdfe6;
        }
    }
}
</style>
