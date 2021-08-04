<template>
    <!--eslint-disable-->
    <div class="nd-container">
        <Header></Header>
        <el-card  :style="'height:' + clientHeight + 'px;'" style="min-height: 500px">
            <div class="nd-news-list" >
                <el-card style=" width: 170px; position: absolute; height: 210px; ">
                    <p style="text-align: center; font-size: 16px; font-weight: bolder">新闻与资源</p>
                </el-card>
                <el-card style=" position: absolute;  width: 900px; margin-left: 190px;">
                    <el-form
                            ref="form"
                            :model="form"
                    >
                        <div style="text-align: center; font-size: 20px">{{this.form.title}}</div>
                        <div style="text-align: center; margin-top: 10px">{{this.form.createTime}}</div>
                        <el-form-item prop="content">
                            <el-input style=" margin-top: 20px; align-content: center"  v-html="form.content"></el-input>
                        </el-form-item>
                    </el-form>
                </el-card>
            </div>
        </el-card>
        <tail></tail>
    </div>
</template>
<!--eslint-disable-->
<script>
    import Header from "@/components/headAndTail/head";
    import tail from "@/components/headAndTail/tail";

    export default {
        name: "detail",
        components: {Header, tail},

        mounted() {
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
        },
        methods: {
            close() {

            },
            open() {

            },
        },
        data() {
            return {
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

            }

        },
    }
</script>

<style scoped>
    .el-upload__tip {
        color: #f51d37;
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

    .nd-news-list {
        position: relative;
        width: 1200px;

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