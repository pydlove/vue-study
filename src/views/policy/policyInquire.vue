<template>
    <div>
        <div class="header">
            <Header :activePage="activePage"></Header>
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
                                @change="handlerAreaCascader"
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
                                @change="handlerPolicyCascader"
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
                    <el-button type="primary">查询政策</el-button>
                    <el-button @click="resetCond">重置条件</el-button>
                </el-card>

                <el-card shadow="hover" class="wow bounceInLeft">
                    <el-table
                            class="w-100 "
                            ref="policyRef"
                            :data="policyData"
                            border
                            :row-style="{height:'20px'}"
                            :cell-style="{padding:'9px 1px'}"
                    >
                        <el-table-column fixed="left" type="selection" width="55"></el-table-column>
                        <el-table-column prop="id" label="人才编号" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="name" label="姓名" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="idCard" label="身份证号" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="hometown" label="籍贯" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="politicalStatus" label="政治面貌" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true"></el-table-column>
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
        },
        methods: {

            /**
             * 搜索政策
             */
            search() {
                // var params = {
                //     page: currentPage,
                //     limit: pageSize,
                // };
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
            handlerAreaCascader() {
                if (this.$refs.areaCascaderRef) {
                    this.$refs.areaCascaderRef.dropDownVisible = false; //监听值发生变化就关闭它
                }
                this.$(".cond span").removeClass("cond-selected");
            },

            /**
             * 处理政策条件选择变化
             */
            handlerPolicyCascader() {
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

        },
        data() {
            return {
                /* 查询到的政策 */
                policyData: [],

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
            height: 800px;
            background: #ffc2d1;
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