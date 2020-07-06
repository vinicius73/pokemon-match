/* eslint-disable no-console */
import { onIdle } from './on-idle'

onIdle(() => {
  if (!screen.orientation) {
    return
  }

  return screen.orientation.lock('portrait')
})
  .catch(console.warn)
