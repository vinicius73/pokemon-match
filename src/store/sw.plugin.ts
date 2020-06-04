import { Store } from 'vuex'
import { get, map } from 'lodash-es'
import { PokeMatchState } from './types'
import { loadPokemonList } from '@/data'

export default (store: Store<PokeMatchState>) => {
  let cached = false

  document.addEventListener('sw:update', () => {
    store.commit('setHasUpdate', true)
  })

  document.addEventListener('sw:ready', async () => {
    store.commit('setSWReady', true)
  })

  document.addEventListener('sw:cached', async (event: unknown) => {
    if (cached) {
      return
    }

    cached = true

    const swr = get(event, ['meta', 'sw']) as ServiceWorkerRegistration

    const sw = swr.active

    if (!sw) {
      return
    }

    const list = await loadPokemonList()

    sw.postMessage({
      action: 'SET_POKEMON_IMAGE_CACHE',
      data: map(list, 'name')
    })
  })
}
