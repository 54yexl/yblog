
const mongoose=require('mongoose')
const moment=require('moment')
moment.locale('zh-cn');
const Schema=mongoose.Schema;
const articleScheme=new Schema({
    title:String,//标题
    content:String,//内容
    abstract:String,//摘要
    tags:[{
        type:Schema.Types.ObjectId,
        ref:'tag'//关联标签名表，通过objectid字段关联
    }],
    publish:{
        type:Boolean,
        default:false
    },//发布是否成功状态
    createTime:{
        type:Date
    },
    lastEditTime:{
        type:Date,
        default:Date.now
    }
},{
    versionKey:false//
});
articleScheme.set('toJSON',{
    getters:true,
    virtuals:true
});
articleScheme.set('toObject',{
    getters:true,
    virtuals:true
});
articleScheme.path('createTime').get(function(v){
    return moment(v).format('lll');
});
articleScheme.path('lastEditTime').get(function(v){
    return moment(v).format('lll');
});

module.exports=mongoose.model('article',articleScheme);