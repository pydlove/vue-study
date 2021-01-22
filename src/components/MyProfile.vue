<template>
    <div>
        <div>
            <div class="mp-top">
                <el-divider content-position="left">
                    基本信息
                </el-divider>
                <el-button v-show="baseEdit" class="collapse-op" size="mini"  @click="baseEdit = false;">取消</el-button>
                <el-button v-show="baseEdit" class="collapse-op aioc-btn1" size="mini" type="primary" @click="saveBase">保存</el-button>
                <el-button v-show="!baseEdit" class="collapse-op" size="mini" type="" @click="edit">编辑</el-button>
            </div>
            <div class="mp-main">
                <div v-if="baseEdit">
                    <el-form ref="form" :model="form" label-width="100px" class="mp-base-edit">
                        <el-form-item class="mt-30"  label-width="100px" label="姓名" prop="name">
                            <el-input class="wdi-300" v-model="form.name" placeholder="请填写姓名"></el-input>
                        </el-form-item>

                        <el-form-item class="mt-40" label="性别" prop="sex">
                            <el-radio-group class="wdi-300" v-model="form.sex" >
                                <el-radio class="ml-15 nn" label="0" border>男</el-radio>
                                <el-radio class="nn" label="1" border>女</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item class="mt-40" label="出生年月" prop="birth">
                            <el-date-picker class="wdi-300" type="date" placeholder="选择出生日期" v-model="form.birth" @blur="calculationAge()"></el-date-picker>
                        </el-form-item>

                        <el-form-item class="mt-40" label="联系方式" prop="phone">
                            <el-input class="wdi-300" v-model="form.phone" placeholder="请填写联系方式"></el-input>
                        </el-form-item>

                        <el-form-item class="mt-40" label="身份证号码" prop="idCard">
                            <el-input class="wdi-300" v-model="form.idcard" placeholder="请填写身份证号码"></el-input>
                        </el-form-item>

                        <el-form-item class="mt-40" label="所在区域" prop="area">
                            <el-cascader class="wdi-300"
                                         ref="areaCascaderRef"
                                         size="large"
                                         :props="{ checkStrictly: true }"
                                         :options="areaOptions"
                                         v-model="form.area"
                                         @change="handleAreaCascader"
                                         placeholder="请选择区域">
                            </el-cascader>
                        </el-form-item>

                        <el-form-item class="mt-40" label-width="100px" label="家庭住址" prop="address">
                            <el-input class="wdi-300" v-model="form.address" placeholder="请填写家庭住址"></el-input>
                        </el-form-item>
                    </el-form>
                </div>

                <div v-else class="dffn">
                    <div class="dffn">
                        <div class="mt-10">
                            <div class="scm" @mouseover="showUpload = true;"  @mouseleave="showUpload = false;">
                                <el-image
                                           :src="bluser.photo"
                                           :style="'width:' + photoWidth + 'px;height:' + photoHeight + 'px;'"
                                           alt="" :preview-src-list="[bluser.photo]"></el-image>
                                <div>
                                    <el-upload class="pc-up"
                                            ref="photoUploadRef"
                                            :action="uploadAction"
                                            :fileList="fileList"
                                            :on-success="onSuccess"
                                            :before-upload="beforeUpload"
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
    import areaData from '@/assets/json/areaData.json'
    export default {
        name: "MyProfile",
        mounted() {
            // 判断用户是否登录
            this.judgeIsLogin();
        },
        methods: {

            async judgeIsLogin() {
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_login_judgeIsLogin, {}, "GET");
                if (data.code === 200) {
                    if (data.data.isLogin == "login") {
                        this.bluser = data.data.bluser;
                        this.initBaseProfile();
                    } else {
                        this.$router.push({name: "studentLogin"});
                    }
                } else {
                    this.$router.push({name: "studentLogin"});
                }
            },

            edit() {
                this.baseEdit = true;
                this.initAreaOptions();
                this.form = {
                    id: this.bluser.id,
                    name: this.bluser.name,
                    photo: this.bluser.photo,
                    sex: this.bluser.sex,
                    idcard: this.bluser.idcard,
                    birth: this.bluser.birth,
                    address: this.bluser.address,
                    phone: this.bluser.phone,
                    city: this.bluser.phone.city,
                    county: this.bluser.phone.county,
                    township: this.bluser.phone.township,
                    area: [],
                }
                this.form.area.push(this.bluser.province);
                if (this.bluser.city != null && this.bluser.city != undefined && this.bluser.city != "") {
                    this.form.area.push(this.bluser.city);
                }
                if (this.bluser.county != null && this.bluser.county != undefined && this.bluser.county != "") {
                    this.form.area.push(this.bluser.county);
                }
            },

            /**
             * 保存基本资料
             */
            async saveBase() {
                if(this.form.area.length == 1) {
                    this.form.province = this.form.area[0];
                }
                if(this.form.area.length == 2) {
                    this.form.province = this.form.area[0];
                    this.form.city = this.form.area[1];
                }
                if(this.form.area.length == 3) {
                    this.form.province = this.form.area[0];
                    this.form.city = this.form.area[1];
                    this.form.county = this.form.area[2];
                }
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_user_update, this.form, "POST");
                if (data.code === 200) {
                    this.$notify({
                        title: '提示',
                        message: '修改个人信息成功'
                    });
                    this.bluser = data.data;
                    this.initBaseProfile();
                    this.baseEdit = false;
                    return true;
                }
            },

            initBaseProfile() {
                this.baseProfile = [
                    {key: "姓名", value: this.bluser.name},
                    {key: "性别", value: this.bluser.sex == "0" ? "男":"女"},
                    {key: "出生年月", value: this.bluser.birth},
                    {key: "身份证号码", value: this.bluser.idcard},
                    {key: "家庭住址", value: this.bluser.province + this.bluser.city + this.bluser.county + this.bluser.address},
                    {key: "联系方式", value: this.bluser.phone},
                ];
            },

            /**
             * 初始化地域数据
             */
            initAreaOptions() {
                for (let key in areaData) {
                    let province = areaData[key];
                    if (key == '安徽省') {
                        var provinceObj = {
                            label: key,
                            value: key,
                            children: []
                        }
                        this.areaOptions.push(provinceObj);
                        for (let cityKey in province) {
                            let city = province[cityKey];
                            var cityObj = {
                                label: cityKey,
                                value: cityKey,
                                children: []
                            }
                            provinceObj.children.push(cityObj);
                            for (let areaKey in city) {
                                var areaObj = {
                                    label: areaKey,
                                    value: areaKey,
                                }
                                cityObj.children.push(areaObj);
                            }
                        }
                    }
                }
            },

            onSuccess(response) {
                if (this.bluser.photo != null && this.bluser.photo != "") {
                    var photoArray = this.bluser.photo.split("/")
                    this.fileName = photoArray[photoArray.length - 1];
                    this.deletePhotoRequest(this.fileName);
                    if (response.data != null) {
                        this.bluser.photo = response.data.fileUrl;
                        this.fileName = response.data.fileName;
                        this.updateBlUser();
                    }
                }
            },
            beforeUpload(file) {
                // 上传格式做限制
                var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
                const extension = testmsg === 'png'
                const extension2 = testmsg === 'jpg'
                const extension3 = testmsg === 'jpeg'
                if (!extension && !extension2 && !extension3) {
                    this.$promptMsg("图片仅支持png、jpg、jpeg格式，请选择正确的格式！", "error");
                    return false;
                }
                this.showUpload = false;
            },
            async deletePhotoRequest(fileName) {
                let params = new FormData();
                params.append("fileName", fileName);
                await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_user_photo_delete, params, "POST");
            },

            async updateBlUser() {
                var userInfo = {
                    id: this.bluser.id,
                    photo: this.bluser.photo,
                };
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_user_update, userInfo, "POST");
                if (data.code === 200) {
                    this.$notify({
                        title: '提示',
                        message: '修改照片成功'
                    });
                    this.bluser = data.data;
                    return true;
                }
            },
        },
        data() {
            return {
                photoWidth: 207*0.8,
                photoHeight: 313*0.8,
                baseProfile: [],
                areaOptions: [],
                bluser: "",
                form: {
                    id: "",
                    name: "",
                    photo: "",
                    sex: "",
                    idCard: "",
                    birth: "",
                    address: "",
                    phone: "",
                    area: "",
                    city: "",
                    county: "",
                    township: "",
                },
                // 修改基本信息按钮显示
                baseEdit: false,
                showUpload: false,
                uploadAction: this.$aiocUrl.blsh_service_v1_bl_user_photo_upload,
                fileList: [],
                fileName: "",
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
        .nn {
            width: 130px;
            margin-left: 0px;
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
    .el-icon-circle-close {
        color: #ff3405;
    }
    .el-divider__text {
        font-size: 16px !important;
    }
    .pc-up .is-success {
        display: none !important;
    }

    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {

    }

</style>