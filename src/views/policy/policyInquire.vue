<template>
    <div>
        <div class="header">
            <Header ref="headerRef" :activePage="activePage"></Header>
        </div>
        <div class="aioc-container" :style="'width:' + clientWidth + 'px;'">
            <div class="aioc-container">
                <div class="poin-main">
                    <el-card shadow="hover" class=" search-cond wow bounceInLeft">
                        <div class="cond">
                            <span>区域选择：</span>
                            <el-cascader
                                    class="ml-5"
                                    ref="areaCascaderRef"
                                    size="large"
                                    :props="{ checkStrictly: true }"
                                    :options="areaOptions"
                                    v-model="cond.area"
                                    @change="handleAreaCascader"
                                    placeholder="更多城市选择">
                            </el-cascader>

                            <div class="hot-cond">
                                <span>热门区域：</span>
                                <span   :class="cond.area.toString() == item.toString() ? 'cond-selected' : ''"
                                        v-for="(item, index) in hotArea" :key="index"
                                        @click="selectArea(item)"
                                >{{item[item.length - 1]}}</span>

                                <span class="cond-selected maps" @click="showMap">从地图上选择</span>
                            </div>
                        </div>

                        <div class="cond">
                            <span>待遇类型：</span>
                            <el-cascader
                                    class="ml-5"
                                    ref="policyCascaderRef"
                                    size="large"
                                    :props="{ checkStrictly: true }"
                                    :options="policyOptions"
                                    v-model="cond.policy"
                                    @change="handlePolicyCascader"
                                    placeholder="更多政策选择">
                            </el-cascader>

                            <div class="hot-cond">
                                <span>热门待遇：</span>
                                <span   :class="cond.policy.toString() == item.toString() ? 'cond-selected' : ''"
                                        v-for="(item, index) in hotPolicy" :key="index"
                                        @click="selectPolicy(item)"
                                >{{item[item.length - 1]}}</span>
                            </div>
                        </div>

                        <div class="select-conds">
                            <span>当前选择的条件：</span>
                            <el-tag>{{cond.area.toString()}}</el-tag>
                            <el-tag>{{cond.policy[cond.policy.length - 1]}}</el-tag>

                        </div>
                        <el-button type="primary" @click="search(0, 10)">查询政策</el-button>
                        <el-button @click="resetCond">重置条件</el-button>

                    </el-card>

                    <el-card shadow="hover" class="wow bounceInLeft">
                        <el-table
                                class="w-100"
                                ref="policyRef"
                                :data="policyDatas"
                                border
                                :header-cell-style="{textAlign: 'center'}"
                                :row-style="{height:'20px'}"
                                :cell-style="{padding:'9px 1px', textAlign: 'center'}"
                                @row-dblclick="toDetail"
                        >
                            <el-table-column fixed="left" type="selection" width="55"></el-table-column>
                            <el-table-column prop="title" label="政策标题" :show-overflow-tooltip="true" width="300"></el-table-column>
                            <el-table-column prop="content" label="内容" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="treatmentTypeName" label="待遇类型" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="talentTreatment" label="人才待遇" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="policyType" label="政策类型" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="" label="适用区域">
                                <el-table-column prop="" label="区域">
                                    <template slot-scope="scope">
                                        {{handleToArea(scope.row)}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="level" label="级别" :show-overflow-tooltip="true" :formatter="formatLevel" width="80"></el-table-column>
                                <el-table-column prop="matchRate" label="匹配率" :show-overflow-tooltip="true" :formatter="formatMatchRate" width="80"></el-table-column>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="80">
                                <template slot-scope="scope">
                                    <!--<router-link :to="{path:'/policyDetail', query:{id:scope.row.id}}" target="_blank">-->
                                        <el-button
                                                size="mini"
                                                type="success" @click="toDetail(scope.row)">
                                            详情
                                        </el-button>
                                    <!--</router-link>-->
                                </template>
                            </el-table-column>
                        </el-table>

                        <Pagination class="mt-10" ref="pageRef" @search="search"></Pagination>
                    </el-card>
                </div>

                <div class="pinf-main">
                    <el-card shadow="hover" class=" search-cond wow bounceInLeft">
                        <div slot="header" class="clearfix">
                            <span style="float: left; padding: 3px 0">您的资料</span>
                            <div v-if="pinfEdit">
                                <el-button class="fr" type="text" @click="pinfEdit = false">取消</el-button>
                                <el-button class="fr" type="text" @click="savePinf">保存</el-button>
                            </div>
                            <el-button v-else style="float: right; padding: 3px 0" type="text" @click="editPinf">编辑资料</el-button>
                        </div>
                        <div v-if="pinfEdit">
                            <el-form ref="form" :model="userForm" label-width="70px" class="mp-base-edit">
                                <el-form-item label="姓名">
                                    <el-input class="wdi-288" v-model="userForm.name" placeholder="请输入您的姓名"></el-input>
                                </el-form-item>
                                <el-form-item label="国籍">
                                    <el-select class="wdi-288" placeholder="请选择您的国籍" filterable v-model="userForm.nationality" clearable>
                                        <el-option-group v-for="group in country" :key="group.label" :label="group.label">
                                            <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.label">
                                                <span style="float: left">{{ item.label }}</span>
                                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                                            </el-option>
                                        </el-option-group>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="性别">
                                    <el-radio-group v-model="userForm.sex" class="wdi-288 sexg">
                                        <el-radio label="0">男</el-radio>
                                        <el-radio label="1">女</el-radio>
                                    </el-radio-group>
                                </el-form-item>

                                <el-form-item label="出生日期">
                                    <el-date-picker class="mr-10 wdi-288"
                                                    v-model="userForm.birthtime"
                                                    type="date"  value-format="yyyy-MM-dd"
                                                    placeholder="请选择您的出生日期">
                                    </el-date-picker>
                                </el-form-item>

                                <el-form-item label="学历" prop="edu">
                                    <el-select v-model="userForm.edu" placeholder="请选择您的最高学历" class="wdi-288" clearable>
                                        <el-option
                                                v-for="(item, index) in eduOptions"
                                                :key="index"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="大学">
                                    <el-input class="wdi-288" v-model="userForm.university" placeholder="请输入大学名称"></el-input>
                                </el-form-item>

                                <el-form-item label="职称">
                                    <el-tag class="job-tag" v-for="(item, index) in ranks" :key="index"
                                            type="success" closable
                                            :disable-transitions="false" @close="removeRank(item)">
                                        {{item}}
                                    </el-tag>

                                    <div v-if="inputVisible">
                                        <el-input
                                                class="wdi-288 fl"
                                                v-model="rank"
                                                ref="saveTagInput"
                                                size="small"
                                                @keyup.enter.native="handleInputConfirm"
                                                @blur="handleInputConfirm"
                                                placeholder="请输入您获取的职称"
                                        >

                                        </el-input>
                                        <el-button class="sureadd fl" size="mini" type="primary" @click="handleInputConfirm">确认添加</el-button>
                                    </div>

                                    <el-button v-else class="fl" size="small" @click="showInput"><i class="el-icon-plus"></i>增加职称</el-button>

                                </el-form-item>
                            </el-form>
                        </div>

                        <div v-else class="mp-base-item" v-for="(item, index) in pinfProfile" :key="index">
                            <div class="base-key" >{{item.key}}</div>
                            <div v-if="item.value" class="base-value">
                                {{item.value}}
                            </div>
                            <div v-else class="base-none-value" @click="pinfEdit = true"><i class="el-icon-edit"></i>现在补充</div>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
        <Aiocmap ref="aiocmapRef"></Aiocmap>
    </div>
</template>

<script>
    import Header from  "@/components/Header"
    import Pagination from '@/components/Pagination'
    import areaData from '@/assets/json/areaData.json'
    import nationality from '@/assets/js/nationality.js'
    import Aiocmap from '@/components/Aiocmap'

    export default {
        name: "policyInquire",
        components: {Header, Pagination, Aiocmap},
        mounted() {
            new this.$wow.WOW({
                live: false
            }).init();
            this.clientWidth = document.body.clientWidth;
            this.clientHeight = document.body.clientHeight -50;
            this.country = nationality.country;
            this.initAreaOptions(areaData);
            this.search(0, 10);
            this.loadUser();
        },
        methods: {

            /**
             * 显示地图
             * @param {*}
             * @author panyong
             */
            showMap() {
                this.$refs.aiocmapRef.open();
                this.$refs.aiocmapRef.initMapChart();
            },

            /**
             * 保存个人资料
             * @param {*}
             * @author panyong
             */
            async savePinf() {
                console.log(this.userForm.id)
                this.userForm.ranks = this.ranks.toString();
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_sys_user_update,  this.userForm, "POST", false);
                if (data.code === 200) {
                    this.$promptMsg("编辑您的资料成功", "success");
                    this.pinfEdit = false;
                    this.showPinf();
                    return true;
                }
            },

            /**
             * 编辑个人资料
             * @param {*}
             * @author panyong
             */
            editPinf() {
                this.pinfEdit = true;
                this.ranks = this.userForm.ranks.split(",");
            },

            /**
             * 显示输入职称框
             * @param {*}
             * @author panyong
             */
            showInput() {
                this.inputVisible = true;
                this.$nextTick(() => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            /**
             * 输入职称
             * @param
             * @author panyong
             */
            handleInputConfirm() {
                let jobt = this.rank;
                if (jobt) {
                    this.ranks.push(jobt);
                }
                this.inputVisible = false;
                this.rank = '';
            },

            /**
             * 增加职称
             * @param {*}
             * @author panyong
             */
            addRank() {
                if(this.rank) {
                    var item = this.rank;
                    this.ranks.push(item);
                }

            },

            /**
             * 移除职称
             * @param {*} rankItem 职称名称
             * @author panyong
             */
            removeRank(rankItem) {
                this.ranks.splice(this.ranks.indexOf(rankItem), 1);
            },

            /**
             * 加载个人资料
             * @param {*}
             * @author panyong
             */
            async loadUser() {
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_login_currentuser, {}, "GET", false);
                if (data.code === 200) {
                    this.userForm = data.data;
                    this.showPinf();
                    return true;
                }
            },

            /**
             * 展示个人资料
             * @param {*}
             * @author panyong
             */
            showPinf() {
                this.pinfProfile = [
                    {key: "姓名", value: this.userForm.name},
                    {key: "国籍", value: this.userForm.nationality},
                    {key: "性别", value: this.formatSex(this.userForm.sex)},
                    {key: "出生日期", value:  this.userForm.birthtime},
                    {key: "学历", value: this.formatEdu(this.userForm.edu)},
                    {key: "大学", value: this.userForm.university},
                    {key: "职称", value: this.userForm.ranks},
                ];
                if(this.userForm.ranks != null &&  this.userForm.ranks != "" &&  this.userForm.ranks != undefined) {
                    this.ranks = this.userForm.ranks.split(",");
                }
            },

            /**
             * 搜索政策
             * @param {*} currentPage 页码
             * @param {*} pageSize 每页数量
             * @author panyong
             */
            async search(currentPage, pageSize) {
                let params = new FormData()
                if(this.cond.policy.length == 1) {
                    if(this.cond.policy[0] != "全部待遇") {
                        params.append("treatmentParentTypeName", this.cond.policy[0]);
                    }
                }
                else if(this.cond.policy.length == 2) {
                    params.append("treatmentTypeName", this.cond.policy[1]);
                }

                if(this.cond.area.length == 1) {
                    if(this.cond.area[0] == "全国") {
                        params.append("country", this.cond.area[0]);
                    } else {
                        params.append("province", this.cond.area[0]);
                    }
                }
                else if(this.cond.area.length == 2) {
                    params.append("city", this.cond.area[1]);
                }
                else if(this.cond.area.length == 3) {
                    params.append("county", this.cond.area[2]);
                }
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_cm_talent_policy_page_list, params, "POST");
                if (data.code === 200) {
                    console.log(data)
                    this.policyDatas = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },

            /**
             * 重置条件
             */
            resetCond() {
                this.cond = {
                    area: ["全国"],
                    policy: ["全部待遇"],
                }
            },

            /**
             * 看详情
             * @param {*} row 行对象
             * @author panyong
             */
            toDetail(row) {
                const aioctoken = this.$utils.getCookie("aioctoken");
                if(aioctoken) {
                    const detail = this.$router.resolve({name: 'policyDetail'});
                    this.$utils.setStorage("policyId", row.id);
                    window.open(detail.href,'_blank')
                } else {
                    this.$promptMsg("请先登录",  "info");
                }
            },

            /**
             * 处理地区条件选择变化
             */
            handleAreaCascader() {
                if (this.$refs.areaCascaderRef) {
                    this.$refs.areaCascaderRef.dropDownVisible = false; //监听值发生变化就关闭它
                }
                this.$(".cond span").removeClass("cond-selected");
            },

            /**
             * 处理政策条件选择变化
             */
            handlePolicyCascader() {
                if (this.$refs.policyCascaderRef) {
                    this.$refs.policyCascaderRef.dropDownVisible = false; //监听值发生变化就关闭它
                }
                this.$(".cond span").removeClass("cond-selected");
            },

            /**
             * 选择区域条件
             */
            selectArea(area) {
                this.cond.area = area;
            },

            /**
             * 选择政策条件
             */
            selectPolicy(policy) {
                this.cond.policy = policy;
            },

            /**
             * 初始化地域数据
             */
            initAreaOptions(area) {
                var all = {
                    label:"全国",
                    value:"全国",
                }
                this.areaOptions.push(all);
                for(let key in area){
                    let province = area[key];
                    var provinceObj = {
                        label:key,
                        value:key,
                        children:[]
                    }
                    this.areaOptions.push(provinceObj);
                    for(let cityKey in province){
                        let city = province[cityKey];
                        var cityObj={
                            label:cityKey,
                            value:cityKey,
                            children:[]
                        }
                        provinceObj.children.push(cityObj);
                        for(let areaKey in city) {
                            var areaObj={
                                label:areaKey,
                                value:areaKey,
                            }
                            cityObj.children.push(areaObj);
                        }
                    }
                }
            },

            /**
             * 处理适用区域
             */
            handleToArea(row) {
                if(row.province == null || row.province == '') {
                    return row.country;
                }
                else if(row.city == null || row.city == '') {
                    return row.province;
                }
                else if(row.county == null || row.county == '') {
                    return row.province + " / " + row.city;
                }
                else {
                    return row.province + " / " + row.city + " / " + row.county;
                }
            },

            /**
             * 格式化级别
             */
            formatLevel(row, column) {
                const level = row[column.property];
                switch (level) {
                    case "0":
                        return "国家级";
                    case "1":
                        return"省级";
                    case "2":
                        return "市级";
                    case "3":
                        return "区级";
                    default:
                        break;
                }
                return level;
            },

            formatMatchRate(row, column) {
                const matchRate = row[column.property];
                return parseInt(matchRate) + "%";
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
                if(val == null || val == undefined || val == "") {
                    return val;
                }
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
                clientWidth: 1800,
                clientHeight: 970,

                // 国籍数据
                country: [],

                // 用户信息
                userForm: {
                    nickname: "",
                    introduction: "",
                    avatar: "",
                    name: "",
                    sex: "",
                    mail: "",
                    phone: "",
                    birthtime: "",
                    eduInfos: [
                    ],
                    resumeInfos: [
                    ],
                    nationality: "",
                    university: "",
                    ranks: "",
                    edu: "",
                    age: "",
                },

                // 编辑个人资料
                pinfEdit: false,

                // 个人资料
                pinfProfile: [
                    {key: "姓名", value: ""},
                    {key: "国籍", value: ""},
                    {key: "性别", value: ""},
                    {key: "出生日期", value: ""},
                    {key: "学历", value: ""},
                    {key: "职称", value: ""},
                ],

                eduOptions: [
                    {label: "初中及以下", value: "0"},
                    {label: "高中", value: "1"},
                    {label: "中专/中技", value: "2"},
                    {label: "大专", value: "3"},
                    {label: "本科", value: "4"},
                    {label: "硕士", value: "5"},
                    {label: "博士", value: "6"},
                ],

                // 职称
                rank: "",

                inputVisible: false,

                ranks: [],

                /*当前选中菜单*/
                activePage: '人才政策',

                /* 查询到的政策 */
                policyDatas: [],

                /* 分页参数 */
                currentPage: 1,
                pageSize: 10,

                /* 政策条件 */
                cond: {
                    area: ["全国"],
                    policy: ["全部待遇"],
                },

                /* 热门区域条件 */
                hotArea: [
                    ["浙江省", "杭州市"], ["上海市"], ["安徽省", "合肥市"], ["广东省", "深圳市"], ["北京市"], ["重庆市"], ["江苏省", "南京市"]
                ],

                /* 热门政策条件 */
                hotPolicy: [
                    ["经济补贴类", "经费资助"],
                    ["经济补贴类", "生活补贴"],
                    ["住房保障类", "人才公寓"],
                    ["服务保障类", "子女教育"],
                    ["其他类", "车辆上牌"],
                    ["其他类", "身份编制"],
                    ["其他类", "场地支持"]
                ],

                /* 更多地域 */
                areaOptions: [],

                /* 更多政策 */
                policyOptions: [
                    {
                        label: "全部待遇",
                        value: "全部待遇",
                    },
                    {
                        label: "经济补贴类",
                        value: "经济补贴类",
                        children: [
                            {
                                label: "经费资助",
                                value: "经费资助",
                            },
                            {
                                label: "生活补贴",
                                value: "生活补贴",
                            },
                            {
                                label: "引才补助",
                                value: "引才补助",
                            },
                            {
                                label: "担保贷款",
                                value: "担保贷款",
                            },
                        ]
                    },
                    {
                        label: "住房保障类",
                        value: "住房保障类",
                        children: [
                            {
                                label: "周转住房",
                                value: "周转住房",
                            },
                            {
                                label: "购房补贴",
                                value: "购房补贴",
                            },
                            {
                                label: "租房补贴",
                                value: "租房补贴",
                            },
                            {
                                label: "安家补贴",
                                value: "安家补贴",
                            },
                            {
                                label: "人才公寓",
                                value: "人才公寓",
                            },
                        ]
                    },
                    {
                        label: "服务保障类",
                        value: "服务保障类",
                        children: [
                            {
                                label: "户籍保障",
                                value: "户籍保障",
                            },
                            {
                                label: "家属就业",
                                value: "家属就业",
                            },
                            {
                                label: "医疗保健",
                                value: "医疗保健",
                            },
                            {
                                label: "社会保险",
                                value: "社会保险",
                            },
                            {
                                label: "综合服务",
                                value: "综合服务",
                            },
                            {
                                label: "子女教育",
                                value: "子女教育",
                            },
                        ]
                    },
                    {
                        label: "其他类",
                        value: "其他类",
                        children: [
                            {
                                label: "税收补偿",
                                value: "税收补偿",
                            },
                            {
                                label: "车辆上牌",
                                value: "车辆上牌",
                            },
                            {
                                label: "身份编制",
                                value: "身份编制",
                            },
                            {
                                label: "场地支持",
                                value: "场地支持",
                            },
                        ]
                    }
                ],

            }
        },
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
        .poin-main {
            width: 1100px;
            margin-top: 10px;
            margin-bottom: 10px;
        }
        .pinf-main {
            width: 400px;
            margin: 10px 0px 10px 10px;
        }
        .poin-main > .el-card {
            margin: 20px;
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
            width: 190px;
        }
        .base-none-value > i {
            color: #409EFF;
            margin-right: 10px;
        }
        .base-none-value {
            color: #f95122;
        }
        .base-none-value:hover {
            text-decoration: underline;
        }
        .job-tag {
            float: left;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        .sureadd {
            height: 34px ;
        }
        .sexg {
            text-align: left;
            padding-left: 10px;
        }
        .maps {
            background: #409EFF;
            margin-left: 10px;
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
        .el-cascader-menu__list {
            width: 214px !important;
        }
        .select-conds-card > .el-card__body {
            padding: 10px 20px 10px 20px;
        }
        .poin-main .el-card { margin: 0px !important;}
    }
</style>