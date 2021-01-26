import Vue from 'vue'
import Vuex from 'vuex'
import { GENERATIONS } from '@/data'
import sw from './sw.plugin'
import nav from './navigator.plugin'
import cache, { getCache } from './cache.plugin'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hasUpdate: false,
    isOnline: navigator.onLine,
    cachingImages: false,
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
    },
    setCachingImages (state, val) {
      state.cachingImages = val
    },
    setIsOnline (state, val) {
      state.isOnline = !!val
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [nav, cache, sw]
})
