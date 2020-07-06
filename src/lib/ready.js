import { onIdle } from '@/plugins/on-idle'

const onReady = (fn) => {
  if (document.readyState !== 'loading') {
    onIdle(fn)
  } else {
    document.addEventListener('DOMContentLoaded', () => onIdle(fn))
  }
}

export { onReady }
