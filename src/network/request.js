import axios from 'axios'

export function request(config) {
    //1.创建axios实例
    const instance = axios.create({
        // baseURL: "http://123.207.32.32:8000",
        timeout: 10000
    })
    //2.axios拦截器
    instance.interceptors.request.use(config=>{
        return config
    },error => {
        console.log(error);
    })
    // 3 发送真正的网络请求
    return instance(config)
}
