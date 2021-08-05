<template>
    <div>
        <el-pagination
                background :hide-on-single-page="pageshow"
                class="pb-10 pt-20 mt-10"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                prev-text="上一页"
                next-text="下一页"
                layout="total, prev, next, jumper"
                :total="totalCount">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "page",

        data() {
            return {
                /**
                 * 分页参数
                 */
                currentPage: 1,
                pageSize: 10,
                totalCount: 0,
                pageshow: false,
            }
        },

        methods: {
            /**
             * 分页方法
             */
            handleSizeChange(val) {
                this.pageSize = val;
                this.currentPage = 1;
                this.$emit("search", this.currentPage, this.pageSize);
                this.pageshow = false;
                this.$nextTick(() => {
                    this.pageshow = true;
                });
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.$emit("search", this.currentPage, this.pageSize);
            },
        },

    }
</script>

<style scoped>

</style>
