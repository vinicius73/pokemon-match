import { onIdle } from '@/plugins/on-idle'

const loadStylesheets = async (stylesheets) => {
  const size = stylesheets.length

  for (let index = 0; index < size; index++) {
    await onIdle()

    const href = stylesheets[index]
    const link = document.createElement('link')

    link.href = href
    link.rel = 'stylesheet'
    link.type = 'text/css'

    document.head.appendChild(link)
  }
}

export {
  loadStylesheets
}
