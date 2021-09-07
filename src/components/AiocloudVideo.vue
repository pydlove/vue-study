<template>
  <!--eslint-disable-->
  <div>
    <video-player :class="playing?'aioc-video':'' + ' video-player vjs-custom-skin'"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions"
                  @play="onPlayerPlay($event)"
                  @pause="onPlayerPause($event)"
                  @ended="onPlayerEnded($event)"
                  @waiting="onPlayerWaiting($event)"
                  @playing="onPlayerPlaying($event)"
                  @loadeddata="onPlayerLoadeddata($event)"
                  @timeupdate="onPlayerTimeupdate($event)"
                  @canplay="onPlayerCanplay($event)"
                  @canplaythrough="onPlayerCanplaythrough($event)"
                  @statechanged="playerStateChanged($event)"
                  @ready="playerReadied"></video-player>
    <div v-if="playing" class="aioc-model" :style="{ width: clientWidth + 'px', height: clientHeight + 'px'}"></div>
    <div v-if="playing" class="close-video">
      <div @click="closeVideo">关闭视频</div>
    </div>
  </div>
</template>
<!--eslint-disable-->
<script>
export default {
  name: "AiocloudVideo",
  props: [
    "sources", "video"
  ],
  data() {
    return {
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4",
          src: '' // url地址
        }],
        poster: '', // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 是否显示全屏按钮
        }
      },
      playing: false,
      clientWidth:  document.body.clientWidth,
      clientHeight: document.body.clientHeight,
      currentPlayer: "",
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
  },
  mounted() {
    this.playerOptions.sources = this.sources;
  },
  methods: {
    closeVideo() {
      this.playing = false;
      this.currentPlayer = "";
      this.player.pause();
    },

    // 播放回调
    onPlayerPlay(player) {
      this.currentPlayer = player;
      this.playing = true;
      this.$emit("setCurrentVideo", this.video);
    },

    // 暂停回调
    onPlayerPause(player) {
    },

    // 视频播完回调
    onPlayerEnded($event) {
    },

    // DOM元素上的readyState更改导致播放停止
    onPlayerWaiting($event) {
    },

    // 已开始播放回调
    onPlayerPlaying($event) {
    },

    // 当播放器在当前播放位置下载数据时触发
    onPlayerLoadeddata($event) {
    },

    // 当前播放位置发生变化时触发。
    onPlayerTimeupdate($event) {
    },

    //媒体的readyState为HAVE_FUTURE_DATA或更高
    onPlayerCanplay(player) {
    },

    //媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。
    onPlayerCanplaythrough(player) {
    },

    //播放状态改变回调
    playerStateChanged(playerCurrentState) {
    },

    //将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数。。
    playerReadied(player) {
    }
  },


  // type："video/webm"   // 可以播放，用ogg也可打开
  // type："video/ogg"    // 可以播放，用webm也可打开
  // type："video/3gp"    // 可以播放
  // type："video/mp4"    // 可以播放
  // type："video/avi"    // 打不开
  // type："video/flv"    // 打不开
  // type："video/mkv"    // 打不开
  // type："video/mov"    // 打不开
  // type："video/mpg"    // 打不开
  // type："video/swf"    // 打不开
  // type："video/ts"     // 打不开
  // type："video/wmv"    // 打不开
  // type："video/vob"    // 没转化
  // type："video/mxf"    // 转化出错
  // type: "video/rm"     // 转化出错复制代码
}
</script>

<style scoped>
.aioc-video {
  width: 1000px;
  height: 500px;
  z-index: 2050;
  position: fixed;
  top: calc(50% - 300px);
  left: calc(50% - 500px);
}
.aioc-model {
  background: #2b90ff;
  background: rgba(0,0,0,0.4);
  left: 0px;
  top: 0px;
  position: fixed;
  z-index: 2049;
}
.close-video {
  left: calc(50% - 75px);
  bottom: 50px;
  position: fixed;
  width: 150px;
  text-align: center;
  font-size: 16px;
  color: #ffffff;
  font-weight: 600;
  z-index: 2050;
  font-family: 微软雅黑;
  letter-spacing: 0.5px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
}
</style>

<style>
.aioc-video .vjs-big-play-button {
  left: calc(50% - 45px) !important;
  top: calc(50% - 22.5px) !important;
  width: 120px !important;
  height: 80px !important;
  border: 3px solid #ffffff !important;
}
.aioc-video .vjs-icon-placeholder {
  line-height: 80px !important;
}

.vjs-big-play-button:hover {
  background: #096dd9 !important;
}
</style>
