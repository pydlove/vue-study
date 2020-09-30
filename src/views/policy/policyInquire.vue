<template>
    <div>
        <div class="header">
            <Header ref="headerRef" :activePage="activePage"></Header>
        </div>
        <div class="poin-container">
            <div class="poin-main">
                <el-card shadow="hover" class=" search-cond wow bounceInLeft">
                    <div class="cond">
                        <span>区域选择：</span>
                        <el-cascader
                                class="ml-5 aioc-cascader"
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
                        </div>
                    </div>

                    <div class="cond">
                        <span>政策类型：</span>
                        <el-cascader
                                class="ml-5 aioc-cascader"
                                ref="policyCascaderRef"
                                size="large"
                                :props="{ checkStrictly: true }"
                                :options="policyOptions"
                                v-model="cond.policy"
                                @change="handlePolicyCascader"
                                placeholder="更多政策选择">
                        </el-cascader>

                        <div class="hot-cond">
                            <span>热门政策：</span>
                            <span   :class="cond.policy.toString() == item.toString() ? 'cond-selected' : ''"
                                    v-for="(item, index) in hotPolicy" :key="index"
                                    @click="selectPolicy(item)"
                            >{{item[item.length - 1]}}</span>
                        </div>
                    </div>

                </el-card>

                <el-card shadow="hover" class="select-conds-card  wow bounceInLeft">
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
                            class="w-100 policy-table"
                            ref="policyRef"
                            :data="policyDatas"
                            border
                            :header-cell-style="{textAlign: 'center'}"
                            :row-style="{height:'20px'}"
                            :cell-style="{padding:'9px 1px', textAlign: 'center'}"
                    >
                        <el-table-column fixed="left" type="selection" width="55"></el-table-column>
                        <el-table-column prop="title" label="政策标题" :show-overflow-tooltip="true" width="300"></el-table-column>
                        <el-table-column prop="content" label="内容" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="treatmentType" label="待遇类型" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="talentTreatment" label="人才待遇" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="policyType" label="政策类型" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="" label="适用区域">
                            <el-table-column prop="" label="区域">
                                <template slot-scope="scope">
                                    {{handleToArea(scope.row)}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="level" label="级别" :show-overflow-tooltip="true" :formatter="formatLevel" width="80"></el-table-column>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="80">
                            <template slot-scope="scope">
                                <router-link :to="{path:'/policyDetail', query:{id:scope.row.id}}" target="_blank">
                                    <el-button
                                            size="mini"
                                            type="success">
                                        详情
                                    </el-button>
                                </router-link>
                            </template>
                        </el-table-column>
                    </el-table>

                    <Pagination ref="pageRef" @search="search"></Pagination>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from  "@/components/Header"
    import Pagination from '@/components/Pagination'
    import areaData from '@/assets/json/areaData.json'

    export default {
        name: "policyInquire",
        components: {Header, Pagination},
        mounted() {
            this.initAreaOptions(areaData);
            this.search(0, 10);
        },
        methods: {

            /**
             * 搜索政策
             */
            async search(currentPage, pageSize) {
                let params = new FormData()
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
                    policy: ["全部政策"],
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

        },
        data() {
            return {
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
                    policy: ["全部政策"],
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
                        label: "全部政策",
                        value: "全部政策",
                    },
                    {
                        label: "经济补贴类",
                        value: "经济补贴类",
                        children: [
                            {
                                label: "全部经济补贴类政策",
                                value: "全部经济补贴类政策",
                            },
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
                                label: "全部住房保障类政策",
                                value: "全部住房保障类政策",
                            },
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
                                label: "全部服务保障类政策",
                                value: "全部服务保障类政策",
                            },
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
                                label: "全部其他类政策",
                                value: "全部其他类政策",
                            },
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
        .header {
            height: 50px;
            background: #333333;
        }
        .poin-container {
            display: flex;
            justify-content: center;
            background: #eeeeee;
        }
        .poin-main {
            width: 1500px;
            margin-top: 10px;
            margin-bottom: 10px;
        }
        .poin-main > .el-card {
            margin: 20px;
        }
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
        .policy-table {
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
    }
</style>