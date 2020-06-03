import Vue from 'vue'
import Vuex from 'vuex'
import sw from './sw.plugin'
import { PokeMatchState } from './types'

Vue.use(Vuex)

export default new Vuex.Store<PokeMatchState>({
  state: {
    speechSynthesis: false,
    hasUpdate: false,
    SWReady: false
  },
  mutations: {
    setSpeechSynthesis (state, val) {
      state.speechSynthesis = !!val
    },
    setHasUpdate (state, val) {
      state.hasUpdate = !!val
    },
    setSWReady (state, val) {
      state.SWReady = !!val
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [sw]
})
