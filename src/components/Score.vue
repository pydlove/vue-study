<template>
    <div>
        <canvas ref="canvas" v-if="change" id="canvas" width="150" height="150"></canvas>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                change: true,
                text:['活跃度极高','活跃度高','活跃度良好','活跃度差','活跃度极差']
            };
        },
        props: ['score'],
        methods: {
            canvasScore(id, getScore) {
                const vm = this;
                let fillText="活跃度未知";
                if(getScore < 40) {
                    fillText=vm.text[4];
                } else if (getScore > 40 && getScore < 60) {
                    fillText=vm.text[3];
                } else if (getScore > 60 && getScore < 80) {
                    fillText=vm.text[2];
                } else if (getScore >= 80 && getScore < 90) {
                    fillText=vm.text[1];
                } else if (getScore >= 90) {
                    fillText=vm.text[0];
                }
                new init(this.$refs.canvas, {
                    teamNum: 20,
                    radius: 10 / 2,
                    fullMarks:100,
                    grade:getScore,
                    color:'#44AAC9',
                    fillColor:'#ffffff',
                    function:function(ctx,options){
                        ctx.font = '500 28px microsoft yahei';
                        ctx.textAlign = 'center';
                        ctx.fillStyle  = '#ffffff';
                        ctx.fillText(options.grade, options.circle_x, options.circle_y);
                        ctx.font = '500 20px microsoft yahei';
                        ctx.textAlign = 'center';
                        ctx.fillStyle  = '#ffffff';
                        ctx.fillText(fillText, options.circle_x, options.circle_y+35);
                    }
                })

            }
        },
        mounted() {
            this.canvasScore('canvas', this.score);
        },
        watch: {
            'score'() {
                this.change = false;
                this.$nextTick(() => {
                    this.change = true;
                    this.$nextTick(() => {
                        this.canvasScore('canvas', this.score);
                    });
                });
            }
        }
    };

    /**
     * @desc:canvas绘画芝麻分仪表盘
     * @param:canvas canvas自身
     * @param:options  options配置
     * @param:options-width  canvas宽度
     * @param:options-height  canvas高度
     * @param:options-teamNum 小圆的个数
     * @param:options-radius 小圆的直径
     * @param:options-designChartWidth //设计图宽度 默认750
     * @param:options-fillColor //小圆达到指标后的填充颜色
     * @param:options-color //小圆的默认颜色
     * @param:options-fontSzie //字体大小
     * @param:options-fontColor //字体颜色
     * @param:options-fullMarks//总分数
     * @param:options-grade//目标分数
     * @param:options-function//其他操作 函数 接受ctx-canvas 2d options-配置
     */
    function init(canvas, options) {
        if (!options) {
            options = {};
        }
        var cxt = canvas.getContext('2d');
        // var clientWidth = document.documentElement.clientWidth;//根据设计图中的canvas画布的占比进行设置
        // options.width = 80;//canvas的宽
        // options.height = 80;//canvas的高
        // var canvasWidth = Math.floor(clientWidth * options.width / (options.designChartWidth ? options.designChartWidth : 750));
        // var canvasHeight =  Math.floor(clientWidth * options.height / (options.designChartWidth ? options.designChartWidth : 750));
        var canvasWidth = 200;
        var canvasHeight = 180;
        canvas.setAttribute('width', canvasWidth*this.getDevicePixelRatio());
        canvas.setAttribute('height', canvasHeight*this.getDevicePixelRatio());
        canvas.style.width = canvasWidth+'px';
        canvas.style.height = canvasHeight+'px';
        options.radius = options.radius || 50 / 10;//小圆的直径
        options.radius = options.radius*this.getDevicePixelRatio()
        options.team_num = options.teamNum || 10;//小圆的个数
        options.circle_r = canvas.getAttribute('width') / 2 - options.radius; // 半径
        options.circle_x = 0 + options.circle_r + options.radius; // 圆心坐标x
        options.circle_y = 0 + options.circle_r + options.radius;//圆心坐标y
        this.loadTeams(cxt, options);
    }
    init.prototype = {
        loadTeams(cxt, options) {//加载布局模拟图
            this.font(cxt, options);
            this.seating(cxt, options);
        },
        font(cxt, options) {//加载图中文案
            if(options.function){
                options.function(cxt, options);
            }
        },
        seating(cxt, options) { //分配小圆座次
            var angle = 230 / options.teamNum; //角度
            var a = options.fullMarks/options.teamNum;//计算每个小圆代表的值
            var team_x = 0, team_y = 0;
            var team_r = options.radius; // options.team_num < 20 ? 10 : Math.sqrt(options.circle_r * options.circle_r * 2 * (1 - Math.cos(changeRadian(angle)))) / 2;
            //余弦定理  计算小圆的最大半径     BC2=AB2＋AC2－2×AB×AC×cosα  如果小圆数目小于20个，半径最大30（上限）
            for (var i = 0; i < options.teamNum; i++) {
                team_x = options.circle_x + Math.sin(this.changeRadian((i * angle) + 250.9)) * options.circle_r;  //角度转弧度
                team_y = options.circle_y - Math.cos(this.changeRadian((i * angle) + 250.9)) * options.circle_r;
                cxt.beginPath();
                cxt.arc(team_x, team_y, team_r, 0, 2 * Math.PI);
                if((i+1)*a<=options.grade)cxt.fillStyle = options.fillColor ? options.fillColor : 'red';
                else cxt.fillStyle = options.color ? options.color : '#333333';
                cxt.fill();
            }
        },
        changeRadian(angle) { //角度转换为弧度
            return Math.PI / 180 * angle;
        },
        getDevicePixelRatio (){//避免手机端失帧
            return window.devicePixelRatio || 1;
        }
    }
</script>

<style scoped>

</style>