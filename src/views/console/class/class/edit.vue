<template>
    <div>
        <el-dialog
                class="aiocw-dialog"
                title="增加课程大类信息"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="false"
                width="1200px"
                center>
            <el-card class="auto-card wdi-900">
                <el-form
                        class= "pt-20 pl-20"
                        ref="form"
                        :model="form"
                        :rules="rules"
                        :validate-on-rule-change="false"
                        label-width="120px"
                        label-position="right">
                    <div class="dffn">
                        <el-form-item label="班级名称" prop="name" required>
                            <el-input class="wdi-288" v-model="form.name" placeholder="请输入班级名称"></el-input>
                        </el-form-item>

                        <el-form-item label="开始日期" prop="startDate" required>
                            <el-date-picker class="wdi-288"
                                            v-model="form.startDate"
                                            type="datetime"
                                            placeholder="选择开始日期"
                                            value-format="yyyy-MM-dd HH:mm:SS"
                                            align="right"
                                            :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </div>

                    <div class="dffn">
                        <el-form-item label="结束方式" prop="endType" required>
                            <el-select class="wdi-288" v-model="form.endType" placeholder="请选择结束方式" disabled>
                                <el-option @click.native="form.frequency = ''; form.endDate = ''; "
                                           v-for="item in endTypes"
                                           :key="item.value"
                                           :label="item.name"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item  v-if="form.endType == '0'" label="" prop="frequency" required>
                            <el-input-number v-model="form.frequency"  :step="1" :min="0" step-strictly></el-input-number>
                            <span class="ml-20">次之后结束</span>
                        </el-form-item>

                        <el-form-item v-else-if="form.endType == '1'" label="结束日期" prop="endDate" required>
                            <el-date-picker class="wdi-288"
                                            v-model="form.endDate"
                                            type="datetime"
                                            placeholder="选择结束日期"
                                            value-format="yyyy-MM-dd HH:mm:SS"
                                            align="right"
                                            :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </div>

                    <el-form-item label="是否重复" prop="isRepeat" required>
                        <el-select class="wdi-288" v-model="form.isRepeat" placeholder="请选择是否重复">
                            <el-option @click.native="form.whichDay = []"
                                       v-for="item in repeats"
                                       :key="item.value"
                                       :label="item.name"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item v-if="form.isRepeat == '2' || form.isRepeat == '3'" label="周几上课" prop="whichDay" required>
                        <el-tag :type="isSwitchDay(item.value)? 'dark':'' " class="week"
                                v-for="item in weeks" :key="item.value" @click="prWhichDay(item.value)">
                            {{item.name}}</el-tag>
                    </el-form-item>

                    <el-form-item label="上课时间" prop="timeRange" required>
                        <el-time-picker class="wdi-700"
                                        is-range
                                        v-model="form.timeRange"
                                        arrow-control
                                        :picker-options="{
                                  selectableRange: '8:00:00 - 20:30:00'
                                }"
                                        value-format="HH:mm:SS"
                                        range-separator="至"
                                        start-placeholder="开始时间"
                                        end-placeholder="结束时间"
                                        placeholder="选择时间范围">
                        </el-time-picker>
                    </el-form-item>

                    <div class="dffn">
                        <el-form-item label="所在区域" prop="area" required>
                            <el-cascader  class="wdi-300"
                                          ref="areaCascaderRef"
                                          size="large"
                                          :options="areaOptions"
                                          v-model="form.area"
                                          @change="handleAreaCascader"
                                          placeholder="请选择区域">
                            </el-cascader>
                        </el-form-item>

                        <el-form-item label="上课地点" prop="address" required>
                            <el-input class="wdi-288" v-model="form.address" placeholder="请输入上课地点"></el-input>
                        </el-form-item>
                    </div>

                    <div class="dffn">
                        <el-form-item label="上课老师" prop="teacherId" required>
                            <el-select class="wdi-288" v-model="form.teacherId" placeholder="请选择上课老师" clearable filterable>
                                <el-option
                                        v-for="item in activeTeachers"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="所属课程大类" prop="mainId" required>
                            <el-select class="wdi-288" v-model="form.mainId" placeholder="请选择所属课程大类" clearable filterable>
                                <el-option @click.native="setMainSubject(item)"
                                           v-for="item in mainSubjects"
                                           :key="item.id"
                                           :label="item.name"
                                           :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>

                    <div class="dffn">
                        <el-form-item label="所属课程小类" prop="subId" required>
                            <el-select class="wdi-288" v-model="form.subId" placeholder="请选择所属课程小类" clearable filterable>
                                <el-option
                                        v-for="item in mainSubject.children"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="班级容量" prop="capacity" required>
                            <el-input class="wdi-288" v-model="form.capacity" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入班级容量"></el-input>
                        </el-form-item>
                    </div>

                    <el-form-item label="获得学分" prop="score" required>
                        <el-input class="wdi-288" v-model="form.score" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入获得学分"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input class="textarea wdi-700"
                                  type="textarea" :autosize="{ minRows: 4, maxRows: 4}"
                                  placeholder="输入备注" v-model="form.remark">
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
        name: "edit",
        props: ["mainSubjects", "currentPage", "pageSize", "areaOptions"],
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
                    startDate: "",
                    endType: "1",
                    frequency: "",
                    endDate: "",
                    isRepeat: "",
                    whichDay: [],
                    startTime: "",
                    endTime: "",
                    teacherId: "",
                    timeRange: ""   ,
                    address: "",
                    capacity: "",
                    subId: "",
                    mainId: "",
                    createTime: "",
                    updateTime: "",
                    remark: "",
                    score: "",
                    province: '',
                    city: '',
                    county: '',
                    township: '',
                    area: [],
                };
                this.mainSubject = "";
            },

            handleAreaCascader() {
                if (this.$refs.areaCascaderRef) {
                    this.$refs.areaCascaderRef.dropDownVisible = false; //监听值发生变化就关闭它
                }
                this.initActiveTeacher();
            },

            async initActiveTeacher() {
                let params = new FormData()
                if (this.form.area != null && this.form.area != "" && this.form.area != undefined) {
                    if (this.form.area.length == 1) {
                        params.append("province", this.form.area[0]);
                    }
                    if (this.form.area.length == 2) {
                        params.append("province", this.form.area[0]);
                        params.append("city", this.form.area[1]);
                    }
                    if (this.form.area.length == 3) {
                        params.append("province", this.form.area[0]);
                        params.append("city", this.form.area[1]);
                        params.append("county", this.form.area[2]);
                    }
                } else {
                    params.append("province", "安徽省");
                }
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_teacher_active, params, "POST");
                if (data.code === 200) {
                    this.activeTeachers = data.data;
                    return true;
                }
            },

            setMainSubject(item) {
                this.mainSubject = item;
                this.form.subId = "";
            },

            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.submitRequest();
                    } else {
                        return false;
                    }
                });
            },

            async submitRequest() {
                this.form.startTime = this.form.timeRange[0];
                this.form.endTime = this.form.timeRange[1];
                this.form.whichDay = this.form.whichDay.toString();
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_class_edit, this.form, "POST");
                if(data.code == 200) {
                    this.$promptMsg(data.msg, "success");
                    this.dialogVisible = false;
                    this.clearForm();
                    this.$emit("search", this.currentPage, this.pageSize);
                }
            },

            isSwitchDay(val) {
                for(var i in this.form.whichDay) {
                    if(this.form.whichDay[i] == val) {
                        return true;
                    }
                }
                return false;
            },

            prWhichDay(val) {
                var flag = false;
                var temp = [];
                for(var i in this.form.whichDay) {
                    if(this.form.whichDay[i] != val) {
                        temp.push(this.form.whichDay[i]);
                    } else {
                        flag = true;
                    }
                }
                if(!flag) {
                    temp.push(val);
                }
                this.form.whichDay = temp;
            },
        },
        data() {
            return {
                dialogVisible: false,
                activeTeachers: [],
                form: {
                    id: "",
                    name: "",
                    startDate: "",
                    endType: "1",
                    frequency: "",
                    endDate: "",
                    isRepeat: "",
                    whichDay: [],
                    startTime: "",
                    endTime: "",
                    teacherId: "",
                    timeRange: ""   ,
                    address: "",
                    capacity: "",
                    subId: "",
                    mainId: "",
                    createTime: "",
                    updateTime: "",
                    remark: "",
                    score: "",
                    province: '',
                    city: '',
                    county: '',
                    township: '',
                    area: [],
                },
                rules: {
                    name: [
                        {type: 'string', required: true, message: '请输入班级名称', trigger: ['change', 'blur']},
                    ],
                    startDate: [
                        {type: 'string', required: true, message: '请选择开始日期', trigger: ['change', 'blur']},
                    ],
                    endType: [
                        {type: 'string', required: true, message: '请选择结束方式', trigger: ['change', 'blur']},
                    ],
                    frequency: [
                        {type: 'number', required: true, message: '请输入多少次之后结束', trigger: ['change', 'blur']},
                    ],
                    endDate: [
                        {type: 'string', required: true, message: '请选择结束日期', trigger: ['change', 'blur']},
                    ],
                    isRepeat: [
                        {type: 'string', required: true, message: '请选择是否重复', trigger: ['change', 'blur']},
                    ],
                    whichDay: [
                        {type: 'array', required: true, message: '请选择周几上课', trigger: ['change', 'blur']},
                    ],
                    timeRange: [
                        {type: 'array', required: true, message: '请选择上课时间段', trigger: ['change', 'blur']},
                    ],
                    teacherId: [
                        {type: 'string', required: true, message: '请选择上课老师', trigger: ['change', 'blur']},
                    ],
                    area: [
                        { type: 'array', required: true, message: '请选择所在区域', trigger: ['change', 'blur']},
                    ],
                    address: [
                        {type: 'string', required: true, message: '请输入上课地点', trigger: ['change', 'blur']},
                    ],
                    mainId: [
                        {type: 'string', required: true, message: '请选择所属课程大类', trigger: ['change', 'blur']},
                    ],
                    subId: [
                        {type: 'string', required: true, message: '请选择所属课程小类', trigger: ['change', 'blur']},
                    ],
                    capacity: [
                        {type: 'string', required: true, message: '请输入班级容量', trigger: ['change', 'blur']},
                    ],
                    score: [
                        {type: 'string', required: true, message: '请输入获得学分', trigger: ['change', 'blur']},
                    ],
                },

                mainSubject: "",
                weeks: [
                    {name: "周一", value: "周一"},
                    {name: "周二", value: "周二"},
                    {name: "周三", value: "周三"},
                    {name: "周四", value: "周四"},
                    {name: "周五", value: "周五"},
                    {name: "周六", value: "周六"},
                    {name: "周日", value: "周日"},
                ],
                repeats: [
                    {
                        name: "每天",
                        value: "0",
                    },
                    {
                        name: "隔天",
                        value: "1",
                    },
                    {
                        name: "每周",
                        value: "2",
                    },
                    {
                        name: "隔周",
                        value: "3",
                    },
                ],
                endTypes: [
                    // {
                    //     name: "限次数",
                    //     value: "0",
                    // },
                    {
                        name: "限日期",
                        value: "1",
                    },
                ],

                /**
                 * 日期工具
                 */
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
            }
        },
    }
</script>

<style scoped>
    .week {
        margin-right: 10px;
    }
</style>

<style >
</style>