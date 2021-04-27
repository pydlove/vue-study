<template>
	<!--eslint-disable-->
	<div class="app_container">
		<!--投票-->
		<div class="app_main" v-if="active == '0'">
			<!--投票-->
			<div v-if="page=='vote'">
				<el-carousel class="app_el_carousel" height="200px" v-if="activityForm.fileList.length > 0">
					<el-carousel-item v-for="(item, index) in activityForm.fileList" :key="index">
						<van-image
								width="100%"
								height="200px"
								fit="fill"
								:src="item.url"
						/>
					</el-carousel-item>
				</el-carousel>

				<div v-else class="app_no_img">
					请上传顶部图片
				</div>

				<el-card class="app_card">
					<div class="app_tit">
						{{ activityForm.title }}
					</div>
					<div class="app_tit_container">
						<div class="app_tit_item app_item_bl" :style="{ background: colorStyle.total }">
							<div>1000</div>
							<div>总票数</div>
						</div>
						<div class="app_vline"></div>
						<div class="app_tit_item" :style="{ background: colorStyle.player }">
							<div>100</div>
							<div>选手数</div>
						</div>
						<div class="app_vline"></div>
						<div class="app_tit_item app_item_br" :style="{ background: colorStyle.access }">
							<div>10000</div>
							<div>访问量</div>
						</div>
					</div>
					<div class="app_status">
						活动未开始
					</div>
				</el-card>

				<el-card class="app_card">
					<div class="app_rule" :style="{ color: colorStyle.main }">
						<div class="app_hline" :style="{ borderColor: colorStyle.main }"></div>
						活动规则
						<div class="app_hline" :style="{ borderColor: colorStyle.main }"></div>
					</div>
					<div class="app_rule_item">
						<van-icon class="app_rule_icon" name="clock-o" :style="{ color: colorStyle.main }" />投票开始：
						{{ activityForm.voteTimeRange[0] }}
					</div>
					<div class="app_rule_item">
						<van-icon class="app_rule_icon" name="clock-o" :style="{ color: colorStyle.main }" />投票截止：
						{{ activityForm.voteTimeRange[1] }}
					</div>
					<div class="app_rule_item mb-10">
						<van-icon class="app_rule_icon" name="info-o" :style="{ color: colorStyle.main }" />
						投票规则： 每个微信号每天限制投三票
					</div>
				</el-card>

				<div class="app_fun_container" :style="{ background: colorStyle.main }">
					<div class="app_fun_item" @click="toOrder">
						<i class="el-icon-trophy"></i>
						<div>查看排名</div>
					</div>
					<div class="app_vline1"></div>
					<div class="app_fun_item"  @click="toSignUp">
						<i class="el-icon-edit-outline"></i>
						<div>在线报名</div>
					</div>
				</div>

				<van-search class="app_search"
				            v-model="search"
				            show-action
				            placeholder="请输入姓名或编号搜索"
				            @search="onSearch"
				            background="#ffffff"
				>
					<div class="app_search_prefix" slot="action" @click="onSearch"
					     :style="{ background: colorStyle.main, borderColor: colorStyle.main }"
					>搜索</div>
				</van-search>

				<div class="app_works">
					<div class="app_works_item"
					     v-for="(item, index) in rankings" :key="index"
					     :style="{ marginRight: (index%2==0?'4%':'0px')}"
					>
						<el-image class="app_works_img"
						          width="100%"
						          height="100%"
						          :src="item.imgs[0]"
						          fit="fill"  @click="toDetail(item)"></el-image>
						<div class="app_works_info">
							<div>
								作品名：{{ item.name }}
							</div>
							<div>
								作者：{{ item.author }}
							</div>
							<div>
								年龄：{{ item.age }}
							</div>
							<div>
								票数：{{ item.votes }}票
							</div>
						</div>
						<div class="app_works_container" :style="{ background: colorStyle.main }">
							<div class="app_witem">
								<div>投票</div>
							</div>
							<div class="app_vline1"></div>
							<div class="app_witem" @click="boost">
								<el-tooltip class="item" effect="dark" content="点我为好友再点个赞吧" placement="top-start">
									<div class="app_witem_zan">
										<i class="jiangbei"></i>助力
									</div>
								</el-tooltip>
							</div>
						</div>
						<div class="app_num">
							{{ item.id }}号
						</div>
					</div>
				</div>
				<div class="app_bot">
					<a href="https://www.aiocloud.ltd/#/" target="_blank" :style="{ color: colorStyle.main, }" >爱启云科技</a>提供支持
				</div>
				<van-action-sheet v-model="showGift" title="礼物">
					<div class="app_action">
						<div class="app_desc" :style="{ background: colorStyle.main }">为好友再点个赞吧！给选手赠送礼物，可以增加相应票数！</div>
						<div class="app_action_container">
							<div :class="(gift.name == item.name ? 'app_active':'') + ' app_item'"
							     v-for="(item, index) in gifts" :key="index"
							     @click="setGift(item)"
							>
								<van-image
										width="30"
										height="30"
										:src="item.img"
								/>
								<div class="app_item_text">
									{{ item.name }}（{{ item.votes }}票）
								</div>
								<div class="app_item_price">
									{{ item.price }}元
								</div>
							</div>
						</div>
					</div>
					<van-divider />
					<div class="app_eld">
						<div>
							<el-dropdown placement="top-start" trigger="click" @command="setGiftNum">
								<el-button class="app_eld_btn" size="medium"
								           :style="{ borderColor: colorStyle.main, color: colorStyle.main }"
								>
									{{ giftNum }}<i class="el-icon-arrow-down el-icon--right"></i>
								</el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item command="1">1</el-dropdown-item>
									<el-dropdown-item command="2">2</el-dropdown-item>
									<el-dropdown-item command="3">3</el-dropdown-item>
									<el-dropdown-item command="4">4</el-dropdown-item>
									<el-dropdown-item command="5">5</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
							<span class="app_eld_btn_send" :style="{ background: colorStyle.main, borderColor: colorStyle.main }">
							赠送
						</span>
						</div>
					</div>
				</van-action-sheet>
			</div>

			<!--在线报名-->
			<div v-else-if="page=='signup'">
				<el-carousel class="app_el_carousel" height="200px" v-if="activityForm.fileList.length > 0">
					<el-carousel-item v-for="(item, index) in activityForm.fileList" :key="index">
						<van-image
								width="100%"
								height="200px"
								fit="fill"
								:src="item.url"
						/>
					</el-carousel-item>
				</el-carousel>

				<div v-else class="app_no_img">
					请上传顶部图片
				</div>

				<el-card class="app_card">
					<div class="app_tit">
						{{ activityForm.name }}
					</div>
					<div class="app_tit_container">
						<div class="app_tit_item app_item_bl" :style="{ background: colorStyle.total }">
							<div>0</div>
							<div>总票数</div>
						</div>
						<div class="app_vline"></div>
						<div class="app_tit_item" :style="{ background: colorStyle.player }">
							<div>6</div>
							<div>选手数</div>
						</div>
						<div class="app_vline"></div>
						<div class="app_tit_item app_item_br" :style="{ background: colorStyle.access }">
							<div>0</div>
							<div>访问量</div>
						</div>
					</div>
					<div class="app_status">
						活动未开始
					</div>
				</el-card>

				<el-card class="app_card">
					<div class="app_rule" :style="{ color: colorStyle.main }">
						<div class="app_hline" :style="{ borderColor: colorStyle.main }"></div>
						报名时间
						<div class="app_hline" :style="{ borderColor: colorStyle.main }"></div>
					</div>
					<div class="app_rule_item">
						<van-icon class="app_rule_icon" name="clock-o" :style="{ color: colorStyle.main }" />报名开始：
						{{ activityForm.signTimeRange[0] }}
					</div>
					<div class="app_rule_item mb-20">
						<van-icon class="app_rule_icon" name="clock-o" :style="{ color: colorStyle.main }" />报名截止：
						{{ activityForm.signTimeRange[1] }}
					</div>
				</el-card>

				<el-card class="app_card">
					<el-form class="app_form"
					         ref="form"
					         :model="form"
					         :rules="rules"
					         label-position="left"
					         :validate-on-rule-change="false"
					         label-width="80px">
						<div v-if="next == 1">
							<el-form-item label="姓名" required>
								<el-input class="aa_form_item" v-model="form.name" placeholder="请输入活动姓名"></el-input>
							</el-form-item>
							<van-divider />

							<el-form-item label="性别" required>
								<el-radio-group v-model="form.sex">
									<el-radio label="0">男</el-radio>
									<el-radio label="1">女</el-radio>
								</el-radio-group>
							</el-form-item>
							<van-divider />

							<el-form-item label="所在地" required>
								<van-cell v-if="form.area.length > 0" class="app_vcell" is-link @click="showPopup" v-model="form.area"></van-cell>
								<van-cell v-else class="app_vcell" is-link @click="showPopup" v-model="form.area">
								<span class="app_vcell1">
									选择需要显示的城市
								</span>
								</van-cell>
								<van-popup
										v-model="show"
										position="bottom">
									<van-area
											:area-list="areaList" :columns-num="3" ref="myArea"
											:value="form.areaCode"
											title="选择所在地"
											@change="onChange"
											@confirm="onConfirm"
											@cancel="onCancel"
									/>
								</van-popup>
							</el-form-item>
							<van-divider />

							<el-form-item label="联系方式" required>
								<el-input class="aa_form_item" v-model="form.phone" placeholder="请输入联系方式"></el-input>
							</el-form-item>
							<van-divider />

							<div class="app_next">
								<el-button class="app_next_btn" @click="next=2"
								           :style="{ borderColor: colorStyle.main,  background: colorStyle.main }">
									下一步
								</el-button>
							</div>
						</div>

						<div v-else-if="next == 2">
							<el-form-item label="作品名称" required>
								<el-input class="aa_form_item" v-model="form.title" placeholder="请输入作品名称"></el-input>
							</el-form-item>

							<el-form-item class="app_up_eitem" :label="'上传作品（最多上传'+ activityForm.uploadLimit +'张）'" required>
								<van-uploader :file-list="form.fileList"
								              :max-count="activityForm.uploadLimit"
								              :after-read="afterRead" />
							</el-form-item>

							<van-divider />

							<div class="app_next">
								<el-button class="app_next_btn" @click="next=1"
								           :style="{ borderColor: colorStyle.main,  background: colorStyle.main }">
									上一步
								</el-button>

								<el-button class="app_next_btn" @click="sign"
								           :style="{ borderColor: colorStyle.main,  background: colorStyle.main }">
									报名
								</el-button>
							</div>
						</div>
					</el-form>
				</el-card>
				<div class="app_bot">
					<a href="https://www.aiocloud.ltd/#/" target="_blank" :style="{ color: colorStyle.main, }" >爱启云科技</a>提供支持
				</div>
			</div>

			<!--作品详情-->
			<div v-else-if="page=='detail'">
				<div class="app_al">
					<van-icon name="arrow-left" @click="returnPage"/>
				</div>

				<el-carousel class="app_el_carousel" height="200px" v-if="activityForm.fileList.length > 0">
					<el-carousel-item v-for="(item, index) in activityForm.fileList" :key="index">
						<van-image
								width="100%"
								height="200px"
								fit="fill"
								:src="item.url"
						/>
					</el-carousel-item>
				</el-carousel>

				<div v-else class="app_no_img">
					请上传顶部图片
				</div>

				<div class="app_tit_container1" :style="{ background: colorStyle.main }">
					<div class="app_tit_item app_item_bl">
						<div>{{ work.rank }}</div>
						<div>排名</div>
					</div>
					<div class="app_vline"></div>
					<div class="app_tit_item">
						<div>{{ work.votes }}</div>
						<div>票数</div>
					</div>
					<div class="app_vline"></div>
					<div class="app_tit_item app_item_br">
						<div>{{ handleRank() }}</div>
						<div>{{ handleRankDesc() }}</div>
					</div>
				</div>
				<div class="app_work_author">
					{{ work.id }}号 {{ work.author }} {{ work.age }}岁
				</div>
				<div class="app_work_author">
					作品名称：{{ work.name }}
				</div>
				<div v-for="( item, index ) in work.imgs" :key="index">
					<el-image class="app_work_img"
							width="100%"
							height="200px"
							fit="fill"
							:src="item"
					/>
				</div>
				<div class="app_work_btn_main" :style="{ background: colorStyle.main }">
					<div class="app_work_item" @click="showVoteM">
						<div>投 票</div>
					</div>
					<div class="app_vline"></div>
					<div class="app_work_item" @click="createPoster">
						<div>为 我 拉 票</div>
					</div>
				</div>

				<div class="app_bot">
					<a href="https://www.aiocloud.ltd/#/" target="_blank" :style="{ color: colorStyle.main, }" >爱启云科技</a>提供支持
				</div>
			</div>

			<!--投 票-->
			<van-dialog class="app_dialog"
			            use-slot
			            title="提示"
			            v-model="showVote"
			            :showConfirmButton="false"
			            :showCancelButton="true"
			            @close="onClose"
			>
				<div class="app_qrcode">
					<div id="qrcode" ref="qrcodeRef" :style="{ width: '160px', height: '160px' }"></div>
					<div class="app_code_desc">请使用微信扫码后操作</div>
				</div>
			</van-dialog>

			<!--为 我 拉 票 海报-->
			<div ref="imageWrapper" v-show="showPosterScreenshot" id="appPosterMain"
				     :style="{ background: colorStyle.main, padding: '15px', margin: '15px', height: '442px' }">
					<van-image :style="{ width: '100%', height: '160px', marginBottom: '10px', }"
					           :src="require('@/assets/img/em/tp2.png')" />

					<el-card class="app_poster_card">
						<div slot="header" class="app_poster_header">
							<span>{{ activityForm.title }}</span>
						</div>

						<div class="app_poster_author">
							<div :style="{ border: '2px solid ' + colorStyle.main , borderRadius: '3px',}">
								<van-image :style="{ width: '50px', height: '50px', display: 'block', }"
								           :src="work.imgs[0]" />
							</div>
							<div class="app_poster_aname">
								{{ work.author }}
							</div>
						</div>

						<div>
							<div class="app_poster_bottom">
								<div>
									<div class="app_ca">
										长按识别二维码
									</div>

									<div class="app_tp" :style="{ background: colorStyle.main, }">
										请帮我投一票
										<div class="app_poster_right">
											<i class="el-icon-caret-right"></i>
											<i class="el-icon-caret-right app_r1"></i>
											<i class="el-icon-caret-right"></i>
										</div>
									</div>
								</div>

								<div id="voteQrcode" ref="voteQrcodeRef" :style="{ width: '80px', height: '80px', marginLeft: '20px' }"></div>
							</div>
						</div>
					</el-card>
				</div>

			<van-dialog class="app_poster_dialog"
			            use-slot
			            v-model="showVotePoster"
			            :showConfirmButton="false"
			            :showCancelButton="false"
			>
				<van-image class="app_poster" :src="posterImg" />
			</van-dialog>

			<div v-show="showVotePoster" class="app_poster_close">
				<div>
					长按可保存图片
				</div>
				<div @click="closePoster">
					<i class="el-icon-circle-close app_close_icon"></i>
				</div>
			</div>

			<van-overlay class="app_overlay" :show="showOverlay">
				<van-loading class="app_loading" type="spinner" color="#ffffff" vertical>
					生成拉票海报中...
				</van-loading>
			</van-overlay>
		</div>

		<!--介绍-->
		<div v-else-if="active == '1'" class="app_main">
			<el-carousel class="app_el_carousel" height="200px" v-if="activityForm.fileList.length > 0">
				<el-carousel-item v-for="(item, index) in activityForm.fileList" :key="index">
					<van-image
							width="100%"
							height="200px"
							fit="fill"
							:src="item.url"
					/>
				</el-carousel-item>
			</el-carousel>

			<div v-else class="app_no_img">
				请上传顶部图片
			</div>

			<el-card class="app_card">
				<div class="app_tit">
					{{ activityForm.title }}
				</div>
				<div class="app_tit_container">
					<div class="app_tit_item app_item_bl" :style="{ background: colorStyle.total }">
						<div>0</div>
						<div>总票数</div>
					</div>
					<div class="app_vline"></div>
					<div class="app_tit_item" :style="{ background: colorStyle.player }">
						<div>6</div>
						<div>选手数</div>
					</div>
					<div class="app_vline"></div>
					<div class="app_tit_item app_item_br" :style="{ background: colorStyle.access }">
						<div>0</div>
						<div>访问量</div>
					</div>
				</div>
				<div class="app_status">
					活动未开始
				</div>
			</el-card>

			<el-card class="app1_card">
				<div v-html="activityForm.content"></div>
			</el-card>

			<div class="app_bot">
				<a href="https://www.aiocloud.ltd/#/" target="_blank" :style="{ color: colorStyle.main, }" >爱启云科技</a>提供支持
			</div>
		</div>

		<!--排行榜-->
		<div v-else-if="active == '2'" class="app_main">
			<el-carousel class="app_el_carousel" height="200px" v-if="activityForm.fileList.length > 0">
				<el-carousel-item v-for="(item, index) in activityForm.fileList" :key="index">
					<van-image
							width="100%"
							height="200px"
							fit="fill"
							:src="item.url"
					/>
				</el-carousel-item>
			</el-carousel>

			<div v-else class="app_no_img">
				请上传顶部图片
			</div>

			<el-card class="app_card">
				<div class="app_tit">
					{{ activityForm.title }}
				</div>
				<div class="app_tit_container" >
					<div class="app_tit_item app_item_bl" :style="{ background: colorStyle.total }">
						<div>0</div>
						<div>总票数</div>
					</div>
					<div class="app_vline"></div>
					<div class="app_tit_item" :style="{ background: colorStyle.player }">
						<div>6</div>
						<div>选手数</div>
					</div>
					<div class="app_vline"></div>
					<div class="app_tit_item app_item_br" :style="{ background: colorStyle.access }">
						<div>0</div>
						<div>访问量</div>
					</div>
				</div>
				<div class="app_status">
					活动未开始
				</div>
			</el-card>

			<el-card class="app_card">
				<div class="app_rule" :style="{ color: colorStyle.main }">
					<div class="app_hline" :style="{ borderColor: colorStyle.main }"></div>
					活动规则
					<div class="app_hline" :style="{ borderColor: colorStyle.main }"></div>
				</div>
				<div class="app_rule_item">
					<van-icon class="app_rule_icon" name="clock-o" :style="{ color: colorStyle.main }" />投票开始：
					{{ activityForm.voteTimeRange[0] }}
				</div>
				<div class="app_rule_item">
					<van-icon class="app_rule_icon" name="clock-o" :style="{ color: colorStyle.main }" />投票截止：
					{{ activityForm.voteTimeRange[1] }}
				</div>
				<div class="app_rule_item mb-10">
					<van-icon class="app_rule_icon" name="info-o" :style="{ color: colorStyle.main }" />投票规则： 每个微信号投票期间只能投1次
				</div>
			</el-card>

			<el-card class="app_card1">
				<div class="app_rank_top" :style="{ background: colorStyle.main }">
					活动排行榜
				</div>

				<div class="app_rank_item" v-for="(item, index) in rankings" :key="index">
					<div v-if="index == '0'" class="app_sort">
						<i class="guangjun app_sort_icon"></i>
					</div>
					<div v-else-if="index == '1'" class="app_sort">
						<i class="yajun app_sort_icon"></i>
					</div>
					<div v-else-if="index == '2'" class="app_sort">
						<i class="jijun app_sort_icon"></i>
					</div>
					<div v-else class="app_sort">
						{{ index+1 }}
					</div>
					<el-image class="app_rank_img"
					          :src="item.imgs[0]"
					          fit="fill"></el-image>
					<div class="app_rank_item">
						<div class="app_rank_no">
							{{ item.id }}号
						</div>
						<div class="app_rank_author">
							{{ item.author }}
						</div>
						<div class="app_rank_vote">
							{{ item.votes }}票
						</div>
					</div>
				</div>
				<div class="app_rank_bottom" :style="{ background: colorStyle.main }">
					显示更多
				</div>
			</el-card>

			<van-search class="app_search"
			            v-model="search"
			            show-action
			            placeholder="请输入姓名或编号搜索"
			            @search="onSearch"
			            background="#ffffff"
			>
				<div class="app_search_prefix" slot="action" @click="onSearch"
				     :style="{ background: colorStyle.main, borderColor: colorStyle.main }"
				>搜索</div>
			</van-search>

			<div class="app_bot">
				<a href="https://www.aiocloud.ltd/#/" target="_blank" :style="{ color: colorStyle.main, }" >爱启云科技</a>提供支持
			</div>
		</div>

		<van-tabbar class="app_footer" v-model="active"
		            :active-color="colorStyle.main"
		            inactive-color="#999"
		>
			<van-tabbar-item v-for="(item, index) in menus" :key="index"
			                 badge="" @click="toPage(item, index)">
				<span>{{item.name}}</span>
				<template #icon="props">
					<i :class="item.icon + ' app_icon'"></i>
				</template>
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>
<!--eslint-disable-->
<script>
    import Area from '@/assets/json/area.js'
    import { Dialog } from 'vant';
    import html2canvas from "html2canvas";
    import QRCode from 'qrcodejs2'

    export default {
        name: "app",
	    props: [ "activityForm" ],
	    components: {Dialog},
	    mounted() {
		    this.areaList = Area;
	    },
	    methods: {
            sign() {
              this.page = "detail";
              this.work = this.rankings[0];
            },

            returnPage() {
                this.page = "vote";
            },

            closePoster() {
                this.showVotePoster = false;
                this.$refs.voteQrcodeRef.innerHTML = '';
            },

            createPoster() {
                this.getQrcode(
                    this.$aiocUrl.rootUrl + "am?page=detail&workId=" + this.work.id,
                    this.$refs.voteQrcodeRef,
                    90, 90
                );

                // 生成海报
                this.showPosterScreenshot = true;
                this.showOverlay = true;
                var vm = this;
                setTimeout(function(){
                    html2canvas(vm.$refs.imageWrapper,
                    ).then(canvas => {
                        let dataURL = canvas.toDataURL("image/png");
                        vm.posterImg = dataURL;
                        vm.showPosterScreenshot = false;
                        vm.showOverlay = false;
                        vm.showVotePoster = true;
                    });
                }, 1000);
            },

            toSignUp() {
				this.page = 'signup';
            },

            toOrder() {
				this.active = 2;
            },

            setColor() {
                this.$nextTick(function () {
                    this.colorStyle = this.activityForm.colorStyle;
                });
            },

            toPage(item, index) {
	            if(item.page == "vote") {
		            this.page = "vote";
	            }
            },
            onSearch(val) {
                Toast(val);
            },
            onCancel() {
                Toast('取消');
            },

            boost() {
                this.showGift = true;
            },

            setGiftNum(value) {
                this.giftNum = value;
            },

            setGift(item) {
				this.gift = item;
            },

            handleAreaCascader() {
                if (this.$refs.areaCascaderRef) {
                    this.$refs.areaCascaderRef.dropDownVisible = false; //监听值发生变化就关闭它
                }
                this.$utils.setStorage("area", this.area);
                location.reload();
            },

            // 弹出层显示
            showPopup() {
                this.show = true;

            },
            //value=0改变省，1改变市，2改变区
            onChange(picker, index, value){
                let val = picker.getValues();
                let areaName = ''
                for (var i = 0; i < val.length; i++) {
                    areaName = areaName+(i==0?'':'/')+val[i].name
                }
                this.form.area = areaName;
            },
            //确定选择城市
            onConfirm(val){
                this.show = false//关闭弹框
                let areaName = ''
                for (var i = 0; i < val.length; i++) {
                    areaName = areaName+(i==0?'':'/')+val[i].name
                }
                this.form.area = areaName;
            },
            //取消选中城市
            onCancel(){
                this.show = false
                this.$refs.myArea.reset()// 重置城市列表
            },

            toDetail(item) {
                this.work = item;
                this.page = "detail";
            },

            handleRank() {
                if (this.work.rank == 1) {
					return "榜首";
                }
                for(var i in this.rankings) {
                    let ranking = this.rankings[i];
                    if( ranking.rank == ( this.work.rank-1 ) ) {
						return ( ranking.votes - this.work.votes ) + "票";
                    }
                }
            },

            handleRankDesc() {
                if (this.work.rank == 1) {
					return "当前";
                } else {
                    return "距上一名";
                }
            },

            showVoteM() {
                this.showVote = true;
                this.$nextTick(function () {
                    this.qrcode = new QRCode(this.$refs.qrcodeRef, {
                        width: 160,
                        height: 160,
                        text: this.$aiocUrl.rootUrl + "am",
                        colorDark : "#000000",
                        colorLight : "#ffffff",
                        correctLevel: QRCode.CorrectLevel.H
                    });
                });
            },

            onClose() {
                this.showVote = false;
                this.$refs.qrcodeRef.innerHTML = '';
            },

            getQrcode(url, ref, width, height) {
                this.$nextTick(function () {
                    this.qrcode = new QRCode(ref, {
                        width: width,
                        height: height,
                        text: url,
                        colorDark : "#000000",
                        colorLight : "#ffffff",
                        correctLevel: QRCode.CorrectLevel.H
                    });
                });
            },
	    },
	    data() {
            return {
                qrcode: "",
                showOverlay: false,
                showPosterScreenshot: false,
                posterImg: "",
                showVotePoster: false,
                showVote: false,
                work: {
                    id: "1",
                    imgs: [
                        require('@/assets/img/icon/nopeople.jpg')
                    ],
                    name: "我为祖国献石油",
                    author: "徐腾",
                    age: "38",
                    rank: 1,
                    votes: 12530,
                },
                next: 1,
                show:false,
                carmodel:'',
                areaList: "",
                form: {
                    areaCode: "340000",
                    area: "",
                    phone: "",
                    sex: "",
                    name: "",
                    title: "",
                    fileList: [],
                },
                page: "vote",
                colorStyle: {
                    main: "#0C2AA4",
                    total: "#0C2AA4",
                    player: "#0C2AA4",
                    access: "#0C2AA4",
                },
                gift: "",
                giftNum: 1,
                gifts: [
	                {
	                    img: require('@/assets/img/icon/zhangsheng.png'),
		                name: "掌声",
                        votes: "5",
		                price: "5"
	                },
                    {
                        img: require('@/assets/img/icon/xianhua.png'),
                        name: "鲜花",
                        votes: "10",
                        price: "10"
                    },
                    {
                        img: require('@/assets/img/icon/qiaokeli.png'),
                        name: "巧克力",
                        votes: "20",
                        price: "15"
                    },
                    {
                        img: require('@/assets/img/icon/shuijinqiu.png'),
                        name: "水晶球",
                        votes: "30",
                        price: "24"
                    },
                    {
                        img: require('@/assets/img/icon/huangguan.png'),
                        name: "皇冠",
                        votes: "50",
                        price: "40"
                    },

                    {
                        img: require('@/assets/img/icon/chengbao.png'),
                        name: "城堡",
                        votes: "100",
                        price: "80"
                    }
                ],
                showGift: false,
                rankings: [
	                {
	                    id: "1",
	                    imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
	                    ],
                        name: "我为祖国献石油",
		                author: "徐腾",
		                age: "38",
                        rank: 1,
                        votes: 12530,
	                },
                    {
                        id: "2",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 2,
                        votes: 10235,
                    },
                    {
                        id: "3",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 3,
                        votes: 9823,
                    },
                    {
                        id: "4",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 4,
                        votes: 9725,
                    },
                    {
                        id: "5",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 5,
                        votes: 9023,
                    },
                    {
                        id: "6",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 6,
                        votes: 8925,
                    },
                    {
                        id: "7",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 7,
                        votes: 8826,
                    },
                    {
                        id: "8",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 8,
                        votes: 8236,
                    },
                    {
                        id: "9",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 9,
                        votes: 8162,
                    },
                    {
                        id: "10",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 10,
                        votes: 7230,
                    },
                    {
                        id: "11",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 11,
                        votes: 6523,
                    },
                    {
                        id: "12",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 12,
                        votes: 5510,
                    },
                    {
                        id: "13",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 13,
                        votes: 4203,
                    },
                    {
                        id: "14",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 14,
                        votes: 3201,
                    },
                    {
                        id: "15",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 15,
                        votes: 2560,
                    }
                ],
                search: "",
                active: 0,
                menus: [
                    {
                        name: "投票",
                        icon: "elh-personnel",
                        page: "vote",
                    },
                    {
                        name: "介绍",
                        icon: "elh-jieshao1",
                        page: "introduction",
                    },
                    {
                        name: "排行",
                        icon: "elh-paihangbang",
                        page: "ranking",
                    },
                    // {
                    //     name: "报名",
                    //     icon: {
                    //         active: require("@/assets/img/icon/baoming.png"),
                    //         inactive: require("@/assets/img/icon/baoming-o.png"),
                    //     },
                    //     page: "storeMy",
                    // },
                ],
            }
	    }
    }
