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
                                    class="ml-5 wdi-258"
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
                            <span>行业选择：</span>
                            <el-input class="ml-5 wdi-258" v-model="cond.industry" placeholder="请选择所属行业" @focus="showIndustryInfo"></el-input>

                            <div class="hot-cond">
                                <span>热门行业：</span>
                                <span   :class="cond.industry.toString() == item.toString() ? 'cond-selected' : ''"
                                        v-for="(item, index) in hotIndustry" :key="index"
                                        @click="selectIndustry(item)"
                                >{{item[item.length - 1]}}</span>
                            </div>
                        </div>

                        <div v-show="moreCond" class="cond">
                            <span>悬赏金额：</span>
                            <div class="hot-cond2">
                                <span   :class="(cond.bounty.start == item.start) && (cond.bounty.end == item.end) ? 'cond-selected' : ''"
                                        v-for="(item, index) in bounties" :key="index"
                                        @click="selectBounty(item)"
                                >{{item.start == 0 ? (item.end + "万以下"):(item.end == 'unlimit' ? (item.start + "万以上"):(item.start + "-" + item.end + "万"))}}</span>
                            </div>
                        </div>

                        <div v-show="moreCond" class="cond">
                            <span>是否匿名：</span>
                            <div class="mt-15">
                                <!--<span   :class="cond.anonymous.toString() == item.toString() ? 'cond-selected' : ''"-->
                                        <!--v-for="(item, index) in anonymouses" :key="index"-->
                                        <!--@click="selectIsAnonymous(item)"-->
                                <!--&gt;{{item}}</span>-->
                                <el-radio-group v-model="cond.anonymous">
                                    <el-radio :label="0">是</el-radio>
                                    <el-radio :label="1">否</el-radio>
                                </el-radio-group>
                            </div>
                        </div>

                        <el-button class="wdi-100" type="primary" @click="search(0, 10)">查询</el-button>
                        <el-button class="wdi-100" @click="resetCond">重置</el-button>

                        <span v-if="!moreCond" class="more-cond" @click="moreCond = true">展开更多搜索条件</span>
                        <span v-else class="more-cond" @click="moreCond = false">收起更多搜索条件</span>
                    </el-card>

                    <el-card shadow="hover">
                        <el-table
                                class="w-100"
                                ref="problemRef"
                                :data="problemData"
                                border
                                :header-cell-style="{textAlign: 'center'}"
                                :row-style="{height:'20px'}"
                                :cell-style="{padding:'9px 1px', textAlign: 'center'}"
                                @row-dblclick="toProblemDetail"
                        >
                            <el-table-column prop="avatar" label="头像" sortable>
                                <template slot-scope="scope">
                                    <el-avatar v-if="scope.row.avatar == null || scope.row.avatar == undefined || scope.row.avatar == ''" icon="el-icon-user-solid"></el-avatar>
                                    <el-avatar v-else :src="scope.row.avatar"></el-avatar>
                                </template>
                            </el-table-column>
                            <el-table-column prop="requester" label="需求方" sortable>
                                <template slot-scope="scope">
                                    <span>{{ scope.row.isAnonymous == 0 ? (scope.row.requester): (scope.row.requesterType == "企业" ? "某企业":"某人") }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="requesterType" label="需求方性质" sortable></el-table-column>
                            <el-table-column prop="address" label="地点" sortable></el-table-column>
                            <el-table-column
                                    label="需求(鼠标悬浮看明细)" :show-overflow-tooltip="true" width="200">
                                <template slot-scope="scope">
                                    <el-popover  trigger="hover" placement="top">
                                        <p class="wdi-400">需求标题: {{ scope.row.title }}</p>
                                        <p class="wdi-400">需求明细: {{ scope.row.content }}</p>
                                        <div slot="reference" class="name-wrapper">
                                            <el-tag size="medium">
                                                {{ scope.row.title.length >= 10 ? ( scope.row.title.substring(0, 10) + "..."): scope.row.title }}
                                            </el-tag>
                                        </div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="发布日期">
                                <template slot-scope="scope">
                                    <i class="el-icon-time"></i>
                                    <span>{{ scope.row.createTime }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="截止日期">
                                <template slot-scope="scope">
                                    <i class="el-icon-time"></i>
                                    <span>{{ scope.row.endTime }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="bounty" label="赏金（元）" sortable>
                                <template slot-scope="scope">
                                    <span>{{ scope.row.bounty.replace(/\D/g,'').replace(/...(?!$)/g,'$&,') }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="350">
                                <template slot-scope="scope">
                                    <el-button
                                            type="primary"
                                            size="mini"
                                            @click="handleEdit(scope.$index, scope.row)">收藏</el-button>
                                    <el-button
                                            type="primary"
                                            size="mini"
                                            @click="handleEdit(scope.$index, scope.row)">分享</el-button>
                                    <el-button
                                            type="success"
                                            size="mini"
                                            @click="handleEdit(scope.$index, scope.row)">报名</el-button>
                                    <el-button
                                            size="mini"
                                            type="info"
                                            @click="toProblemDetail(scope.row)">详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <Pagination class="mt-10" ref="pageRef" @search="search"></Pagination>
                    </el-card>
                </div>
            </div>
        </div>
        <Industry ref="industryRef" @setIndustry="setIndustry"></Industry>
    </div>
</template>

<script>
    import areaData from '@/assets/json/areaData.json'
    import Header from  "@/components/Header"
    import Industry from "@/components/personCenter/Industry"
    import Pagination from '@/components/Pagination'

    export default {
        name: "index",
        components: {Header, Industry, Pagination},
        mounted() {
            this.clientWidth = document.body.clientWidth;
            this.clientHeight = document.body.clientHeight -50;
            new this.$wow.WOW({
                live: false
            }).init();

            this.initAreaOptions(areaData);
        },
        methods: {

            /**
             * 看详情
             * @param {*} row 行对象
             * @author panyong
             */
            toProblemDetail(row) {
                const aioctoken = this.$utils.getCookie("aioctoken");
                if(aioctoken) {
                    const detail = this.$router.resolve({name: 'problemDetail'});
                    this.$utils.setStorage("problemId", row.id);
                    window.open(detail.href,'_blank')
                } else {
                    this.$promptMsg("请先登录",  "info");
                }
            },

            /**
             * 选择行业信息
             */
            showIndustryInfo() {
                this.$refs.industryRef.open(this.cond.industry);
            },

            /**
             * 设置选中的行业
             */
            setIndustry(val, subval) {
                this.cond.industry = val + " / " + subval;
            },

            /**
             * 选择区域条件
             */
            selectArea(area) {
                this.cond.area = area;
            },

            /**
             * 选择行业条件
             */
            selectIndustry(industry) {
                this.cond.industry = industry;
            },

            /**
             * 选择赏金条件
             */
            selectBounty(bounty) {
                this.cond.bounty = bounty;
            },

            /**
             * 选择是否匿名条件
             */
            selectIsAnonymous(anonymous) {
                this.cond.anonymous = anonymous;
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
                clientWidth: 1800,
                clientHeight: 970,
                /*当前选中菜单*/
                activePage: '难题求解',
                //地域
                areaOptions: [],
                /* 政策条件 */
                cond: {
                    area: ["全国"],
                    industry: ["所有行业"],
                    bounty: "",
                    anonymous: "",
                },
                /* 热门区域条件 */
                hotArea: [
                    ["浙江省", "杭州市"], ["上海市"], ["安徽省", "合肥市"], ["广东省", "深圳市"], ["北京市"], ["重庆市"], ["江苏省", "南京市"]
                ],
                /* 热门行业条件 */
                hotIndustry: [
                    ["浙江省", "杭州市"], ["上海市"], ["安徽省", "合肥市"], ["广东省", "深圳市"], ["北京市"], ["重庆市"], ["江苏省", "南京市"]
                ],
                // 赏金金额
                bounties: [
                    {start: 0, end: 1},
                    {start: 1, end: 10},
                    {start: 10, end: 50},
                    {start: 50, end: 100},
                    {start: 100, end: 500},
                    {start: 500, end: 1000},
                    {start: 1000, end: "unlimit"},
                ],
                // 是否匿名
                anonymouses: ["是", "否"],
                // 是否显示更多条件
                moreCond: false,
                // 疑难问题数据  发布前要审核
                problemData: [{
                    id: "1",
                    avatar: "",
                    requester: '浙江新和成股份有限公司',
                    requesterType: "企业",
                    isAnonymous: '0',
                    address: "浙江省,杭州市,拱墅区",
                    title: "工程机械/非开挖市政工程设备",
                    content: "双臂钻杆密封技术；双臂钻杆焊接工艺；切削机头切削排泥与地面沉降，双臂钻杆密封技术；双臂钻杆焊接工艺；切削机头切削排泥与地面沉降",
                    industry: "地产建筑,建筑设备",
                    bounty: "1000000",
                    createTime: "2020-10-22",
                    startTime: "2020-10-22",
                    endTime: "2020-11-22",
                    createUser: "张学良",
                    phone: "13588654502",
                }, {
                    id: "1",
                    avatar: "/cpcm-service/img/chengxiao.jpg",
                    requester: '浙江新和成股份有限公司',
                    requesterType: "企业",
                    isAnonymous: '1',
                    address: "浙江省,杭州市,拱墅区",
                    title: "工程机械/非开挖市政工程设备",
                    content: "双臂钻杆密封技术；双臂钻杆焊接工艺；切削机头切削排泥与地面沉降",
                    industry: "地产建筑,建筑设备",
                    bounty: "1000000",
                    createTime: "2020-10-22",
                    startTime: "2020-10-22",
                    endTime: "2020-11-22",
                    createUser: "张学良",
                    phone: "13588654502",
                }, {
                    id: "1",
                    avatar: "/cpcm-service/img/chengxiao.jpg",
                    requester: '张学良',
                    requesterType: "个人",
                    isAnonymous: '1',
                    address: "浙江省,杭州市,拱墅区",
                    title: "工程机械/非开挖市政工程设备",
                    content: "双臂钻杆密封技术；双臂钻杆焊接工艺；切削机头切削排泥与地面沉降",
                    industry: "地产建筑,建筑设备",
                    bounty: "1000000",
                    createTime: "2020-10-22",
                    startTime: "2020-10-22",
                    endTime: "2020-11-22",
                    createUser: "张学良",
                    phone: "13588654502",
                }, {
                    id: "1",
                    avatar: "/cpcm-service/img/chengxiao.jpg",
                    requester: '浙江新和成股份有限公司',
                    requesterType: "企业",
                    isAnonymous: '0',
                    address: "浙江省,杭州市,拱墅区",
                    title: "工程机械/非开挖市政工程设备",
                    content: "双臂钻杆密封技术；双臂钻杆焊接工艺；切削机头切削排泥与地面沉降",
                    industry: "地产建筑,建筑设备",
                    bounty: "1000000",
                    createTime: "2020-10-22",
                    startTime: "2020-10-22",
                    endTime: "2020-11-22",
                    createUser: "张学良",
                    phone: "13588654502",
                },{
                    id: "1",
                    avatar: "/cpcm-service/img/chengxiao.jpg",
                    requester: '浙江新和成股份有限公司',
                    requesterType: "企业",
                    isAnonymous: '0',
                    address: "浙江省,杭州市,拱墅区",
                    title: "工程机械/非开挖市政工程设备",
                    content: "双臂钻杆密封技术；双臂钻杆焊接工艺；切削机头切削排泥与地面沉降",
                    industry: "地产建筑,建筑设备",
                    bounty: "1000000",
                    createTime: "2020-10-22",
                    startTime: "2020-10-22",
                    endTime: "2020-11-22",
                    createUser: "张学良",
                    phone: "13588654502",
                },{
                    id: "1",
                    avatar: "/cpcm-service/img/chengxiao.jpg",
                    requester: '浙江新和成股份有限公司',
                    requesterType: "企业",
                    isAnonymous: '0',
                    address: "浙江省,杭州市,拱墅区",
                    title: "工程机械/非开挖市政工程设备",
                    content: "双臂钻杆密封技术；双臂钻杆焊接工艺；切削机头切削排泥与地面沉降",
                    industry: "地产建筑,建筑设备",
                    bounty: "1000000",
                    createTime: "2020-10-22",
                    startTime: "2020-10-22",
                    endTime: "2020-11-22",
                    createUser: "张学良",
                    phone: "13588654502",
                },{
                    id: "1",
                    avatar: "/cpcm-service/img/chengxiao.jpg",
                    requester: '浙江新和成股份有限公司',
                    requesterType: "企业",
                    isAnonymous: '0',
                    address: "浙江省,杭州市,拱墅区",
                    title: "工程机械/非开挖市政工程设备",
                    content: "双臂钻杆密封技术；双臂钻杆焊接工艺；切削机头切削排泥与地面沉降",
                    industry: "地产建筑,建筑设备",
                    bounty: "1000000",
                    createTime: "2020-10-22",
                    startTime: "2020-10-22",
                    endTime: "2020-11-22",
                    createUser: "张学良",
                    phone: "13588654502",
                },{
                    id: "1",
                    avatar: "/cpcm-service/img/chengxiao.jpg",
                    requester: '浙江新和成股份有限公司',
                    requesterType: "企业",
                    isAnonymous: '0',
                    address: "浙江省,杭州市,拱墅区",
                    title: "工程机械/非开挖市政工程设备",
                    content: "双臂钻杆密封技术；双臂钻杆焊接工艺；切削机头切削排泥与地面沉降",
                    industry: "地产建筑,建筑设备",
                    bounty: "1000000",
                    createTime: "2020-10-22",
                    startTime: "2020-10-22",
                    endTime: "2020-11-22",
                    createUser: "张学良",
                    phone: "13588654502",
                },{
                    id: "1",
                    avatar: "/cpcm-service/img/chengxiao.jpg",
                    requester: '浙江新和成股份有限公司',
                    requesterType: "企业",
                    isAnonymous: '0',
                    address: "浙江省,杭州市,拱墅区",
                    title: "工程机械/非开挖市政工程设备",
                    content: "双臂钻杆密封技术；双臂钻杆焊接工艺；切削机头切削排泥与地面沉降",
                    industry: "地产建筑,建筑设备",
                    bounty: "1000000",
                    createTime: "2020-10-22",
                    startTime: "2020-10-22",
                    endTime: "2020-11-22",
                    createUser: "张学良",
                    phone: "13588654502",
                },{
                    id: "1",
                    avatar: "/cpcm-service/img/chengxiao.jpg",
                    requester: '浙江新和成股份有限公司',
                    requesterType: "企业",
                    isAnonymous: '0',
                    address: "浙江省,杭州市,拱墅区",
                    title: "工程机械/非开挖市政工程设备",
                    content: "双臂钻杆密封技术；双臂钻杆焊接工艺；切削机头切削排泥与地面沉降",
                    industry: "地产建筑,建筑设备",
                    bounty: "1000000",
                    createTime: "2020-10-22",
                    startTime: "2020-10-22",
                    endTime: "2020-11-22",
                    createUser: "张学良",
                    phone: "13588654502",
                }]
            }
        }
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
        .poin-main {
            width: 1500px;
            margin-top: 10px;
            margin-bottom: 10px;
        }
        .more-cond {
            float: right;
            margin-right: 20px;
            margin-bottom: 10px;
            font-size: 14px;
            color: #409EFF;
        }
        .more-cond:hover {
            text-decoration: underline;
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