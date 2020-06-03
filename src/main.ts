import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@/assets/critical.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  created () {
    document.body.classList.remove('waiting-ready')
  },
  render: h => h(App)
}).$mount('#app')
