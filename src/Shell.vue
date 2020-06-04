<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'

const Layout = () => import(/* webpackChunkName: "layout" */ '@/components/Layout.vue')

export default Vue.extend({
  name: 'App',
  components: {
    Layout
  }
})
</script>
