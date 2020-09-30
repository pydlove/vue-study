<template>
    <div>
      <el-pagination  :hide-on-single-page="pageshow"
                      class="pb-10 pt-20"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      :page-sizes="pageSizes"
                      :page-size="pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="totalCount">
      </el-pagination>
    </div>
</template>

<script>
    export default {
      name: "pagination",
      data() {
        return {
          /**
           * 分页参数
           */
          currentPage: 1,
          pageSize: 10,
          pageSizes: [10, 20, 50, 100],
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
