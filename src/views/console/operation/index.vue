<template>
	<!--eslint-disable-->
	<div class="dffn">
		<div class="wdi-350 aioc-scroll bg-ffffff" :style="{minHeight: clientHeight + 'px'}">
			<div style="height: 100px; line-height: 50px; font-family: 华文行楷; font-size: 22px; border-bottom: 1px solid #eeeeee;text-align: left;padding-left: 20px;">
				安徽伯林书画研究院管理系统
				<br>
				操作说明书
			</div>
			<div class="tl">
				<ul class="menu">
					<li :style="selectMenuId == item.id ? 'color:#409EFF':''" v-for="(item, index) in menus" :key="index" @click="selectMenu(item)"> <strong>{{index+1}}</strong> {{item.name}}</li>
				</ul>
			</div>
		</div>

		<div class="aioc-scroll" :style="{width: (clientWidth-350) + 'px', minHeight: clientHeight + 'px'}" style="border-left: 1px solid #eeeeee; padding: 50px; text-align: left;">
			<div class="md_line" v-show="selectMenuId == 'know'">
				<h1>前言</h1>
				<el-divider></el-divider>
				<div>你需要先了系统支持哪些浏览器？不支持哪些浏览器？</div>
				<div>支持：目前支持的浏览器有谷歌、火狐、Microsoft Edge等浏览器</div>
				<div>不支持：目前不支持的有IE、360浏览器</div>

				<el-divider></el-divider>
			</div>

			<div class="md_line" v-show="selectMenuId == 'index'">
				<h1>首页</h1>
				<el-divider></el-divider>
				<div>首页总体布局图如下，接下来我们按模块介绍</div>
				<br>
				<div>
					<el-image :src="require('./image/index/1.jpg')"></el-image>
				</div>
				<el-divider></el-divider>
				<div> <strong>1</strong> logo区域</div>
				<div>该区域的文字和图片都可以通过【系统设置>>菜单管理>>编辑根菜单】去修改</div>
				<el-divider></el-divider>
				<div> <strong>2</strong> 用户信息区域</div>
				<div>主要显示用户的照片、性别、姓名以及对账号信息进行设置，点击账号设置，效果如下。</div>
				<div>账号设置：可以编辑账号、姓名、密码、性别、出生年月、手机号码、邮箱、身份证号码、家庭住址等信息</div>
				<br>
				<el-image :src="require('./image/index/2.jpg')"></el-image>
				<el-divider></el-divider>
				<div> <strong>3</strong> 菜单区域</div>
				<div>显示菜单名称、和菜单图标，点击切换菜单。菜单的名称、图标以及排序可以在【系统设置>>菜单管理>>编辑】处修改</div>
				<el-divider></el-divider>
				<div> <strong>4</strong> 左侧菜单收起和展开</div>
				<div>点击可以将左侧1、2、3区域隐藏，再次点击可以还原1、2、3区域</div>
				<el-divider></el-divider>
				<div> <strong>5</strong> 地域切换</div>
				<div>切换指定地域，系统可以显示对应地域的数据，受到影响的数据主要有首页、注册学员管理、教师管理、活动管理、课程管理-班级配置的数据</div>
				<el-divider></el-divider>
				<div> <strong>6</strong> 角色信息</div>
				<div>显示该用户所属的角色信息，如果该用户存在多个角色，可以通过下拉来选择</div>
				<el-divider></el-divider>
				<div> <strong>7</strong> 退出登录</div>
				<div>点击退出，清除用户数据，返回登录页面</div>
				<el-divider></el-divider>
				<div> <strong>8</strong> 当前位置信息</div>
				<div>显示当前所在的菜单位置信息</div>
				<el-divider></el-divider>
				<div> <strong>9</strong> 学生、老师、活动、财务金额</div>
				<div>统计5对应的区域的活跃学生数量、注册的学生数量、老师的数量、活动的数量、财务总金额</div>
				<el-divider></el-divider>
				<div> <strong>10</strong> 一周注册趋势</div>
				<div>统计最近七天注册平台的学生数量</div>
				<el-divider></el-divider>
				<div> <strong>11</strong> 待审批工单</div>
				<div>如果你有总控审批的权限，将会显示你需要审批的工单，可以点击审批按钮进行审批、也可以点击更多前往总控审批页面</div>
				<el-divider></el-divider>
				<div> <strong>12</strong> 注册学生年龄分布</div>
				<div>统计注册平台的学生年龄都是分布在什么区间，分别占比是多少</div>
				<el-divider></el-divider>
				<div> <strong>13</strong> 最近15天财务流水趋势</div>
				<div>统计最近15天的财务金额流水情况</div>
				<el-divider></el-divider>
				<div> <strong>14</strong> 主题切换</div>
				<div>可以点击切换系统的主题颜色</div>
				<el-image :src="require('./image/index/3.jpg')"></el-image>
				<el-divider></el-divider>

			</div>

			<div class="md_line" v-show="selectMenuId == 'code'">
				<h1>唯一注册码管理</h1>
				<el-divider></el-divider>
				<div>
					主要功能：
					1、支持通过注册码、注册用户、状态3个查询条件，并且注册码、注册用户支持模糊查询，快速定位数据；
					2、展示注册码、创建时间、注册用户、注册码状态信息，支持分页查询
				</div>
				<el-image :src="require('./image/code/1.jpg')"></el-image>
				<el-divider></el-divider>
				<div>
					3、点击增加可以增加注册码，输入数量点击生产注册码，就会按需生产20位不重复验证码，点击提交保存生产的验证码
				</div>
				<el-image :src="require('./image/code/2.jpg')"></el-image>
				<el-divider></el-divider>
				<div>
					4、支持批量删除验证码，但是已注册的注册码不能够删除
				</div>
				<el-image :src="require('./image/code/3.jpg')"></el-image>
			</div>

			<div class="md_line" v-show="selectMenuId == 'student'">
				<h1>注册学员管理</h1>
				<el-divider></el-divider>
				<div>
					主要功能：
					1、支持用户名称、状态2个查询条件，并且用户名称支持模糊查询，快速定位数据；
					2、展示照片、姓名、性别、身份证、联系方式、地址、年龄、本学期学分、上学期学分、上学期预警学分信息，支持分页查询；
				</div>
				<el-image :src="require('./image/student/1.jpg')"></el-image>
				<el-divider></el-divider>
				<div>
					（每学期需要提前设置好学期）
					3、学期设置，设置学期的开始时间、结束时间以及本学期的预警学分。程序会根据设置定时间自动处理开始、结束、并且按预警学分要求判断哪些学生应该静默
					，静默的学生一年（按365天计算）不能注册和访问系统。未开始的学期才可以删除。
				</div>
				<el-image :src="require('./image/student/2.jpg')"></el-image>
				<el-divider></el-divider>
				<div>
					4、学生详情，可以查看学生学籍信息，包含身份基本信息、老师评价、购买学习用品、班级信息、参加活动信息
				</div>
				<el-image :src="require('./image/student/3.jpg')"></el-image>
				<el-image :src="require('./image/student/4.jpg')"></el-image>
				<el-divider></el-divider>
				<div>
					5、证书绑定，可以根据证书名称、证书编号模糊检索证书，点击绑定证书将该证书授予学生对象
				</div>
				<el-image :src="require('./image/student/5.jpg')"></el-image>
				<el-divider></el-divider>
				<div>
					6、点击静默TA可以手动静默学生
				</div>
				<el-divider></el-divider>
				<div>
					7、点击激活可以手动激活静默的学生
				</div>
			</div>

			<div class="md_line" v-show="selectMenuId == 'teacher'">
				<h1>教师管理</h1>
				<el-divider></el-divider>
				<div>
					主要功能：
					1、支持教师名称、电话号码、状态3个查询条件，并且教师名称、电话号码支持模糊查询，快速定位数据；
					2、展示照片、姓名、性别、身份证、联系方式、地址、状态等信息，支持分页查询；
				</div>
				<el-image :src="require('./image/teacher/1.jpg')"></el-image>
				<el-divider></el-divider>
				<div>
					3、增加教师，填写账号、姓名、用户密码、性别、出生年月、手机号码、邮箱、身份证号码、账号状态
					、所在区域、详细住址等必填信息，上传照片，然后点击确定进行添加教师；
				</div>
				<el-image :src="require('./image/teacher/2.jpg')"></el-image>
				<el-divider></el-divider>
				<div>
					4、编辑教师信息，编辑账号、姓名、性别、出生年月、手机号码、邮箱、身份证号码、账号状态
					、所在区域、详细住址等必填信息，上传照片，然后点击确定进行保存；
				</div>
				<el-image :src="require('./image/teacher/4.jpg')"></el-image>
				<el-divider></el-divider>
				<div>
					5、教师详情，点击查看详情可以看到教师的一些详细信息，包含学生对教师的评论、打分以及对课程的评分
				</div>
				<el-image :src="require('./image/teacher/3.jpg')"></el-image>
				<el-divider></el-divider>
			</div>

			<div class="md_line" v-show="selectMenuId == 'activity'">
				<h1>活动管理</h1>
				<el-divider></el-divider>
				<div>
					主要功能：
					1、支持活动名称1个查询条件，并且活动名称支持模糊查询，快速定位数据；
					2、展示活动海报、活动主题、活动描述、活动时间、活动地点、活动总人数、累计学分、报名费用、报名开始时间、报名结束时间信息，支持分页查询；
				</div>
				<el-image :src="require('./image/activity/1.jpg')"></el-image>
				<el-divider></el-divider>
				<div>
					3、增加活动，活动总共分为6种状态未发布、已发布、报名中、报名结束、进行中、已结束；
					<br>
					未发布: 当增加完活动，默认是未发布的，需要点击编辑，选择状态发布，活动才能发布，未发布的活动
					学生端是不能看到的；
					<br>
					已发布: 已发布的活动才可以被学生端检索到；
					<br>
					报名中：活动报名时间到了，会自动变更成报名中；
					<br>
					报名结束：活动报名结束时间到了，会自动变更成报名结束；
					<br>
					进行中：活动时间到了，会自动变更成进行中；
					<br>
					已结束：活动结束时间到了，会自动变更成已结束；
					<br>
					活动时间设置要求：报名开始时间 < 报名结束时间 < 活动开始时间 < 活动结束时间
				</div>
				<el-image :src="require('./image/activity/2.jpg')"></el-image>
				<el-image :src="require('./image/activity/3.jpg')"></el-image>
				<el-divider></el-divider>
				<div>
					4、活动编辑，活动增加和编辑都支持富文本编辑器（注意上传视频的操作暂时不支持）
				</div>
				<el-image :src="require('./image/activity/4.jpg')"></el-image>
				<el-image :src="require('./image/activity/5.jpg')"></el-image>
				<el-image :src="require('./image/activity/6.jpg')"></el-image>
				<el-divider></el-divider>
				<div>
					5、查看学生报名信息
				</div>
				<el-image :src="require('./image/activity/7.jpg')"></el-image>
				<el-divider></el-divider>
				<div>
					6、对活动进行预览
				</div>
				<el-image :src="require('./image/activity/8.jpg')"></el-image>
				<el-divider></el-divider>
			</div>

			<div class="md_line" v-show="selectMenuId == 'certificate'">
				<h1>证书管理</h1>
				<el-divider></el-divider>
				<div>
					主要功能：
					1、支持证书名称、证书编号、获得学生姓名3个查询条件，并且都支持模糊查询，快速定位数据；
					2、展示证书图片、证书编号、证书名称、颁发机构、创建时间、授予人等信息，支持分页查询；
				</div>
				<el-image :src="require('./image/certificate/1.jpg')"></el-image>
				<el-divider></el-divider>
				<div>
					3、增加证书，自动、点击生成证书唯一序列号；
				</div>
				<el-image :src="require('./image/certificate/2.jpg')"></el-image>
				<el-divider></el-divider>
				<div>
					3、编辑证书，已经绑定的证书不能删除和编辑；
				</div>
				<el-image :src="require('./image/certificate/3.jpg')"></el-image>
			</div>

			<div class="md_line" v-show="selectMenuId == 'pay'">
				<h1>收支账户配置</h1>
				<el-divider></el-divider>
				<div>
					主要功能：
					1、展示支付类型、支付参数等信息；
					2、展示编辑支付信息，填写对应的参数；
					3、查看对应的参数；
				</div>
				<el-image :src="require('./image/pay/1.jpg')"></el-image>
				<el-divider></el-divider>
			</div>

			<div class="md_line" v-show="selectMenuId == 'income'">
				<h1>收入明细</h1>
				<el-divider></el-divider>
				<div>
					主要功能：
					1、支持时间区间查询条件，快速定位数据；
					2、展示订单号、金额、支付状态、支付时间、收入描述、客户名称以及支付方式信息，支持分页查询；
				</div>
				<el-image :src="require('./image/income/1.jpg')"></el-image>
				<el-divider></el-divider>
			</div>

			<div class="md_line" v-show="selectMenuId == 'approve'">
				<h1>审批申请</h1>
				<el-divider></el-divider>
				<div>
					主要功能：
					<br>1、支持审批标题、审批单号查询条件，快速定位数据；
					<br>2、展示审批单号、申请标题、申请内容、申请人、创建时间、更新时间，审批人、工单状态信息，支持分页查询；
					<br>3、增加审批单，新建状态的审批单支持编辑和删除、流转操作；
					<br>4、驳回的审批单，可以查看驳回原因，支持编辑和再次流转操作；
					<br>5、否决的审批单，可以查看否决原因，流程结束，不支持再次流转；
					<br>6、支持查看详情；
				</div>
				<el-image :src="require('./image/approve/1.jpg')"></el-image>
				<el-image :src="require('./image/approve/2.jpg')"></el-image>
				<el-image :src="require('./image/approve/3.jpg')"></el-image>
				<el-image :src="require('./image/approve/4.jpg')"></el-image>
				<el-image :src="require('./image/approve/6.jpg')"></el-image>
				<el-image :src="require('./image/approve/7.jpg')"></el-image>
				<el-image :src="require('./image/approve/8.jpg')"></el-image>
				<el-divider></el-divider>
			</div>

			<div class="md_line" v-show="selectMenuId == 'pendingApprove'">
				<h1>总控审批</h1>
				<el-divider></el-divider>
				<div>
					主要功能：
					<br>1、支持审批标题、审批单号查询条件，快速定位数据；
					<br>2、展示审批单号、申请标题、申请内容、申请人、创建时间、更新时间，审批人、工单状态信息，支持分页查询；
					<br>3、审批工单，对工单进行同意、驳回、否决操作；
				</div>
				<el-image :src="require('./image/pendingApprove/1.jpg')"></el-image>
				<el-image :src="require('./image/pendingApprove/2.jpg')"></el-image>
			</div>

			<div class="md_line" v-show="selectMenuId == 'mainSubject'">
				<h1>课程大类管理</h1>
				<el-divider></el-divider>
				<div>
					主要功能：
					<br>1、支持课程名称查询条件，快速定位数据；
					<br>2、展示课程大类名称、创建时间、备注信息，支持分页查询；
					<br>3、增加、编辑、删除课程大类；
				</div>
				<el-image :src="require('./image/mainSubject/1.jpg')"></el-image>
				<el-image :src="require('./image/mainSubject/2.jpg')"></el-image>
				<el-image :src="require('./image/mainSubject/3.jpg')"></el-image>
			</div>

			<div class="md_line" v-show="selectMenuId == 'subSubject'">
				<h1>课程小类管理</h1>
				<el-divider></el-divider>
				<div>
					主要功能：
					<br>1、支持课程大类名称、课程小类名称查询条件，快速定位数据；
					<br>2、展示课程小类名称、所属课程大类名称、年龄条件、创建时间、备注信息，支持分页查询；
					<br>3、增加、编辑、删除课程小类；
				</div>
				<el-image :src="require('./image/subSubject/1.jpg')"></el-image>
				<el-image :src="require('./image/subSubject/2.jpg')"></el-image>
				<el-image :src="require('./image/subSubject/3.jpg')"></el-image>
			</div>

			<div class="md_line" v-show="selectMenuId == 'class'">
				<h1>班级配置</h1>
				<el-divider></el-divider>
				<div>
					主要功能：
					<br>1、支持班级名称、教师名称、课程大类名称、课程小类名称查询条件，快速定位数据；
					<br>2、展示班级名称、开始时间、结束方式、时间、老师、地址、已报名/容量、课程大类、课程小类、获得学分、状态、备注信息，支持分页查询；
					<br>3、增加、编辑、删除班级；
				</div>
				<el-image :src="require('./image/class/1.jpg')"></el-image>
				<el-image :src="require('./image/class/2.jpg')"></el-image>
				<el-image :src="require('./image/class/3.jpg')"></el-image>
			</div>

			<div class="md_line" v-show="selectMenuId == 'user'">
				<h1>用户管理</h1>
				<el-divider></el-divider>
				<div>
					主要功能：
					<br>1、支持用户名称、用户账号、电话号码查询条件，快速定位数据；
					<br>2、展示照片、账号、姓名、电话、邮箱、状态等信息，支持分页查询；
					<br>3、增加、编辑、删除用户；
				</div>
				<el-image :src="require('./image/user/1.jpg')"></el-image>
				<el-image :src="require('./image/user/2.jpg')"></el-image>
				<el-image :src="require('./image/user/3.jpg')"></el-image>
			</div>

			<div class="md_line" v-show="selectMenuId == 'role'">
				<h1>角色管理</h1>
				<el-divider></el-divider>
				<div>
					主要功能：
					<br>1、支持角色名称查询条件，快速定位数据；
					<br>2、展示角色名称、是否是超级管理员、时间等信息，支持分页查询；
					<br>3、增加、编辑、删除角色；
				</div>
				<el-image :src="require('./image/role/1.jpg')"></el-image>
				<el-image :src="require('./image/role/2.jpg')"></el-image>
				<el-image :src="require('./image/role/3.jpg')"></el-image>
				<el-image :src="require('./image/role/4.jpg')"></el-image>
				<el-image :src="require('./image/role/5.jpg')"></el-image>
			</div>

			<div class="md_line" v-show="selectMenuId == 'menu'">
				<h1>菜单管理</h1>
				<el-divider></el-divider>
				<div>
					主要功能：
					<br>1、支持菜单名称、上级菜单查询条件，快速定位数据；
					<br>2、展示菜单名称、类型、路径、顺序、时间、级别、打开方式、图标、是否可用等信息，支持分页查询；
					<br>3、增加、编辑、删除菜单；
				</div>
				<el-image :src="require('./image/menu/1.jpg')"></el-image>
				<el-image :src="require('./image/menu/2.jpg')"></el-image>
				<el-image :src="require('./image/menu/3.jpg')"></el-image>
			</div>

			<div class="md_line" v-show="selectMenuId == 'log'">
				<h1>审计日志</h1>
				<el-divider></el-divider>
				<div>
					主要功能：
					<br>1、展示客户端、操作、用户名、ip地址、时间等信息，支持分页查询；
				</div>
				<el-image :src="require('./image/log/1.jpg')"></el-image>
			</div>
		</div>
	</div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "index",
	    methods: {
            selectMenu(menu) {
                this.selectMenuId = menu.id;
            }
	    },
	    data() {
            return {
                selectMenuId: 'know',
                clientWidth: document.body.clientWidth,
                clientHeight: document.body.clientHeight,
                menus: [
	                {id:"know", name: "需要先了解的",},
	                {id:"index", name: "框架和首页",},
	                {id:"code", name: "唯一注册码管理",},
	                {id:"student", name: "注册学员管理",},
	                {id:"teacher", name: "教师管理",},
	                {id:"activity", name: "活动管理",},
	                {id:"certificate", name: "证书管理",},
	                {id:"pay", name: "财务管理-收支账户配置",},
	                {id:"income", name: "财务管理-收入明细",},
	                {id:"approve", name: "财务管理-审批申请",},
	                {id:"pendingApprove", name: "财务管理-总控审批",},
	                {id:"mainSubject", name: "课程管理-课程大类管理",},
	                {id:"subSubject", name: "课程管理-课程小类管理",},
	                {id:"class", name: "课程管理-班级配置",},
	                {id:"user", name: "系统设置-用户管理",},
	                {id:"role", name: "系统设置-角色管理",},
	                {id:"menu", name: "系统设置-菜单管理",},
	                {id:"log", name: "系统设置-审计日志",},
                ]
            }
	    }
    }
</script>

<style scoped>
	.menu li {
		line-height: 40px;
		font-size: 16px;
		padding-left: 20px;
	}
	.menu li:hover {
		color: #409EFF;
	}
	.md_line div {
		color: #333;
		line-height: 30px;
		font-size: 16px;
	}
</style>