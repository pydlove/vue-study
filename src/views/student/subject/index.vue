<template>
    <div>
        <div class="aioc-pc">
            <Header ref="headerRef" :activePage="activePage" :fontColor="fontColor = 'color-white'" :bgColor="'bg-black'"></Header>
        </div>
        <div class="aioc-container1" :style="'width:' + clientWidth + 'px; height:' + clientHeight + 'px;'">
            <el-card class="bmcard" id="bmCard">
                    <el-form class="bmform" ref="form" :model="form" label-width="80px" :inline="inline" :label-position="labelPosition" >
                        <el-steps :active="stage" finish-status="success" simple>
                            <el-step title="个人信息填写" ></el-step>
                            <el-step title="科目选择" ></el-step>
                            <el-step title="缴费" ></el-step>
                        </el-steps>

                        <div v-if="stage == 1" class="grxx">
                            <el-form-item class="upload-item" label="两寸蓝底证件照" label-width="80px" prop="photo">
                                <div v-if="showUpPhoto">
                                    <el-dialog :visible.sync="photoDialogVisible">
                                        <img width="100%" :src="dialogImageUrl" alt="">
                                    </el-dialog>
                                    <el-upload
                                            ref="photoUploadRef"
                                            :action="uploadAction"
                                            list-type="picture-card"
                                            :fileList="fileList"
                                            :on-success="onSuccess"
                                            :before-upload="beforeUpload"
                                            :on-preview="handlePictureCardPreview"
                                            :before-remove="beforeRemove"
                                            :on-remove="handleRemove"
                                            :limit="1"
                                            :class="{talentPhotoHide:hideUpload} + ' zpcc'"
                                    >
                                        <i class="el-icon-camera-solid talent-photo"></i>
                                    </el-upload>
                                </div>
                                <img v-else src="@/assets/img/zjz.jpg" class="zp" alt="" @click="showUpPhoto = true">
                            </el-form-item>

                            <el-form-item class="mt-30"  label-width="100px" label="姓名" prop="name">
                                <el-input class="wdi-300" v-model="form.name" placeholder="请填写姓名"></el-input>
                            </el-form-item>

                            <el-form-item class="mt-40" label-width="100px" label="性别" prop="subName">
                                <el-radio-group class="wdi-300" v-model="form.sex" >
                                    <el-radio class="ml-15 nn" :label="0" border>男</el-radio>
                                    <el-radio class="nn" :label="1" border>女</el-radio>
                                </el-radio-group>
                            </el-form-item>

                            <el-form-item class="mt-40" label-width="100px" label="出生年月" prop="idCard">
                                <el-date-picker class="wdi-300" type="date" placeholder="选择出生日期" v-model="form.birth" @blur="calculationAge()"></el-date-picker>
                            </el-form-item>

                            <el-form-item class="mt-40" label-width="100px" label="联系方式" prop="idCard">
                                <el-input class="wdi-300" v-model="form.phone" placeholder="请填写联系方式"></el-input>
                            </el-form-item>

                            <el-form-item class="mt-40" label-width="100px" label="身份证号码" prop="idCard">
                                <el-input class="wdi-300" v-model="form.idCard" placeholder="请填写身份证号码"></el-input>
                            </el-form-item>

                            <el-form-item class="mt-40" label-width="100px" label="家庭住址" prop="idCard">
                                <el-input class="" v-model="form.address" placeholder="请填写家庭住址"></el-input>
                            </el-form-item>
                        </div>

                        <div v-if="stage == 2" class="kmxz">
                            <el-card v-show="form.subjectList != [] && form.subjectList.length > 0" class="mb-10">
                                <div slot="header" class="clearfix">
                                    您已经注册的科目: <span class="color-fa5c26">（最多可以注册两个科目）</span>
                                </div>
                                <div v-for="(item, index) in form.subjectList" :key="index" class="zcxm"
                                     @mouseenter="removeSubjectId = item.mainSubject.id" @mouseleave="removeSubjectId = ''" @click="removeSubject(item)">
                                    {{index + 1}}. 您已经注册
                                    <span class="color-409EFF fb">{{item.mainSubject.name}}</span>
                                    -
                                    <span class="color-409EFF fb">{{item.subSubject.name}}</span>
                                    ，
                                    <span>
                            上课地点：<span class="color-409EFF fb">{{item.selectedClass.address}}</span>
                            ，
                            上课时间：<span class="color-409EFF fb">{{item.selectedClass.schooltime}}</span>
                            。
                        </span>
                                    <el-button v-show="removeSubjectId == item.mainSubject.id" type="info" size="mini" icon="el-icon-delete">移除</el-button>
                                </div>
                            </el-card>

                            <el-card class="mb-10" v-show="form.subjectList.length < 2">
                                <div slot="header" class="clearfix">
                                    请您选择了科目大类:
                                </div>
                                <el-form-item class="kmdl" label-width="100px" label="">
                                    <el-radio-group v-model="mainSubject">
                                        <el-radio  class="km-radio"  v-for="(item, index) in subjects" :key="index" :label="item"
                                                   @click.native.prevent="selectMainSubject($event, item)">
                                            {{item.name}}
                                        </el-radio >
                                    </el-radio-group>
                                </el-form-item>
                            </el-card>

                            <el-card class="mb-10" v-show="mainSubject != ''">
                                <div slot="header" class="clearfix">
                                    您选择了科目大类<span class="color-409EFF fb">{{mainSubject.name}}</span>，
                                    请继续选择<span class="color-409EFF fb">{{mainSubject.name}}</span>科目小类：
                                </div>
                                <div>
                                    <el-form-item label-width="100px" label="" prop="name">
                                        <el-radio-group v-model="subSubject">
                                            <el-radio class="mt-10 km-radio"
                                                      v-for="(subitem, subindex) in subSubjects[mainSubject.id]" :key="subindex" :label="subitem"
                                                      @click.native.prevent="selectSubSubject($event, subitem)">
                                                {{subitem.name}}
                                            </el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </div>
                            </el-card>

                            <el-card v-show="subSubject != ''">
                                <div slot="header" class="clearfix">
                                    您选择了科目小类<span class="color-409EFF fb">{{subSubject.name}}</span>，
                                    请继续选择<span class="color-fa5c26 fb">上课的时间和地点</span>：
                                </div>
                                <el-form-item label-width="120px" label="" prop="name">
                                    <div class="dffw">
                                        <div v-if="classes[subSubject.id] == undefined || classes[subSubject.id] == ''">
                                    <span class="color-fa5c26">
                                        <span class="fb">{{subSubject.name}}</span>
                                        未设置班级，有疑问请联系客服，客服电话：400-950616
                                    </span>
                                        </div>
                                        <div v-else :class="(classItem.used == classItem.capacity?'sdbh':'') + (selectedClassId == classItem.id?'sdbl':'') + ' sdd'"
                                             v-for="classItem in classes[subSubject.id]" :key="classItem.id"
                                             @click="selectClass(classItem)">
                                            <p>
                                                <span class="fb">地点：</span>
                                                {{classItem.address}}
                                            </p>
                                            <p>
                                                <span class="fb">时间：</span>
                                                {{classItem.schooltime}}
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
                                                <span :class="(i <= classItem.used ? 'kezhuo-icon':'kezhuoh-icon') + ' zw'" v-for="i of classItem.capacity" :key="i"></span>
                                            </div>
                                            <div v-show="classItem.used == classItem.capacity">
                                                <div class="sj bh">
                                                    <div class="yxq yy">已</div>
                                                    <div class="yxq xx">排</div>
                                                    <div class="yxq qq">满</div>
                                                </div>
                                                <div class="sjh"></div>
                                            </div>

                                            <div v-show="selectedClassId == classItem.id">
                                                <div class="sj bl">
                                                    <div class="yxq yy">已</div>
                                                    <div class="yxq xx">选</div>
                                                    <div class="yxq qq">取</div>
                                                </div>
                                                <div class="sjf"></div>
                                            </div>
                                        </div>
                                    </div>
                                </el-form-item>

                                <el-form-item v-if="selectedClassId != []" label-width="120px" label="是否需要学习用品" prop="name">
                                    <el-row class="dffw">
                                        <el-card class="mr-40" v-for="(item, index) in commodities" :key="index"
                                                 @click.native="selectCommodity(item)"
                                                 :body-style="{ padding: '0px' }" style="width: 350px;height: 100px;position: relative;">
                                            <div class="dffn">
                                                <img :src="item.img" class="image" style="width: 100px;height: 100px;">
                                                <div style="padding: 5px;" class="colori-303133">
                                                    <div>
                                                        <span>描述：</span>
                                                        <span>{{item.desc}}</span>
                                                    </div>
                                                    <div class="bottom clearfix">
                                                        <span>单价：</span>
                                                        ¥<span class="mli-10 color-fa5c26 fs-20 fb">{{ item.cost }}</span>
                                                        <el-input-number class="ml-15 mt-5" size="mini" v-model="item.num" @change="handleChange" :step="1" label="描述文字"></el-input-number>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="isSelectCommodity(item.id)">
                                                <div class="sj bl">
                                                    <div class="yxq yy">已</div>
                                                    <div class="yxq xx">选</div>
                                                    <div class="yxq qq">取</div>
                                                </div>
                                                <div class="sjf"></div>
                                            </div>
                                        </el-card>
                                    </el-row>
                                </el-form-item>
                            </el-card>
                        </div>

                        <div v-if="stage == 3">
                            <div>
                                <div class="zfd">
                                    您报名的学习科目的订单详细信息
                                </div>
                                <div>
                                    <el-card v-for="(item, index) in form.subjectList" :key="index" class="mb-10">
                                        <div class="ddxq">
                                            <span>订单编号：20200506898989</span>
                                            <span>报名费用：<span class="jg"> 50元</span></span>
                                            <span>大类科目： {{item.mainSubject.name}}</span>
                                            <span>小类科目： {{item.subSubject.name}}</span>
                                            <span>上课地址： {{item.selectedClass.address}}</span>
                                            <span>上课时间： {{item.selectedClass.schooltime}}</span>
                                            <span>费用用途： 用于支付报名参加{{item.mainSubject.name}}-{{item.subSubject.name}}学习所产生的报名费用</span>
                                        </div>
                                    </el-card>

                                    <el-card v-show="isSelectCommodity(item.id)" v-for="(item, index) in commodities" :key="index" class="mb-10">
                                        <div class="ddxq">
                                            <span>订单编号：20200506898989</span>
                                            <span>商品费用：<span class="jg"> {{item.cost}}元</span></span>
                                            <span>费用用途： 用于支付购买商品{{item.name}}所产生的报名费用</span>
                                        </div>
                                    </el-card>
                                </div>
                                <el-card class="tr mt-10 mb-10">
                                    订单费用合计：<span class="fs-20 color-fa5c26 fb">¥ {{50*form.subjectList.length}}</span> 元
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
                                        <div :class="(payWaySelect == 'zfb' ? 'selected':'') + ' ml-35 zfb'" @click="pay('zfb')">
                                            <i class="zfbzf"></i>
                                            <div v-show="payWaySelect == 'zfb'" class="sjx">
                                                <i class="el-icon-check dh"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-show="payWaySelect == 'wx'" class="dffc tl mt-20">
                                        <el-image :src="require('@/assets/img/ewm/wxewm.png')" :fit="fit" class="wd-200 hp-200"></el-image>
                                        <span class="zft">微信扫码支付</span>
                                    </div>
                                    <div v-show="payWaySelect == 'zfb'" class="dffc tl mt-20">
                                        <el-image :src="require('@/assets/img/ewm/zfbewm.png')" :fit="fit" class="wd-200 hp-200"></el-image>
                                        <span class="zft">支付宝扫码支付</span>
                                    </div>
                                </el-card>
                            </div>
                        </div>
                    </el-form>
                    <div class="tc mt-40 mb-20">
                        <el-button v-show="stage == 1" class="wdi-120" type="primary" @click="toNext">下一步</el-button>
                        <el-button v-show="stage == 2 || stage == 3" class="wdi-120" type="primary" @click="toPrevious">上一步</el-button>
                        <el-button v-show="stage == 2" class="wdi-120" type="primary" @click="submit">报 名</el-button>
                    </div>
                </el-card>
        </div>
    </div>