</script>

<style scoped>
	.app_no_img {
		height: 200px;
		width: 100%;
		line-height: 200px;
		text-align: center;
		background: #eeeeee;
		color: #f5222d;
		font-size: 14px;
	}
	#qrcode{
		width: 100px;
		height: 100px;
	}
	.app_qrcode {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.app_loading {
		top: 50%;
	}
	.app_overlay {
		width: 370px;
		height: 640px;
		margin-top: 0px;
		margin-left: 0px;
		position: absolute;
		top: 0px;
		left: 0;
		z-index: 2000;
		background-color: rgba(0,0,0,.7);
	}
	.app_close_icon {
		font-size: 40px;
		margin-top: 20px;
	}
	.app_poster_close {
		position: absolute;
		bottom: 30px;
		left: calc((100% - 100px)/2);
		color: #ffffff;
		z-index: 2100;
		width: 120px;
		text-align: center;
	}
	.app_poster {
		display: block;
	}
	.app_ca {
		font-size: 16px;
		font-weight: 600;
		line-height: 32px;
	}
	.app_poster_bottom {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		padding-top: 10px;
		padding-bottom: 10px;
	}
	.app_poster_bottom > div:nth-of-type(1) {
		min-width: 150px;
	}
	.app_tp {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
		height: 30px;
		line-height: 30px;
		width: 100%;
		border-radius: 15px;
		color: #ffffff;
		font-size: 14px;
		font-weight: 600;
	}
	.app_poster_aname {
		font-size: 15px;
		font-weight: 600;
		margin-left: 10px;
	}
	.app_poster_author {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		padding-bottom: 20px;
		border-bottom: 1px dashed #EBEEF5;
	}
	.app_poster_header {
		text-align: left;
		font-size: 14px;
	}
	.app_code_desc {
		line-height: 30px;
		color: #999;
		font-size: 14px;
	}
	.app_al {
		height: 30px;
		line-height: 30px;
		width: 30px;
		border-radius: 15px;
		opacity: 0.8;
		background: rgba(0,0,0,.4);
		color: #ffffff;
		font-size: 18px;
		position: absolute;
		top: 10px;
		left: 10px;
		z-index: 3000;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
	}
	.app_work_btn_container {
		padding: 10px 10px;
		margin: 10px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	}
	.app_work_btn_main {
		display: flex;
		flex-wrap: nowrap;
		margin: 10px;
		padding: 15px;
		border-radius: 10px;
	}
	.app_work_item {
		color: #ffffff;
		width: 50%;
	}
	.app_work_btn {
		margin: 10px;
		padding: 20px 0px;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	}
	.app_work_author {
		height: 50px;
		line-height: 50px;
	}
	.app_work_img {
		border-radius: 10px;
	}
	.app_tit_container1 {
		display: flex;
		flex-wrap: nowrap;
		margin: 10px;
		padding: 15px;
		border-radius: 10px;
	}
	.app_next_btn {
		width: 150px;
		color: #ffffff;
		border-radius: 20px;
	}
	.app_next {
		text-align: center;
	}
	.app_vcell1 {
		color: #909399;
	}
	.app_form {
		padding-top: 20px;
		padding-bottom: 20px;
		text-align: left;
	}
	.app_rank_bottom {
		/*background: #0C2AA4;*/
		color: #ffffff;
		height: 30px;
		width: 80px;
		line-height: 30px;
		border-radius: 5px;
		font-size: 14px;
		margin: 0 auto;
		margin-top: 20px;
		border-radius: 15px;
	}
	.app_rank_top {
		/*background: #0C2AA4;*/
		color: #ffffff;
		height: 40px;
		line-height: 40px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}
	.app_rank_vote {
		min-width: 80px;
	}
	.app_sort {
		min-width: 40px;
		color: #ff4d4f;
	}
	.guangjun {
		background: url("../../../assets/img/icon/guangjun.png") 0 0 no-repeat;
		background-size: 100% 100%;
	}
	.jijun {
		background: url("../../../assets/img/icon/jijun.png") 0 0 no-repeat;
		background-size: 100% 100%;
	}
	.yajun {
		background: url("../../../assets/img/icon/yajun.png") 0 0 no-repeat;
		background-size: 100% 100%;
	}
	.app_sort_icon {
		display: inline-block;
		width: 22px;
		height: 22px;
	}
	.app_rank_no {
		color: #999;
		width: 40px;
	}
	.app_rank_author {
		width: 150px;
		min-width: 150px;
		text-align: left;
	}
	.app_rank_item {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		font-size: 14px;
		margin: 10px 0px;
	}
	.app_icon {
		font-size: 20px;
		text-align: center;
	}
	.app_num {
		position: absolute;
		top: 0;
		left: 0;
		padding: 5px;
		font-size: 14px;
		color: #ffffff;
		background: #8c8c8c;
		border-radius: 10px;
	}
	.app_active {
		border: 2px solid #0C2AA4 !important;
		border-radius: 5px;
	}
	.app_eld_btn_send {
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
		display: inline-block;
		width: 70px;
		border: 1px solid;
		/*background: #0C2AA4;*/
		height: 36px;
		line-height: 35px;
		text-align: center;
		color: #ffffff;
		font-size: 14px;
	}
	.app_eld_btn {
		border-top-left-radius: 20px;
		border-bottom-left-radius: 20px;
		border-top-right-radius: 0px;
		border-bottom-right-radius: 0px;
		width: 70px;
		border-left: 1px solid;
		border-top: 1px solid;
		border-bottom: 1px solid;
		border-right: 0px !important;
	}
	.app_eld {
		text-align: right;
		margin-bottom: 10px;
		padding-right: 10px;
	}
	.app_action_container {
		display: flex;
		flex-wrap: wrap;
	}
	.app_item {
		text-align: center;
		width: 33%;
		margin-bottom: 10px;
		padding: 10px;
		border: 2px solid #ffffff;
		border-radius: 5px;
	}
	.app_item_text {
		font-size: 12px;
		line-height: 20px;
		color: #333333;
	}
	.app_item_price {
		font-size: 12px;
		line-height: 18px;
		color: #666;
	}
	.app_desc {
		font-size: 14px;
		color: #ffffff;
		line-height: 22px;
		margin-bottom: 10px;
		/*background: #0C2AA4;*/
		padding: 10px;
		border-radius: 3px;
	}
	.app_action {
		padding: 10px;
		text-align: left;
	}
	.app_bot {
		font-size: 14px;
		line-height: 40px;
		color: #666;
	}
	.app_bot a {
		font-weight: 600;
	}
	.app_witem_zan {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
	}
	.jiangbei {
		width: 18px;
		height: 18px;
		margin-right: 5px;
	}
	.app_witem {
		width: 50%;
		height: 40px;
		line-height: 40px;
		color: #ffffff;
		font-size: 14px;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
	}
	.app_works_info {
		font-size: 14px;
		text-align: left;
		line-height: 22px;
	}
	.app_works_container {
		/*background: #0C2AA4;*/
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		height: 30px;
		font-size: 14px;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}
	.app_rank_img {
		border-radius: 3px;
		width: 40px;
		min-width: 40px;
		height: 40px;
	}
	.app_works_img {
		border-top-right-radius: 10px;
		border-top-left-radius: 10px;
	}
	.app_works_item {
		width: 48%;
		margin-bottom: 20px;
		position: relative;
	}
	.app_works {
		display: flex;
		flex-wrap: wrap;
		margin: 10px;
	}
	.app_search_prefix {
		width: 70px;
		height: 40px;
		line-height: 40px;
		border: 1px solid;
		/*border: 1px solid #0C2AA4;*/
		/*background: #0C2AA4;*/
		color: #ffffff;
		margin-right: 10px;
		border-bottom-right-radius: 10px;
		border-top-right-radius: 10px;
	}
	.el-icon-trophy, .el-icon-edit-outline {
		margin-right: 5px;
	}
	.app_fun_item {
		width: 50%;
		height: 40px;
		line-height: 40px;
		color: #ffffff;
		font-size: 14px;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
	}
	.app_vline1 {
		border-left: 1px solid #bfbfbf;
		height: 15px;
	}
	.app_fun_container {
		/*background: #0C2AA4;*/
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		height: 40px;
		margin: 10px;
		font-size: 14px;
		border-radius: 10px;
	}
	.app_rule_icon  {
		/*font-weight: 600;*/
		margin-right: 5px;
	}
	.app_rule_item {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: flex-start;
		font-size: 14px;
		color: #595959;
		margin-top: 5px;
		height: 22px;
	}
	.app_rule {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		padding: 10px;
		line-height: 22px;
		/*color: #0C2AA4;*/
	}
	.app_hline {
		border-top: 1px solid;
		width: 40px;
		margin: 0 5px;
	}
	.app_card1 {
		margin: 15px 10px;
		position: relative;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}
	.app_card {
		margin: 15px 10px;
		border-radius: 10px;
	}
	.app1_card {
		margin: 15px 10px;
		border-radius: 10px;
	}
	.app_tit {
		padding: 10px 0;
		text-align: left;
		line-height: 26px;
	}
	.app_status {
		padding: 10px;
		text-align: center;
		font-size: 14px;
		color: #999;
	}
	.app_vline {
		border-left: 1px solid #FFFFFF;
	}
	.app_tit_container {
		/*background: #0C2AA4;*/
		display: flex;
		flex-wrap: nowrap;
		padding: 15px;
	}
	.app_item_br {
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
	}
	.app_item_bl {
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
	}
	.app_tit_item {
		text-align: center;
		width: 33%;
		height: 60px;
		line-height: 20px;
		color: #ffffff;
		font-size: 14px;
		padding: 10px 0;
	}
	.app_tit_item div:nth-of-type(1) {
		font-size: 18px;
	}
	.app_main {
		height: 590px;
		overflow-y: auto;
	}
	.app_footer {
		position: absolute !important;
		bottom: 0;
		left: 0;
	}
	.app_container {
		height: 100%;
		width: 100%;
		position: relative;
	}
	div::-webkit-scrollbar {
		width: 0;
	}
</style>

<style>
	.app_poster_card .el-card__header {
		background: #ffffff;
	}
	.app_poster_card .el-card__body {
		background: #ffffff;
	}
	.app_poster_dialog {
		position: absolute !important;
		top: 45%;
		left: 50%;
		width: 320px;
		overflow: hidden;
		font-size: 16px;
		background-color: #fff;
		border-radius: 3px;
		-webkit-transform: translate3d(-50%,-50%,0);
		transform: translate3d(-50%,-50%,0);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-transition: .3s;
		transition: .3s;
		-webkit-transition-property: opacity,-webkit-transform;
		transition-property: opacity,-webkit-transform;
		transition-property: transform,opacity;
		transition-property: transform,opacity,-webkit-transform;

	}
	.app_dialog .van-dialog__header {
		padding: 20px;
		color: #f5222d;
	}
	.app_dialog {
		position: absolute !important;
		top: 45%;
		left: 50%;
		width: 320px;
		overflow: hidden;
		font-size: 16px;
		background-color: #fff;
		border-radius: 16px;
		-webkit-transform: translate3d(-50%,-50%,0);
		transform: translate3d(-50%,-50%,0);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-transition: .3s;
		transition: .3s;
		-webkit-transition-property: opacity,-webkit-transform;
		transition-property: opacity,-webkit-transform;
		transition-property: transform,opacity;
		transition-property: transform,opacity,-webkit-transform;
	}
	.app_up_eitem .el-form-item__label {
		float: none;
	}
	.app_vcell {
		padding: 10px 0px;
	}
	.van-cell::after {
		position: absolute;
		box-sizing: border-box;
		content: ' ';
		pointer-events: none;
		right: 16px;
		bottom: 0;
		left: 16px;
		border-bottom: 0px solid #ebedf0;
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
	}
	.app_form .el-input__inner {
		border-radius: 0px;
		border: 0px;
		padding: 0px;
	}
	.app_form .el-form-item__content {
		position: unset;
	}
	.app_form .el-form-item {
		margin-bottom: 10px !important;
	}
	.el-dropdown-menu {
		z-index: 2010 !important;
		padding: 0px;
		margin: 20px 0;
	}
	.el-dropdown-menu__item {
		width: 60px !important;
		text-align: center;
		border-bottom: 1px solid #eee;
	}
	.van-overlay {
		width: 370px;
		height: 640px;
		margin-left: 0px;
		margin-top: 0px;
		position: absolute;
	}
	.van-popup {
		position: absolute;
		bottom: 0px;
	}
	.van-search__action {
		padding: 0px;
	}
	.app_search .van-search__content {
		height: 40px;
		background-color: #ffffff;
		border: 1px solid #d9d9d9;
		border-right: 0px;
		border-top-right-radius: 0px;
		border-bottom-right-radius: 0px;
		border-bottom-left-radius: 10px;
		border-top-left-radius: 10px;
	}
	.app_search .van-field__left-icon {
		line-height: 30px;
	}
	.app_search .van-field__control {
		line-height: 30px;
	}
	[class*=" el-icon-"], [class^=el-icon-] {
	}
	.app_card1 .el-card__body {
		padding: 0px;
		padding-bottom: 10px;
	}
	.app_card .el-card__body {
		padding: 0 10px;
	}
</style>