<template>
    <!--eslint-disable-->
    <div class="nd-container">
        <Header></Header>
        <div class="nd-detail-box" :style="{ minHeight: minHeight + 'px', }">
            <div class="nd-news-list box-zing-a">
                <div class="nd-new-left">
                    <div :style="active"  @mouseover="mouseOver" @mouseleave="mouseLeave"  @click="chase" >CHASE 卫星</div>
                    <div :style="active1" @mouseover="mouseOver1" @mouseleave="mouseLeave1" @click="onset">ONSET 望远镜</div>
                    <div :style="active2" @mouseover="mouseOver2" @mouseleave="mouseLeave2" @click="weHot">WEHOT 望远镜</div>
                    <div :style="active3" @mouseover="mouseOver3" @mouseleave="mouseLeave3" @click="otherDevice">其他设备</div>
                </div>
                <div class="nd-new-right" :style="{ minHeight: (minHeight - 40) + 'px', }">
                    <div class="nd-new-title">
                        <div  class="nd-news-title">{{this.form.title}}</div>
                        <el-input class="nd-news-content" v-html="form.content"></el-input>
                    </div>
                </div>
            </div>
        </div>
        <tail></tail>
    </div>
</template>
<!--eslint-disable-->
<script>
    import Header from "@/components/headAndTail/head";
    import tail from "@/components/headAndTail/tail";
    export default {
        name: "observationDeviceDetail",
        components: {Header, tail},
        mounted() {
            this.minHeight = this.clientHeight - 180 - 260;

            let id = this.$route.query.id
            this.form.id = id;
            let title = this.$route.query.title;
            this.form.title = title;
            let picture = this.$route.query.picture;
            this.form.picture = picture;
            let content = this.$route.query.content;
            this.form.content = content;
            let status = this.$route.query.status;
            this.form.status = status;
            let displayOrder = this.$route.query.displayOrder;
            this.form.displayOrder = displayOrder;
            let createTime = this.$route.query.createTime;
            this.form.createTime = createTime;
            let enAuthor = this.$route.query.enAuthor;
            this.form.enAuthor = enAuthor;
            let type = this.$route.query.type;
            this.form.type = type;

            if(type != null && type != "") {
                if(type == "0") {
                    this.title = "CHASE 卫星"
                    this.active = "text-align: center; font-size: 14px; text-align: left;  margin: 15px; font-weight: bolder;";
                } else if(type == "1"){
                    this.title = "ONSET 望远镜"
                    this.active1 = "text-align: center; font-size: 14px; text-align: left;  margin: 15px; margin-top: 30px;  font-weight: bolder;"
                } else if(type == "2") {
                    this.title = "WEHOT 望远镜"
                    this.active2 = "text-align: center; font-size: 14px; text-align: left;  margin: 15px; margin-top: 30px;  font-weight: bolder;"
                } else if(type == "3") {
                    this.title = "其他设备"
                    this.active3 = "text-align: center; font-size: 14px; text-align: left;  margin: 15px; margin-top: 30px;  font-weight: bolder;"
                }
            }

        },
        methods: {
            mouseOver: function(){
                this.active = 'color: #40a9ff; text-align: center; font-size: 14px; text-align: left;  margin: 15px; margin-top: 30px';
            },
            mouseLeave: function () {
                this.active = 'text-align: center; font-size: 14px; text-align: left;  margin: 15px; margin-top: 30px';
            },
            mouseOver1: function(){
                this.active1 = 'color: #40a9ff; text-align: center; font-size: 14px; text-align: left;  margin: 15px; margin-top: 30px';
            },
            mouseLeave1: function () {
                this.active1 = 'text-align: center; font-size: 14px; text-align: left;  margin: 15px; margin-top: 30px';
            },
            mouseOver2: function(){
                this.active2 = 'color: #40a9ff; text-align: center; font-size: 14px; text-align: left;  margin: 15px; margin-top: 30px';
            },
            mouseLeave2: function () {
                this.active2 = 'text-align: center; font-size: 14px; text-align: left;  margin: 15px; margin-top: 30px';
            },
            mouseOver3: function(){
                this.active3 = 'color: #40a9ff; text-align: center; font-size: 14px; text-align: left;  margin: 15px; margin-top: 30px';
            },
            mouseLeave3: function () {
                this.active3 = 'text-align: center; font-size: 14px; text-align: left;  margin: 15px; margin-top: 30px';
            },

            chase() {
                this.type = "0";
                this.initDataList();
            },
            onset() {
                this.type = "1";
                this.initDataList();
            },
            weHot() {
                this.type = "2";
                this.initDataList();
            },
            otherDevice() {
                this.type = "3";
                this.initDataList();
            },

            initDataList() {
                this.$router.push({
                    path: '/observeDevice', query: {
                       type: this.type
                    }
                })
            },

            close() {

            },
            open() {

            },
        },
        data() {
            return {
                type: "",
                active: 'text-align: center; font-size: 14px; text-align: left;  margin: 15px;',
                active1: 'text-align: center; font-size: 14px; text-align: left;  margin: 15px; margin-top: 30px',
                active2: 'text-align: center; font-size: 14px; text-align: left;  margin: 15px; margin-top: 30px',
                active3: 'text-align: center; font-size: 14px; text-align: left;  margin: 15px; margin-top: 30px',
                form: {
                    id: "",
                    title: "",
                    picture: "",
                    content: "",
                    status: "",
                    type: "",
                    displayOrder: "",
                    createTime: "",
                },
                clientHeight: document.body.clientHeight,
                clientWidth: document.body.clientWidth,
                minHeight: "",
            }

        },
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 768px) {
        .el-upload__tip {
            color: #f51d37;
        }

        .nd-detail-box {
            background: #eeeeee;
        }

        .nd-news-list {
            width: 1000px;
            margin: 0px auto;
            padding: 20px 0;
            display: flex;
            flex-wrap: nowrap;
        }

        .nd-new-title {
            margin-top: 10px;
        }

        .nd-new-left {
            background: #ffffff;
            width: 230px;
            height: 200px;
            margin-right: 20px;
            border-radius: 5px;
        }

        .nd-list {
            text-align: center;
            font-size: 16px;
            font-weight: bolder;
            margin-top: 10px;

        }

        .nd-news-title {
            text-align: center;
            font-size: 20px;
        }

        .nd-news-time {
            text-align: center;
            margin-top: 10px;
        }

        .nd-news-content {
            margin-top: 20px;
            align-content: center;
        }

        .nd-new-right {
            background: #ffffff;
            width: 750px;
            border-radius: 5px;
        }
    }

    /*媒体查询（手机）*/
    @media screen and (max-width: 768px) {
        .nd-detail-box {
            background: #eeeeee;
        }

        .nd-news-list {
            width: 100%;
            background: #f0f0f0;
            margin: 0px auto;
            display: flex;
            flex-wrap: nowrap;
            padding: 10px 0;
        }

        .nd-list {
            text-align: center;
            font-size: 5px;
            font-weight: bolder;
            margin-top: 10px;
        }

        .nd-news-title {
            text-align: center;
            margin-top: 5px;
        }

        .nd-news-title {
            text-align: center;
            font-size: 16px;
            line-height: 1;
        }

        .nd-news-time {
            text-align: center;
            margin-top: 10px;
        }

        .nd-new-left {
            background: #ffffff;
            width: 100px;
            height: 200px;
            margin-right: 10px;
            border-radius: 5px;
            margin-left: 10px;
        }

        .nd-news-content {
            margin-top: 20px;
            align-content: center;
            font-size: 3px;
        }


        .nd-new-right {
            background: #ffffff;
            width: calc(100% - 130px);
            border-radius: 5px;
            margin-right: 10px;
        }
    }
</style>

<style>
    .aioc-ac-upload .el-upload-list__item-thumbnail {
        vertical-align: middle;
        display: inline-block;
        width: 500px;
        height: 300px;
        float: left;
        position: relative;
        z-index: 1;
        margin-left: 40px;
        margin-top: 30px;
        background-color: #FFF;
    }

    .aioc-ac-upload .el-upload-list__item {
        overflow: hidden;
        z-index: 0;
        background-color: #fff;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
        margin-top: 10px;
        padding: 0px;
        height: 360px !important;
        width: 600px !important;
        transition: none;
    }

    .aioc-ac-upload .el-upload-dragger {
        width: 600px;
        height: 180px;
    }

    .aioc-ac-upload .el-upload-list__item-name {
        display: none;
    }

</style>