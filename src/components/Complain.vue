<template>
    <div>
        <el-dialog class="complain-dialog"
                :title="title"
                :close-on-click-modal="false"
                :visible.sync="dialogVisible"
                width="500px"
                center="true"
                :before-close="close">
            <div v-if="!showDetailReasonFlag">
                <el-card class="mb-5" shadow="hover" v-for="(item, index) in reasons" :key="index" @click.native="writeDetailReason(item.typeName)">
                    {{item.typeName}}
                </el-card>
            </div>

            <div v-else>
                <el-input type="textarea" v-model="detailReason" :autosize="{ minRows: 4, maxRows: 8}" placeholder="举报详细说明（选填）"></el-input>
            </div>
            <div v-if="!showDetailReasonFlag" slot="footer" class="dialog-footer">
                <el-button class="wdi-220" type="primary" @click="complain" disabled>举 报</el-button>
            </div>

            <div v-else slot="footer" class="dialog-footer">
                <el-button class="wdi-220" type="" @click="showDetailReasonFlag = false">返 回</el-button>
                <el-button class="wdi-220" type="primary" @click="complain">举 报</el-button>
                <div class="tip">
                    梧桐圈鼓励友善的讨论。请在举报时提供对人产生辱骂、人身攻击或冒犯的相关内容段落或其他信息。感谢你与我们共同维护知乎的讨论氛围。点击了解更多社区规范。
                </div>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "Complain",
        mounted() {

        },
        methods: {
            close() {
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
                this.showDetailReasonFlag = false;
            },

            /**
             * 写下详细原因
             * @param {*} typeName 原因类型
             * @author panyong
             */
            writeDetailReason(typeName) {
                this.showDetailReasonFlag = true;
                this.title = typeName;
            },

        },
        data() {
            return {
                // 弹出框显示标志
                dialogVisible: false,
                // 标题
                title: "举报",
                // 显示详细原因标志
                showDetailReasonFlag: false,
                // 原因分类
                reasons: [
                    {
                        typeName: "垃圾广告信息"
                    },
                    {
                        typeName: "不实信息"
                    },
                    {
                        typeName: "辱骂、人身攻击等不友善行为"
                    },
                    {
                        typeName: "有害信息"
                    },
                    {
                        typeName: "涉嫌侵权"
                    },
                    {
                        typeName: "诱导赞同、关注等行为"
                    }
                ],
                // 具体原因
                detailReason: "",

            }
        }
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
        .tip {
            margin-top: 10px;
            font-size: 14px;
            line-height: 20px;
            color: #999999;
        }
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
        .complain-dialog .el-dialog__header{
            text-align: center;
            font-weight: 600;
        }
    }
</style>