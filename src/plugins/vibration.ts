/* eslint-disable no-console */
const hasSupport = () => {
  return navigator && navigator.vibrate
}

const vibrate = (val = [200]) => {
  try {
    navigator.vibrate(val)
  } catch (error) {
    console.warn(error)
  }
}

export { hasSupport, vibrate }
