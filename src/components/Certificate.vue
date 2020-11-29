<template>
    <div class="book">
        <div class="page page2">
            <el-image v-show="showCertificate" :src="honorCertificate.img" style="width: 920px;height: 600px;"></el-image>
        </div>
        <div class="page page1">
            <div class="ryzs">
                <span>{{honorCertificate.honorName}}</span>
                <br/>
                <span>荣誉证书</span>
            </div>
            <i class="rongyu mt-20"></i>
            <div class="qfdw">
                {{honorCertificate.officialUnit}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Certificate",
        mounted() {
            var that = this;
            var pages = document.querySelectorAll('.page')
            pages.forEach(v => {
                v.onclick = function () {
                    console.log(that.page)
                    if(that.page == 1) {
                        that.page++;
                        that.indexObj = v;
                        v.style.transform = 'perspective(1500px) rotateY(-180deg)'
                        var timer = setTimeout(function () {
                            that.showCertificate = true;
                            window.clearTimeout(timer);
                        }, 600);
                    } else {
                        that.page--;
                        that.showCertificate = false;
                        that.indexObj.style.transform = 'perspective(1500px) rotateY(0deg)'
                    }
                }
            });
        },
        methods: {
           setHonorCertificate(honorCertificate) {
                this.honorCertificate = honorCertificate;
           },
        },
        data() {
            return {
                page: 1,
                honorCertificate: {
                    id: "blsh2020111116",
                    honorName: "三好学生",
                    officialUnit: "安徽柏林书画研究院",
                    img: require("@/assets/img/ryzs.jpg"),
                },
                showCertificate: false,
                indexObj: "",
            }
        }
    }
</script>

<style scoped>
    .book {
        position: relative;
        width: 400px;
        height: 600px;
        transform-style: preserve-3d;
        margin: 50px auto;
        background: #ffffff;
    }
    .page {
        position: absolute;
        width: 100%;
        height: 100%;
        transform-origin: left;
        transform-style: preserve-3d;
        backface-visibility: hidden;
        transform: perspective(1500px) rotateY(0deg);
        transition: transform 1s ease-in;
        text-align: center;
        line-height: 88px;
        background: #a3010e;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 5px;
    }
    .ryzs {
        font-size: 88px;
        color: #bf954b;
        font-family: 华文宋体;
        font-weight: 800;
        margin-top: 80px;
    }
    .ryzs > span:nth-of-type(2) {
        font-size: 66px;
    }
    .qfdw {
        font-size: 20px;
        color: #bf954b;
        margin-top: 80px;
        line-height: 20px;
    }
</style>