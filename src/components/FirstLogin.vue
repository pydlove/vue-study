<template>
	<!--eslint-disable-->
	<div>
		<el-dialog class="aiCloud-dialog"
		           :close-on-click-modal="false"
		           :visible.sync="dialogVisible"
		           width="900px"
		           :title="title"
		           :close-on-press-escape="false"
		           :show-close="false">
			<div>
				<el-steps :active="stage" finish-status="success" simple>
					<el-step title="个人信息填写"></el-step>
					<el-step title="科目选择"></el-step>
					<el-step title="注册"></el-step>
				</el-steps>

				<div v-if="stage == 1" class="grxx">
					<el-form ref="form1" :rules="rules" :model="form1" label-width="100px" inline="false"
					         label-position="right">
						<el-form-item class="upload-item" label="两寸蓝底证件照" prop="photo" required>
							<div>
								<el-dialog :visible.sync="photoDialogVisible">
									<img width="100%" :src="dialogImageUrl" alt="">
								</el-dialog>
								<el-upload class="photo-up"
								           ref="photoUploadRef"
								           :action="uploadAction"
								           list-type="picture-card"
								           :fileList="fileList"
								           :on-success="onSuccess"
								           :on-error="onError"
								           :before-upload="beforeUpload"
								           :on-preview="handlePictureCardPreview"
								           :before-remove="beforeRemove"
								           :on-remove="handleRemove"
								           :limit="1"
								           :class="(hideUpload ? 'talentPhotoHide':'') + ' zpcc'"
								>
									<i class="el-icon-camera-solid talent-photo"></i>
								</el-upload>
							</div>
						</el-form-item>

						<div>
							<el-form-item class="mt-40" label="姓名" prop="name" required>
								<el-input class="wdi-300" v-model="form1.name" placeholder="请填写姓名"></el-input>
							</el-form-item>
						</div>

						<div>
							<el-form-item class="mt-40" label="性别" prop="sex" required>
								<el-radio-group class="wdi-300" v-model="form1.sex">
									<el-radio class="ml-15 nn" label="0" border>男</el-radio>
									<el-radio class="nn" label="1" border>女</el-radio>
								</el-radio-group>
							</el-form-item>
						</div>

						<div>
							<el-form-item class="mt-40" label="出生年月" prop="birth" required>
								<el-date-picker class="wdi-300" type="date" placeholder="选择出生日期" v-model="form1.birth"
								                value-format="yyyy-MM-dd"
								                @blur="calculationAge()"></el-date-picker>
							</el-form-item>
						</div>

						<div>
							<el-form-item class="mt-40" label="年龄" prop="age">
								<el-input class="wdi-300" v-model="form1.age" placeholder="请填写年龄" disabled></el-input>
							</el-form-item>
						</div>

						<div>
							<el-form-item class="mt-40" label="手机号码" prop="phone" required>
								<el-input class="wdi-300" v-model="form1.phone" placeholder="请填写手机号码"
								          disabled></el-input>
							</el-form-item>
						</div>

						<div>
							<el-form-item class="mt-40" label="身份证号码" prop="idcard" required>
								<el-input class="wdi-300" v-model="form1.idcard" placeholder="请填写身份证号码"></el-input>
							</el-form-item>
						</div>

						<div class="dffn mt-40">
							<el-form-item label="所在区域" prop="area" required>
								<el-cascader class="wdi-300"
								             ref="areaCascaderRef"
								             size="large"
								             :props="{ checkStrictly: true }"
								             :options="areaOptions"
								             v-model="form1.area"
								             @change="handleAreaCascader"
								             placeholder="请选择区域">
								</el-cascader>
							</el-form-item>

							<el-form-item label-width="100px" label="详细住址" prop="address">
								<el-input class="wdi-300" v-model="form1.address" placeholder="请填写详细住址"></el-input>
							</el-form-item>
						</div>
					</el-form>
				</div>

				<div v-if="stage == 2" class="kmxz">
					<el-form ref="form2" :rules="rules" :model="form2" label-width="100px" inline="false"
					         label-position="right">
						<el-card v-show="subjectForms != [] && subjectForms.length > 0" class="mb-10">
							<div slot="header" class="clearfix">
								您已经注册的科目: <span class="color-fa5c26">（最多可以注册两个科目）</span>
							</div>
							<div v-for="(item, index) in subjectForms" :key="index" class="zcxm"
							     @mouseenter="removeSubjectId = item.mainSubject.id" @mouseleave="removeSubjectId = ''"
							     @click="removeSubject(item)">
								{{index + 1}}. 您已经注册
								<span class="color-409EFF fb">{{item.mainSubject.name}}</span>
								-
								<span class="color-409EFF fb">{{item.subSubject.name}}</span>
								，
								<span>
									班级名称：<span class="color-409EFF fb">{{item.class.name}}</span>
								</span>
								<el-button class="ml-10" v-show="removeSubjectId == item.mainSubject.id" type="info" size="mini"
								           icon="el-icon-delete">移除
								</el-button>
							</div>
						</el-card>

						<el-card class="mb-10" v-show="form2.subjectList.length < 2">
							<div slot="header" class="clearfix">
								请您选择了科目大类:
							</div>
							<el-form-item class="kmdl" label-width="100px" label="" required>
								<el-radio-group v-model="form2.mainSubject">
									<el-radio class="km-radio" v-for="(item, index) in mainSubjects" :key="index"
									          :label="item"
									          @click.native.prevent="selectMainSubject($event, item)">
										{{item.name}}
									</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-card>

						<el-card class="mb-10" v-show="form2.mainSubject != ''">
							<div slot="header" class="clearfix">
								您选择了科目大类<span class="color-409EFF fb">{{form2.mainSubject.name}}</span>，
								请继续选择<span class="color-409EFF fb">{{form2.mainSubject.name}}</span>科目小类：
							</div>
							<el-form-item label-width="100px" label="" prop="">
								<el-radio-group v-model="form2.subSubject">
									<el-radio class="mt-10 km-radio"
									          v-for="(subitem, subindex) in form2.mainSubject.children" :key="subindex"
									          :label="subitem"
									          @click.native.prevent="selectSubSubject($event, subitem)">
										{{subitem.name}}
									</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-card>

						<el-card v-show="form2.subSubject != ''">
							<div slot="header" class="clearfix">
								您选择了科目小类<span class="color-409EFF fb">{{form2.subSubject.name}}</span>，
								请继续选择<span class="color-fa5c26 fb">上课的时间和地点</span>：
							</div>
							<el-form-item label-width="120px" label="">
								<div class="dffw">
									<div v-if="classes == undefined || classes == '' || classes.length == 0">
									<span class="color-fa5c26">
									<span class="fb">{{form2.subSubject.name}}</span>
									未设置班级，有疑问请联系客服，客服电话：400-950616
									</span>
									</div>
									<div v-else>
										<div :class="(classItem.used == classItem.capacity?'sdbh':'') + (form2.class.id == classItem.id?'sdbl':'') + ' sdd'"
										     v-for="classItem in classes" :key="classItem.id"
										     @click="selectClass(classItem)">
											<p>
												<span class="fb">班级名称：</span>
												{{classItem.name}}
											</p>
											<p>
												<span class="fb">授课老师：</span>
												{{classItem.teacherName}}
											</p>
											<p>
												<span class="fb">地点：</span>
												{{classItem.province}}{{classItem.city}}{{classItem.county}}({{classItem.address}})
											</p>
											<p>
												<span class="fb">结束方式：</span>
												{{handleEnd(classItem)}}
											</p>
											<p>
												<span class="fb">时间：</span>
												{{handleTime(classItem)}}
											</p>
											<p>
												<span class="fb">累计学分：</span>
												{{classItem.score}} 分
											</p>
											<p>
												<span class="fb">座位：</span>
												{{classItem.used}}/ {{classItem.capacity}}
												（剩余：
												<span :class="(classItem.used == classItem.capacity ? 'color-fa5c26':'color-67C23A')">
										{{classItem.capacity - classItem.used}}个座位
										</span>
												）
											</p>
											<div class="zwd">
										<span :class="(i <= classItem.used ? 'kezhuo-icon':'kezhuoh-icon') + ' zw'"
										      v-for="i of classItem.capacity" :key="i"></span>
											</div>
											<div v-show="classItem.used == classItem.capacity">
												<div class="sj bh">
													<div class="yxq yy">已</div>
													<div class="yxq xx">排</div>
													<div class="yxq qq">满</div>
												</div>
												<div class="sjh"></div>
											</div>

											<div v-show="form2.class.id == classItem.id">
												<div class="sj bl">
													<div class="yxq yy">已</div>
													<div class="yxq xx">选</div>
													<div class="yxq qq">取</div>
												</div>
												<div class="sjf"></div>
											</div>
										</div>
										<el-pagination
												class="mt-20"
												@size-change="handleSizeChange"
												@current-change="handleCurrentChange"
												:current-page="currentPage"
												:page-sizes="pageSizes"
												:page-size="pageSize"
												layout="total, sizes, prev, pager, next, jumper"
												:total="totalCount">
										</el-pagination>
									</div>
								</div>
							</el-form-item>
						</el-card>

						<el-card class="mt-10" v-show="form2.subSubject != ''">
							<div slot="header" class="clearfix">
								<span class="color-409EFF fb">学习用品推荐</span>
							</div>
							<el-form-item label-width="100px" label="" prop="">
								<div class="dffw">
									<el-card class="wdi-390 hp-100 mg-5" v-for="(item, index) in commodities"
									         :key="index"
									         @click.native="selectCommodity(item, $event)"
									         :body-style="{ padding: '0px' }"
									         style="position: relative;">
										<div class="dffn">
											<img :src="item.img" class="image" style="width: 100px;height: 100px;">
											<div style="padding: 5px;" class="colori-303133">
												<div>
													<span>描述：</span>
													<span>{{item.name}}</span>
												</div>
												<div class="bottom clearfix">
													<span>单价：</span>
													¥<span class="mli-10 color-fa5c26 fs-20 fb">{{ item.unitPrice }}/ {{item.unit}}</span>
													<el-input-number class="ml-50 mt-5 co-num" size="mini" v-model="item.num"
													                 @change="handleChange($event)" :step="1" :min="0"
													                 label="描述文字"></el-input-number>
												</div>
											</div>
										</div>
										<div v-if="isSelectCommodity(item.id, $event)">
											<div class="sj bl">
												<div class="yxq yy">已</div>
												<div class="yxq xx">选</div>
												<div class="yxq qq">取</div>
											</div>
											<div class="sjf"></div>
										</div>
									</el-card>
								</div>
								<el-pagination
										class="mt-20"
										@size-change="handleCoSizeChange"
										@current-change="handleCoCurrentChange"
										:current-page="currentCoPage"
										:page-sizes="coPageSizes"
										:page-size="coPageSize"
										layout="total, sizes, prev, pager, next, jumper"
										:total="totalCoCount">
								</el-pagination>
							</el-form-item>
						</el-card>
					</el-form>
				</div>

				<div v-if="stage == 3">
					<div>
						<div class="zfd">
							您报名的学习科目的订单详细信息
						</div>
						<div>
							<el-card  class="mb-10">
								<div slot="header" class="clearfix">
									<span class="color-409EFF fb fl">订单编号：20200506898989</span>
								</div>
								<div class="ddxq" v-for="(item, index) in subjectForms" :key="index">
									<span>报名费用： <span class="jg"> 50元</span></span>
									<span>大类科目： {{item.mainSubject.name}}</span>
									<span>小类科目： {{item.subSubject.name}}</span>
									<span>费用用途： 用于支付注册{{item.mainSubject.name}}-{{item.subSubject.name}}科目学习所产生的报名费用</span>
									<el-divider></el-divider>
								</div>

								<div v-for="(item, index) in subjectForms" :key="index" >
									<div class="ddxq" v-for="(sitem, sindex) in item.commodities" :key="sindex">
										<span>商品{{sitem.name}}费用：<span class="jg"> {{sitem.num*sitem.unitPrice}}元</span></span>
										<span>费用用途： 用于支付购买商品{{sitem.name}}所产生的报名费用</span>
										<el-divider></el-divider>
									</div>
								</div>
							</el-card>
						</div>
						<el-card class="tr mt-10 mb-10">
							订单费用合计：<span class="fs-20 color-fa5c26 fb">¥
							{{calculationCost()}}
						</span>
							元
						</el-card>
						<el-card>
							<div class="zfd">
								选择您的支付方式
							</div>
							<div class="dffn mt-10">
								<div :class="(payWaySelect == 'wx' ? 'selected':'') + ' wx' " @click="pay('wx')">
									<i class="wxzf"></i>
									<span>微信支付</span>
									<div v-show="payWaySelect == 'wx'" class="sjx">
										<i class="el-icon-check dh"></i>
									</div>
								</div>
								<div :class="(payWaySelect == 'zfb' ? 'selected':'') + ' ml-35 zfb'"
								     @click="pay('zfb')">
									<i class="zfbzf"></i>
									<div v-show="payWaySelect == 'zfb'" class="sjx">
										<i class="el-icon-check dh"></i>
									</div>
								</div>
							</div>
							<div v-show="payWaySelect == 'wx'" class="dffc tl mt-20">
								<el-image :src="require('@/assets/img/ewm/wxewm.png')" :fit="fit"
								          class="wd-200 hp-200"></el-image>
								<span class="zft">微信扫码支付</span>
							</div>
							<div v-show="payWaySelect == 'zfb'" class="dffc tl mt-20">
								<el-image :src="require('@/assets/img/ewm/zfbewm.png')" :fit="fit"
								          class="wd-200 hp-200"></el-image>
								<span class="zft">支付宝扫码支付</span>
							</div>
						</el-card>
					</div>
				</div>
			</div>

			<div slot="footer" class="dialog-footer">
				<el-button v-show="stage == 1" class="wdi-120 aioc-btn1" type="primary" @click="toNext">下一步</el-button>
				<el-button v-show="stage == 2 || stage == 3" class="wdi-120" type="primary" @click="toPrevious">上一步
				</el-button>
				<el-button v-show="stage == 2" class="wdi-120" type="primary" @click="addSubject">加入注册科目</el-button>
				<el-button v-show="stage == 2" class="wdi-120" type="primary" @click="submit">注 册</el-button>

				<el-button class="wdi-220" type="primary" @click="dialogVisible = false;">关闭，去首页（测试演示使用）</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<!--eslint-disable-->
