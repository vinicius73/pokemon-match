/* eslint-disable no-console */

import { register } from 'register-service-worker'
import { onReady } from './lib/ready'

if (process.env.NODE_ENV === 'production') {
  const dispatchEvent = (name, meta, timeout = 8000) => {
    setTimeout(() => {
      const event = new Event(name)

      if (meta) {
        event.meta = meta
      }

      document.dispatchEvent(event)
    }, timeout)
  }

  onReady(() => {
    register(`${process.env.BASE_URL}service-worker.js`, {
      ready (sw) {
        dispatchEvent('sw:ready', { sw })
        dispatchEvent('sw:ready', { sw }, 0)
      },
      registered () {
        console.log('Service worker has been registered.')
      },
      cached (sw) {
        dispatchEvent('sw:cached', { sw })
        dispatchEvent('sw:cached', { sw }, 0)
      },
      updatefound () {
        console.log('New content is downloading.')
      },
      updated () {
        console.log('New content is available; please refresh.')
        dispatchEvent('sw:update')
        dispatchEvent('sw:update', {}, 0)
      },
      offline () {
        console.log('No internet connection found. App is running in offline mode.')
      },
      error (error) {
        console.error('Error during service worker registration:', error)
      }
    })
  })
}
