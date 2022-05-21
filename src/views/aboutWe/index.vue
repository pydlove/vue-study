<template>
    <!--eslint-disable-->
    <div class="nd-container">
        <div class="nd-top">
            <div class="nd-top-main">
                <div class="nd-tm-left">
                    <van-image class="nd-about-logo cursor" @click="toHome" :src="require('@/assets/img/logo/logo-nd.png')"/>
                    <div class="nd-title">
                        <div> {{ $t('message.SolarData') }}</div>
                    </div>
                </div>
                <Header currentMenu="aboutWe" @initLanguage="initLanguage"></Header>
            </div>
        </div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="nd-breadcrumb-top">
            <el-breadcrumb-item :to="{ path: '/home' }">
                <i class="el-icon-s-home"></i>
                {{ $t('menu.home') }}
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                {{ $t('menu.ContactUs') }}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="nd-background">
            <div class="nd-content dffn">
                <div class="aiocloud-card aw-left" >
                    <div class="nd-contact">
                        <div class="nd-address">{{ $t('message.Address') }}: {{ $t('message.AddressDetail') }} </div>
                        <div class="nd-address">{{ $t('message.Contact') }}: (86)-25-89683510</div>
                        <div class="nd-address">{{ $t('menu.footEmail') }}: xswan@nju.edu.cn</div>
                    </div>
                    <div class="nd-wechat cursor"></div>
	                <div class="cursor logo-item" @click="down">
		                {{ $t('message.downloadLogo') }}
	                </div>
                    <img v-show="false" class="xh-img" :src="require('@/assets/img/logo/logo-xh.png')" alt="">
                    <!--<div class="wechat-cen">-->
                        <!--<div class="wechat-icon"></div>-->
                        <!--<div class="wechat-num">-->
                            <!--{{ $t('message.WeChat') }}-->
                        <!--</div>-->
                    <!--</div>-->
                </div>

                <div class="aiocloud-card aw-right">
                    <div v-if="language == 'zh'" class="nd-aboutus">
                        关于“羲和号“卫星数据的科学标定、数据分析、软件支持，请联系Chuan Li (lic@nju.edu.cn) , Ye Qiu (Qiuyeah@163.com) , Zhen Li (lizhen@nju.edu.cn)
                        <br/> 关于“羲和号“卫星数据网站及数据下载服务，请联系Xiaosheng Wan (xswan@nju.edu.cn)
                    </div>
                    <div v-if="language == 'en'" class="nd-aboutus">
                        For the CHASE data calibration, data analysis, and software assistance, please contact Chuan Li (lic@nju.edu.cn) , Ye Qiu (Qiuyeah@163.com) , Zhen Li (lizhen@nju.edu.cn) .
                        <br/> For the CHASE data website, data access, etc. please contact Xiaosheng Wan (xswan@nju.edu.cn)
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<!--eslint-disable-->
<script>
    import Header from "@/components/Header";
    import Footer from "@/components/Footer";

    export default {
        name: "index",
        components: {Footer, Header},
        data() {
            return {
                language: "",
            }
        },
        mounted() {
            this.initLanguage();
        },
        methods: {
            initLanguage() {
                this.language = this.$i18n.locale;
            },
            down() { // 保存二维码
                var oQrcode = document.querySelectorAll('.xh-img')
                var url = oQrcode[0].src
                this.downloadIamge(url, '羲和')
            },
            downloadIamge(imgsrc, name) { // 下载图片地址和图片名
                var image = new Image()
                // 解决跨域 Canvas 污染问题
                image.setAttribute('crossOrigin', 'anonymous')
                image.onload = function () {
                    var canvas = document.createElement('canvas')
                    canvas.width = image.width
                    canvas.height = image.height
                    var context = canvas.getContext('2d')
                    context.drawImage(image, 0, 0, image.width, image.height)
                    var url = canvas.toDataURL('image/png') // 得到图片的base64编码数据
                    var a = document.createElement('a') // 生成一个a元素
                    var event = new MouseEvent('click') // 创建一个单击事件
                    a.download = name || 'photo' // 设置图片名称
                    a.href = url // 将生成的URL设置为a.href属性
                    a.dispatchEvent(event) // 触发a的单击事件
                }
                image.src = imgsrc

            }
        }
    }
