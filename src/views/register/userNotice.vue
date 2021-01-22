<template>
	<!--eslint-disable-->
	<div>
		<el-dialog
				class="aiocw-dialog"
				title="用户须知"
				:visible.sync="dialogVisible"
				:close-on-click-modal="false"
				:before-close="close"
				:fullscreen="false"
				width="1000px"
				center>
			<el-card>
				<div class="yh">
					<div class="tc fb fs-20 lh-40">
						安徽省伯林书画研究院公益社会艺术培训注册条款及隐私声明
					</div>
					<div class="fs-16">
						1.本条款依据《中华人民共和国公共文化服务保障法》及《安徽省公共文化保障条例》制定；
						<br>
						<br>
						2.用户注册成功后依法享有免费获得社会艺术培训的权利，且社会艺术培训服务由安徽省伯林书画研究院社会服务部提供；
						<br>
						<br>
						3.安徽省伯林书画研究院作为公益社会艺术培训服务的提供单位，
						应有效妥善地落实相关教学工作，严格把控教学质量及教学效果。
						如对教学质量及教学效果不满意，在与授课人员或相关负责工作人员沟通无效后，
						请直接拨打安徽省伯林书画研究院社会服务部教务监督举报电话：0551——
						<br>
						<br>
						4.安徽省伯林书画研究院有义务在每学期开始前发布学期培训大纲；
						<br>
						<br>
						5.注册学员及家长有义务如实向我院反馈培训体验及意见，反馈意见指定邮箱：<br> <span class="color-fa5c26 fb"> officeshff@ahbfi.org.cn </span>;
						<br>
						<br>
						6.注册学员及家长有义务保证出勤率，每学期仅允许请假两次且不可将遗漏课程调至其它班级补课，出勤率90%可获得2学分，出勤率100%可获得3学分，出勤率不满90%无该项学分；
						<br>
						<br>
						7.注册学员及家长有义务保证按质按量完成授课人员所安排的教学作业，学期末综合评定教学作业合格者可获得1学分，良好者可获得2学分，优秀者可获得3学分，不合格者无该项学分；
						<br>
						<br>
						8.安徽省伯林书画研究院每学年度为三学期，分别为春、夏、秋期。为了拓宽学员知识面及综合文化素质修养，达到理实交融的学习效果。
						<br>
						<br>
						<div>
							<li class="ml-20">每学期计划安排一次研学活动（参观展览或所在市级区县内研学。注：第三方提供服务。）参加一次研学活动可获得 <span class="color-fa5c26 fb">3</span> 学分；</li>
							<li class="ml-20">每学期计划安排一次省内写生活动（节假日或周末，视具体地点及时间安排。注：第三方提供服务。）参加一次省内写生活动可获得 <span class="color-fa5c26 fb">4</span> 学分</li>
							<li class="ml-20">每学期计划安排一次市级及以上展览活动，参加一次展览活动可获得 <span class="color-fa5c26 fb">3</span> 学分；</li>
							<li class="ml-20">每学期计划安排一次市级及以上书画大赛，参加一次竞赛活动可获得 <span class="color-fa5c26 fb">3</span> 学分；；</li>
							<li class="ml-20">每学期计划安排一次社会艺术等级考试，参加一次考试并通过，可获得 <span class="color-fa5c26 fb">3</span> 学分。</li>
						</div>
						<br>

						9.注册学员获得市级以上美术类证书或资质证书，如市级书画大赛、全省少儿书画大赛、全省美展等获奖证书，可获得额外学分，加分情况分别如下：
						<br>
						<br>
						<div>
							<li class="ml-20">市级：<span class="color-fa5c26 fb">1</span> 分</li>
							<li class="ml-20">省级：<span class="color-fa5c26 fb">3</span> 分</li>
							<li class="ml-20">国家级：<span class="color-fa5c26 fb">5</span> 分</li>
							<li class="ml-20">国际级：<span class="color-fa5c26 fb">7</span> 分</li>
						</div>
						<br>
						10.为了杜绝社会公共服务资源的浪费，提高学员活跃度，真正做到学有所成，
						注册学员每学期结束时，必须修满 <span class="color-fa5c26 fb">22</span> 个学分，否则将禁止下一学期免费培训的注册，
						且静默期为一年，所有学分均由学员系统自动生成，原则上不允许人工干预；
						<br>
						<br>
						11.每年度总学分达到 <span class="color-fa5c26 fb">75</span> 分的学员，可任聘为安徽省伯林书画研究院少儿艺委会成员，
						可随研究院理事会成员参加由安徽省民政厅、文明委、文联等政府职能机构组织的省级文化扶贫项目中，
						免费到全省范围内进行调研创作，创作作品优秀者每次创作<span class="color-fa5c26 fb">可获政府补贴500-2000元不等</span>；
						<br>
						<br>
						12.安徽省伯林书画研究院每期为了保质保量完成教学任务，依据师资储备力量，
						向安徽省内以区域性为划分分配免费学习名额，<span class="color-fa5c26 fb">超出配额一概禁止注册</span>；
						<br>
						<br>
						13.安徽省伯林书画研究院公益社会艺术普及服务不收取任何培训费，但学员需自费的项目有：
						<br>
						<br>
						<li class="ml-20">制式课后练习手册；</li>
						<li class="ml-20">自购学习材料；</li>
						<li class="ml-20">自愿参与的各种类型的活动；</li>
						<li class="ml-20">由第三方收取的学员云管理系统服务器注册费50元/期。</li>
						<br>
						<br>
						<div class="fb tc fs-20 lh-20">
							隐私声明
						</div>
						<br>
						您所提交的个人信息资料将上传至阿里云ESC服务器存档，由阿里巴巴集团旗下阿里云计算机服务有限公司进行加密防护，确保您的隐私安全。
						<br>
						<br>
						安徽省伯林研究院郑重承诺：
						<br>
						1、仅将您的个人信息用于学习状态评估及活动参与度调查；
						<br>
						2、我们高度重视保护您的隐私安全，除必要的资料填报及档案调度，无公检法等部门正式文书，我们将不会向任何个人或机构透露您的任何信息。
					</div>
				</div>
			</el-card>
			<span slot="footer" class="dialog-footer">
              <div class="fs-14 color-999">© 2020 安徽伯林书画研究院 - 用户须知 - 隐私声明</div>
            </span>
		</el-dialog>
	</div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "userNotice",
	    methods: {
            close() {
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
            },
	    },
	    data() {
            return {
                dialogVisible: false,
            }
	    }
    }
</script>

<style scoped>
	.yh {
		font: 14px,Arial,宋体;
		color: #000000;
		line-height: 22px;
	}
</style>