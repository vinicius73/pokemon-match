/* eslint-disable no-unused-expressions, no-console */
import { map, debounce } from 'lodash-es'
import { loadPokemonList, loadAllPokemonList } from '@/data'
import { onIdle } from '@/plugins/on-idle'

const CACHE_CMD = 'SET_POKEMON_IMAGE_CACHE'

// https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API
const allowDownload = () => {
  // @ts-ignore
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection || navigator.msConnection

  if (!conn) {
    return true
  }

  // if (conn.saveData === true) {
  //   return false
  // }

  return conn.type === 'wifi' || conn.effectiveType === '4g'
}

export default async (store) => {
  let listenerOn = false

  document.addEventListener('sw:update', () => {
    store.commit('setHasCache', false)
    onIdle(() => store.commit('setHasUpdate', true))
  })

  document.addEventListener('sw:ready', async () => {
    if (store.state.allowcache) {
      store.commit('setHasCache', false)
      store.commit('setSWReady', true)
    }
  })

  document.addEventListener('sw:cached', async () => {
    store.commit('setSWReady', true)
    applyCache(store.state.generation)
    listeners()
  })

  store.commit('setAllowCache', allowDownload())

  async function applyCache (generation) {
    try {
      console.log(`Caching ${generation === null ? 'all generations' : generation}`)

      const list = generation === null
        ? await loadAllPokemonList()
        : await loadPokemonList(generation)

      navigator
        .serviceWorker
        .controller
        .postMessage({
          action: CACHE_CMD,
          data: map(list, 'name')
        })
    } catch (err) {
      console.warn(err)
    }
  }

  function listeners () {
    if (listenerOn) {
      return
    }

    listenerOn = true

    store.watch(
      () => ({
        generation: store.state.generation,
        allowcache: store.state.allowcache
      }),
      debounce(({ generation }) => applyCache(generation), 1000)
    )

    let subscribe = store.subscribe((mutation, state) => {
      if (mutation.type !== 'downloadAll') {
        return
      }

      console.log('Caching all images...')

      subscribe()

      subscribe = null // force gc

      applyCache(null)
        .then(() => store.commit('setHasCache', true))
    })

    navigator
      .serviceWorker
      .addEventListener('message', ({ data }) => {
        const { action, state: value } = data || {}

        if (action !== 'cache:state') {
          return
        }

        store.commit('setCachingImages', value === 'caching')
      })
  }

  // eslint-disable-next-line no-lone-blocks
  {
    if (!navigator.serviceWorker) {
      return
    }

    store.commit('setSWReady', true)
    listeners()
  }
}