<script>
    import areaData from '@/assets/json/areaData.json'
    import Pagination from "@/components/Pagination";

    export default {
        name: "FirstLogin",
        components: {Pagination},
        mounted() {
            this.initAreaOptions(areaData);
            this.beforeunload();
        },
        destroyed() {
            this.beforeunload();
        },
        methods: {
            beforeunload() {
                var that = this;
                window.onbeforeunload = function () {
                    that.saveToStorageTemp();
                    return;
                }
            },
            close() {
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
            },

            calculationCost() {
                var cost = 0;
                for(var i in this.subjectForms) {
                    var subjectForm = this.subjectForms[i];
                    const commodities = subjectForm.commodities;
                    for(var i in commodities) {
                        const commodity = commodities[i];
                        const unitPrice = commodity.unitPrice;
                        const num = commodity.num;
                        cost = cost + unitPrice*num;
                    }
                }
                cost = cost + 50*this.subjectForms.length;
                return cost;
            },

            handleEnd(row) {
                const endType = row.endType;
                if (endType == "0") {
                    const frequency = row.frequency;
                    return "限次数" + "(" + frequency + ")";
                } else if (endType == "1") {
                    const endDate = row.endDate;
                    return "限日期" + "(" + endDate + ")";
                }
            },

            handleTime(row) {
                const isRepeat = row.isRepeat;
                const week = row.whichDay;
                const startTime = row.startTime;
                const endTime = row.endTime;
                if (isRepeat == "0") {
                    return "每天" + " / (" + startTime + " - " + endTime + ")";
                } else if (isRepeat == "1") {
                    return "隔天" + " / (" + startTime + " - " + endTime + ")";
                } else if (isRepeat == "2") {
                    return "每周" + " / " + week + " / (" + startTime + " - " + endTime + ")";
                } else if (isRepeat == "3") {
                    return "隔周" + " / " + week + " / (" + startTime + " - " + endTime + ")";
                }
            },

            /**
             * 初始化地域数据
             */
            initAreaOptions(area) {
                for (let key in area) {
                    let province = area[key];
                    if (key == '安徽省') {
                        var provinceObj = {
                            label: key,
                            value: key,
                            children: []
                        }
                        this.areaOptions.push(provinceObj);
                        for (let cityKey in province) {
                            let city = province[cityKey];
                            var cityObj = {
                                label: cityKey,
                                value: cityKey,
                                children: []
                            }
                            provinceObj.children.push(cityObj);
                            for (let areaKey in city) {
                                var areaObj = {
                                    label: areaKey,
                                    value: areaKey,
                                }
                                cityObj.children.push(areaObj);
                            }
                        }
                    }
                }
            },

            calculationAge() {
                var r = this.form1.birth.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
                if (r == null) {
                    return false;
                }
                var d = new Date(r[1], r[3] - 1, r[4]);
                if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
                    var age = new Date().getFullYear();
                    this.form1.age = age - r[1];
                }
            },

            removeSubject(item) {
                var temp = [];
                for (var i in this.subjectForms) {
                    const subjectForm = this.subjectForms[i];
                    if (subjectForm.mainSubject.id != item.mainSubject.id) {
                        temp.push(subjectForm);
                    } else {
                        this.mainSubjects.push(item.mainSubject);
                    }
                }
                this.subjectForms = temp;
            },

            submit() {
                if(this.subjectForms.length < 2) {
                    this.$confirm('您可至多再注册一门科目，是否继续注册？', '提示', {
                        confirmButtonText: '再添加一门科目',
                        cancelButtonText: '放弃继续添加，去注册',
                        type: 'info'
                    }).then(() => {
                    }).catch(() => {
                        this.stage++;
                    });
                } else {
                    this.stage++;
                }
            },

	        addSubject() {
                console.log(this.form2);
                if(this.subjectForms.length >= 2) {
                    this.$notify.error({
                        title: '提示',
                        message: '您已经加入注册了两个科目，不可再添加'
                    });
                    return;
                }
                if(this.form2.class != "" && this.form2.class != null && this.form2.class != undefined) {
                    this.subjectForms.push(this.form2);
                    // 将已选大类科目移除
                    var tempSubjects = []
                    for (var i in this.mainSubjects) {
                        const item = this.mainSubjects[i];
                        if (item.id != this.form2.mainSubject.id) {
                            tempSubjects.push(item);
                        }
                    }
                    this.mainSubjects = tempSubjects;
                    this.form2 = {
                        mainSubject: "",
                        subSubject: "",
                        class: "",
                        subjectList: [],
                        commodities:[],
                    };
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: '请您先完成科目选择，再执行加入注册科目操作'
                    });
                }
            },

            selectMainSubject(el, item) {
                if (el.target.tagName === 'INPUT') return;
                this.form2.mainSubject = item;
                this.initSubSelectInfo();
            },

            selectSubSubject(el, item) {
                if (el.target.tagName === 'INPUT') return;
                var isMatch = false;
                const cond = item.cond;
                const condAge = item.age;
                switch (cond) {
                    case "0":
                        isMatch = Number(this.form1.age) > Number(condAge) ? true : false;
                        break;
                    case "1":
                        isMatch = Number(this.form1.age) >= Number(condAge) ? true : false;
                        break;
                    case "2":
                        isMatch = Number(this.form1.age) == Number(condAge) ? true : false;
                        break;
                    case "3":
                        isMatch = Number(this.form1.age) < Number(condAge) ? true : false;
                        break;
                    case "4":
                        isMatch = Number(this.form1.age) <= Number(condAge) ? true : false;
                        break;
                    case "5":
                        const condAges = condAge.split(",");
                        isMatch = Number(this.form1.age) >= Number(condAges[0]) && Number(this.form1.age) <= Number(condAges[1]) ? true : false;
                        break;
                    default:
                        break;
                }
                ;
                if (isMatch) {
                    this.form2.subSubject = item;
                    this.initClasses(0, 10);
                    this.initCommodities(0, 10);
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: "您不满足该科目小类的年龄要求，请重新选择!",
                    });
                }
            },

            initSubSelectInfo() {
                this.form2.class = "";
                this.form2.subSubject = "";
                this.classes = "";
            },

            handleSizeChange(val) {
                this.pageSize = val;
                this.currentPage = 1;
                this.initClasses(this.currentPage, this.pageSize);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.initClasses(this.currentPage, this.pageSize);
            },

            async initClasses(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData()
                params.append("subId", this.form2.subSubject.id);
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_class_list, params, "POST");
                if (data.code == 200) {
                    this.classes = data.data;
                    this.totalCount = data.totalCount;
                }
            },

            handleCoSizeChange(val) {
                this.coPageSize = val;
                this.currentCoPage = 1;
                this.initClasses(this.currentCoPage, this.coPageSize);
            },
            handleCoCurrentChange(val) {
                this.currentCoPage = val;
                this.initClasses(this.currentCoPage, this.coPageSize);
            },

            async initCommodities(currentPage, pageSize) {
                this.currentCoPage = currentPage;
                this.coPageSize = pageSize;
                let params = new FormData()
                params.append("subId", this.form2.subSubject.id);
                params.append("page", this.currentCoPage);
                params.append("limit", this.coPageSize);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_commodity_list, params, "POST");
                if (data.code == 200) {
                    console.log(data.data)
                    this.commodities = data.data;
                    this.totalCoCount = data.totalCount;
                }
            },

            pay(way) {
                this.payWaySelect = way;
                var payWay = "";
                if (way == 'wx') {
                    payWay = "微信";
                } else if (way == 'zfb') {
                    payWay = "支付宝";
                }
                var that = this;
                this.timer = setInterval(function () {
                    if (that.timeCount > 0) {
                        let closeBtn = document.body.getElementsByClassName("v-modal")[0]
                        closeBtn.click();
                        that.$confirm(payWay + "支付成功，" + that.timeCount + "秒后将跳转到首页，", '', {
                            dangerouslyUseHTMLString: true, //
                            showConfirmButton: false, //
                            showCancelButton: false, //
                            roundButton: true, // 必填
                            type: 'success', // 必填
                            customClass: 'picc-message-box', // 必填
                            center: false,
                            showClose: false
                        }).then(() => {
                            // 此处可再调一次查询方法
                        }).catch(() => {
                        });
                        that.timeCount--;
                    } else {
                        let closeBtn = document.body.getElementsByClassName("v-modal")[0]
                        closeBtn.click();
                        window.clearInterval(that.timer);
                        that.dialogVisible = false;
                    }
                }, 1000)
            },

            selectClass(classItem) {
                if (classItem.used == classItem.capacity) {
                    this.$notify.error({
                        title: '提示',
                        message: '该班级已经排满，请选择其他班级'
                    });
                    return false;
                }
                console.log(classItem)
                if (this.form2.class.id == classItem.id) {
                    this.form2.class = "";
                    const newClasses = this.classes.map((item) => {
                        if (item.id == classItem.id) {
                            item.used--;
                        }
                        return item;
                    });
                    this.classes = newClasses;
                } else {
                    const newClasses = this.classes.map((item) => {
                        if (item.id == classItem.id) {
                            item.used++;
                        }
                        if (item.id == this.form2.class.id) {
                            item.used--;
                        }
                        return item;
                    });
                    this.classes = newClasses;
                    this.form2.class = classItem;
                }
            },

            selectCommodity(commodity, el) {
                if(el.target.className != "el-input-number__increase"
                    && el.target.className != "el-icon-plus" && el.target.className != "el-input-number__decrease"
                    && el.target.tagName != "INPUT") {
                    if(this.form2.commodities == [] || this.form2.commodities.length == 0) {
                        this.form2.commodities.push(commodity);
                        return;
                    }
                    var temp = [];
                    var isContain = false;
                    for(var i in this.form2.commodities) {
                        const id = this.form2.commodities[i].id;
                        if(id != commodity.id) {
                            temp.push(this.form2.commodities[i]);
                        } else {
                            isContain = true;
                        }
                    }
                    if(!isContain) {
                        temp.push(commodity);
                    }
                    this.form2.commodities = temp;
                }
            },

            isSelectCommodity(id) {
                for (var i in this.form2.commodities) {
                    if (this.form2.commodities[i].id == id) {
                        return true;
                    }
                }
                return false;
            },


            toPrevious() {
                this.stage--;
            },

            toNext() {
                this.initMainSubject();
                // 校验表单
                // this.$refs['form1'].validate((valid) => {
                //     if (valid) {
                //         this.submitBaseInfo();
                //     } else {
                //         return false;
                //     }
                // });
            },

            async submitBaseInfo() {
                if (this.form1.area.length == 1) {
                    this.form1.province = this.form1.area[0];
                }
                if (this.form1.area.length == 2) {
                    this.form1.province = this.form1.area[0];
                    this.form1.city = this.form1.area[1];
                }
                if (this.form1.area.length == 3) {
                    this.form1.province = this.form1.area[0];
                    this.form1.city = this.form1.area[1];
                    this.form1.county = this.form1.area[2];
                }
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_user_update, this.form1, "POST");
                if (data.code == 200) {
                    this.$utils.removeStorage("bluserForm");
                    this.initMainSubject();
                }
            },

            saveToStorageTemp() {
                if (this.form1.area.length == 1) {
                    this.form1.province = this.form1.area[0];
                }
                if (this.form1.area.length == 2) {
                    this.form1.province = this.form1.area[0];
                    this.form1.city = this.form1.area[1];
                }
                if (this.form1.area.length == 3) {
                    this.form1.province = this.form1.area[0];
                    this.form1.city = this.form1.area[1];
                    this.form1.county = this.form1.area[2];
                }
                this.$utils.setStorage("bluserForm", this.form1);
            },

            async initMainSubject() {
                if(this.mainSubjects == [] || this.mainSubjects.length == 0) {
	                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_main_subject_sub, {}, "GET");
	                if (data.code == 200) {
                        this.mainSubjects = data.data;
	                }
                }
                this.stage++;
            },

            /**
             * 照片上传、删除
             */
            beforeRemove() {
                this.$confirm('确认要删除该照片吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: false
                })
                    .then(() => {
                        this.$refs.photoUploadRef.clearFiles();
                        this.handleRemove();
                    })
                    .catch(() => {
                    });
                return false;
            },
            handleRemove() {
                this.hideUpload = false;
                this.deletePhotoRequest(this.fileName);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.photoDialogVisible = true;
            },
            onSuccess(response) {
                if (this.fileName != null && this.fileName != "") {
                    this.form1.photo = "";
                    this.deletePhotoRequest(this.fileName);
                }
                if (response.data != null) {
                    this.form1.photo = response.data.fileUrl;
                    this.fileName = response.data.fileName;
                }
            },
            onError() {
                this.hideUpload = false;
            },
            beforeUpload(file) {
                // 上传格式做限制
                var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
                const extension = testmsg === 'png'
                const extension2 = testmsg === 'jpg'
                const extension3 = testmsg === 'jpeg'
                if (!extension && !extension2 && !extension3) {
                    this.$promptMsg("图片仅支持png、jpg、jpeg格式，请选择正确的格式！", "error");
                    return false;
                }
                this.hideUpload = true;
            },
            async deletePhotoRequest(fileName) {
                let params = new FormData();
                params.append("fileName", fileName);
                await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_user_photo_delete, params, "POST");
            },
        },
        data() {
            return {
                timeCount: 3,
                timer: "",
                dialogVisible: false,
                areaOptions: [],
                title: "首次登录请完善以下信息",
                stage: 1,
                form1: {
                    id: "",
                    name: "",
                    sex: "",
                    idcard: "",
                    birth: "",
                    address: "",
                    phone: "",
                    photo: "",
                    age: "20",
                    area: [],
                    province: '',
                    city: '',
                    county: '',
                    township: '',
                },
                uploadAction: this.$aiocUrl.blsh_service_v1_bl_user_photo_upload,
                hideUpload: false,
                dialogImageUrl: "",
                photoDialogVisible: false,
                fileList: [],
                fileName: "",
                commodities: [],
                mainSubjects: [],
                subjectForms: [],
                form2: {
                    mainSubject: "",
                    subSubject: "",
                    class: "",
	                subjectList: [],
                    commodities:[],
                },
                classes: [],
                currentPage: 0,
                pageSize: 10,
                pageSizes: [10, 20, 50, 100],
                totalCount: 0,
                currentCoPage: 0,
                coPageSize: 10,
                coPageSizes: [10, 20, 50, 100],
                totalCoCount: 0,
                removeSubjectId: "",


                subjectListTemp: [],
                age: 12,
                mainSubject: "",
                subSubject: "",
                selectedSubject: "",
                // classes: {
                //     ty0: [
                //         {id: "1", address: "美都广场c座511", schooltime: "每周一下午2点", used: 12, capacity: 20,},
                //         {id: "2", address: "美都广场c座511", schooltime: "每周二下午2点", used: 20, capacity: 20,},
                //         {id: "3", address: "丁兰广场c座511", schooltime: "每周一下午2点", used: 18, capacity: 20,},
                //     ],
                //     ty5: [
                //         {id: "1", address: "美都广场c座511", schooltime: "每周一下午2点", used: 12, capacity: 20,},
                //         {id: "2", address: "美都广场c座511", schooltime: "每周二下午2点", used: 20, capacity: 20,},
                //         {id: "3", address: "丁兰广场c座511", schooltime: "每周一下午2点", used: 18, capacity: 20,},
                //     ],
                //     ty6: [
                //         {id: "1", address: "美都广场c座511", schooltime: "每周一下午2点", used: 12, capacity: 20,},
                //         {id: "2", address: "美都广场c座511", schooltime: "每周二下午2点", used: 20, capacity: 20,},
                //         {id: "3", address: "丁兰广场c座511", schooltime: "每周一下午2点", used: 18, capacity: 20,},
                //     ],
                //     ys1: [
                //         {id: "1", address: "美都广场c座511", schooltime: "每周一下午2点", used: 12, capacity: 20,},
                //         {id: "2", address: "美都广场c座511", schooltime: "每周二下午2点", used: 20, capacity: 20,},
                //         {id: "3", address: "丁兰广场c座511", schooltime: "每周一下午2点", used: 18, capacity: 20,},
                //     ],
                //     sy0: [
                //         {id: "1", address: "美都广场c座511", schooltime: "每周一下午2点", used: 12, capacity: 20,},
                //         {id: "2", address: "美都广场c座511", schooltime: "每周二下午2点", used: 20, capacity: 20,},
                //         {id: "3", address: "丁兰广场c座511", schooltime: "每周一下午2点", used: 18, capacity: 20,},
                //     ],
                //     sj0: [
                //         {id: "1", address: "美都广场c座511", schooltime: "每周一下午2点", used: 12, capacity: 20,},
                //         {id: "2", address: "美都广场c座511", schooltime: "每周二下午2点", used: 20, capacity: 20,},
                //         {id: "3", address: "丁兰广场c座511", schooltime: "每周一下午2点", used: 18, capacity: 20,},
                //     ],
                //     ds0: [
                //         {id: "1", address: "美都广场c座511", schooltime: "每周一下午2点", used: 12, capacity: 20,},
                //         {id: "2", address: "美都广场c座511", schooltime: "每周二下午2点", used: 20, capacity: 20,},
                //         {id: "3", address: "丁兰广场c座511", schooltime: "每周一下午2点", used: 18, capacity: 20,},
                //     ],
                // },
                selectedClass: "",
                payWaySelect: "",


                commodityIds: ["1"],
                rules: {
                    photo: [
                        {type: 'string', required: true, message: '请上传照片', trigger: ['change', 'blur']},
                    ],
                    name: [
                        {type: 'string', required: true, message: '请输入姓名', trigger: ['change', 'blur']},
                    ],
                    sex: [
                        {type: 'string', required: true, message: '请选择性别', trigger: ['change', 'blur']},
                    ],
                    phone: [
                        {type: 'string', required: true, message: '请输入手机号码', trigger: ['change', 'blur']}
                    ],
                    birth: [
                        {type: 'string', required: true, message: '请选择出生年月', trigger: ['change', 'blur']}
                    ],
                    idcard: [
                        {type: 'string', required: true, message: '请输入身份证件', trigger: ['change', 'blur']}
                    ],
                    area: [
                        {type: 'array', required: true, message: '请选择所在区域', trigger: ['change', 'blur']}
                    ],
                },
            }
        }
    }
