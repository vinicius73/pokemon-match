import Vue from 'vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins/orientation'
import '@/assets/main.scss'

const Shell = () => import(/* webpackChunkName: "shell" */'./Shell.vue')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  beforeMount () {
    document.body.classList.remove('waiting-ready')
  },
  render: h => h(Shell)
}).$mount('#app')
