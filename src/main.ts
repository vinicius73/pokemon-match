/* eslint-disable no-console */

import Vue from 'vue'
// @ts-ignore
import PageTitle from 'vue-page-title'
import { install as OnIdlePlugin, onIdle } from './plugins/on-idle'
import './registerServiceWorker'
import './plugins/orientation'
import '@/assets/main.scss'

Vue.use(OnIdlePlugin)
Vue.use(PageTitle, {
  suffix: '- Pokémon Match'
})

Vue.config.productionTip = process.env.NODE_ENV !== 'production'
Vue.config.performance = process.env.NODE_ENV !== 'production'

const bootstrap = async () => {
  const router = await import(/* webpackChunkName: "root" */'./router')
  const store = await import(/* webpackChunkName: "root" */'./store')
  const vuetify = await import(/* webpackChunkName: "plugins-vuetify" */'./plugins/vuetify')
  const Shell = await import(/* webpackChunkName: "shell" */'./Shell.vue')

  await onIdle()

  new Vue({
    router: router.default,
    store: store.default,
    vuetify: vuetify.default,
    async beforeMount () {
      await onIdle()

      document
        .body
        .classList
        .remove('waiting-ready')
    },
    // @ts-ignore
    render: h => h(Shell.default)
  }).$mount('#app')
}

setTimeout(() => {
  bootstrap()
    .catch(console.error)
}, 900)
