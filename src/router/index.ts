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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
