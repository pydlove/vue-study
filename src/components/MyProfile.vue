<template>
    <div>
        <div>
            <div class="mp-top">
                <el-divider content-position="left">
                    基本信息
                </el-divider>
                <el-button v-show="baseEdit" class="collapse-op" size="mini"  @click="baseEdit = false;">取消</el-button>
                <el-button v-show="baseEdit" class="collapse-op" size="mini" type="primary" @click="saveBase">保存</el-button>
                <el-button v-show="!baseEdit" class="collapse-op" size="mini" type="" @click="baseEdit = true;">编辑</el-button>
            </div>
            <div class="mp-main">
                <div v-if="baseEdit">
                    <el-form ref="form" :model="form" label-width="80px" class="mp-base-edit">
                        <el-form-item class="mt-30"  label-width="100px" label="姓名" prop="name">
                            <el-input class="wdi-300" v-model="form.name" placeholder="请填写姓名"></el-input>
                        </el-form-item>

                        <el-form-item class="mt-40" label-width="100px" label="性别" prop="subName">
                            <el-radio-group class="wdi-300" v-model="form.sex" >
                                <el-radio class="ml-15 nn" :label="0" border>男</el-radio>
                                <el-radio class="nn" :label="1" border>女</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item class="mt-40" label-width="100px" label="出生年月" prop="idCard">
                            <el-date-picker class="wdi-300" type="date" placeholder="选择出生日期" v-model="form.birth" @blur="calculationAge()"></el-date-picker>
                        </el-form-item>

                        <el-form-item class="mt-40" label-width="100px" label="联系方式" prop="idCard">
                            <el-input class="wdi-300" v-model="form.phone" placeholder="请填写联系方式"></el-input>
                        </el-form-item>

                        <el-form-item class="mt-40" label-width="100px" label="身份证号码" prop="idCard">
                            <el-input class="wdi-300" v-model="form.idCard" placeholder="请填写身份证号码"></el-input>
                        </el-form-item>

                        <el-form-item class="mt-40" label-width="100px" label="家庭住址" prop="idCard">
                            <el-input class="wdi-650" v-model="form.address" placeholder="请填写家庭住址"></el-input>
                        </el-form-item>
                    </el-form>
                </div>

                <div v-else class="dffn">
                    <div class="dffn">
                        <div class="mt-10">
                            <div class="scm" @mouseover="showUpload = true;"  @mouseleave="showUpload = false;">
                                <el-image
                                           :src="user.photo"
                                           :style="'width:' + photoWidth + 'px;height:' + photoHeight + 'px;'"
                                           alt="" @click="showUpPhoto = true" :preview-src-list="srcList"></el-image>
                                <div>
                                    <el-upload
                                            ref="photoUploadRef"
                                            :action="uploadAction"
                                            :fileList="fileList"
                                            :on-success="onSuccess"
                                            :before-upload="beforeUpload"
                                            :on-preview="handlePictureCardPreview"
                                            :before-remove="beforeRemove"
                                            :on-remove="handleRemove"
                                    >
                                        <span v-show="showUpload" class="sc">上传2寸蓝底证件照</span>
                                    </el-upload>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ml-150">
                        <div class="mp-base-item" v-for="(item, index) in baseProfile" :key="index">
                            <div class="base-key" >{{item.key}}</div>
                            <div v-if="item.value" class="base-value">
                                {{item.value}}
                            </div>
                            <div v-else class="base-none-value" @click="baseEdit = true"><i class="el-icon-edit"></i>现在补充</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MyProfile",
        components: {},
        mounted() {
        },
        methods: {

            /**
             * 保存基本资料
             */
            async saveBase() {
            },
        },
        data() {
            return {
                photoWidth: 207*0.8,
                photoHeight: 313*0.8,
                srcList: [
                    require("@/assets/img/ouynn.jpg"),
                ],
                user: {
                    photo: require("@/assets/img/ouynn.jpg"),
                },
                // 基本信息
                baseProfile: [
                    {key: "姓名", value: "欧阳娜娜"},
                    {key: "性别", value: "女"},
                    {key: "出生年月", value: "2008年6月15日"},
                    {key: "身份证号码", value: "210448196602231235"},
                    {key: "家庭住址", value: "安徽省合肥市瑶海区磨店"},
                    {key: "联系方式", value: ""},
                    // {key: "联系方式", value: "1356782656"},
                ],
                form: {
                    id: "1",
                    name: "欧阳娜娜",
                    sex: 0,
                    idCard: "210448196602231235",
                    birth: "2008-06-15",
                    address: "广东省江门市",
                    phone: "",
                },
                // 修改基本信息按钮显示
                baseEdit: false,
                showUpload: false,
            }
        }
    }
</script>

<style scoped>
        .mp-top {
            display: flex;
        }
        .collapse-op {
            margin-left: 20px;
            margin-top: 10px;
            height: 30px;
        }
        .mp-main {
            font-size: 14px;
            color: #606266;
            text-align: left;
        }
        .mp-base-item {
            display: flex;
            line-height: 40px;
            text-align: left;
            margin-top: 5px;
            margin-bottom: 5px;
            font-size: 16px;
        }
        .base-key {
            width: 100px;
            color: #999;
        }
        .base-value {
            font-size: 16px;
        }
        .base-none-value > i {
            color: #409EFF;
            margin-right: 10px;
        }
        .base-none-value {
            color: #333333;
        }
        .base-none-value:hover {
            text-decoration: underline;
        }
        .scm {
            position: relative;
        }
        .sc {
            position: absolute;
            bottom: 10px;
            left: 0px;
            color: #ffffff;
            background: #333333;
            width: 100%;
            text-align: center;
            padding-top: 10px;
            padding-bottom: 10px;
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
        .el-icon-circle-close {
            color: #ff3405;
        }
        .el-divider__text {
            font-size: 16px !important;
        }
    }

</style>