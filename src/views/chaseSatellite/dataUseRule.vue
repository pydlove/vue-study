<template>
	<!--eslint-disable-->
	<!--<div class="userule">-->
	<!--1.Users should acknowledge the sources of data used in publications, presentations, and reports. “We-->
	<!--acknowledge the CNSA CHASE mission and the HIS science team for use of data.” Or “This work uses the data-->
	<!--from the CHASE mission funded by China National Space Administration.”-->
	<!--<div class="userule">-->
	<!--2.Users are encouraged to provide the CHASE/HIS science team (email: lic@nju.edu.cn) a copy of-->
	<!--manuscript upon submission or published paper that uses the data of CHASE/HIS.-->
	<!--</div>-->
	<!--<div class="userule">-->
	<!--3.Users are encouraged to cite the papers when using the data of CHASE/HIS.-->
	<!--“Li Chuan, Fang Cheng, Ding Mingde, et al. The Hα Imaging Spectrograph for the CHASE Mission, to be-->
	<!--submitted” or “Li Chuan, Fang Cheng, Li Zhen, et al. Chinese Hα Solar Explorer (CHASE) – a complementary-->
	<!--space mission to the ASO-S, 2019, Res. Astron. Astrophys., 19, 165, doi: 10.1088/1674–4527/19/11/165”-->
	<!--</div>-->
	<!--<div class="userule">-->
	<!--4.The use of CHASE images and movies for non-commercial purposes and public education is strongly-->
	<!--encouraged in case of attributing the source of images and movies as “Courtesy of CNSA/CHASE and the HIS-->
	<!--science team.”-->
	<!--</div>-->
	<!--<div class="userule">-->
	<!--5.Any questions about accessing the most recent available data and analysis routines, please consult-->
	<!--with the CHASE/HIS science team (email: lic@nju.edu.cn).-->
	<!--</div>-->
	<!--</div>-->

	<!--<div class="nd-policy" v-if="language == 'zh'">
		<div class="tc">
			“羲和号”卫星科学数据管理办法
		</div>
		<div>
			<strong>【政策原则】</strong> 为规范“羲和号”卫星科学数据管理，落实高效便捷、开放共享的服务原则，促进学术研究，鼓励对外合作，制订本办法。<br/><br/>
		</div>

		<div>
			<strong>第一条【数据定义】</strong>
			“羲和号”卫星科学数据指太阳Hα光谱探测与双超平台科学技术试验卫星所配置的太阳Hα光谱空间望远镜（太阳Hα成像光谱仪）获取的原始数据、相关卫星辅助数据，以及经过科学定标、可用相关分析软件解读的、可直接用于科学研究的数据产品。<br/><br/>
		</div>

		<div>
			<strong>第二条【数据分级】</strong> “羲和号”卫星科学数据分为：<br/>
			0级数据：对卫星下传的太阳Hα光谱空间望远镜原始数据经过帧同步、解扰等预处理得到的数据产品。<br/>
			1级数据：对0级数据进行谱线弯曲改正、平场暗场处理、坐标转换处理等标定后得到的数据产品。<br/>
			2级数据：基于1级数据根据不同科学需求进行辐射强度标定、多普勒速度反演等处理后得到的数据产品。<br/><br/>
		</div>

		<div>
			<strong>第三条【适用范围】</strong>
			本办法适用于利用“羲和号”卫星科学数据从事科学、应用研究和其他活动的科研机构、个人，适用于科学数据的处理、存储、交换、分发/获取、使用、共享、发布等生产和应用各项活动。<br/>
			本办法所涉及的活动及活动主体，应符合和遵守国家法律、法规和相关政策，尊重和保护知识产权，遵守学术规范。<br/><br/>
		</div>

		<div>
			<strong>第四条【职责分工－国家航天局】</strong> “羲和号”卫星科学数据归国家航天局所有。<br/>
			国家航天局负责航天领域政府间和政府部门间有关“羲和号”卫星科学数据的合作协议的签署。<br/>
			鼓励和支持有关部门、科研机构和研究者，利用“羲和号”卫星科学数据积极开展对外交流与合作。<br/>
			有关单位开展对外合作、发布重大成果应向国家航天局报备。<br/><br/>
		</div>

		<div>
			<strong>第五条【职责分工－各系统】</strong>
			卫星工程相关系统责任单位按批复和研制建设总要求分工负责科学数据生产和应用各项活动，采取有效措施确保科学数据合格、稳定、安全（包括备份和灾害恢复）和及时分发。<br/>
			国家航天局对地观测与数据中心负责“羲和号”卫星在轨运行中跨系统、重大问题和异议事项的具体协调。<br/><br/>
		</div>

		<div>
			<strong>第六条【职责分工－国际科学委员会】</strong>
			依托“羲和号”卫星工程的科学与应用系统责任单位南京大学成立国际科学委员会。“羲和号”卫星国际科学委员会工作由主席主持，以适当形式组织开展。主要负责：<br/>
			根据科学研究需求和太阳的活动规律，提出“羲和号”卫星的专题探测任务、包括与其它机构和设施联合开展的探测任务规划建议。<br/>
			提出或遴选科学问题并形成研究需求，指导合作研究团队产出具有国际影响力的科研成果。<br/>
			组织定期和不定期的学术活动，促进利用“羲和号”卫星科学数据开展的研究、应用以及对外合作，推动成果交流共享和在相关领域的应用。<br/>
			审议“羲和号”卫星在轨测试技术总结，对交付转入运行阶段提出意见。为重大应用成果发布提供鉴定、咨询意见。<br/>
			定期对探测任务、所获取的科学数据质量、定标检校、成果共享情况评估。审议科学与应用系统年度工作报告。<br/><br/>
		</div>

		<div>
			<strong>第七条【职责分工－南京大学】</strong> 依托南京大学开展“羲和号”卫星科学数据分发、共享服务，有关工作不应产生商业收益。<br/>
			南京大学应落实专门机构和人员，建立相关运行管理规章，支撑开展日常工作。<br/>
			南京大学应制订统一的科学数据申请格式，受理用户申请并审核后通过线上、线下方式分发，存量数据产品应于收到申请后15个工作日完成审核并分发；应统计探测任务完成情况、科学数据分发情况和应用成果，并按年度向国家航天局对地观测与数据中心报告。<br/>
			南京大学应生成和开放全日面Hα光谱扫描成像数据库、全日面连续谱成像数据库，为太阳物理和空间科学研究提供基础数据服务。<br/><br/>
		</div>

		<div>
			<strong>第八条【用户定义】</strong>
			“羲和号”卫星科学数据按用户类别区分提供。用户分为主用户、其它用户两类。主用户指国家航天局所签署协议框架下的，以及南京大学牵头组织的科学与应用工作团队；其它用户指使用“羲和号”卫星科学数据开展科学研究、公益服务和其它活动的单位或个人。<br/><br/>
			<strong>第九条【用户权限】</strong> “羲和号”卫星在轨测试阶段，原则上只对主用户开放数据产品，主用户可按需取得科学数据。<br/>
			“羲和号”卫星交付运行使用后，主用户可获取各级最新数据产品，可向南京大学提出探测任务申请；其它用户可滞后90个工作日获取所需的数据产品。<br/><br/>
		</div>

		<div>
			<strong>第十条【用户义务】</strong> 用户须据实在指定网站https://ssdc.nju.edu.cn注册并通过审核，按需、合理申请科学数据。<br/>
			用户申请科学数据时应明确用途，并承诺：不将所获取数据产品转给他方，研究和应用中发现数据产品存在问题将及时向分发方反馈，配合分发方开展成果统计，在其成果中标注说明数据来源（如:
			本工作使用了国家航天局支持的“羲和号”卫星探测数据。）。<br/><br/>
		</div>

		<div>
			<strong> 第十一条【用户责任】</strong> 用户申请、使用“羲和号”卫星科学数据中出现不适当行为的，其后续申请将受到限制。<br/>
			用户不得使用“羲和号”卫星科学数据从事损害公共利益和他人合法权益的活动。<br/><br/>
		</div>

		<div>
			<strong>第十二条【其它】</strong> 本办法自公布日起生效。本办法由国家航天局负责解释。<br/>
		</div>
	</div>
