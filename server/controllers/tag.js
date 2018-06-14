const Tag=require('../models/tag');

class TagController{
    //添加标签
    static async createTag(ctx){
        const tagName=ctx.request.body.name;
        if(tagName==""){
            ctx.body={
                success:false,
                message:'标签名不能为空'
            }
        }
        const tag=await Tag.findOne({name:tagName}).catch(err=>{
            ctx.throw(500,'server error')
        });//寻找数据库是否存在这一条数据
        if(tag!==null){
            ctx.body={
                success:false,
                message:"标签已存在"
            }
            return;
        }
        const newTag=new Tag({
            name:tagName
        });
        const result=await newTag.save().catch(err=>{
            ctx.throw(500,'server error !!!')
        })//存储数据入数据库
        ctx.body={
            success:true,
            tag:result
        }
    }

    static async getAllTag(ctx){
        const tagArr=await Tag.find().catch(err=>{
            ctx.throw(500,'server error !!!')
        });
        ctx.body={
            success:true,
            tagArr
        }
    }

    static async  deleteTag(ctx) {
        const id = ctx.params.id;
        console.log(id)
        const tag = await Tag.findByIdAndRemove(id).catch(err => {
          if (err.name === 'CastError') {
              ctx.body={
                    success:false,
                    message:'标签id不存在'
               }
          } else {
            ctx.throw(500, 'server error !!!')
          }
        });
        ctx.body = {
          success: true
        }
      }
}
module.exports=TagController
