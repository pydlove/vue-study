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
				<el-form-item label="活动名称" prop="title">
					<el-input class="aa_form_item" v-model="form.title" placeholder="请输入活动名称"></el-input>
				</el-form-item>

				<el-form-item label="报名时间" prop="signTimeRange">
					<el-date-picker class="aa_form_item"
							v-model="form.signTimeRange"
							type="datetimerange"
					        value-format="yyyy-MM-dd HH:mm:SS"
							:picker-options="pickerOptions"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="right">
					</el-date-picker>
				</el-form-item>

				<el-form-item label="投票时间" prop="voteTimeRange">
					<el-date-picker class="aa_form_item"
					                v-model="form.voteTimeRange"
					                value-format="yyyy-MM-dd HH:mm:SS"
					                type="datetimerange"
					                :picker-options="pickerOptions"
					                range-separator="至"
					                start-placeholder="开始日期"
					                end-placeholder="结束日期"
					                align="right">
					</el-date-picker>
				</el-form-item>

				<el-form-item label="活动介绍" prop="content">
					<tinymce-text id="tinymce" @release="onSubmit" :btnName="'创建活动'"></tinymce-text>
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
			/**
			 * 提交
			 * @param {*} 参数 参数说明
			 * @author panyong
			 */
            onSubmit(content) {
                this.form.content = content;
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.submitRequest(content);
                    } else {
                        return false;
                    }
                });
            },

            async submitRequest() {
                this.form.signStart = this.form.signTimeRange[0];
                this.form.signEnd = this.form.signTimeRange[1];
                this.form.voteStart = this.form.voteTimeRange[0];
                this.form.voteEnd = this.form.voteTimeRange[1];
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_activity_add, this.form, "POST");
                if(data.code == 200) {
                    this.$notify({
                        title: '成功',
                        message: '增加活动成功',
                        type: 'success'
                    });
                    this.dialogVisible = false;
                    this.clearForm();
                    this.$emit("search", 1, 10);
                }
            },

            clearForm() {
                this.form = {
                    title: "",
                    signStart: "",
                    signEnd: "",
                    voteStart: "",
                    voteEnd: "",
                    signTimeRange: [],
                    voteTimeRange: [],
                };
            },

            toMainPage() {
                this.$emit("toPage", "main");
            }
	    },
	    data() {
            return {
                form: {
                    title: "",
	                signStart: "",
	                signEnd: "",
	                voteStart: "",
                    voteEnd: "",
                    signTimeRange: [],
                    voteTimeRange: [],
                    content: "",
                },
                rules: {
                    title: [
                        {type: 'string', required: true, message: '请输入活动名称', trigger: ['change', 'blur']},
                    ],
                    signTimeRange: [
                        {type: 'array', required: true, message: '请输入报名时间', trigger: ['change', 'blur']},
                    ],
                    voteTimeRange: [
                        {type: 'array', required: true, message: '请输入投票时间', trigger: ['change', 'blur']},
                    ],
                    content: [
                        {type: 'string', required: true, message: '请输入活动介绍', trigger: ['change', 'blur']},
                    ],
                },
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
<style>
	.aa_form .el-form-item {
		position: relative;
	}
	.aa_form .el-form-item__error {
		position: absolute;
		top: -39px;
		left: 75px;
	}
</style>