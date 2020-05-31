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