</template>

<script>
    import Header from  "@/components/Header"
    export default {
        name: "index",
        components:{Header},
        mounted() {

        },
        methods: {
            close() {
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
            },

            calculationAge() {
                var r = this.form.birth.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
                if( r == null ) {
                    return   false;
                }
                var d = new Date(r[1], r[3]-1, r[4]);
                if(d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4])
                {
                    var age = new Date().getFullYear();
                    this.age = age-r[1];
                }
            },

            selectCommodity(item) {
                // var temp = [];
                // if(this.commodityIds.length == 0) {
                //     this.commodityIds.push(item.id);
                //     console.log(this.commodityIds)
                //     return;
                // }
                // this.commodityIds.push(item.id);
                // for (var i in this.commodityIds)  {
                //     if(this.commodityIds[i] != item.id) {
                //         temp.push(this.commodityIds[i])
                //     }
                // }
                // this.commodityIds = temp;
                console.log(item)
            },

            isSelectCommodity(id) {
                console.log(id)
                for (var i in this.commodityIds)  {
                    if(this.commodityIds[i] == id) {
                        return true;
                    }
                }
                return false;
            },

            removeSubject(item) {
                var temp = [];
                for (var i in this.form.subjectList) {
                    const subjectListElement = this.form.subjectList[i];
                    if(subjectListElement.mainSubject.id != item.mainSubject.id) {
                        temp.push(subjectListElement);
                    } else {
                        this.subjects.push({name: subjectListElement.mainSubject.name, id: subjectListElement.mainSubject.id})
                    }
                }
                this.form.subjectList = temp;
            },

            submit() {
                if((this.subjectListTemp == [] || this.subjectListTemp.length == 0) && (this.form.subjectList.length == 0 || this.form.subjectList.length == [])) {
                    this.$notify.error({
                        title: '提示',
                        message: '请您先完成科目选择，再执行报名操作'
                    });
                    return;
                } else if ( (this.subjectListTemp == [] || this.subjectListTemp.length == 0) && this.form.subjectList.length == 2 ) {
                    this.stage++;
                    return;
                } else if (this.subjectListTemp != undefined && this.subjectListTemp != [] && this.subjectListTemp.length > 0) {
                    this.form.subjectList.push(this.subjectListTemp[0]);
                }
                if(this.form.subjectList.length == 2) {
                    // 将已选大类科目移除
                    var tempSubjects = []
                    for(var i in this.subjects) {
                        const subject = this.subjects[i];
                        if(subject.id != this.mainSubject.id) {
                            tempSubjects.push(subject);
                        }
                    }
                    this.subjects = tempSubjects;
                    this.mainSubject = "";
                    this.subSubject = "";
                    this.selectedClassId = "";
                    this.selectedClass = "";
                    this.subjectListTemp = [];
                    this.stage++;
                    return;
                }
                this.$confirm('您可至多再注册一门科目，是否继续注册？','提示', {
                    confirmButtonText: '再注册一门科目',
                    cancelButtonText: '放弃继续注册，去缴费',
                    type: 'info',
                    center: false
                })
                    .then(() => {
                        // 将已选大类科目移除
                        var tempSubjects = []
                        for(var i in this.subjects) {
                            const subject = this.subjects[i];
                            if(subject.id != this.mainSubject.id) {
                                tempSubjects.push(subject);
                            }
                        }
                        this.subjects = tempSubjects;
                        this.mainSubject = "";
                        this.subSubject = "";
                        this.selectedClassId = "";
                        this.selectedClass = "";
                        this.subjectListTemp = [];
                    })
                    .catch(() => {
                        this.stage++;
                    });
                return;
            },

            selectMainSubject(el, item) {
                if (el.target.tagName === 'INPUT') return;
                this.mainSubject = item;
                this.subSubject = "";
                this.selectedClassId = "";
                this.selectedClass = "";
                this.subjectListTemp = [];
            },

            selectSubSubject(el, item) {
                if (el.target.tagName === 'INPUT') return;
                var isCoincidenceStart = false;
                var isCoincidenceEnd = false;
                if(item.startAge == -1) {
                    isCoincidenceStart = true;
                } else {
                    isCoincidenceStart = this.age >= item.startAge;
                }
                if(item.endAge == -1) {
                    isCoincidenceEnd = true;
                } else {
                    isCoincidenceEnd = this.age <= item.endAge;
                }
                if(isCoincidenceStart && isCoincidenceEnd) {
                    this.subSubject = item;
                    this.selectedClassId = "";
                    this.selectedClass = "";
                    this.subjectListTemp = [];
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: "您不满足该科目小类的年龄要求，请重新选择!",
                    });
                    // this.subSubject = "";
                }
            },

            pay(way) {
                this.payWaySelect = way;
                // if(way == 'wx') {
                //
                // } else if (way == 'zfb') {
                //
                // }
            },

            selectClass(classItem) {
                if(classItem.used == classItem.capacity) {
                    this.$notify.error({
                        title: '提示',
                        message: '该班级已经排满，请选择其他班级'
                    });
                    return false;
                }
                if(this.selectedClassId == classItem.id) {
                    this.selectedClassId = "";
                    this.selectedClass = "";
                    this.subjectListTemp = [];
                    return false;
                }
                this.selectedClass = classItem;
                var temp = [];
                var classTime = this.classes[this.subSubject.id];
                for(var i in classTime) {
                    const classTimeElement = classTime[i];
                    if(classTimeElement.id == this.selectedClassId) {
                        classTimeElement.used--;
                    }
                    if(classTimeElement.id == classItem.id) {
                        classTimeElement.used++;
                    }
                    temp.push(classTimeElement);
                }
                this.classes[this.subSubject.id] = temp;
                this.selectedClassId = classItem.id;
                var tempSubject = {
                    mainSubject: this.mainSubject,
                    subSubject: this.subSubject,
                    selectedClass: this.selectedClass,
                };
                this.subjectListTemp.push(tempSubject);
            },

            toPrevious() {
                this.stage--;
                if(this.stage == 1) {
                    this.labelPosition = "right";
                } else if (this.stage == 2) {
                    this.labelPosition = "top";
                }
            },

            toNext() {
                this.stage++;
                if(this.stage == 1) {
                    this.labelPosition = "right";
                } else if (this.stage == 2) {
                    this.labelPosition = "top";
                }
            },

            /**
             * 照片上传、删除
             */
            beforeRemove(file, fileList) {
                this.$confirm('确认要删除该照片吗？','提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: false
                })
                    .then(() => {
                        this.$refs.photoUploadRef.clearFiles();
                        this.handleRemove(file, fileList);
                    })
                    .catch(() => {
                    });
                return false;
            },
            handleRemove(file, fileList) {
                this.hideUpload = false;
                console.log(file,fileList)
                // this.deletePhotoRequest(this.fileName);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.photoDialogVisible = true;
            },
            onSuccess(response, file, fileList) {
                this.showUpPhoto = false;
                // if(response.data != null) {
                //     this.form.photo = response.data.fileUrl;
                //     this.fileName = response.data.fileName;
                // }
                // this.hideUpload = true;
                console.log(response, file,fileList)
            },
            beforeUpload(file) {
                this.showUpPhoto = false;
                // 上传格式做限制
                var testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
                const extension = testmsg === 'png'
                const extension2 = testmsg === 'jpg'
                const extension3 = testmsg === 'jpeg'
                if(!extension && !extension2 && !extension3) {
                    this.$promptMsg("图片仅支持png、jpg、jpeg格式，请选择正确的格式！", "error");
                    return false;
                }
            },
        },
        data() {
            return {
                activePage: '学科报名',
                clientWidth: document.body.clientWidth,
                clientHeight: document.body.clientHeight -100,
                successPayDialogVisible: false,
                labelPosition: "right",
                inline: false,
                title: "首次登录请完善以下信息",
                stage: 1,
                form: {
                    id: "1",
                    name: "欧阳修",
                    sex: 0,
                    idCard: "342901200806132846",
                    birth: "2008-06-13",
                    address: "安徽省合肥市瑶海区磨店",
                    phone: "13648964520",
                    photo: "",
                    subjectList:[],
                },
                subjectListTemp: [],
                age: 12,
                mainSubject: "",
                subSubject: "",
                selectedSubject: "",
                subjects: [
                    {name: "绘画", id:"0", },
                    {name: "书法", id:"1",},
                    {name: "摄影", id:"2", },
                    {name: "设计", id:"3", },
                    {name: "雕塑", id:"4", },
                ],
                subSubjects: {
                    0: [
                        {name:"涂鸦4-6岁", id: "ty0", mainId: "0", startAge: 4, endAge: 6},
                        {name:"启蒙6-8岁", id: "ty1", mainId: "0", startAge: 6, endAge: 8},
                        {name:"基础7-9岁", id: "ty2", mainId: "0", startAge: 7, endAge: 9},
                        {name:"中级9-11岁", id: "ty3", mainId: "0", startAge: 9, endAge: 11},
                        {name:"国际10-15岁", id: "ty4", mainId: "0", startAge: 10, endAge: 15},
                        {name:"素描12岁以上", id: "ty5", mainId: "0", startAge: 12, endAge: -1},
                        {name:"中国画12岁以上", id: "ty6", mainId: "0", startAge: 12, endAge: -1},
                        {name:"油画12岁以上", id: "ty7", mainId: "0", startAge: 12, endAge: -1},
                    ],
                    1: [
                        {name:"硬笔书法6岁以上", id: "ys0", mainId: "1", startAge: 6, endAge: -1},
                        {name:"软笔书法12岁以上", id: "ys1", mainId: "1", startAge: 12, endAge: -1},
                    ],
                    2: [
                        {name:"摄影入门12岁以上", id: "sy0", mainId: "2", startAge: 12, endAge: -1},
                        {name:"摄影进阶12岁以上", id: "sy1", mainId: "2", startAge: 12, endAge: -1},
                        {name:"摄影后期12岁以上备注需自带电脑", id: "sy2", mainId: "2", startAge: 12, endAge: -1},
                    ],
                    3: [
                        {name: "设计基础12岁以上", id: "sj0", mainId: "3", startAge: 12, endAge: -1},
                        {name: "设计中级12岁以上", id: "sj1", mainId: "3", startAge: 12, endAge: -1},
                        {name: "设计进阶12岁以上", id: "sj2", mainId: "3", startAge: 12, endAge: -1},
                    ],
                    4: [
                        {name: "雕塑15岁以上", id: "ds0", mainId: "4", startAge: 15, endAge: -1},
                    ],
                },
                classes: {
                    ty0: [
                        {id: "1", address: "美都广场c座511", schooltime: "每周一下午2点", used: 12, capacity: 20,},
                        {id: "2", address: "美都广场c座511", schooltime: "每周二下午2点", used: 20, capacity: 20,},
                        {id: "3", address: "丁兰广场c座511", schooltime: "每周一下午2点", used: 18, capacity: 20,},
                    ],
                    ty5: [
                        {id: "1", address: "美都广场c座511", schooltime: "每周一下午2点", used: 12, capacity: 20,},
                        {id: "2", address: "美都广场c座511", schooltime: "每周二下午2点", used: 20, capacity: 20,},
                        {id: "3", address: "丁兰广场c座511", schooltime: "每周一下午2点", used: 18, capacity: 20,},
                    ],
                    ty6: [
                        {id: "1", address: "美都广场c座511", schooltime: "每周一下午2点", used: 12, capacity: 20,},
                        {id: "2", address: "美都广场c座511", schooltime: "每周二下午2点", used: 20, capacity: 20,},
                        {id: "3", address: "丁兰广场c座511", schooltime: "每周一下午2点", used: 18, capacity: 20,},
                    ],
                    ys1: [
                        {id: "1", address: "美都广场c座511", schooltime: "每周一下午2点", used: 12, capacity: 20,},
                        {id: "2", address: "美都广场c座511", schooltime: "每周二下午2点", used: 20, capacity: 20,},
                        {id: "3", address: "丁兰广场c座511", schooltime: "每周一下午2点", used: 18, capacity: 20,},
                    ],
                    sy0: [
                        {id: "1", address: "美都广场c座511", schooltime: "每周一下午2点", used: 12, capacity: 20,},
                        {id: "2", address: "美都广场c座511", schooltime: "每周二下午2点", used: 20, capacity: 20,},
                        {id: "3", address: "丁兰广场c座511", schooltime: "每周一下午2点", used: 18, capacity: 20,},
                    ],
                    sj0: [
                        {id: "1", address: "美都广场c座511", schooltime: "每周一下午2点", used: 12, capacity: 20,},
                        {id: "2", address: "美都广场c座511", schooltime: "每周二下午2点", used: 20, capacity: 20,},
                        {id: "3", address: "丁兰广场c座511", schooltime: "每周一下午2点", used: 18, capacity: 20,},
                    ],
                    ds0: [
                        {id: "1", address: "美都广场c座511", schooltime: "每周一下午2点", used: 12, capacity: 20,},
                        {id: "2", address: "美都广场c座511", schooltime: "每周二下午2点", used: 20, capacity: 20,},
                        {id: "3", address: "丁兰广场c座511", schooltime: "每周一下午2点", used: 18, capacity: 20,},
                    ],
                },
                selectedClassId: "",
                selectedClass: "",
                payWaySelect: "",
                removeSubjectId: "",

                /**
                 * 照片
                 */
                // uploadAction: this.$talentUrl.talent_service_v1_ta_talent_info_photo_upload,
                uploadAction: require('@/assets/img/avatar/avatar-1.jpg'),
                hideUpload: false,
                dialogImageUrl: "",
                photoDialogVisible: false,
                fileList: [],
                fileName: "",
                showUpPhoto: true,
                commodities: [
                    {
                        id:"1",
                        img: require("@/assets/img/huabi.jpg"),
                        desc:"画笔",
                        cost:"10",
                        num: "1",
                    },
                    {
                        id:"2",
                        img: require("@/assets/img/huabi.jpg"),
                        desc:"画笔",
                        cost:"10",
                        num: "1",
                    }
                ],
                commodityIds:["1"],
            }
        }
    }
