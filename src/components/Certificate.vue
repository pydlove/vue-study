<template>
    <div class="book">
        <div class="page page2">
            <el-image v-show="showCertificate" :src="honorCertificate.img" style="width: 920px;height: 600px;"></el-image>
        </div>
        <div class="page page1">
            <div class="ryzs">
                <span>{{honorCertificate.name}}</span>
                <br/>
            </div>
            <span class="rywz">荣誉证书</span>
            <i class="rongyu mt-20 ryi"></i>
            <div class="qfdw">
                {{honorCertificate.unit}}
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
                    uuid: "",
                    name: "",
                    unit: "",
                    img: "",
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
        font-size: 60px;
        color: #bf954b;
        font-family: 华文宋体;
        font-weight: 800;
        position: absolute;
        top: 50px;
        line-height: 60px;
    }
    .rywz {
        font-size: 50px;
        font-weight: 800;
        color: #bf954b;
        font-family: 华文宋体;
        position: absolute;
        bottom: 330px;
    }
    .ryi {
        position: absolute;
        bottom: 200px;
    }
    .qfdw {
        font-size: 20px;
        color: #bf954b;
        line-height: 20px;
        position: absolute;
        bottom: 40px;
    }
</style>