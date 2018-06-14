<template>
  <div class="addtag">
      <el-col :span="24" class="toolbar">
          <el-form :inline="true">
            <el-form-item>
              <el-button type="primary" icon="el-icon-edit" @click="handleAdd">添加</el-button>
            </el-form-item>
          </el-form>
     </el-col>
     <el-tag v-for="tag in tags"  :key="tag._id" closable @close="delTag(tag)">
        {{tag.name}}
     </el-tag>
    <!--新增标签-->
    <el-dialog title='新增标签' :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addFormRef">
            <el-form-item label="标签名" prop="name">
                <el-input v-model="addForm.name" @keyup.enter.native="addSubmit"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native=" addFormVisible = false">取消</el-button>
            <el-button type="primary"  @click.native="addSubmit()" >提交</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api/api";
export default {
   data() {
      return {
        addForm:{},
        addFormVisible: false,//新增界面是否显示
        addFormRules:{name: [{ required: true, message: '请输入标签名', trigger: 'blur' }],},
        tags: []
      };
    },
    methods:{
        //添加弹框
        handleAdd(){
           this.addFormVisible = true;
           this.addForm={};
        },
        //提交表单
        addSubmit(){
           this.$refs.addFormRef.validate((valid) => {
			  if (valid) {
                 api.requestCreatTags(this.addForm).then(data=>{
                     this.addFormVisible = false;
                     this.getAllTags();
                 })
              }
           })
       },
       //删除标签
       delTag(obj){
           api.requestDelTag(obj._id).then(data=>{
                this.getAllTags();
                this.$message({ type: "success", message: "删除成功" });
           })
       },
       //获取标签
       getAllTags(){
           api.requestTaglist().then(data => {
              this.tags = data.tagArr
           });
       }

    },
    mounted(){
        this.getAllTags()
    }

}
</script>

<style lang="less" scoped>
.el-tag{
    margin:0 10px 20px 0;
}
</style>
