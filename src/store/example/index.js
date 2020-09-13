const state = {
  example: false
}

const getters = {
  getExample(state) {
    return state.example
  }
}

const actions = {
  updateExample({ commit }, data) {
    commit('updateExample', data)
  }
}
const mutations = {
  updateExample(state, data) {
    state.example = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
