import Vue from 'vue'
import Vuex from 'vuex'
import { GENERATIONS } from '@/data'
import sw from './sw.plugin'
import cache, { getCache } from './cache.plugin'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hasUpdate: false,
    hasSynthesisSupport: true,
    hasVibrationSupport: true,
    generation: GENERATIONS[0],
    vibration: true,
    speechSynthesis: false,
    SWReady: false,
    ...getCache()
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
    },
    setGeneration (state, val) {
      state.generation = val
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [cache, sw]
})
