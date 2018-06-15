import axios from 'axios';
import { Message,Loading } from 'element-ui';
let loadingInstance='';

// 创建axios实例
const request = axios.create({
  baseURL: 'http://101.200.44.26:8886/', // 生产环境接口
//   withCredentials: true // 允许携带cookie
});
// request拦截器，实现loading加载
request.interceptors.request.use(config => {
    loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
    return config;
}, error => {
    loadingInstance.close();
    Message({ type: "error", message: error.response.data||'服务器挂啦' });
    return Promise.reject(error)
})


// http响应 response 拦截器
request.interceptors.response.use(response => {
    if(!response.data.success){
        //返回后台接口返回错误信息（可以在加个code非法用户登录掉线判断）
        Message({ type: "warning", message: response.data.message||'后台数据异常' });
        loadingInstance.close();
        return Promise.reject(response.data.message||'后台数据异常');
    }else{
        //成功请求
        loadingInstance.close();
        return response.data||response.data.path;//path是上传图片返回的字段
    }
},error => {
    Message({ type: "error", message: '服务器连接超时' });
    loadingInstance.close();
    return Promise.reject('服务器连接超时');   // 返回服务器的错误信息
});

export default request;

