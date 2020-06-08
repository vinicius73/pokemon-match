/* eslint-disable no-console */

import Vue from 'vue'
import './registerServiceWorker'
import './plugins/orientation'
import '@/assets/main.scss'

const Shell = () => import(/* webpackChunkName: "shell" */'./Shell.vue')

Vue.config.productionTip = false

const bootstrap = async () => {
  const router = await import(/* webpackChunkName: "root" */'./router')
  const store = await import(/* webpackChunkName: "root" */'./store')
  const vuetify = await import(/* webpackChunkName: "plugins-vuetify" */'./plugins/vuetify')

  new Vue({
    router: router.default,
    store: store.default,
    vuetify: vuetify.default,
    beforeMount () {
      document.body.classList.remove('waiting-ready')
    },
    render: h => h(Shell)
  }).$mount('#app')
}

setTimeout(() => {
  bootstrap()
    .catch(console.error)
}, 500)
