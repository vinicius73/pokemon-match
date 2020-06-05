import Vue from 'vue'
import Vuex from 'vuex'
import sw from './sw.plugin'
import { PokeMatchState } from './types'

Vue.use(Vuex)

export default new Vuex.Store<PokeMatchState>({
  state: {
    hasSynthesisSupport: true,
    vibration: true,
    hasVibrationSupport: true,
    speechSynthesis: false,
    hasUpdate: false,
    SWReady: false
  },
  mutations: {
    setHasSynthesisSupport (state, val) {
      state.hasSynthesisSupport = !!val
    },
    setVibrationSupport (state, val) {
      state.hasVibrationSupport = !!val
    },
    setSpeechSynthesis (state, val) {
      state.speechSynthesis = !!val
    },
    setVibration (state, val) {
      state.vibration = !!val
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
