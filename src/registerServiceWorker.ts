/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable no-console */

import { register } from 'register-service-worker'

const dispatchEvent = (name: string, timeout = 8000, meta?: unknown) => {
  setTimeout(() => {
    const event = new Event(name)

    if (meta) {
      // @ts-ignore
      event.meta = meta
    }

    document.dispatchEvent(event)
  }, timeout)
}

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      dispatchEvent('sw:ready')
      dispatchEvent('sw:ready', 0)
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      console.log('New content is available; please refresh.')
      dispatchEvent('sw:update')
      dispatchEvent('sw:update', 0)
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
