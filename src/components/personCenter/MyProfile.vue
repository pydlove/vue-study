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
                    <el-form ref="form" :model="user" label-width="80px" class="mp-base-edit">
                        <el-form-item label="昵称">
                            <el-input class="wdi-300" v-model="user.nickname" placeholder="请输入昵称"></el-input>
                        </el-form-item>

                        <el-form-item label="简介">
                            <el-input class="wdi-800 textarea"
                                    type="textarea"
                                    placeholder="请输入自我简介"
                                    v-model="user.introduction"
                                    :autosize="{ minRows: 6, maxRows: 8}"
                                    maxlength="256"
                                    show-word-limit
                            >
                            </el-input>
                        </el-form-item>

                        <el-form-item label="姓名">
                            <el-input class="wdi-300" v-model="user.name" placeholder="请输入姓名"></el-input>
                        </el-form-item>

                        <el-form-item label="性别">
                            <el-radio-group v-model="user.sex">
                                <el-radio label="0">男</el-radio>
                                <el-radio label="1">女</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="出生日期">
                            <el-date-picker class="mr-10 wdi-300"
                                    v-model="user.birthtime"
                                    type="date"  value-format="yyyy-MM-dd"
                                    placeholder="请选择出生日期">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="邮箱">
                            <el-input class="wdi-300" v-model="user.mail" placeholder="请输入邮箱"></el-input>
                        </el-form-item>

                        <el-form-item label="手机">
                            <el-input class="wdi-300" v-model="user.phone" placeholder="请输入手机号码"></el-input>
                        </el-form-item>
                    </el-form>
                </div>

                <div v-else class="mp-base-item" v-for="(item, index) in baseProfile" :key="index">
                    <div class="base-key" >{{item.key}}</div>
                    <div v-if="item.value" class="base-value">
                        {{item.value}}
                    </div>
                    <div v-else class="base-none-value" @click="baseEdit = true"><i class="el-icon-edit"></i>现在补充</div>
                </div>
            </div>

            <div class="mp-top">
                <el-divider content-position="left">
                    学历信息
                </el-divider>
                <el-button v-show="eduAddEdit" class="collapse-op" size="mini"  @click="cancleEduInfoOp">取消</el-button>
                <el-button v-show="eduAddEdit" class="collapse-op" size="mini" type="primary" @click="saveEduInfo">保存</el-button>
                <el-button v-show="!eduAddEdit" class="collapse-op" size="mini" type="" @click="addEduInfo">增加</el-button>
            </div>
            <div class="mp-main">
                <div v-if="eduAddEdit">
                    <el-form ref="eduForm" :model="eduInfo" :rules="eduRules" label-width="80px" class="mp-base-edit">
                        <el-form-item label="学校名称" prop="school">
                            <el-input class="wdi-300" v-model="eduInfo.school" placeholder="请输入学校名称"></el-input>
                        </el-form-item>

                        <el-form-item label="学历" prop="edu">
                            <el-select v-model="eduInfo.edu" placeholder="请选择学历" class="wdi-300" clearable>
                                <el-option
                                        v-for="(item, index) in eduOptions"
                                        :key="index"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="是否统招" prop="recruitment">
                            <el-radio-group v-model="eduInfo.recruitment">
                                <el-radio label="0">统招</el-radio>
                                <el-radio label="1">非统招</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="学位证书" v-if="eduInfo.edu == '4' || eduInfo.edu == '5' || eduInfo.edu == '6' || eduInfo.edu == ''"
                                      prop="diploma">
                            <el-radio-group v-model="eduInfo.diploma">
                                <el-radio label="0">有</el-radio>
                                <el-radio label="1">无</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="所学专业" v-if="eduInfo.edu != '0' && eduInfo.edu != '1'" prop="major">
                            <el-input class="wdi-300" v-model="eduInfo.major" placeholder="请输入所学专业"></el-input>
                        </el-form-item>

                        <el-form-item label="就读时间" class="edu-time" prop="startTime">
                            <el-date-picker class="mr-10 wdi-300"
                                    v-model="eduInfo.startTime"
                                    type="month" value-format="yyyy-MM"
                                    placeholder="选择开始时间">
                            </el-date-picker>
                            至
                            <el-date-picker class="ml-10 mr-10 wdi-300"
                                    v-model="eduInfo.endTime"
                                    type="month" value-format="yyyy-MM"
                                    placeholder="选择结束时间">
                            </el-date-picker>

                            <el-checkbox v-model="eduInfo.toThisDay" >至今</el-checkbox>
                            <span class="error-tip" v-show="timeErrorShow">{{timeError}}</span>
                        </el-form-item>
                    </el-form>
                </div>

                <div v-else>
                    <div v-show="user.eduInfos.length > 0" class="mp-edu-item mt-20 mb-20" v-for="(item, index) in user.eduInfos" :key="index"
                         @mouseover="eduEditId = item.id" @mouseout="eduEditId = ''"
                    >
                        <span class="edu-shcool">{{item.school}}</span>
                        <span>{{formatEdu(item.edu)}}</span>
                        <span>{{item.major}}</span>
                        <span>{{item.startTime + ' 至 ' + (item.endTime == null || item.endTime =='' ? (item.end == true ? '至今' : '') : item.endTime)}}</span>
                        <el-button v-show="eduEditId == item.id" type="primary" icon="el-icon-edit" size="mini" @click="editEduInfo(item)">编辑</el-button>
                        <el-button v-show="eduEditId == item.id" type="info" icon="el-icon-delete" size="mini" @click="deleteEduInfo(item.id)">删除</el-button>
                    </div>

                    <div v-show="user.eduInfos.length == 0" class="data-none">
                        数据暂无 <span class="ml-10 base-none-value" @click="eduAddEdit = true"><i class="el-icon-edit"></i>现在补充</span>
                    </div>
                </div>
            </div>

            <div class="mp-top">
                <el-divider content-position="left">
                    履历信息
                </el-divider>
                <el-button v-show="resumeAddEdit" class="collapse-op" size="mini" @click="cancleResumeInfoOp">取消</el-button>
                <el-button v-show="resumeAddEdit" class="collapse-op" size="mini" type="primary" @click="saveResumeInfo">保存</el-button>
                <el-button v-show="!resumeAddEdit" class="collapse-op" size="mini" type="" @click="addResumeInfo">增加</el-button>
            </div>
            <div class="mp-main">
                <div v-if="resumeAddEdit">
                    <el-form ref="resumeForm" :model="resumeInfo" :rules="resumeRules" label-width="80px" class="mp-base-edit">
                        <el-form-item label="公司名称" prop="company">
                            <el-input class="wdi-300" v-model="resumeInfo.company" placeholder="请输入公司名称"></el-input>
                        </el-form-item>

                        <el-form-item label="所属行业" prop="industry">
                            <el-input class="wdi-300" v-model="resumeInfo.industry" placeholder="请选择所属行业" @focus="showIndustryInfo"></el-input>
                        </el-form-item>

                        <el-form-item label="职位名称" prop="position">
                            <el-input class="wdi-300" v-model="resumeInfo.position" placeholder="请输入职位名称"></el-input>
                        </el-form-item>

                        <el-form-item label="在职时间" class="edu-time" prop="startTime">
                            <el-date-picker class="mr-10 wdi-300"
                                            v-model="resumeInfo.startTime"
                                            type="month" value-format="yyyy-MM"
                                            placeholder="选择开始时间">
                            </el-date-picker>
                            至
                            <el-date-picker class="ml-10 mr-10 wdi-300"
                                            v-model="resumeInfo.endTime"
                                            type="month" value-format="yyyy-MM"
                                            placeholder="选择结束时间">
                            </el-date-picker>

                            <el-checkbox v-model="resumeInfo.toThisDay">至今</el-checkbox>
                            <span class="error-tip" v-show="timeErrorShow">{{timeError}}</span>
                        </el-form-item>

                        <el-form-item label="薪水" required>
                            <el-col :span="3">
                                <el-form-item prop="salaryType">
                                    <el-select v-model="resumeInfo.salaryType" placeholder="薪水类型" class="wdi-120" clearable>
                                        <el-option label="月薪" value="0"></el-option>
                                        <el-option label="年薪" value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>

                            <el-col :span="5">
                                <el-form-item prop="salary">
                                    <el-input class="wdi-300 ml-10" v-model="resumeInfo.salary"
                                              :placeholder="resumeInfo.salaryType == 1? '请输入年薪金额' : '请输入月薪金额'">
                                        <template slot="append">元</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-form-item>

                        <el-form-item label="工作描述" prop="description">
                            <el-input class="wdi-800 textarea"
                                      type="textarea"
                                      placeholder="请输入工作描述，为保护个人隐私，请不要填写手机号、QQ、微信等联系方式"
                                      v-model="resumeInfo.description"
                                      :autosize="{ minRows: 6, maxRows: 8}"
                                      maxlength="2000"
                                      show-word-limit
                            >
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>

                <div v-else>
                    <div v-show="user.resumeInfos.length > 0" class="mp-resume-item" v-for="(item, index) in user.resumeInfos" :key="index"
                         @mouseover="resumeEditId = item.id" @mouseout="resumeEditId = ''"
                    >
                        <div class="mt-20 resume-item-main">
                            <span class="edu-shcool">{{item.company}}</span>
                            <div class="mt-20 color-999">
                            <span class="mr-10">
                                <span>岗位：</span>
                                {{item.position}}
                            </span>
                                |
                                <span class="ml-10">
                                 <span>薪水：</span>
                                {{item.salaryType == 0 ? item.salary + "元/月" : item.salary + "元/年"}}
                            </span>
                            </div>
                            <div class="mt-20 color-999">
                                <span>所属行业：</span>
                                {{item.industry}}
                            </div>
                            <div class="mt-20 desc color-999" v-html="item.description"></div>
                        </div>
                        <div class="resume-item-op color-999">
                            <el-button v-show="resumeEditId == item.id" type="primary" icon="el-icon-edit" size="mini" @click="editResumeInfo(item)">编辑</el-button>
                            <el-button v-show="resumeEditId == item.id" type="info" icon="el-icon-delete" size="mini" @click="deleteResumeInfo(item.id)">删除</el-button>
                            <span v-show="resumeEditId != item.id">{{item.startTime + ' 至 ' + (item.endTime == null || item.endTime =='' ? (item.toThisDay == true ? '至今' : '') : item.endTime)}}</span>
                        </div>
                    </div>

                    <div v-show="user.resumeInfos.length == 0" class="data-none">
                        数据暂无 <span class="ml-10 base-none-value" @click="resumeAddEdit = true"><i class="el-icon-edit"></i>现在补充</span>
                    </div>
                </div>
            </div>
        </div>

        <Industry ref="industryRef" @setIndustry="setIndustry"></Industry>
    </div>
