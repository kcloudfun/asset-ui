import axios from 'axios'
import { Message, Loading } from 'element-ui'

let loadingInstance = null // 这里是loading

// 使用create方法创建axios实例
export const service = axios.create({
    timeout: 10000, // 请求超时时间
    baseURL: ""
})

// 添加请求拦截器
service.interceptors.request.use(config => {
    loadingInstance = Loading.service({
        lock: true,
        text: 'loading...'
    })
    return config
})

// 添加响应拦截器
service.interceptors.response.use(response => {
    loadingInstance.close()
    return response
}, error => {
    const msg = error.Message !== undefined ? error.Message : ''
    Message({
        message: '网络错误' + msg,
        type: 'error',
        duration: 3 * 1000
    })
    loadingInstance.close()
    return Promise.reject(error)
})

export default service