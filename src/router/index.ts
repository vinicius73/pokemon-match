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
    component: () => import(/* webpackChunkName: "page-image-match" */ '../views/ImageMatch.vue')
  },
  {
    path: '/name-match',
    name: 'NameMatch',
    component: () => import(/* webpackChunkName: "page-name-match" */ '../views/NameMatch.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "page-about" */ '../views/About.vue')
  },
  {
    path: '/debug',
    name: 'Debug',
    component: () => import(/* webpackChunkName: "page-debug" */ '../views/Debug.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
