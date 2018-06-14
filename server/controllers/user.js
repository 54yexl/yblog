const User=require('../models/user');
const config=require('../config/config.js');
const md5=require('md5')


class UserController{
    static async initUser() {
        let user=await User.find().exec().catch(err=>{
            console.log(err)
        })
        //配置admin账号
        if(user.length===0){
            user=new User({
                username:config.admin.username,
                password:md5(config.admin.password).toUpperCase(),
                logindate:new Date()
            })
            await user.save().catch(err=>{
                console.log(err)
            })     
        }
    }
    static async postLogin(ctx){
        const username=ctx.request.body.username;
        const password=ctx.request.body.password;
        let user=await User.findOne({
            username
        }).exec();
        if(user!==null){
            if(user.password===password){
                ctx.body={
                    success:true,
                    uid:user._id,
                    name:user.username,
                }
            }else{
                ctx.body={
                    success:false,
                    message:'密码错误'
                }
            }
        }else{
            ctx.body={
                success:false,
                message:'用户名错误'
            }
        }

    }
}

module.exports=UserController