
module.exports = {
      app: {
        port: process.env.PORT || 8886,
        baseApi: '/api'
      },
      mongodb: {
        url: process.env.MONGO_URL || 'mongodb://localhost:27017/yblog'// 连接数据库 如果不自己创建 默认yblog数据库会自动生成
      },
      jwt: {
        secret: 'yblog' //used when we create and verify JSON Web Tokens
      },
      mongodbSecret: { //mongodb用户和密码
        user: '',
        pass: ''
      },
      admin: {  //后台初始化的用户名密码
          username: 'admin',
          password: 'yblog'
      }
  };
  