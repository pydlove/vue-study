import * as url from '@/service/apiUrl'
const request = require('./http').request

/**
 * example
 */
export async function example(params) {
  const data = await request(
    url.example,
    params,
    'POST',
    {
      isLoading: true, // 是否有loading效果
      fullscreen: true, // 是否全屏loading
      target: 'body' // loading挂载对象
    },
    true
  )
  return data
}