</script>

<style scoped>
    @media screen and (min-width: 768px) {
	    .logo-item:hover {
			text-decoration: underline;
		    color: #fa5c00;
	    }
	    .logo-item {
		    text-align: left;
		    margin-left: 48px;
		    margin-top: 10px;
	    }
        .nd-about-logo {
            height: 65px;
            width: 224px;
            margin-top: 10px;
        }
        .nd-new-title-desc {
            line-height: 22px;
            color: #333333;
            font-size: 14px;
            margin-top: 10px;
        }
        .nd-aboutus{
            font-size: 14px;
            text-align: left;
            width: 100%;
            line-height: 24px;
        }

        .wechat-cen {
            margin-top: 10px;
            text-align: center;
            display: flex;
            flex-wrap: nowrap;
            align-items: center; /*//垂直居中*/
            justify-content: center;
            width: 200px;
        }
        .nd-wechat {
            display: flex;
            flex-wrap: nowrap;
        }

        .wechat-num {
            font-size: 15px;
            margin-left: 10px;
        }


        .nd-wechat {
            background: url("../../assets/img/logo/xihe.png");
            background-size: 100% 100%;
            width: 204px;
            height: 183px;
            margin-top: 50px;
        }
        
        .nd-content > div[data-v-899ba358]:nth-of-type(1) {
            width: 400px;
            min-height: 500px;
            margin-right: 20px;
        }

       .nd-address {
           font-size: 12px;
           margin-top: 20px;
           text-align: left;
       }

        .nd-content > div:nth-of-type(1) {
            width: 200px;
            min-width: 200px;
            height: 300px;
            margin-right: 20px;
        }

        .nd-content > div:nth-of-type(2) {
            width: calc(100% - 220px);
            display: flex;
            flex-wrap: wrap;
            background: #ffffff;
        }

        img {
            border-style: none;
            width: 210px;
            height: 306px;
            margin-left: 20px;
            text-align: center;
        }

        .nd-introduction-title > div:nth-of-type(1) {
            font-size: 26px;
            margin-left: 20px;
            line-height: 40px;
        }

        .nd-introduction-title > div:nth-of-type(2) {
            font-size: 10px;
            line-height: 20px;
            height: 20px;
            font-family: SC-Light;
            margin-left: 23px;
        }

        .nd-title div:nth-of-type(1) {
            font-size: 32px;
        }

        .nd-title div:nth-of-type(2) {
            font-size: 18px;
            margin-top: 10px;
        }

        .nd-title {
            margin-top: 100px;
        }

        .nd-tm-left, .nd-tm-right {
            width: 50%;
            text-align: left;
        }

        .nd-logo {
            height: 44px;
            width: 224px;
            margin-top: 10px;
        }

        .nd-top-main {
            display: flex;
            flex-wrap: nowrap;
            width: 900px;
            margin: 0px auto;
            font-family: "SC-Bold";
            color: #ffffff;
        }

        .nd-top {
            background: url("../../assets/img/background/banner@3x.png");
            background-size: 100% 100%;
            height: 300px;
            width: 100%;
            min-width: 1200px;
            position: relative;
        }

        .nd-result > div:nth-of-type(1) {
            font-size: 24px;
            line-height: 40px;
            height: 40px;
            letter-spacing: 2px;
        }

        .nd-result > div:nth-of-type(2) {
            font-size: 10px;
            line-height: 20px;
            height: 20px;
            font-family: SC-Light;
            margin-left: 3px;
        }

        .nd-result-more > div:nth-of-type(1) {
            line-height: 36px;
        }

        .nd-more-arrow > div:nth-of-type(1) {
            width: 30px;
            border-top: 1px solid #ffffff;
        }

        .nd-more-arrow > div:nth-of-type(2) {
            width: 5px;
            border-top: 1px solid #ffffff;
            transform: rotate(
                    25deg
            );
            position: absolute;
            top: -2px;
            right: 0px;
        }

    }

</style>