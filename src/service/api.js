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

export async function aiorequest(url, params, type, pop) {
    pop = pop == false ? false : true;
    const data = await request(url, params, type, pop, {
        // loading配置,不传默认全屏loading
        isLoading: true, // 是否有loading效果
        fullscreen: true, // 是否全屏loading
        target: 'body' // loading挂载对象
    })
    if(data.code == 200) {
        return data
    } else if (data.code == "error") {
        let res = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_login_intercept_nologin, params, "GET");
        if (res.code === 200 && res.data == 'NO_LOGIN') {
            this.$utils.removeCookie("aioctoken");
            this.$utils.removeStorage("avatar");
            this.$router.push({
                path: "/policy",
            })
            this.$promptMsg("请重新登录", "error");
            return  true;
        } else {
            this.$promptMsg("网络不稳定，请稍后再试", "error");
        }
    }
}
