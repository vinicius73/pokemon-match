/* eslint-disable no-console */

(async () => {
  if (!screen.orientation) {
    return
  }

  screen.orientation.lock('portrait')
})()
  .catch(console.warn)
