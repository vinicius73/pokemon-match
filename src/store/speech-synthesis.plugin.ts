import { Store } from 'vuex'
import { PokeMatchState } from './types'
import { hasSupport } from '@/plugins/speech-synthesis'

export default (store: Store<PokeMatchState>) => {
  setTimeout(() => {
    store.commit('setHasSynthesisSupport', hasSupport())
  }, 4000)
}
