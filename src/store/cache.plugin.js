import { pick, debounce } from 'lodash-es'
import { onIdle } from '@/plugins/on-idle'

export const CACHE_KEY = 'pokemon:state'

export const getCache = () => {
  const raw = localStorage.getItem(CACHE_KEY)

  if (!raw) {
    return {}
  }

  try {
    return JSON.parse(raw)
  } catch (err) {
    console.warn(err)
    return {}
  }
}

export default (store) => {
  const update = debounce((state) => {
    onIdle(() => {
      return pick(state, [
        'generation',
        'vibration',
        'speechSynthesis'
      ])
    })
      .then(data => {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data))
      })
  }, 1000)

  store.subscribe((mutation, state) => {
    update(state)
  })
}