-->
	<!--<div class="nd-policy" v-else-if="language == 'en'">-->
	<div class="nd-policy">
		<div>
			1.Users should acknowledge the sources of data used in publications, presentations, and reports. “This work uses
			the data from the CHASE mission supported by China National Space Administration.”, “We acknowledge the CHASE
			mission and the science team for use of data.”, or “Observation data is from the CHASE mission supported by
			China National Space Administration.”<br/><br/>
		</div>

		<div>
			2.Users are encouraged to provide the CHASE science team (email: lic@nju.edu.cn; dmd@nju.edu.cn;
			lizhen@nju.edu.cn) a copy of published paper or manuscript upon submission that uses the data of CHASE.<br/><br/>
		</div>

		<div>
			3.Users are encouraged to cite the following papers when using the CHASE data.<br/>
			(1)“Li, C., Fang, C., Li, Z., et al. The Chinese Hα Solar Explorer (CHASE) Mission: An overview, 2022, Sci.
			China-Phys. Mech. Astron., in press, DOI: 10.1007/s11433-022-1893-3”;<br/>
			(2)“Qiu, Y., Rao, S. H., Li, C., et al. Calibration procedures for the CHASE/HIS science data, 2022, Sci.
			China-Phys. Mech. Astron., in press, DOI: 10.1007/s11433-022-1900-5”<br/>
			(3)“Li Chuan, Fang Cheng, Li Zhen, et al. Chinese Hα Solar Explorer (CHASE) – a complementary space mission to
			the ASO-S, 2019, Res. Astron. Astrophys., 19, 165, DOI: 10.1088/1674–4527/19/11/165”;<br/>
			(4)Or papers of the CHASE topical issue:<br/><br/>
		</div>

		<div>
			4.The use of CHASE images and movies for non-commercial purposes and public education is strongly encouraged in
			case of attributing the source of images and movies as “Courtesy of the CHASE mission and the science team.”<br/><br/>
		</div>

		<div>
			5.Any questions about accessing the most recent available data and analysis routines, please consult with the
			CHASE team (email: lic@nju.edu.cn; lizhen@nju.edu.cn; qiuyeah@163.com).
		</div>
	</div>
</template>
<!--eslint-disable-->

<script>
    export default {
        name: "dataUseRule",
        data() {
            return {
                language: "",
            }
        },
        mounted() {
            this.initLanguage();
        },
        methods: {
            initLanguage() {
                this.language = this.$i18n.locale;
            },
        }

    }
</script>

<style scoped>
	.nd-policy {
		font-size: 14px;
		line-height: 24px;
		text-align: left;
		text-indent: 28px;
	}

	/*媒体查询（电脑）*/
	@media screen and (min-width: 768px) {
		.useRuleTitle {
			font-size: 20px;
			margin: 10px;
			text-align: left;
		}

		.userule {
			margin-top: 10px;
			font-size: 14px;
			line-height: 28px;
			text-align: left;
		}
	}
</style>