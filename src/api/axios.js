import axios from 'axios'
import JSONBig from 'json-bigint'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    if (data) {
      return JSONBig.parse(data)
    }
    return data
  }]
})
// 请求拦截
instance.interceptors.request.use(config => {
  const user = window.sessionStorage.getItem('chj74-toutiao')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截
instance.interceptors.response.use(response => response, error => {
  // 做一些事情
  if (error.response && error.response.status === 401) {
    // hash 哈希   是url后  #开始的字符串
    location.hash = '#/login'
  }
  return Promise.reject(error)
})

export default instance
