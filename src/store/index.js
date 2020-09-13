import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import example from './example/index'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    example
  },
  plugins: [
    createPersistedState({
      paths: ['example']
    })
  ]
})
