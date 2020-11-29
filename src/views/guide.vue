<template>
    <div class="">
        <el-card class="ca">
            <div class="tc">
                <span class="fs-30 fb">安徽省书画研究院管理系统原型向导列表</span>
            </div>
            <el-table
                    class="mt-40"
                    ref="codeTable"
                    :data="tableData"
                    border
                    @selection-change='onTableSelectChange'
                    @row-click='tableRowClick'
                    :row-style="{height:'20px'}"
                    :cell-style="{padding:'9px 1px'}"
            >
                <el-table-column fixed="left" type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="页面" ></el-table-column>
                <el-table-column prop="remark" label="备注" ></el-table-column>
                <el-table-column label="操作"  fixed="right" width="200">
                    <template slot-scope="scope">
                        <el-button class="aioc-btn1"
                                   v-aba="['e']"
                                   size="mini"
                                   @click="go(scope.row)">去查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "guide",
        mounted() {
            this.search();
        },
        methods: {
            search() {
                this.tableData = [
                    {
                        id: "1",
                        name: "学生端登录页",
                        url: "studentLogin",
                        remark: "",
                    },
                    {
                        id: "1",
                        name: "老师端登录页",
                        url: "teacherLogin",
                        remark: "老师端和后台管理控制台登录后在一套架构里面",
                    },
                    {
                        id: "1",
                        name: "后台管理控制台登录页",
                        url: "consoleLogin",
                        remark: "老师端和后台管理控制台登录后在一套架构里面",
                    },
                ];
            },
            go(row) {
                const url = this.$router.resolve({name: row.url});
                window.open(url.href,'_blank');
            },

        },
        data() {
            return {
                searchform: {
                    name: "",
                },
                tableData: [],
                checkRows: [],
                checkRowIds: [],
                clientWidth: 1800,
                clientHeight: document.body.clientHeight-500,
                currentPage: 0,
                pageSize: 10,
            }
        },
    }
</script>

<style scoped>
    .ca {
        margin: 50px auto;
        width: 900px;
        padding: 50px;
    }
</style>
<style>

</style>