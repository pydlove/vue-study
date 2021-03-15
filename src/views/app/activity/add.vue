<template>
	<!--eslint-disable-->
	<div>
		<el-card class="app_main_card">
			<div slot="header" class="aa_return" @click="toMainPage">
				<i class="el-icon-arrow-left"></i>
				<div>
					返回活动管理
				</div>
			</div>

			<el-form class="aa_form"
					ref="form"
					:model="form"
					:rules="rules"
					label-position="top"
					:validate-on-rule-change="false"
					label-width="80px">
				<el-form-item label="活动名称">
					<el-input class="aa_form_item" v-model="form.name" placeholder="请输入活动名称"></el-input>
				</el-form-item>

				<el-form-item label="活动时间">
					<el-date-picker class="aa_form_item"
							v-model="form.timeRange"
					        placeholder="请输入活动时间"
							type="datetimerange"
							:picker-options="pickerOptions"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="right">
					</el-date-picker>
				</el-form-item>

				<el-form-item label="活动介绍">
					<tinymce-text id="tinymce" @release="release" :btnName="'创建活动'"></tinymce-text>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>
<!--eslint-disable-->
<script>
    import TinymceText from '@/components/TinymceText'
    export default {
        name: "add",
	    components: { 'tinymce-text':TinymceText },
	    methods: {
            toMainPage() {
                this.$emit("toPage", "main");
            }
	    },
	    data() {
            return {
                form: {

                },
                rules: [],
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
            }
	    }
    }
</script>

<style scoped>
	.el-icon-arrow-left {
		font-size: 18px;
		margin-right: 10px;
	}
	.aa_return {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: flex-start;
		font-size: 16px;
	}
	.aa_return:hover {
		color: #2b90ff;
	}
	.aa_form_item {
		width: 100%;
		max-width: 600px;
	}
	.aa_form {
		text-align: left;
	}
</style>