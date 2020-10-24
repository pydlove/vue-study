<template>
    <div>
        <el-dialog class="aiCloud-dialog wow rollIn"
                   :close-on-click-modal="false"
                   :visible.sync="dialogVisible"
                   width="800px"
                   title="请选择所属行业"
                   :before-close="close">
            <el-tabs :tab-position="tabPosition">
                <el-tab-pane v-for="(item, index) in industryTab" :key="index" :label="item.label">
                   <div class="industry-main">
                       <el-tooltip v-for="(subItem, subIndex) in item.children" :key="subIndex"
                                   :disabled="subItem.label.length <= 7" :content="subItem.label" effect="light"  placement="top-start">
                           <span :class="selectedIndustry ==  (item.label + ' / ' + subItem.label) ? 'active-industry' : ''" @click="selectIndustry(item.label, subItem.label)">
                               {{subItem.label.length > 7 ? (subItem.label.substring(0, 7) + "...") : subItem.label}}
                           </span>
                       </el-tooltip>
                   </div>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
    import industry from "@/assets/json/industry.json"
    export default {
        name: "Industry",
        mounted() {
            this.initIndustryTab(industry);
        },
        methods: {
            close() {
              this.dialogVisible = false;
            },

            open(val) {
                this.dialogVisible = true;
                this.selectedIndustry = val;
            },

            /**
             * 选择行业数据
             */
            selectIndustry(val, subval) {
                this.$emit("setIndustry", val, subval);
                this.close();
            },

            /**
             * 初始化行业数据
             */
            initIndustryTab(industry) {
                for(let key in industry){
                    let subIndustry = industry[key];
                    var industryObj = {
                        label:key,
                        value:key,
                        children:[]
                    }
                    this.industryTab.push(industryObj);
                    for(let subKey in subIndustry){
                        var subIndustryObj = {
                            label:subIndustry[subKey],
                            value:subIndustry[subKey],
                        }
                        industryObj.children.push(subIndustryObj);
                    }
                }
            },
        },
        data() {
            return {
                /* 模态框显示和隐藏 */
                dialogVisible: false,

                // tab页位置
                tabPosition: 'left',

                // 行业数据tab
                industryTab: [],

                // 选择的行业
                selectedIndustry: "",
            }
        },
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
        .industry-main {
            display: flex;
            flex-wrap: wrap;
        }
        .industry-main > span {
            display: inline-block;
            width: 20%;
            height: 40px;
            line-height: 40px;
            text-align: left;
            padding-left: 20px;
            border-radius: 3px;
        }
        .industry-main > span:hover {
            background: #2196f3;
            color: #ffffff;
        }
        .active-industry {
            background: linear-gradient(to right, #ff8332, #f84820);
            color: #ffffff;
        }
    }

    /*媒体查询（平板）*/
    @media screen and (min-width: 769px) and (max-width: 996px) {


    }

    /*媒体查询（手机）*/
    @media screen and (max-width: 768px) {


    }
</style>