</script>

<style scoped>
	.grxx {
		text-align: left;
	}

	.upload-item {
		position: absolute;
		top: 160px;
		right: 80px;
	}

	.nn {
		width: 130px;
		margin-left: 0px;
	}

	.kmxz {
		text-align: left;
		padding-top: 10px;
	}

	.kmdl {
		position: relative;
	}

	.zcxm {
		line-height: 28px;
		height: 28px;
		margin-bottom: 10px;
	}

	.kmdlts {
		position: absolute;
		top: -50px;
		left: 70px;
		color: #fa5c26;
	}

	.km-radio {
		width: 160px;
		margin-bottom: 15px;
	}

	.km-tag {
		height: 40px;
		line-height: 40px;
		width: 160px;
		margin-top: 10px;
	}

	.sdd {
		border: 1px solid #eeeeee;
		border-radius: 3px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		padding: 10px 10px;
		width: 796px;
		margin-bottom: 10px;
		position: relative;
	}

	.sdd > p {
		line-height: 30px;
		height: 30px;
	}

	.zwd {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.zw {
		display: inline-block;
		margin: 2px;
	}

	.sj {
		width: 0;
		height: 0;
		border-bottom: 50px solid transparent;
		border-left: 50px solid transparent;
		position: absolute;
		top: 0px;
		right: 0px;
	}

	.bl {
		border-right: 50px solid #67C23A;
	}

	.bh {
		border-right: 50px solid #909399;
	}

	.sjf {
		width: 0;
		height: 0;
		border-right: 20px solid #F2F6FC;
		border-bottom: 20px solid transparent;
		border-left: 20px solid transparent;
		position: absolute;
		top: 0px;
		right: 0px;
	}

	.sjh {
		width: 0;
		height: 0;
		border-right: 20px solid #C0C4CC;
		border-bottom: 20px solid transparent;
		border-left: 20px solid transparent;
		position: absolute;
		top: 0px;
		right: 0px;
	}

	.yxq {
		position: absolute;
		font-size: 12px;
		color: #ffffff;
	}

	.yy {
		top: -13px;
		right: -30px;
	}

	.xx {
		top: 0px;
		right: -40px;
	}

	.qq {
		top: 13px;
		right: -50px;
	}

	.sdbh {
		background: #C0C4CC;
	}

	.sdbl {
		background: #F2F6FC;
	}

	.zfd {
		text-align: left;
		margin-top: 20px;
		padding-bottom: 10px;
		font-weight: 600;
		font-size: 16px;
	}

	.ddxq {
		display: flex;
		flex-direction: column;
		line-height: 40px;
		text-align: left;
		padding-left: 20px;
		color: #606266;
	}

	.jg {
		color: #ff2a24;
		font-size: 16px;
		font-weight: 600;
	}

	.xux {
		margin-top: 10px;
		margin-bottom: 20px;
		border-bottom: 1px dashed #aaaaaa;
	}

	.zfb {
		position: relative;
		border: 1px solid #ffffff;
	}

	.wx {
		font-size: 18px;
		display: flex;
		padding-right: 6px;
		position: relative;
		border: 1px solid #ffffff;
	}

	.wx > span {
		display: inline-block;
		line-height: 30px;
		margin-left: 5px;
	}

	.selected {
		border: 1px solid #F56C6C;
	}

	.sjx {
		width: 0;
		height: 0;
		border-right: 20px solid #fc5d39;
		border-top: 10px solid transparent;
		border-left: 10px solid transparent;
		position: absolute;
		bottom: 0px;
		right: 0px;
	}

	.dh {
		position: absolute;
		top: -9px;
		left: 9px;
		font-size: 10px;
		color: #ffffff;
	}

	.zft {
		margin-top: 10px;
		color: #fc5d39;
		font-size: 16px;
		font-weight: 600;
		width: 200px;
		text-align: center;
	}
	.co-num {
		width: 90px !important;
	}
	/*媒体查询（电脑）*/
	@media screen and (min-width: 1529px) {
	}

	/*媒体查询（平板）*/
	@media screen and (min-width: 769px) and (max-width: 996px) {

	}

	/*媒体查询（手机）*/
	@media screen and (max-width: 768px) {

	}
</style>

<style>
	.talentPhotoHide .el-upload--picture-card {
		display: none;
	}

	.km-radio .el-radio.is-bordered + .el-radio.is-bordered {
		margin-left: 0px;
		margin-bottom: 10px;
	}

	photo-up .el-upload-list--picture-card .el-upload-list__item-thumbnail {
		width: 207px !important;
		height: 313px !important;
	}

	.photo-up .el-upload-list--picture-card .el-upload-list__item {
		width: 207px !important;
		height: 313px !important;
	}

	.photo-up .el-upload-list__item {
		transition: none !important;
	}

	.zpcc .el-upload {
		width: 207px;
		height: 313px;
		line-height: 313px;
	}

	.upload-item .el-form-item__label {
		text-align: left;
	}

	.el-message-box .el-message-box__btns .el-button {
		width: auto;
	}

	.grxx .el-form-item__label {
		font-weight: 600;
	}

	.el-form-item {
		margin-bottom: 0px;
	}

	/*媒体查询（电脑）*/
	@media screen and (min-width: 1529px) {

	}
</style>