</script>

<style scoped>
        .bmform {
            position: relative;
        }
        .bmcard {
            width: 900px;
            margin: 10px auto;
            margin-bottom: 20px;
        }
        .grxx {
            text-align: left;
            padding-left: 20px;
            padding-right: 20px;
        }
        .upload-item {
            position: absolute;
            top: 72px;
            right: 20px;
        }
        .nn {
            width: 130px;
            margin-left: 0px;
        }
        .zp {
            width: 207px;
            height: 313px;
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
            width: 100%;
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
            height:0;
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
            height:0;
            border-right: 20px solid #F2F6FC;
            border-bottom: 20px solid transparent;
            border-left: 20px solid transparent;
            position: absolute;
            top: 0px;
            right: 0px;
        }
        .sjh {
            width: 0;
            height:0;
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
            height:0;
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
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
        .km-radio .el-radio.is-bordered+.el-radio.is-bordered {
            margin-left: 0px;
            margin-bottom: 10px;
        }
        .zpcc .el-upload {
            width: 207px;
            height: 313px;
            line-height: 313px;
        }
        .upload-item  .el-form-item__label {
            text-align: left;
        }
        .el-message-box .el-message-box__btns .el-button {
            width:auto;
        }
        .grxx .el-form-item__label {
            font-weight: 600;
        }
        .el-form-item {
            margin-bottom: 0px;
        }
    }
</style>