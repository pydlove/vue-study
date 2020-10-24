<template>
    <div>
        <div class="header">
            <Header ref="headerRef" :activePage="activePage"></Header>
        </div>
        <div class="aioc-container" :style="'width:' + clientWidth + 'px;'">
            <div class="mpp-container">
                <div class="mpp-main">
                    <el-card shadow="hover" class="pinf-card wow bounceInLeft">
                        <div slot="header" class="clearfix">
                            <span class="fl">您的资料</span>
                            <div v-if="pinfEdit">
                                <el-button class="fr" type="text" @click="pinfEdit = false">取消</el-button>
                                <el-button class="fr" type="text" @click="savePinf">保存</el-button>
                            </div>
                            <el-button v-else class="fr" type="text" @click="editPinf">编辑资料</el-button>
                        </div>
                        <div v-if="pinfEdit">
                            <el-form ref="form" :model="userForm" label-width="70px" class="mp-base-edit">
                                <el-form-item label="姓名">
                                    <el-input class="wdi-288" v-model="userForm.name" placeholder="请输入您的姓名"></el-input>
                                </el-form-item>
                                <el-form-item label="国籍">
                                    <el-select class="wdi-288" placeholder="请选择您的国籍" filterable v-model="user.nationality" clearable>
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

                    <div>
                        <el-card shadow="hover" class="result-card wow bounceInLeft">
                            <div slot="header" class="clearfix">
                                <span class="fl" >您满足政策条件的结果
                                    <span class="resn">（{{totalPolicyCount}}个）</span>
                                </span>

                                <!--暂时去除分类选择-->
                                <!--<el-row class="fr">-->
                                    <!--<el-button :type="resultClassificationType == 'area_province'  ? 'primary':'info'" size="mini" @click="loadResultByArea()">按城市分类</el-button>-->
                                    <!--<el-button :type="resultClassificationType == 'treatment' ? 'primary':'info'" size="mini" @click="loadResultByTreatment()">按待遇分类</el-button>-->
                                <!--</el-row>-->
                            </div>
                            <div class="result-card-main">
                                <el-row v-if="resultClassificationType == 'area_province'">
                                    <el-tag class="mt-5 mb-5 mr-5 res-tag" effect="plain"
                                            v-for="(item, index) in provincePolicies.provincePolicies" :key="index" @click="showMyMatchPolicyByArea(index)">
                                        <a class="resc">{{index}}（{{item}}）</a>
                                    </el-tag>
                                </el-row>

                                <el-row v-else>
                                    <el-tag class="mt-5 mb-5 mr-5 res-tag" effect="plain"
                                            v-for="(item, index) in parentTreatmentPolicies" :key="index" @click="showMyMatchPolicyByTreatment(index)">
                                        <a class="resc">{{index}}（{{item}}）</a>
                                    </el-tag>
                                </el-row>
                            </div>
                        </el-card>

                        <div v-if="resultClassificationType == 'area_province'">
                            <el-card v-show="showMyMatchPolicyByCityFlag" id="myMatchPolicyByCity" shadow="hover" class="result-card wow bounceInLeft">
                                <div slot="header" class="clearfix">
                                <span class="fl" >
                                    您满足 <span class="fb">{{selectProvince}}</span> 政策的结果
                                    <span class="resn">（{{selectProvince == ''? 0:provincePolicies.provincePolicies[selectProvince]}}个）</span>
                                </span>
                                    <span class="el-icon-circle-close mppclose" @click="showMyMatchPolicyByCityFlag=false;"></span>
                                </div>
                                <el-tabs :tab-position="tabPosition" v-model="activeCityName" @tab-click="showCountyPolicies">
                                    <el-tab-pane v-for="(item, index) in cities" :key="index"
                                                 :label="item + '（' + (cityPolicies[item] == undefined || cityPolicies[item] == '' || cityPolicies[item] == null ? '0':cityPolicies[item].toString()) + '）'"
                                                 :name="item"
                                    >
                                        <div v-if="cityPolicies[item] != undefined && cityPolicies[item] != '' && cityPolicies[item] != null && cityPolicies[item] != '0'" class="tl">
                                            <el-tag class="mt-5 mb-5 mr-5 res-tag" effect="plain"
                                                    v-for="(subItem, subIndex) in countyPolicies" :key="subIndex"
                                                    @click="showMyMatchPolicyList(subIndex, item, 0, 10)">
                                                <a class="resc">{{ subIndex + "（" + subItem + "）" }}）</a>
                                            </el-tag>
                                        </div>
                                        <div v-else class="nodata-main">
                                           <div>
                                               <span class="nodata-icon"></span>
                                               <div class="mt-10">暂无匹配政策</div>
                                           </div>
                                        </div>
                                    </el-tab-pane>
                                </el-tabs>
                            </el-card>

                            <el-card v-show="showMyMatchPolicyListFlag" id="myMatchPolicyListId" shadow="hover" class="result-card wow bounceInLeft">
                                <div slot="header" class="clearfix">
                                <span class="fl" >您满足 <span class="fb">{{selectCounty}}</span> 政策的列表
                                    <span class="resn">（{{myMatchPolicyList.totalCount}}个）</span>
                                </span>
                                    <span class="el-icon-circle-close mppclose" @click="showMyMatchPolicyListFlag=false;"></span>
                                </div>
                                <div class="cond">
                                    <span>待遇类型：</span>
                                    <el-cascader
                                            class="ml-5 aioc-cascader"
                                            ref="policyCascaderRef"
                                            size="large"
                                            :props="{ checkStrictly: true }"
                                            :options="policyOptions"
                                            v-model="cond.treatmentTypeName"
                                            @change="handlePolicyCascader"
                                            placeholder="更多政策选择">
                                    </el-cascader>

                                    <div class="hot-cond">
                                        <span>热门待遇：</span>
                                        <span   :class="cond.treatmentTypeName.toString() == item.toString() ? 'cond-selected' : ''"
                                                v-for="(item, index) in hotTreatmentTypeNames" :key="index"
                                                @click="selectPolicy(item)"
                                        >{{item[item.length - 1]}}</span>
                                    </div>
                                </div>
                                <el-table
                                        class="w-100 policy-table"
                                        ref="policyRef"
                                        :data="myMatchPolicyList.data"
                                        border
                                        :header-cell-style="{textAlign: 'center'}"
                                        :row-style="{height:'20px'}"
                                        :cell-style="{padding:'9px 1px', textAlign: 'center'}"
                                        @row-dblclick="toDetail"
                                >
                                    <el-table-column fixed="left" type="selection" width="55"></el-table-column>
                                    <el-table-column prop="title" label="政策标题" :show-overflow-tooltip="true" width="300"></el-table-column>
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
                                            <el-button
                                                    size="mini"
                                                    type="success" @click="toDetail(scope.row)">
                                                详情
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>

                                <Pagination class="mt-10" ref="areaPageRef" @search="searchNextPolicies"></Pagination>
                            </el-card>
                        </div>

                        <!--以下代码暂时停用-->
                        <div v-else-if="resultClassificationType == 'treatment'">
                            <el-card v-show="showMyMatchPolicyBySubTreatmentFlag" id="myMatchPolicyBySubTreatment" shadow="hover" class="result-card wow bounceInLeft">
                                <div slot="header" class="clearfix">
                                <span class="fl" >
                                    您满足 <span class="fb">{{selectParentTreatment}}</span> 政策的结果
                                    <span class="resn">（{{selectParentTreatment == ''? 0:parentTreatmentPolicies[selectParentTreatment]}}个）</span>
                                </span>
                                    <span class="el-icon-circle-close mppclose" @click="showMyMatchPolicyBySubTreatmentFlag=false;"></span>
                                </div>
                                <div class="tl">
                                    <el-tag class="mt-5 mb-5 mr-5 res-tag" effect="plain"
                                            v-for="(subItem, subIndex) in subTreatmentPolicies" :key="subIndex"
                                            @click="showMyMatchTreatmentPolicyList(subIndex, item, 0, 10)">
                                        <a class="resc">{{ subIndex + "（" + subItem + "）" }}）</a>
                                    </el-tag>
                                </div>
                            </el-card>

                            <el-card v-show="showMyMatchTreatmentPolicyListFlag" id="myMatchTreatmentPolicyListId" shadow="hover" class="result-card wow bounceInLeft">
                                <div slot="header" class="clearfix">
                                <span class="fl" >您满足 <span class="fb">{{selectsubTreatment}}</span> 政策的列表
                                    <span class="resn">（{{myMatchTreatmentPolicyList.totalCount}}个）</span>
                                </span>
                                    <span class="el-icon-circle-close mppclose" @click="showMyMatchPolicyListFlag=false;"></span>
                                </div>
                                <el-table
                                        class="w-100 policy-table"
                                        ref="policyRef"
                                        :data="myMatchTreatmentPolicyList.data"
                                        border
                                        :header-cell-style="{textAlign: 'center'}"
                                        :row-style="{height:'20px'}"
                                        :cell-style="{padding:'9px 1px', textAlign: 'center'}"
                                        @row-dblclick="toDetail"
                                >
                                    <el-table-column fixed="left" type="selection" width="55"></el-table-column>
                                    <el-table-column prop="title" label="政策标题" :show-overflow-tooltip="true" width="300"></el-table-column>
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
                                            <el-button
                                                    size="mini"
                                                    type="success" @click="toDetail(scope.row)">
                                                详情
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>

                                <Pagination class="mt-10" ref="treatmentPageRef" @search="searchNextPolicies"></Pagination>
                            </el-card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from  "@/components/Header"
    import nationality from '@/assets/js/nationality.js'
    import areaData from '@/assets/json/areaData.json'
    import Pagination from '@/components/Pagination'

    export default {
        name: "myMatchPolicy",
        components: {Header, Pagination},
        mounted() {
            new this.$wow.WOW({
                live: false
            }).init();
            this.clientWidth = document.body.clientWidth;
            this.clientHeight = document.body.clientHeight -50;
            this.country = nationality.country;
            this.loadUser();
            this.searchMyMatchPolicy('area_province');
        },
        methods: {

            /**
             * 选择政策条件
             */
            selectPolicy(treatmentTypeName) {
                this.cond.treatmentTypeName = treatmentTypeName;
                this.showMyMatchPolicyList(this.areaParam1,  this.areaParam2, this.currentPage, this.pageSize);
            },

            /**
             * 处理政策条件选择变化
             */
            handlePolicyCascader() {
                if (this.$refs.policyCascaderRef) {
                    this.$refs.policyCascaderRef.dropDownVisible = false; //监听值发生变化就关闭它
                }
                this.$(".cond span").removeClass("cond-selected");
                this.showMyMatchPolicyList(this.areaParam1,  this.areaParam2, this.currentPage, this.pageSize);
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
             * 显示匹配的政策列表（待遇分类）
             * @param {*} var1 参数1 var2 参数2 currentPage 页码 pageSize 每页数量
             * @author panyong
             */
            async showMyMatchTreatmentPolicyList(var1, var2, currentPage, pageSize) {
                this.treatmentParam1 = var1;
                this.treatmentParam2 = var2;
                this.selectsubTreatment = var1;
                location.href = "#myMatchTreatmentPolicyListId";
                this.showMyMatchTreatmentPolicyListFlag = true;
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData();
                params.append("treatmentTypeName", var1);
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                var data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_cm_talent_policy_match_treatment_list, params, "POST", false);
                if (data.code === 200) {
                    this.myMatchTreatmentPolicyList = data;
                    this.$refs.treatmentPageRef.totalCount = data.totalCount;
                    return true;
                }
            },

            /**
             * 显示匹配的政策列表（城市分类）
             * @param {*} var1 参数1 var2 参数2 currentPage 页码 pageSize 每页数量
             * @author panyong
             */
            async showMyMatchPolicyList(var1, var2, currentPage, pageSize) {
                this.areaParam1 = var1;
                this.areaParam2 = var2;
                location.href = "#myMatchPolicyListId";
                this.showMyMatchPolicyListFlag = true;
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData();
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                console.log(this.cond.treatmentTypeName)
                if(this.cond.treatmentTypeName.length == 1) {
                    if(this.cond.treatmentTypeName[0] != "全部待遇") {
                        params.append("treatmentParentTypeName", this.cond.treatmentTypeName[0]);
                    }
                }
                else if(this.cond.treatmentTypeName.length == 2) {
                    params.append("treatmentTypeName", this.cond.treatmentTypeName[1]);
                }
                var data = "";
                if(var1 == this.countryVar) {
                    this.selectCounty = this.countryVar;
                    data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_cm_talent_policy_match_country_list, params, "POST", false);
                }
                else if(var1 == this.cityVar) {
                    this.selectCounty = var2 + var1;
                    params.append("city", var2);
                    data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_cm_talent_policy_match_city_list, params, "POST", false);
                }
                else {
                    if(var2 == this.provinceVar) {
                        this.selectCounty = this.selectProvince + this.provinceVar;
                        data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_cm_talent_policy_match_province_list, params, "POST", false);
                    } else {
                        this.selectCounty = var1;
                        params.append("county", var1);
                        data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_cm_talent_policy_match_county_list, params, "POST", false);
                    }
                }
                if (data.code === 200) {
                    this.myMatchPolicyList = data;
                    this.$refs.areaPageRef.totalCount = data.totalCount;
                    return true;
                }
            },

            /**
             * 显示匹配的政策列表下一页
             * @param {*} currentPage 页码 pageSize 每页数量
             * @author panyong
             */
            searchNextPolicies(currentPage, pageSize) {
                if(this.resultClassificationType == this.areaVar) {
                    this.showMyMatchPolicyList(this.areaParam1,  this.areaParam2, currentPage, pageSize);
                }
                else if (this.resultClassificationType == this.treatmentVar) {
                    this.showMyMatchTreatmentPolicyList(this.treatmentParam1,  this.treatmentParam2, currentPage, pageSize);
                }
            },

            /**
             * 显示区级我匹配的政策
             * @param {*}
             * @author panyong
             */
            showCountyPolicies() {
                this.myMatchPolicyByAreaRequest('area_county', null, this.activeCityName).then(response => {
                    if (response.code === 200) {
                        this.countyPolicies = response.data.countyPolicies;
                        return true;
                    }
                });
            },

            /**
             * 初始化城市地域数据
             */
            initCityArea(area, provinceCond) {
                this.cities = [];
                this.cities.push(this.provinceVar);
                for(let key in area){
                    let province = area[key];
                    if(key == provinceCond ) {
                        for(let cityKey in province) {
                            this.cities.push(cityKey);
                        }
                        break;
                    }
                }
            },

            /**
             * 显示匹配政策通过待遇条件
             * @param {*} treatmentParentTypeName 父类待遇名称
             * @author panyong
             */
            async showMyMatchPolicyByTreatment(treatmentParentTypeName) {
                this.showMyMatchPolicyBySubTreatmentFlag = true;
                this.selectParentTreatment = treatmentParentTypeName;
                location.href = "#myMatchPolicyBySubTreatment";
                // 查询父待遇下所有的待遇
                this.myMatchPolicyByTreatmentRequest(this.subTreatmentVar, treatmentParentTypeName).then(response => {
                    if (response.code === 200) {
                        this.subTreatmentPolicies = response.data.subTreatmentPolicies;

                        return true;
                    }
                });
            },

            /**
             * 显示匹配政策通过城市条件
             * @param {*} provinceCond 省或者国家级名称
             * @author panyong
             */
            showMyMatchPolicyByArea(provinceCond) {
                if(provinceCond != this.countryVar) {
                    this.initCityArea(areaData, provinceCond);
                    this.showMyMatchPolicyByCityFlag = true;
                    this.showMyMatchPolicyListFlag = false;
                    this.selectProvince = provinceCond;
                    location.href = "#myMatchPolicyByCity";
                    this.myMatchPolicyByAreaRequest('area_city', provinceCond).then(response => {
                        if (response.code === 200) {
                            this.cityPolicies = response.data.cityPolicies;
                            for(var city in this.cityPolicies) {
                                this.activeCityName = city;
                                this.myMatchPolicyByAreaRequest('area_county', provinceCond, city).then(response => {
                                    if (response.code === 200) {
                                        this.countyPolicies = response.data.countyPolicies;
                                        return true;
                                    }
                                });
                                break;
                            }
                            return true;
                        }
                    });
                } else {
                    this.showMyMatchPolicyByCityFlag = false;
                    this.showMyMatchPolicyList(this.countryVar, null, 0, 10)
                }
            },


            /**
             *  政策结果按城市分类
             * @param {*}
             * @author panyong
             */
            loadResultByArea() {
                this.resultClassificationType = this.areaVar;
                this.searchMyMatchPolicy(this.areaVar);
            },

            /**
             * 政策结果按待遇分类
             * @param {*}
             * @author panyong
             */
            loadResultByTreatment() {
                this.resultClassificationType = this.treatmentVar;
                this.searchMyMatchPolicy(this.treatmentVar);
            },

            /**
             * 查询匹配的政策
             * @param {*} type 类型
             * @author panyong
             */
            async searchMyMatchPolicy(type, province) {
                if(type == this.areaVar) {
                    this.myMatchPolicyByAreaRequest(type, province).then(response => {
                        if (response.code === 200) {
                            this.provincePolicies = response.data;
                            this.totalPolicyCount = response.data.totalCount;
                            return true;
                        }
                    });
                } else if (type == this.treatmentVar) {
                    this.myMatchPolicyByTreatmentRequest(this.parentTreatmentVar).then(response => {
                        if (response.code === 200) {
                            this.parentTreatmentPolicies = response.data.parentTreatmentPolicies;
                            this.totalPolicyCount = response.data.totalCount;
                            return true;
                        }
                    });
                }
            },

            /**
             * 请求我匹配的政策通过城市条件
             * @param {*} type 类型 province 省 city 市
             * @author panyong
             */
            async myMatchPolicyByAreaRequest(type, province, city) {
                let params = new FormData();
                if(type != null && type != '' && type!= undefined) {
                    params.append("type", type);
                }
                if(province != null && province != '' && province!= undefined) {
                    params.append("province", province);
                }
                if(city != null && city != '' && city!= undefined) {
                    params.append("city", city);
                }
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_cm_talent_policy_exact_match_area, params, "POST", false);
                return data;
            },

            /**
             * 请求我匹配的政策通过待遇条件
             * @param {*}
             * @author panyong
             */
            async myMatchPolicyByTreatmentRequest(type, treatmentParentTypeName) {
                let params = new FormData();
                if(type != null && type != '' && type!= undefined) {
                    params.append("type", type);
                }
                if(treatmentParentTypeName != null && treatmentParentTypeName != '' && treatmentParentTypeName!= undefined) {
                    params.append("treatmentParentTypeName", treatmentParentTypeName);
                }
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_cm_talent_policy_exact_match_treatment, params, "POST", false);
                return data;
            },

            /**
             * 保存个人资料
             * @param {*}
             * @author panyong
             */
            async savePinf() {
                this.userForm.ranks = this.ranks.toString();
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_sys_user_update,  this.userForm, "POST", false);
                if (data.code === 200) {
                    this.$promptMsg("编辑您的资料成功", "success");
                    this.pinfEdit = false;
                    this.user = this.userForm;
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
                this.userForm = this.user;
                this.ranks = this.user.ranks.split(",");
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
                    this.user = data.data;
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
                    {key: "姓名", value: this.user.name},
                    {key: "国籍", value: this.user.nationality},
                    {key: "性别", value: this.formatSex(this.user.sex)},
                    {key: "出生日期", value:  this.user.birthtime},
                    {key: "学历", value: this.formatEdu(this.user.edu)},
                    {key: "大学", value: this.user.university},
                    {key: "职称", value: this.user.ranks},
                ];
                this.ranks = this.user.ranks.split(",");
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
                clientWidth: 1800,
                clientHeight: 970,

                /*当前选中菜单*/
                activePage: '人才政策',

                // 国籍数据
                country: [],

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
                    ],
                    resumeInfos: [
                    ],
                    nationality: "",
                    university: "",
                    ranks: "",
                    edu: "",
                    age: "",
                },

                userForm: {
                    name: "",
                    sex: "",
                    birthtime: "",
                    nationality: "",
                    edu: "",
                    university: "",
                    ranks: "",
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

                // 结果分类类型
                resultClassificationType: "area_province",

                // 城市集合
                cities: [],

                // tab页位置
                tabPosition: 'left',

                // tab页位置
                activeCityName: '',

                // 类型编量
                areaVar: "area_province",
                treatmentVar: "treatment",

                // 级别变量
                cityVar: "市级",
                provinceVar: "省级",
                countryVar: "国家级",

                // 待遇类型变量
                parentTreatmentVar: "parent",
                subTreatmentVar: "sub",

                // 总的匹配的政策数量
                totalPolicyCount: 0,

                // 我匹配的政策列表 城市分类
                myMatchPolicyList: [],
                // 我匹配的政策列表 待遇分类
                myMatchTreatmentPolicyList: [],

                // 匹配的政策(国家级和全省)
                provincePolicies: [],
                // 匹配的政策(省级和全市)
                cityPolicies: [],
                // 匹配的政策(市级和全区)
                countyPolicies: [],
                // 匹配的政策(按父待遇名称分)
                parentTreatmentPolicies: [],
                // 匹配的政策(按子待遇名称分)
                subTreatmentPolicies: [],

                // 选择的省份
                selectProvince: "",
                // 选择的区
                selectCounty: "",
                // 选择的父待遇
                selectParentTreatment:"",
                // 选择的子待遇
                selectSubTreatment:"",

                // 通过城市分类显示我匹配的政策标志
                showMyMatchPolicyByCityFlag: false,
                // 显示我匹配的政策列表 城市分类
                showMyMatchPolicyListFlag: false,
                // 通过子待遇分类显示我匹配的政策标志
                showMyMatchPolicyBySubTreatmentFlag: false,
                // 显示我匹配的政策列表 待遇分类
                showMyMatchTreatmentPolicyListFlag: false,

                // 按城市分类的政策列表查询参数
                areaParam1: "",
                areaParam2: "",
                // 按待遇分类的政策列表查询参数
                treatmentParam1: "",
                treatmentParam2: "",


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
                /* 政策条件 */
                cond: {
                    treatmentTypeName: ["全部待遇"],
                },
                /* 热门政策条件 */
                hotTreatmentTypeNames: [
                    ["全部待遇"],
                    ["经济补贴类", "经费资助"],
                    ["经济补贴类", "生活补贴"],
                    ["住房保障类", "人才公寓"],
                    ["服务保障类", "子女教育"],
                    ["其他类", "车辆上牌"],
                    ["其他类", "身份编制"],
                ],

            }
        },
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
        .header {
            height: 50px;
            background: #333333;
        }
        .mpp-container {
            width: 100%;
            display: flex;
            justify-content: center;
        }
        .mpp-main {
            display: flex;
            flex-wrap: nowrap;
            width: 1500px;
            margin-top: 10px;
            margin-bottom: 10px;
        }
        .pinf-card {
            width: 500px;
        }
        .result-card {
            width: 1000px;
        }
        .result-card-main {
            text-align: left;
        }
        .clearfix {
            line-height: 40px;
        }
        .resn {
            font-size: 14px;
            color: #409EFF;
        }
        .res-tag > a:hover {
            text-decoration: underline;
            color: #ff8332;
        }
        .resc {
            text-decoration: none;
            color: #409EFF;
        }
        .mppclose {
            float: right;
            font-size: 22px;
            display: inline-block;
            line-height: 40px;
            color: #999999;
        }
        .nodata-main {
            margin: 50px;
            color: #999999;
        }

        /* 个人资料 */
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


        /*搜索条件*/
        .cond {
            text-align: left;
            display: flex;
            flex-wrap: nowrap;
            margin-bottom: 10px;
        }
        .cond > span:nth-of-type(1) {
            font-size: 16px;
            font-weight: 600;
            padding-top: 15px;
        }
        .hot-cond > span:nth-of-type(1) {
            margin-left: 20px !important;
        }
        .hot-cond > span:nth-of-type(n+1) {
            display: inline-block;
            padding: 6px 10px 6px 10px;
            margin-top: 15px;
            font-size: 14px;
            color: #909399;
        }
        .cond-selected {
            background: #f51d37;
            color: #ffffff !important;
            border-radius: 3px;
        }
        .select-conds {
            text-align: left;
            display: flex;
            flex-wrap: nowrap;
            margin-bottom: 10px;
        }
        .select-conds > span:nth-of-type(1){
            font-size: 14px;
            font-weight: 600;
            margin-top: 20px;
        }
        .select-conds > span:nth-of-type(n+2) {
            font-size: 14px;
            margin: 9px 5px 0 5px;
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

    }
</style>