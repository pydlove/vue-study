import url from '@/service/apiUrl'
const request = require('./http').request
/**
 * api function
 */
export async function example(params) {
  const data = await request(url.example, params, 'POST', {
    // loading配置,不传默认全屏loading
    isLoading: true, // 是否有loading效果
    fullscreen: true, // 是否全屏loading
    target: 'body' // loading挂载对象
  })
  return data
}

export async function aiorequest(url, params, type) {
    const data = await request(url, params, type, {
        // loading配置,不传默认全屏loading
        isLoading: true, // 是否有loading效果
        fullscreen: true, // 是否全屏loading
        target: 'body' // loading挂载对象
    })
    return data
}
