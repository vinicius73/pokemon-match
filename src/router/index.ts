import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/image-match'
  },
  {
    path: '/image-match',
    name: 'ImageMatch',
    component: () => import(/* webpackChunkName: "image-match" */ '../views/ImageMatch.vue')
  },
  {
    path: '/name-match',
    name: 'NameMatch',
    component: () => import(/* webpackChunkName: "name-match" */ '../views/NameMatch.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
