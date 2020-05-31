<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Layout from '@/components/Layout.vue'

export default Vue.extend({
  name: 'App',
  components: {
    Layout
  },

  data: () => ({
    //
  })
})
</script>

<style>
@keyframes shake {
  0%, 100% {-webkit-transform: translateX(0);}
  10%, 30%, 50%, 70%, 90% {-webkit-transform: translateX(-2px);}
  20%, 40%, 60%, 80% {-webkit-transform: translateX(2px);}
}
</style>
