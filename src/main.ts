/* eslint-disable no-console */

import Vue from 'vue'
// @ts-ignore
import PageTitle from 'vue-page-title'
import { install as OnIdlePlugin, onIdle } from './plugins/on-idle'
import Pokeball from '@/components/Pokeball'
import './registerServiceWorker'
import './plugins/orientation'
import '@/assets/main.scss'

Vue.use(OnIdlePlugin)
Vue.use(PageTitle, {
  suffix: '- Pokémon Match'
})

Vue.config.productionTip = process.env.NODE_ENV !== 'production'
Vue.config.performance = process.env.NODE_ENV !== 'production'

const loadShell = () => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      resolve(
        import(/* webpackChunkName: "shell" */'./Shell.vue')
      )

      await onIdle()

      document
        .body
        .classList
        .remove('waiting-ready', 'waiting-bootstrap')
    }, 1500)
  })
}

const bootstrap = async () => {
  const router = await import(/* webpackChunkName: "root" */'./router')
  const store = await import(/* webpackChunkName: "root" */'./store')
  const vuetify = await import(/* webpackChunkName: "plugins-vuetify" */'./plugins/vuetify')

  const Shell = () => ({
    component: loadShell(),
    loading: Pokeball,
    delay: 0
  })

  const $app = document.getElementById('app')

  if (!$app) {
    return Promise
      .reject(new Error('Missing #app element'))
  }

  await onIdle()

  new Vue({
    router: router.default,
    store: store.default,
    vuetify: vuetify.default,
    beforeMount () {
      const stylesheets = [
        'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap',
        'https://cdn.jsdelivr.net/npm/@mdi/font@5.3.45/css/materialdesignicons.min.css'
      ]

      stylesheets.forEach((href) => {
        const link = document.createElement('link')

        link.href = href
        link.rel = 'stylesheet'
        link.type = 'text/css'

        document.body.appendChild(link)
      })
    },
    // @ts-ignore
    render: h => h(Shell, { staticClass: 'ready' })
  }).$mount($app)
}

setTimeout(async () => {
  document
    .body
    .classList
    .add('waiting-bootstrap')

  await onIdle()

  bootstrap()
    .catch(console.error)
}, 500)
