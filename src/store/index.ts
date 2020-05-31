import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    speechSynthesis: false
  },
  mutations: {
    setSpeechSynthesis (state, val) {
      state.speechSynthesis = !!val
    }
  },
  actions: {
  },
  modules: {
  }
})
