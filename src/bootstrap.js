/* eslint-disable no-console */
import Vue from 'vue'
import PageTitle from 'vue-page-title'
import { install as OnIdlePlugin, onIdle } from './plugins/on-idle'
import { loadStylesheets } from './lib/stylesheets'
import Pokeball from '@/components/Pokeball'
import './plugins/orientation'

Vue.use(OnIdlePlugin)
Vue.use(PageTitle, {
  suffix: '- Pokémon Match'
})

Vue.config.productionTip = process.env.NODE_ENV !== 'production'
Vue.config.performance = process.env.NODE_ENV !== 'production'

const loadShell = () => {
  return onIdle(() => import(/* webpackChunkName: "shell" */'./components/Layout/Shell.vue'))
}

const bootstrap = async () => {
  const router = await import(/* webpackChunkName: "root" */'./router')
  const store = await import(/* webpackChunkName: "root" */'./store')
  const vuetify = await import(/* webpackChunkName: "root" */'./plugins/vuetify')

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

  const app = new Vue({
    router: router.default,
    store: store.default,
    vuetify: vuetify.default,
    beforeMount () {
      const stylesheets = [
        'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap'
      ]

      loadStylesheets(stylesheets)
    },
    async mounted () {
      const stylesheets = [
        'https://cdn.jsdelivr.net/npm/@mdi/font@5.3.45/css/materialdesignicons.min.css'
      ]

      await loadStylesheets(stylesheets)

      onIdle(() => {
        document
          .body
          .classList
          .remove('waiting-ready', 'waiting-bootstrap')
      })
    },
    render: h => h(Shell, { staticClass: 'ready' })
  })

  await onIdle()

  app.$mount($app)
}

onIdle(() => {
  document
    .body
    .classList
    .add('waiting-bootstrap')
})
  .then(() => bootstrap())
  .catch(console.error)
