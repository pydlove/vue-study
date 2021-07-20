<template>
  <div id="app" :style="{height: clientHeight + 'px'}">
    <router-view />
  </div>
</template>

<script>

    export default {
        name: 'App',
        mounted() {
        },
        data() {
            return {
                clientHeight: document.body.clientHeight,
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

  /*媒体查询（手机）*/
  @media screen and (min-width: 768px) {
    #app {
      background-attachment: #181617e6 !important;
    }
  }

  /*媒体查询（手机）*/
  @media screen and (max-width: 768px) {
    #app {
      background: #181617;
    }
  }
</style>
