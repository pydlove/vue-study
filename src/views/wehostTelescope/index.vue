<template>
    <!--eslint-disable-->
    <div style="height: 100%">
        <el-table
                v-loading="loading"
                element-loading-text="正在建设中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="tableData"
                style="width: 100%; height: 100%">
        </el-table>
    </div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "index",
        data() {
            return {
                tableData: [],
                loading: true
            };
        }
    }
</script>

<style scoped>

</style>