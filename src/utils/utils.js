const utils = {
    random_No: function (j) {
        var random_no = "";
        for (var i = 0; i < j; i++) //j位随机数，用以加在时间戳后面。
        {
            random_no += Math.floor(Math.random() * 10);
        }
        random_no = new Date().getTime() + random_no;
        return random_no;
    },


    setCookie: function (key, value, time) {
        // 设置cookie time传值单位为秒
        var exp = new Date()
        exp.setTime(exp.getTime() + time * 1000)
        if (time) {
            document.cookie =
                key + '=' + escape(value) + ';expires=' + exp.toGMTString()
        } else {
            document.cookie = key + '=' + escape(value)
        }
    },
    removeCookie: function (key) {
        // 移除cookie
        this.setCookie(key, 'null', -999999)
    },
    getCookie: function (key) {
        // 获取cookie
        let reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)')
        let arr = document.cookie.match(reg)
        return arr ? unescape(arr[2]) : null
    },
    setStorage: function (key, value) {
        // 存储localStorage
        localStorage.setItem(key, JSON.stringify(value))
    },
    getStorage: function (key) {
        // 获取localStorage
        return JSON.parse(localStorage.getItem(key))
    },
    removeStorage: function (key) {
        // 删除localStorage
        localStorage.removeItem(key)
    },
    setSession: function (key, value) {
        // 存储sessionStorage
        sessionStorage.setItem(key, JSON.stringify(value))
    },
    getSession: function (key) {
        // 获取sessionStorage
        return JSON.parse(sessionStorage.getItem(key))
    },
    removeSession: function (key) {
        // 删除sessionStorage
        sessionStorage.removeItem(key)
    },
    logout: function () {
        utils.removeCookie('authorization')
        sessionStorage.clear()
        localStorage.clear()
        window.location.reload()
    },
    getUuid: function () {
        let S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        }
        let uuid =
            S4() +
            S4() +
            '-' +
            S4() +
            '-' +
            S4() +
            '-' +
            S4() +
            '-' +
            S4() +
            S4() +
            S4()
        let timeStamp = new Date().getTime()
        return uuid + timeStamp
    },
    placeCaretAtEnd: async function (dom) {
        // 光标定位到输入字符最后
        let el = await document.querySelector(dom)
        el.focus()
        if (
            typeof window.getSelection !== 'undefined' &&
            typeof document.createRange !== 'undefined'
        ) {
            var range = document.createRange()
            range.selectNodeContents(el)
            range.collapse(false)
            var sel = window.getSelection()
            sel.removeAllRanges()
            sel.addRange(range)
        } else if (typeof document.body.createTextRange !== 'undefined') {
            var textRange = document.body.createTextRange()
            textRange.moveToElementText(el)
            textRange.collapse(false)
            textRange.select()
        }
    },
    insertContent(content) {
        if (!content) {
            // 如果插入的内容为空则返回
            return
        }
        let sel = null
        if (document.selection) {
            // IE9以下
            sel = document.selection
            sel.createRange().pasteHTML(content)
        } else {
            sel = window.getSelection()
            if (sel.rangeCount > 0) {
                let range = sel.getRangeAt(0) // 获取选择范围
                range.deleteContents() // 删除选中的内容
                let el = document.createElement('div') // 创建一个空的div外壳
                el.innerHTML = content // 设置div内容为我们想要插入的内容。
                let frag = document.createDocumentFragment() // 创建一个空白的文档片段，便于之后插入dom树

                let node = el.firstChild
                let lastNode = frag.appendChild(node)
                range.insertNode(frag) // 设置选择范围的内容为插入的内容
                let contentRange = range.cloneRange() // 克隆选区
                contentRange.setStartAfter(lastNode) // 设置光标位置为插入内容的末尾
                contentRange.collapse(true) // 移动光标位置到末尾
                sel.removeAllRanges() // 移出所有选区
                sel.addRange(contentRange) // 添加修改后的选区
            }
        }
    },
    getBase64: function (img) {
        // 传入在线图片路径，返回base64
        return new Promise((resolve, reject) => {
            var image = new Image()
            image.crossOrigin = 'anonymous'
            image.src = img
            var url = ''
            // console.log(image, 'iii')
            // var deferred = $.Deferred()
            if (img) {
                image.onload = function () {
                    url = utils.getBase64Image(image)
                    if (url) {
                        resolve(url)
                    } else {
                        reject(url)
                    }
                }
            }
        })
    },
    getBase64Image: async function (img, width, height) {
        // width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
        var canvas = document.createElement('canvas')
        canvas.width = width || img.width
        canvas.height = height || img.height
        var ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        var dataURL = await canvas.toDataURL()
        // console.log(dataURL)
        return dataURL
    },
    dataURLtoFile: function (dataurl, filename) {
        // base64转换为文件
        var arr = dataurl.split(',')
        var mime = arr[0].match(/:(.*?);/)[1]
        var bstr = atob(arr[1])
        var n = bstr.length
        var u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], filename, {
            type: mime,
        })
    },
    secondToDate(second) {
        // 秒转时分秒
        var h =
            Math.floor(second / 3600) < 10
                ? '0' + Math.floor(second / 3600)
                : Math.floor(second / 3600)
        var m =
            Math.floor((second / 60) % 60) < 10
                ? '0' + Math.floor((second / 60) % 60)
                : Math.floor((second / 60) % 60)
        var s =
            Math.floor(second % 60) < 10
                ? '0' + Math.floor(second % 60)
                : Math.floor(second % 60)
        return h + ':' + m + ':' + s
    },
    scrollToView(selector) {
        let listHtml = document.querySelector(selector)
        // console.log(listHtml, 'listHtml')
        if (listHtml) {
            listHtml.scrollIntoView(false)
        }
    },

    formatDate(time) {
        var date = new Date(time)
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        var hour = date.getHours()
        var minute = date.getMinutes()
        var second = date.getSeconds()
        return (
            [year, month, day].map(utils.formatNumber).join('-') +
            ' ' +
            [hour, minute, second].map(utils.formatNumber).join(':')
        )
    },

     yearMonth(time) {
        var date = new Date(time)
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        return (
            [year, month].map(utils.formatNumber).join('-')
        )
    },

    addMonth(item) {
        var date = new Date(item);
        var year = date.getFullYear()
        var month = date.getMonth() + 2
        return (
            [year, month].map(utils.formatNumber).join('-')
        )
    },

    reduceMonth(item) {
        var date = new Date(item);
        var year = date.getFullYear();
        var month = date.getMonth() ;
        return (
            [year, month].map(utils.formatNumber).join('-')
        )
    },

    addYear(item) {
        var date = new Date(item);
        var year = date.getFullYear() + 1;
        var month = date.getMonth() + 1;
        return (
            [year, month].map(utils.formatNumber).join('-')
        )
    },

    reduceYear(item) {
        var date = new Date(item);
        var year = date.getFullYear()- 1;
        var month = date.getMonth() + 1;
        var day = date.getDate()
        return (
            [year, month, day].map(utils.formatNumber).join('-')
        )
    },



    nowDate() {
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        var hour = date.getHours()
        var minute = date.getMinutes()
        var second = date.getSeconds()
        return (
            [year, month, day].map(utils.formatNumber).join('-') +
            ' ' +
            [hour, minute, second].map(utils.formatNumber).join(':')
        )
    },

    lastMonth() {
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth()
        var day = date.getDate()
        var hour = date.getHours()
        var minute = date.getMinutes()
        var second = date.getSeconds()
        return (
            [year, month, day].map(utils.formatNumber).join('-') +
            ' ' +
            [hour, minute, second].map(utils.formatNumber).join(':')
        )
    },

    lastWeek() {
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate() - 7
        var hour = date.getHours()
        var minute = date.getMinutes()
        var second = date.getSeconds()
        return (
            [year, month, day].map(utils.formatNumber).join('-') +
            ' ' +
            [hour, minute, second].map(utils.formatNumber).join(':')
        )
    },


    formatNumber(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    },
    filterRepeatSort(arr, id = 'id', by = 'time', sortType = true) {
        /**
         * params id 去重的字段
         * params by 排序的字段
         * params sortType  true为从大到小, false为从小到大
         */
        let obj = {}
        arr.forEach((item) => {
            if (!obj[item[id]]) {
                obj[item[id]] = []
            }
            obj[item[id]].push(item)
        })
        if (sortType) {
            return Object.values(obj).map(
                (item) => item.sort((a, b) => b[by] - a[by])[0]
            )
        } else {
            return Object.values(obj).map(
                (item) => item.sort((a, b) => a[by] - b[by])[0]
            )
        }
    },
    getDeviceAndOS: function () {
        let deviceInfo = {
            OSname: '',
            deviceType: '',
        }
        let name = 'unknown'
        if (window.navigator.userAgent.indexOf('Android') > -1) {
            name = 'Android'
        } else if (window.navigator.userAgent.indexOf('iPhone') > -1) {
            name = 'iPhone'
        } else if (window.navigator.userAgent.indexOf('SymbianOS') > -1) {
            name = 'SymbianOS'
        } else if (window.navigator.userAgent.indexOf('Windows Phone') > -1) {
            name = 'Windows Phone'
        } else if (window.navigator.userAgent.indexOf('iPad') > -1) {
            name = 'iPad'
        } else if (window.navigator.userAgent.indexOf('iPod') > -1) {
            name = 'iPod'
        }
        if (name > 'unknown') {
            deviceInfo.OSname = name
            deviceInfo.deviceType = 'mobile'
            return
        }
        if (window.navigator.userAgent.indexOf('Windows NT 10.0') > -1) {
            name = 'Windows 10'
        } else if (window.navigator.userAgent.indexOf('Windows NT 6.2') > -1) {
            name = 'Windows 8'
        } else if (window.navigator.userAgent.indexOf('Windows NT 6.1') > -1) {
            name = 'Windows 7'
        } else if (window.navigator.userAgent.indexOf('Windows NT 6.0') > -1) {
            name = 'Windows Vista'
        } else if (window.navigator.userAgent.indexOf('Windows NT 5.1') > -1) {
            name = 'Windows XP'
        } else if (window.navigator.userAgent.indexOf('Windows NT 5.0') > -1) {
            name = 'Windows 2000'
        } else if (window.navigator.userAgent.indexOf('Mac') > -1) {
            name = 'Mac/iOS'
        } else if (window.navigator.userAgent.indexOf('X11') > -1) {
            name = 'UNIX'
        } else if (window.navigator.userAgent.indexOf('Linux') > -1) {
            name = 'Linux'
        }
        deviceInfo.OSname = name
        deviceInfo.deviceType = 'pc'
        return deviceInfo
    },

    checkIsNull: function (args) {
        if(args != null && args != "" && args != undefined) {
            return false;
        }
        return true;
    }
}
export default utils
