<template>
	<!--eslint-disable-->
	<!--<div>-->
		<!--/* 以下是支付确认html */-->
		<!--<div :style="{text:'#000000', bgColor:'#ffffff', leftMargin: 0, topMargin:4}">-->
			<!--<header class="am-header">-->
				<!--<h1>支付确认</h1>-->
			<!--</header>-->
			<!--<el-form ref="form" :model="form" label-width="80px">-->

				<!--<div id="main">-->
					<!--<div id="body1" class="show" name="divcontent">-->
						<!--<dl class="content">-->
							<!--<dt>商户订单号 ：</dt>-->
							<!--<dd>-->
								<!--<el-input v-model="form.out_trade_no"></el-input>-->
							<!--</dd>-->
							<!--<hr class="one_line"/>-->
							<!--<dt>订单名称 ：</dt>-->
							<!--<dd>-->
								<!--<el-input v-model="form.subject"></el-input>-->
							<!--</dd>-->
							<!--<hr class="one_line"/>-->
							<!--<dt>付款金额 ：</dt>-->
							<!--<dd>-->
								<!--<el-input v-model="form.total_amount"></el-input>-->
							<!--</dd>-->
							<!--<hr class="one_line"/>-->
							<!--<dt>商品描述：</dt>-->
							<!--<dd>-->
								<!--<el-input v-model="form.body"></el-input>-->
							<!--</dd>-->
							<!--<hr class="one_line"/>-->
							<!--<dd id="btn-dd">-->
	                <!--<span class="new-btn-login-sp">-->
	                  <!--<button class="new-btn-login" style="text-align: center;" @click="payOrder()">付 款</button>-->
	                <!--</span>-->
								<!--<span class="note-help">如果您点击“付款”按钮，即表示您同意该次的执行操作。</span>-->
							<!--</dd>-->
						<!--</dl>-->
					<!--</div>-->
				<!--</div>-->
			<!--</el-form>-->
		<!--</div>-->

		<!--<vue-qr class="wximg"-->
		        <!--:size="191"-->
		        <!--:margin="0"-->
		        <!--:auto-color="true"-->
		        <!--:dot-scale="1"-->
		        <!--:text="codeUrl"/>-->

	<!--</div>-->
	<div>
		<div id="container">
			<div id="fireworks"><img src="imgs/fireworks.png" alt=""></div>
			<div id="firecracker"><img src="imgs/firecracker.png" alt="" width="8px"></div>
		</div>
	</div>
</template>
<!--eslint-disable-->
<script>
    import VueQr from 'vue-qr'

    export default {
        name: "test",
        components: {
            VueQr
        },
        data() {
            return {
                form: {
                    // out_trade_no: '20111562356',
                    out_trade_no: this.$utils.random_No(4),
                    subject: '测试',
                    total_amount: 0.01,
                    body: '测试11'
                },
                codeUrl: "",
            }
        },
        methods: {
            //去往支付页面函数
            async payOrder() {
                let params = new FormData()
                params.append("outTradeNo",  this.form.out_trade_no);
                params.append("subject",  this.form.subject);
                params.append("totalAmount",  this.form.total_amount);
                params.append("body",  this.form.body);
                params.append("payWay",  "1");
                params.append("notify_url",  "1");
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_pay_to, params, "POST");
                if (data.code == 200) {
                    // 支付宝
                    // document.querySelector('body').innerHTML = data.data;
                    // document.forms[0].submit();
	                this.codeUrl = data.data.code_url;
	                console.log(data.data)
                    return true;
                }
            },


        }
    }
</script>

<style>
	/* 以下是支付确认样css*/
	.am-header {
		display: -webkit-box;
		display: -ms-flexbox;
		/* display: flex; */
		width: 100%;
		position: relative;
		padding: 15px 0;
		-webkit-box-sizing: border-box;
		-ms-box-sizing: border-box;
		box-sizing: border-box;
		background: #1d222d;
		height: 50px;
		text-align: center;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		box-pack: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		box-align: center;
	}

	.am-header h1 {
		-webkit-box-flex: 1;
		-ms-flex: 1;
		box-flex: 1;
		line-height: 18px;
		text-align: center;
		font-size: 18px;
		font-weight: 300;
		color: #fff;
	}

	#main {
		width: 100%;
		margin: 0 auto;
		font-size: 14px;
	}

	.show {
		clear: left;
		display: block;
	}

	.content {
		margin-top: 5px;
	}

	.content dt {
		width: 100px;
		display: inline-block;
		float: left;
		margin-left: 20px;
		color: #666;
		font-size: 13px;
		margin-top: 8px;
	}

	.content dd {
		margin-left: 120px;
		margin-bottom: 5px;
	}

	.content dd input {
		width: 85%;
		height: 28px;
		border: 0;
		-webkit-border-radius: 0;
		-webkit-appearance: none;
		inputoutline: none;
	}

	.one_line {
		display: block;
		height: 1px;
		border: 0;
		border-top: 1px solid #eeeeee;
		width: 100%;
		margin-left: 20px;
	}

	#btn-dd {
		margin: 20px;
		text-align: center;
	}

	.new-btn-login-sp {
		padding: 1px;
		display: inline-block;
		width: 75%;
	}

	.new-btn-login {
		background-color: #02aaf1;
		color: #ffffff;
		font-weight: bold;
		border: none;
		width: 100%;
		height: 50px;
		border-radius: 5px;
		font-size: 16px;
	}

	.note-help {
		color: #999999;
		font-size: 12px;
		line-height: 100%;
		margin-top: 5px;
		width: 100%;
		display: block;
	}


	* {
		margin: 0;
		padding: 0;
	}
	#container{
		width: 500px;
		height: 500px;
		background-color: black;
		position: relative;
	}
	#fireworks{
		position: absolute;
		left: 50%;
		margin-left: -250px;
		bottom: 60%;
		margin-bottom: -180px;
		transform: scale(0);
		animation: fireworks 5s 3s;
	}

	@keyframes fireworks {
		0%{
			transform: scale(0);
		}
		80%{
			transform: scale(1);
		}
		100%{
			opacity: 0;
		}
	}
	#firecracker{
		position: absolute;
		left: 50%;
		bottom: 0%;
		margin-left: -4px;
		animation: firecracker 3s forwards;
	}

	@keyframes firecracker {
		0%{
			transform: scale(1);
			bottom: 0%;
		}
		100%{
			bottom: 60%;
			transform: scale(0);
		}
	}
</style>

