import { Store } from 'vuex'
import { PokeMatchState } from './types'
import { hasSupport as hasSpeechSupport } from '@/plugins/speech-synthesis'
import { hasSupport as hasVibrationSupport } from '@/plugins/vibration'

export default (store: Store<PokeMatchState>) => {
  setTimeout(() => {
    store.commit('setHasSynthesisSupport', hasSpeechSupport())

    const vibration = hasVibrationSupport()

    store.commit('setVibrationSupport', vibration)

    if (!vibration) {
      store.commit('setVibration', false)
    }
  }, 8000)
}
