import { hasSupport as hasSpeechSupport } from '@/plugins/speech-synthesis'
import { hasSupport as hasVibrationSupport } from '@/plugins/vibration'

export default (store) => {
  setTimeout(() => {
    store.commit('setHasSynthesisSupport', hasSpeechSupport())

    const vibration = hasVibrationSupport()

    store.commit('setVibrationSupport', vibration)

    if (!vibration) {
      store.commit('setVibration', false)
    }
  }, 8000)
}
