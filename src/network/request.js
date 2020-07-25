import axios from 'axios'

export function request(config) {
    //1.创建axios实例
    const instance = axios.create({
        // baseURL: "http://123.207.32.32:8000",
        baseURL: 'http://152.136.185.210:8000/api/n3',
        timeout: 5000
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