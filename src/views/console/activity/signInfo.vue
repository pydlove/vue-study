<template>
    <div>
        <el-dialog
                class="aioc-dialog"
                title="报名信息"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="true"
                center>
            <el-card class="aiocw-card">
                <el-form class="aiocw-form mt-20"
                        ref="searchform"
                        :model="searchform"
                        :inline="true"
                        :validate-on-rule-change="false"
                        label-width="80px"
                        label-position="right">

                    <el-form-item label="用户名称" prop="name">
                        <el-input
                                v-model="searchform.name"
                                class="wp-180 mr-10"
                                placeholder="请输入用户姓名"
                                prefix-icon="el-icon-search">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="区域" prop="area">
                        <el-cascader
                                ref="areaCascaderRef"
                                size="large"
                                :props="{ checkStrictly: true }"
                                :options="areaOptions"
                                v-model="searchform.area"
                                @change="handleAreaCascader"
                                placeholder="请选择区域">
                        </el-cascader>
                    </el-form-item>


                    <el-button class="ml-20" type="primary" size="small" icon="el-icon-search" @click="search(0, 10)">搜索</el-button>
                    <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
                </el-form>

                <div class="mb-10 mt-10">
                    <el-button class="aiocw-btn1" v-aba="['a']" type="primary" icon="el-icon-plus" size="small" @click="add">导出报名信息</el-button>
                </div>

                <el-table
                        class="aiocw-table"
                        ref="codeTable"
                        :data="tableData"
                        @selection-change='onTableSelectChange'
                        @row-click='tableRowClick'
                        @expand-change='tableExpand'
                        :row-style="{height:'20px'}"
                        :cell-style="{padding:'9px 1px'}"
                >
                    <el-table-column fixed="left" type="selection" width="55"></el-table-column>
                    <el-table-column prop="img" label="照片" width="121px">
                        <template slot-scope="scope">
                            <el-image
                                    :style="'width:' + photoWidth + 'px;height:' + photoHeight + 'px;'"
                                    :src="scope.row.photo"
                                    fit="fit"
                                    :preview-src-list="scope.row.srcList"
                            ></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="sex" label="性别" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="idCard" label="身份证" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="phone" label="联系方式" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="address" label="地址" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="age" label="年龄" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="score" label="学分" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="status" label="状态">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.status == '0' ? 'success':'info'" effect="dark">
                                {{ scope.row.status == '0' ? '活跃':'静默' }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="详情" type="expand" width="85" fixed="right">
                        <template slot-scope="props">
                            <el-form label-position="left" class="demo-table-expand">
                                <div class="mp-top">
                                    <el-divider content-position="left">
                                        学籍信息
                                    </el-divider>
                                </div>
                                <div class="dffn">
                                    <div class="wdi-400">
                                        <div class="xx-lable">
                                            <span>姓 <span class="ml-28"></span> 名</span>
                                            <span>{{ props.row.name }}</span>
                                        </div>
                                        <div class="xx-lable">
                                            <span>性 <span class="ml-28"></span> 别</span>
                                            <span>{{ props.row.sex }}</span>
                                        </div>
                                        <div class="xx-lable">
                                                <span>
                                                    身<span class="ml-5"></span>
                                                    份<span class="ml-5"></span>
                                                    证
                                                </span>
                                            <span>{{ props.row.idCard }}</span>
                                        </div>
                                        <div class="xx-lable">
                                            <span>出生年月</span>
                                            <span>{{ props.row.birth }}</span>
                                        </div>
                                        <div class="xx-lable">
                                            <span>地 <span class="ml-28"></span> 址</span>
                                            <span>{{ props.row.address }}</span>
                                        </div>
                                        <div class="xx-lable">
                                            <span>联系方式</span>
                                            <span>{{ props.row.phone }}</span>
                                        </div>
                                        <div class="xx-lable">
                                            <span>学 <span class="ml-28"></span> 分</span>
                                            <span>{{props.row.score}}</span>
                                        </div>
                                        <div class="xx-lable dffc">
                                            <span>课程班级</span>
                                            <el-tag  class="mb-10 colori-303133" v-for="item in props.row.classes" :key="item.id">
                                                <span class="color-fa5c26">班级：</span>{{item.className}}， 课程：{{ item.subSubject }}，负责老师：{{ item.teacher }}
                                            </el-tag>
                                        </div>
                                        <div class="xx-lable">
                                            <span>学习用品</span>
                                            <div class="dffw mb-10">
                                                <el-tag type="" class="mr-10 colori-303133" v-for="item in props.row.schoolSupplies" :key="item.id">{{ item.name }}</el-tag>
                                            </div>
                                        </div>
                                        <div class="xx-lable">
                                            <span>状 <span class="ml-28"></span> 态</span>
                                            <el-tag class="colori-ffffff" :type="props.row.status == '0' ? 'success':'info'" effect="dark">
                                                {{ props.row.status == '0' ? '活跃':'静默' }}
                                            </el-tag>
                                        </div>
                                    </div>


                                    <div class="ml-50 wp-50">
                                        <el-form-item label="备注">
                                            <el-input
                                                    disabled
                                                    class="textarea xx-text"
                                                    type="textarea"
                                                    :autosize="{ minRows: 16, maxRows: 18}"
                                                    placeholder="请输入内容"
                                                    maxlength="3000"
                                                    show-word-limit
                                                    v-model="props.row.remark">
                                            </el-input>
                                        </el-form-item>
                                    </div>
                                </div>
                            </el-form>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                                class="pb-10 pt-20"
                                @size-change="acHandleSizeChange"
                                @current-change="acHandleCurrentChange"
                                :current-page="acCurrentPage"
                                :page-sizes="[10]"
                                :page-size="acPageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="totalAcCount">
                </el-pagination>
            </el-card>
        </el-dialog>
    </div>
</template>

<script>
    import areaData from '@/assets/json/areaData.json'

    export default {
        name: "signInfo",
        mounted() {
            this.search(0, 10);
            this.initAreaOptions(areaData);
        },
        methods: {
            close() {
                console.log(this.form)
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
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


            setDisable() {

            },

            /**
             * 分页方法
             */
            acHandleSizeChange(val) {
                this.acPageSize = val;
                this.acCurrentPage = 1;
            },
            acHandleCurrentChange(val) {
                this.acCurrentPage = val;
            },
            tableExpand(row) {
                console.log(row)
            },

            tableRowClick(row) {
                this.$refs.codeTable.toggleRowSelection(row);
            },
            onTableSelectChange(rows) {
                this.checkRows = rows;
            },
            toggleSelection() {
                this.$refs.codeTable.clearSelection();
            },

            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                // let params = new FormData()
                // params.append("page", this.currentPage);
                // params.append("limit", this.pageSize);
                // params.append("name",  this.searchform.name);
                // let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_role_list, params, "POST");
                // if (data.code === 200) {
                //     this.tableData = data.data;
                //     this.$refs.pageRef.totalCount = data.totalCount;
                //     return true;
                // }
                this.tableData = [];
                for(var i=0; i < 10; i++) {
                    var status = "0";
                    var student = {
                        id: i+1,
                        name: "姜维",
                        sex: "男",
                        idCard: "210448196602231235",
                        birth: "2016-06-15",
                        age: "5",
                        address: "安徽省合肥市经开区",
                        phone: "13588400659",
                        score: "58",
                        photo: require("@/assets/img/ouynn.jpg"),
                        status: status,
                        srcList: [
                            require("@/assets/img/ouynn.jpg"),
                        ],
                        remark: "1、学习用品已买； 2、学习积极、努力",
                        schoolSupplies:[
                            {
                                id: "1",
                                name: "画笔",
                            },
                            {
                                id: "1",
                                name: "画板",
                            },
                        ],
                        classes: [
                            {
                                id: "1",
                                className: "涂鸦一班",
                                subSubject: "涂鸦4-6岁",
                                schooltime: "每周一上午9点",
                                address: "杭州市美都广场C座511",
                                used: 12,
                                capacity: 15,
                                unitTime: 1,
                                remainingTime: 90,
                                totalTime: 100,
                                status: "0",
                                teacher: "郭嘉",
                            },
                            {
                                id: "1",
                                className: "涂鸦一班",
                                subSubject: "涂鸦4-6岁",
                                schooltime: "每周一上午9点",
                                address: "杭州市美都广场C座511",
                                used: 12,
                                capacity: 15,
                                unitTime: 1,
                                remainingTime: 90,
                                totalTime: 100,
                                status: "0",
                                teacher: "郭嘉",
                            }
                        ],
                        activities: [
                            {
                                id: "0",
                                title: "最后一期！2019汕头国际马拉松第三期官方训练营报名启动",
                                desc: "汕头国际马拉松官方训练营由汕头市长跑协会主办的非盈利性公益活动，旨在赛前为跑友们提供专," +
                                "业的马拉松训练课程，帮助跑友掌握科学有效的训练方式，合理备战、实现目标。前两期的2019" +
                                "汕马官方训练营已分别在10月和11月顺利举行。",
                                time: "2019-12-15",
                                address: "汕头开放广场",
                                capacity: "120",
                                score: "3",
                                use: "1005",
                                cost: "100",
                                startTime: "2019-12-09",
                                endTime: "2019-12-13",
                                img: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                                status: "0",
                            },
                            {
                                id: "1",
                                title: "最后一期！2019汕头国际马拉松第三期官方训练营报名启动",
                                desc: "汕头国际马拉松官方训练营由汕头市长跑协会主办的非盈利性公益活动，旨在赛前为跑友们提供专," +
                                "业的马拉松训练课程，帮助跑友掌握科学有效的训练方式，合理备战、实现目标。前两期的2019" +
                                "汕马官方训练营已分别在10月和11月顺利举行。",
                                time: "2019-12-15",
                                address: "汕头开放广场",
                                capacity: "120",
                                score: "3",
                                use: "1005",
                                cost: "100",
                                startTime: "2019-12-09",
                                endTime: "2019-12-13",
                                img: require("@/assets/img/steamWave.jpg"),
                                status: "0",
                            },
                            {
                                id: "2",
                                title: "最后一期！2019汕头国际马拉松第三期官方训练营报名启动",
                                desc: "汕头国际马拉松官方训练营由汕头市长跑协会主办的非盈利性公益活动，旨在赛前为跑友们提供专," +
                                "业的马拉松训练课程，帮助跑友掌握科学有效的训练方式，合理备战、实现目标。前两期的2019" +
                                "汕马官方训练营已分别在10月和11月顺利举行。",
                                time: "2019-12-15",
                                address: "汕头开放广场",
                                capacity: "120",
                                score: "3",
                                use: "1005",
                                cost: "100",
                                startTime: "2019-12-09",
                                endTime: "2019-12-13",
                                img: require("@/assets/img/zbsytp.jpg"),
                                status: "0",
                            }
                        ],
                    };
                    this.tableData.push(student);
                }
                this.totalAcCount=this.tableData.length;
            },

            reseta() {
                this.searchform = {
                    name: "",
                    status: "",
                };
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
                dialogVisible: false,
                searchform: {
                    name: "",
                    status: "",
                    area: "",
                },
                tableData: [],
                checkRows: [],
                checkRowIds: [],
                clientWidth: 1800,
                clientHeight: document.body.clientHeight-2,
                currentPage: 0,
                pageSize: 10,
                photoWidth: 207*0.2,
                photoHeight: 313*0.2,

                totalAcCount: 0,
                acPageSize: 10,
                acCurrentPage: 0,
                areaOptions: [],
            }
        },
    }
</script>

<style scoped>
    .xx-lable > span:nth-of-type(1) {
        display: inline-block;
        width: 90px;
        color: #99a9bf;
    }
    .xx-lable > span:nth-of-type(2) {
        display: inline-block;
        color: #303133;
    }
    .xx-lable {
        line-height: 40px;
    }
    .xx-text {
        width: 600px;
    }
</style>

<style>
    .el-table__expanded-cell:hover {
        background: #ffffff !important;
    }
</style>