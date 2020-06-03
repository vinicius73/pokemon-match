import { Store } from 'vuex'
import { PokeMatchState } from './types'

export default (store: Store<PokeMatchState>) => {
  document.addEventListener('sw:update', () => {
    store.commit('setHasUpdate', true)
  })

  document.addEventListener('sw:ready', () => {
    store.commit('setSWReady', true)
  })
}