</template>

<script>
    import Industry from "@/components/personCenter/Industry"

    export default {
        name: "MyProfile",
        components: {Industry},
        mounted() {
        },
        methods: {

            handleUser(userInfo) {
                this.user = userInfo;
                this.setBaseProfile();
            },

            setBaseProfile() {
                this.baseProfile = [
                    {key: "昵称", value: this.user.nickname},
                    {key: "简介", value: this.user.introduction},
                    {key: "姓名", value: this.user.name},
                    {key: "性别", value: this.formatSex(this.user.sex)},
                    {key: "出生日期", value: this.user.birthtime},
                    {key: "邮箱", value: this.user.mail},
                    {key: "手机", value: this.user.phone},
                ];
            },

            /**
             * 保存基本资料
             */
            async saveBase() {
                this.baseEdit = false;
                this.setBaseProfile();
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_sys_user_update,  this.user, "POST", false);
                if (data.code === 200) {
                    this.$promptMsg("修改基本信息成功", "success");
                    return true;
                }
            },

            /**
             * 修改学历信息
             */
            editEduInfo(val) {
                this.eduAddEdit = true;
                this.eduRequst = "edit";
                this.eduInfo = val;
                this.eduInfo.edu = val.edu.toString()
                this.eduInfo.diploma = val.diploma.toString()
                this.eduInfo.recruitment = val.recruitment.toString()
            },

            /**
             * 增加学历信息
             */
            addEduInfo() {
                this.eduAddEdit = true;
                this.eduRequst = 'add';
            },

            /**
             * 取消学历信息操作
             */
            cancleEduInfoOp() {
                this.eduAddEdit = false;
                this.clearEduInfo();
                this.timeErrorShow = false;
            },

            /**
             * 保存学历信息
             */
            saveEduInfo() {
                this.timeErrorShow = false;
                this.$refs['eduForm'].validate((valid) => {
                    if (valid) {
                        if((this.eduInfo.toThisDay == false || this.eduInfo.toThisDay == null) && (this.eduInfo.endTime == "" || this.eduInfo.endTime == null)) {
                            this.timeErrorShow = true;
                            return false;
                        }
                        this.eduInfo.endTime = this.eduInfo.toThisDay == true ? "" : this.eduInfo.endTime;
                        this.eduAddEdit = false;
                        if(this.eduRequst == "add") {
                            this.addEduInfoRequest();
                        } else {
                            this.editEduInfoRequest()
                        }
                    } else {
                        return false;
                    }
                });

            },

            /**
             * 增加学历信息
             */
            async addEduInfoRequest() {
                this.eduInfo.userId = this.user.id
                var params = this.eduInfo;
                params.diploma = Number(this.eduInfo.diploma);
                params.edu = Number(this.eduInfo.edu);
                params.recruitment = Number(this.eduInfo.recruitment);
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_sys_user_edu_save,  params, "POST", false);
                if (data.code === 200) {
                    this.user.eduInfos.unshift(data.data);
                    this.clearEduInfo();
                    this.$promptMsg("增加学历信息成功", "success");
                    return true;
                }
            },

            /**
             * 修改学历信息
             */
            async editEduInfoRequest() {
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_sys_user_edu_update,  this.eduInfo, "POST", false);
                if (data.code === 200) {
                    var eduInfosTemp = [];
                    for(var i in  this.user.eduInfos) {
                        var currentEduInfo = this.user.eduInfos[i];
                        var currentId = currentEduInfo.id;
                        var eduId = this.eduInfo.id;
                        if(currentId == eduId) {
                            eduInfosTemp.push(this.eduInfo);
                        }
                        else {
                            eduInfosTemp.push(currentEduInfo);
                        }
                    }
                    this.user.eduInfos = eduInfosTemp;
                    this.clearEduInfo();
                    this.$promptMsg("修改学历信息成功", "success");
                    return true;
                }
            },


            /**
             * 删除学历信息
             */
            deleteEduInfo(id) {
                this.$confirm('数据一旦删除就无法恢复，请确认是否继续？', '确认信息', {
                    closeOnClickModal: false,
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认删除',
                    cancelButtonText: '取消'
                })
                .then(() => {
                    this.deleteRequest(id);
                })
                .catch({
                });
            },
            async deleteRequest(id) {
                let params = new FormData()
                params.append("id", id);
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_sys_user_edu_delete,  params, "POST", false);
                if (data.code === 200) {
                    var eduInfosTemp = [];
                    for(var i in  this.user.eduInfos) {
                        var currentEduInfo = this.user.eduInfos[i];
                        var currentId = currentEduInfo.id;
                        if(currentId != id) {
                            eduInfosTemp.push(currentEduInfo);
                        }
                    }
                    this.user.eduInfos = eduInfosTemp;
                    this.$promptMsg("删除学历信息成功", "success");
                    return true;
                }
            },

            /**
             * 清除学历信息
             */
            clearEduInfo() {
                this.eduInfo =  {
                    id: "",
                    school: "",
                    edu: "",
                    recruitment: "",
                    diploma: "",
                    major: "",
                    startTime: "",
                    endTime: "",
                    toThisDay: "",
                }
            },

            /**
             * 修改履历信息
             */
            editResumeInfo(val) {
                this.resumeAddEdit = true;
                this.resumeRequst = "edit";
                this.resumeInfo = val;
                this.resumeInfo.salaryType = val.salaryType.toString();
                this.resumeInfo.description = this.resumeInfo.description.split("<br />").join("\n");
            },

            /**
             * 增加履历信息
             */
            addResumeInfo() {
                this.resumeAddEdit = true;
                this.resumeRequst = "add";
            },

            /**
             * 取消履历信息操作
             */
            cancleResumeInfoOp() {
                this.resumeAddEdit = false;
                this.clearResumeInfo();
            },

            /**
             * 保存履历信息
             */
            saveResumeInfo() {
                this.$refs['resumeForm'].validate((valid) => {
                    if (valid) {
                        if((this.resumeInfo.toThisDay == false || this.resumeInfo.toThisDay == null) && (this.resumeInfo.endTime == "" || this.resumeInfo.endTime == null)) {
                            this.timeErrorShow = true;
                            return false;
                        }
                        this.resumeInfo.endTime = this.resumeInfo.toThisDay == true ? "" : this.resumeInfo.endTime;
                        this.resumeAddEdit = false;
                        if(this.resumeRequst == "add") {
                            this.addResumeInfoRequest();
                        } else {
                            this.editResumeInfoRequest()
                        }
                    } else {
                        return false;
                    }
                });
            },

            /**
             * 增加履历信息请求
             */
            async addResumeInfoRequest() {
                this.resumeInfo.userId = this.user.id
                if(this.resumeInfo.description != null && this.resumeInfo.description != '' && this.resumeInfo.description != undefined) {
                    this.resumeInfo.description = this.resumeInfo.description.split("\n").join("<br />");
                }
                var params = this.resumeInfo;
                params.salaryType = Number(this.resumeInfo.salaryType);
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_sys_user_resume_save,  params, "POST", false);
                if (data.code === 200) {
                    this.user.resumeInfos.unshift(data.data);
                    this.clearResumeInfo();
                    this.$promptMsg("增加履历信息成功", "success");
                    return true;
                }
            },

            /**
             * 修改履历信息请求
             */
            async editResumeInfoRequest() {
                if(this.resumeInfo.description != null && this.resumeInfo.description != '' && this.resumeInfo.description != undefined) {
                    this.resumeInfo.description = this.resumeInfo.description.split("\n").join("<br />");
                }
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_sys_user_resume_update,  this.resumeInfo, "POST", false);
                if (data.code === 200) {
                    var resumeInfosTemp = [];
                    for(var i in  this.user.resumeInfos) {
                        var currentResume = this.user.resumeInfos[i];
                        var currentId = currentResume.id;
                        var resumeId = this.resumeInfo.id;
                        if(currentId == resumeId) {
                            resumeInfosTemp.push(this.resumeInfo);
                        }
                        else {
                            resumeInfosTemp.push(currentResume);
                        }
                    }
                    this.user.resumeInfos = resumeInfosTemp;
                    this.clearResumeInfo();
                    this.$promptMsg("修改履历信息成功", "success");
                    return true;
                }
            },

            /**
             * 删除履历信息
             */
            deleteResumeInfo(id) {
                this.$confirm('数据一旦删除就无法恢复，请确认是否继续？', '确认信息', {
                    closeOnClickModal: false,
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认删除',
                    cancelButtonText: '取消'
                })
                .then(() => {
                    this.deleteResumeInfoRequest(id);
                })
                .catch({
                });
            },
            async deleteResumeInfoRequest(id) {
                let params = new FormData()
                params.append("id", id);
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_sys_user_resume_delete,  params, "POST", false);
                if (data.code === 200) {
                    var resumeInfosTemp = [];
                    for(var i in  this.user.resumeInfos) {
                        var currentResumeInfo = this.user.resumeInfos[i];
                        var currentId = currentResumeInfo.id;
                        if(currentId != id) {
                            resumeInfosTemp.push(currentResumeInfo);
                        }
                    }
                    this.user.resumeInfos = resumeInfosTemp;
                    this.$promptMsg("删除履历信息成功", "success");
                    return true;
                }
            },

            /**
             * 清除履历信息
             */
            clearResumeInfo() {
                this.resumeInfo =  {
                    id: "",
                    company: "",
                    industry: "",
                    position: "",
                    startTime: "",
                    endTime: "",
                    toThisDay: "",
                    salary: "",
                    salaryType: "0",
                    description: "",
                }
            },

            /**
             * 选择行业信息
             */
            showIndustryInfo() {
                this.$refs.industryRef.open(this.resumeInfo.industry);
            },

            /**
             * 设置选中的行业
             */
            setIndustry(val, subval) {
                this.resumeInfo.industry = val + " / " + subval;
            },

            formatRecruitment(val) {
                if(val == 0) {
                    val = "统招";
                } else {
                    val = "非统招";
                }
                return val;
            },

            formatHas(val) {
                if(val == 0) {
                    val = "有";
                } else {
                    val = "无";
                }
                return val;
            },

            formatSex(val) {
                if(val == 0) {
                    val = "男";
                } else {
                    val = "女";
                }
                return val;
            },

            formatEdu(val) {
                val = val.toString();
                switch (val) {
                   case "0":
                       val = "初中及以下";
                       break;
                   case "1":
                       val = "高中";
                       break;
                   case "2":
                       val = "中专/中技";
                       break;
                   case "3":
                       val = "大专";
                       break;
                   case "4":
                       val = "本科";
                       break;
                   case "5":
                       val = "硕士";
                       break;
                   case "6":
                       val = "博士";
                       break;
                   default:
                       break;
                }
                return val;
            },

        },
        data() {
            return {
                // 基本信息
                baseProfile: [
                    {key: "昵称", value: ""},
                    {key: "简介", value: ""},
                    {key: "姓名", value: ""},
                    {key: "性别", value: ""},
                    {key: "出生日期", value: ""},
                    {key: "邮箱", value: ""},
                    {key: "手机", value: ""},
                ],

                // 用户信息
                user: {
                    nickname: "",
                    introduction: "",
                    avatar: "",
                    name: "",
                    sex: "",
                    mail: "",
                    phone: "",
                    birthtime: "",
                    eduInfos: [
                        {
                            id: "1",
                            school: "皖西学院",
                            edu: "4",
                            recruitment: "0",
                            diploma: "0",
                            major: "电子信息科学与技术",
                            startTime: "2011-09",
                            endTime: "2015-07",
                            toThisDay: "",
                        }
                    ],
                    resumeInfos: [
                        {
                            id: "1",
                            company: "杭州爱启云网络科技有限公司",
                            industry: "互联网",
                            position: "总经理兼技术总监",
                            startTime: "2020-7",
                            endTime: "",
                            toThisDay: true,
                            monthlySalary: "",
                            annualSalary: "100万元",
                            description: "1、管理分公司云服务产品部软件团队和产品，管理分公司技术部门团队<br/>" +
                            "2、协助公司培养新入职员工，培训周期三个月，了解新入职员工意愿帮助他们技术、业务等方面成长，能够适应公司的工作<br/>" +
                            "3、管理和浙江电信、移动、联通等运营商合作的商务项目，落地、协调、风控、运营等工作<br/>" +
                            "4、管理总公司公有云平台研发、运维等工作<br/>" +
                            "5、参与管理云服务产品部的iaas云管理平台研发等工作",
                        },
                        {
                            id: "2",
                            company: "北京思特奇信息技术股份有限公司",
                            industry: "互联网",
                            position: "产品负责人",
                            startTime: "2017-7",
                            endTime: "2020-7",
                            toThisDay: "",
                            monthlySalary: "",
                            annualSalary: "22万元",
                            description: "1、管理分公司云服务产品部软件团队和产品，管理分公司技术部门团队<br/>" +
                            "2、协助公司培养新入职员工，培训周期三个月，了解新入职员工意愿帮助他们技术、业务等方面成长，能够适应公司的工作<br/>" +
                            "3、管理和浙江电信、移动、联通等运营商合作的商务项目，落地、协调、风控、运营等工作<br/>" +
                            "4、管理总公司公有云平台研发、运维等工作<br/>" +
                            "5、参与管理云服务产品部的iaas云管理平台研发等工作",
                        }
                    ],
                },

                // 学历信息
                eduInfo: {
                    id: "",
                    userId: "",
                    school: "",
                    edu: "",
                    recruitment: "",
                    diploma: "",
                    major: "",
                    startTime: "",
                    endTime: "",
                    toThisDay: "",
                },

                // 履历信息
                resumeInfo: {
                    id: "",
                    company: "",
                    industry: "",
                    position: "",
                    startTime: "",
                    endTime: "",
                    toThisDay: "",
                    salary: "",
                    salaryType: "0",
                    description: "",
                },

                // 修改基本信息按钮显示
                baseEdit: false,
                // 增加、编辑学历信息按钮显示
                eduAddEdit: false,
                // 学历编辑选择id
                eduEditId: "",
                // 学历操作请求
                eduRequst: "add",
                // 增加、编辑履历信息按钮显示
                resumeAddEdit: false,
                // 履历编辑选择id
                resumeEditId: "",
                // 履历操作请求
                resumeRequst: "add",

                eduOptions: [
                    {label: "初中及以下", value: "0"},
                    {label: "高中", value: "1"},
                    {label: "中专/中技", value: "2"},
                    {label: "大专", value: "3"},
                    {label: "本科", value: "4"},
                    {label: "硕士", value: "5"},
                    {label: "博士", value: "6"},
                ],

                eduRules: {
                    school: [{ type: 'string', required: true, message: '请输入学校名称', trigger: 'blur'}],
                    edu: [{ type: 'string', required: true, message: '请选择学历', trigger: 'blur'}],
                    recruitment: [{ type: 'string', required: true, message: '请选择是否统招', trigger: 'blur'}],
                    diploma: [{ type: 'string', required: true, message: '请选择有无学位证书', trigger: 'blur'}],
                    major: [{ type: 'string', required: true, message: '请输入专业名称', trigger: 'blur'}],
                    startTime: [{ type: 'string', required: true, message: '请输入开始时间', trigger: 'blur'}],
                },
                resumeRules: {
                    company: [{ type: 'string', required: true, message: '请输入公司名称', trigger: 'blur'}],
                    industry: [{ type: 'string', required: true, message: '请选择所属行业', trigger: 'blur'}],
                    position: [{ type: 'string', required: true, message: '请输入岗位', trigger: 'blur'}],
                    startTime: [{ type: 'string', required: true, message: '请输入开始时间', trigger: 'blur'}],
                    salary: [
                        {required: true, message: '请输入薪水金额'},
                        {pattern:/^\d{1,20}$/, message: '薪水金额必须填写数字', trigger: 'blur'},
                    ],
                    salaryType: [{ type: 'string', required: true, message: '请选择薪水形式', trigger: 'blur'}],
                    description: [{ type: 'string', required: true, message: '请输入工作描述', trigger: 'blur'}],
                },
                timeErrorShow: false,
                timeError: "请输入结束时间或者勾选至今",
            }
        }
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
        .mp-top {
            display: flex;
        }
        .collapse-op {
            margin-left: 20px;
            margin-top: 10px;
            height: 30px;
        }
        .mp-main {
            margin-left: 50px;
            font-size: 14px;
            color: #606266;
        }
        .mp-base-edit {
            text-align: left;
            margin-top: 20px;
        }
        .mp-base-item {
            display: flex;
            line-height: 40px;
            text-align: left;
            margin-top: 5px;
            margin-bottom: 5px;
        }
        .base-key {
            width: 80px;
            color: #999;
        }
        .base-value {
            width: 880px;
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
        .mp-edu-item {
            text-align: left;
            margin: 10px 0 10px 0;
            height: 40px;
        }
        .mp-edu-item > span {
            display: inline-block;
            padding: 5px 20px 5px 0px;
        }
        .edu-shcool {
            font-size: 18px;
            color: #ff6f29;
        }
        .mp-resume-item {
            display: flex;
            text-align: left;
        }
        .resume-item-main {
            width: 816px;
        }
        .resume-item-op {
            width: 300px;
            text-align: right;
            margin-top: 20px;
            padding-right: 40px;
        }
        .desc {
            line-height: 25px;
        }
        .data-none {
            text-align: left;
            color: #999999;
        }
        .error-tip {
            color: #F56C6C;
            font-size: 12px;
            line-height: 1;
            padding-top: 4px;
            position: absolute;
            top: 100%;
            left: 0;
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
        .mp-base-top .el-divider__text {
            font-size: 18px;
            font-weight: 600;
        }
        .textarea textarea{
            font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        }
    }

</style>