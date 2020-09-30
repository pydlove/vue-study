<template>
  <div id="app" :style="'height: ' + height + 'px;'">
    <router-view />
  </div>
</template>

<script>
export default {
    name: 'App',
    mounted() {
        this.height = document.body.clientHeight;
    },
    data() {
        return {
            height: 947,
        }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow: auto;
}
</style>
