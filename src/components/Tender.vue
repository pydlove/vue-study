<template>
    <div>
        <el-dialog class="aiCloud-dialog td-main"
                :title="title"
                :close-on-click-modal="false"
                :visible.sync="dialogVisible"
                width="800px"
                center="true"
                :before-close="close">

            <span>简述你能胜任项目的原因（详细的说明能增加你的入选率）</span>
            <!--<el-input class="mt-20 textarea"-->
                      <!--type="textarea"-->
                      <!--placeholder="10~300个字符，描述可以包含您对项目的理解、过往的相关经验、采用的技术方案等。详细的描述能增加您选中参与项目的机率。"-->
                      <!--v-model="textarea"-->
                      <!--:autosize="{ minRows: 6, maxRows: 8}"-->
                      <!--maxlength="3000"-->
                      <!--show-word-limit-->
            <!--&gt;</el-input>-->

            <quill-editor class="qe" v-model="content" ref="myQuillEditor" :options="editorOption">
            </quill-editor>

            <div slot="footer" class="">
                <div class="tl mb-10 ml-5">
                    <el-checkbox class="" label="我承诺，如有接触非公开的项目信息，我将对这些信息保密。"></el-checkbox>
                </div>
                <div>
                    <el-button class="wdi-120" @click="dialogVisible = false">取 消</el-button>
                    <el-button class="wdi-120" type="primary" @click="dialogVisible = false">确 定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { quillEditor } from 'vue-quill-editor'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    export default {
        name: "Tender",
        components: {
            quillEditor
        },
        mounted() {

        },
        methods: {
            close() {
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
            },

        },
        data() {
            return {
                // 弹出框显示标志
                dialogVisible: false,
                // 标题
                title: "投标项目",

                content: "10~300个字符，描述可以包含您对项目的理解、过往的相关经验、采用的技术方案等。详细的描述能增加您选中参与项目的机率。",
            }
        }
    }
</script>

<style scoped>
        .td-main {
            top: 80px;
        }
        .qe {
            height: 300px;
            margin-top: 20px;
            margin-bottom: 40px;
        }

        /*媒体查询（电脑）*/
        @media screen and (min-width: 1529px) {
        }

    /*媒体查询（平板）*/
    @media screen and (min-width: 769px) and (max-width: 996px) {


    }

    /*媒体查询（手机）*/
    @media screen and (max-width: 768px) {


    }
</style>

<style>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
    }
</style>