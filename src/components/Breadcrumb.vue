<template>
    <div>
        <div class="poin-url fl">
            <i class="position mr-5"></i>
            当前位置：
            <span v-for="(item, index) in breadcrumbs" :key="index">
                <a :class="(index+1) == breadcrumbs.length ? 'current' : ''" :href="item.path"> {{item.name}}</a>
                {{(index+1) == breadcrumbs.length ? "" : "/"}}
            </span>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Breadcrumb",
        props: ["breadcrumbs"],
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
        .poin-url {
            line-height: 40px;
            display: flex;
            justify-content: center;
            font-size: 12px;
            padding-top: 10px;
            color: #606266;
        }
        .poin-url a {
            margin-left: 3px;
            margin-right: 3px;
            text-decoration: none;
            color: #606266;
        }
        .poin-url a:hover {
            text-decoration: underline;
            color: #409EFF;
        }
        .current {
            background: #409EFF;
            height: 32px;
            display: inline-block;
            border-radius: 3px;
            color: #ffffff !important;
            padding-left: 5px;
            padding-right: 5px;
        }
    }
</style>