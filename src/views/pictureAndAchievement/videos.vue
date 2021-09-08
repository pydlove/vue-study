<template>
  <!--eslint-disable-->
  <div>
    <el-dialog
        class="aiocw-dialog"
        title="视频播放"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :before-close="close"
        :fullscreen="false"
        width="1200px"
        center>
      <el-card style="width: 300px">
        <div class='demo'>
          <AiocloudVideo ref="aiocloudVideoRef" :sources="sources"></AiocloudVideo>
        </div>
      </el-card>
    </el-dialog>
  </div>

</template>
<!--eslint-disable-->
<script>
import AiocloudVideo from "@/components/AiocloudVideo";

export default {
  name: "videos",
  components: {AiocloudVideo},
  mounted() {
    this.baseUrl = this.$aiocUrl.baseUrl;
  },
  data() {
    return {
      dialogVisible: false,
      baseUrl: "",
      sources: [
        {
          type: "video/mp4",
          src: " ",
        }
      ]
    }
  },
  methods: {
    close() {
      this.dialogVisible = false;
    },

    open() {
      this.dialogVisible = true;

    },
    beforeDestroy() {
      this.player.remove();
    },
  },
}
</script>
<style scoped>

</style>

