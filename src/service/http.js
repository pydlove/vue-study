import axios from 'axios'
import { Message, Loading } from 'element-ui'
import utils from '@/utils/utils'

// 基础设置
axios.defaults.baseURL = process.env.VUE_APP_BASEURL // 设置公共apiUrl
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
let loadingInstance, loadingOptions

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // console.log(config, 'config')
    loadingOptions = config.loadingOptions
    if (loadingOptions.isLoading) {
      loadingInstance = Loading.service({
        ...loadingOptions,
        fullscreen: true,
        target: 'body',
        background: 'rgba(0, 0, 0, 0.8)'
      })
    }
    config.headers.authorization = utils.getCookie('authorization') || ''
    return config
  },
  error => {
    // if (loadingOptions.isLoading) {
    loadingInstance.close()
    // }
    Message({
      message: '加载超时',
      type: 'error',
      center: true
    })
    return Promise.reject(error)
  }
)
// 响应拦截器
axios.interceptors.response.use(
  response => {
    // console.log(response, 'response')
    // if (loadingOptions.isLoading) {
    setTimeout(() => {
      loadingInstance.close()
    }, 200)
    // }
      console.log(Number(response.data.code) === 200)
    if (response.data.code === 200) {
      if (response.headers.authorization) {
        utils.setCookie(
          'authorization',
          response.headers.authorization,
          60 * 60 * 24 * 30
        )
      }
    } else if (response.data.code === -1) {
      Message({
        message: '网络不稳定，请稍后再试',
        type: 'error',
        center: true
      })
    } else {
      if (response.data.msg) {
        Message({
          message: response.data.msg,
          type: 'error',
          center: true
        })
      }
    }
    return response
  },
  error => {
    // if (loadingOptions.isLoading) {
    loadingInstance.close()
    // }
    // console.log(error, 'http error')
    Message({
      message: '网络不稳定，请稍后再试',
      type: 'error',
      center: true
    })
    return Promise.reject(error)
  }
)

/**
 * 封装请求方法
 * @param {*} url api地址
 * @param {*} params 请求参数
 * @param {*} method 请求方式
 * @param {*} loadingOptions 加载遮罩配置
 */
export function request(
  url,
  params = {},
  method = 'POST',
  loadingOptions = {
    isLoading: true
  }
) {
  console.log(url, params, method, 'request')
  return new Promise(resolve => {
    axios({
      url,
      data: method === 'POST' || method === 'PUT' ? params : null,
      params: method === 'GET' || method === 'DELETE' ? params : null,
      method,
      loadingOptions
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        resolve({
          code: 'error',
          error: err
        })
        // reject(err)
      })
  })
}
