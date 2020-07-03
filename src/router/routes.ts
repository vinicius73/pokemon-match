import { RouteConfig } from 'vue-router'

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "page-home" */ '../views/Home.vue')
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
    path: '/type-match',
    name: 'TypeMatch',
    component: () => import(/* webpackChunkName: "page-type-match" */ '../views/TypeMatch.vue')
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

export default routes
