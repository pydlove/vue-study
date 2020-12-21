<template>
	<!--eslint-disable-->
	<div>
		<el-dialog
				class="aiocw-dialog"
				title="增加角色"
				:visible.sync="dialogVisible"
				:close-on-click-modal="false"
				:before-close="close"
				:fullscreen="false"
				width="1200px"
				center>
			<el-card class="auto-card wdi-900 pr">
				<el-form
						ref="form"
						:model="form"
						:rules="rules"
						:validate-on-rule-change="false"
						label-width="80px">
					<div class="color-fa5c26 ml-80 mb-20 lh-28">
						什么是普通权限？
						普通权限只能编辑、删除、查看自己添加的数据<br>

						什么是超级权限？
						超级权限能够编辑、删除、查看任何数据<br>
					</div>


					<div class="dffn">
						<el-form-item label="角色名称" prop="name" required>
							<el-input class="wdi-300" v-model="form.name"></el-input>
						</el-form-item>

						<el-form-item label="是否是超级权限" label-width="140px" prop="superPermissions">
							<el-select class="wdi-300" v-model="form.superPermissions" placeholder="请选择是否是超级权限">
								<el-option label="普通权限" value="0"></el-option>
								<el-option label="超级权限" value="1"></el-option>
							</el-select>
						</el-form-item>
					</div>

					<el-form-item label="描述">
						<el-input class="wdi-740 textarea" :autosize="{ minRows: 6, maxRows: 8}"
						          type="textarea" v-model="form.remark">
						</el-input>
					</el-form-item>
				</el-form>
			</el-card>
			<span slot="footer" class="dialog-footer">
                <el-button class="wdi-120" @click="close">取 消</el-button>
                <el-button class="wdi-120 aioc-btn1" type="primary" @click="onSubmit">确 定</el-button>
            </span>
		</el-dialog>
	</div>
</template>

<script>
    export default {
        name: "add",
        components: {},
        mounted() {

        },
        methods: {
            close() {
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
                this.$nextTick(() => {
                    this.$refs["form"].clearValidate();
                });
            },
            clearForm() {
                this.form = {
                    id: "",
                    name: "",
                    superPermissions: '0',
                    remark: '',
                };
            },

            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.submitRequest();
                        this.dialogVisible = true;
                        this.$nextTick(() => {
                            this.$refs["form"].clearValidate();
                        });
                    } else {
                        return false;
                    }
                });
            },

            async submitRequest() {
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_role_add, this.form, "POST");
                if (data.code == 200) {
                    this.$promptMsg("增加角色成功！", "success");
                    this.dialogVisible = false;
                    this.clearForm();
                    this.$emit("search", 1, 10);
                }
            },

        },
        data() {
            return {
                dialogVisible: false,
                form: {
                    id: "",
                    name: "",
                    superPermissions: '0',
                    remark: '',
                },
                rules: {
                    name: [
                        {type: 'string', required: true, message: '请输入角色名称', trigger: ['change', 'blur']},
                    ],
                    superPermissions: [
                        {type: 'string', required: true, message: '请选择是否超级权限', trigger: ['change', 'blur']},
                    ],
                }
            }
        },
    }
</script>

<style scoped>
</style>

<style>
</style>