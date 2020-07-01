<script lang="ts">
import Vue from 'vue'
import Sidebar from './Sidebar.vue'
import AppFooter from './AppFooter.vue'
import UpdateNotify from './UpdateNotify.vue'

export default Vue.extend({
  name: 'Layout',
  components: { Sidebar, AppFooter, UpdateNotify },
  data: () => ({
    sidebar: false,
    online: navigator.onLine
  }),
  methods: {
    showDidebar () {
      this.sidebar = true
    }
  },
  mounted () {
    // @ts-ignore
    this.$onOnline = () => {
      this.online = true
    }

    // @ts-ignore
    this.$onOffline = () => {
      this.online = false
    }

    // @ts-ignore
    window.addEventListener('online', this.$onOnline)
    // @ts-ignore
    window.addEventListener('offline', this.$onOffline)
  },
  beforeDestroy () {
    // @ts-ignore
    window.removeEventListener('online', this.$onOnline)
    // @ts-ignore
    window.removeEventListener('offline', this.$onOffline)
  }
})
</script>

<template>
  <v-app>
    <Sidebar v-model="sidebar" />
    <v-app-bar
      app
      color="primary"
      flat
      dark
    >
      <v-app-bar-nav-icon @click="showDidebar"></v-app-bar-nav-icon>
      <v-toolbar-title>Pokémon Match</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-img
        v-if="online"
        alt="Pokémon Match"
        class="shrink mr-2"
        contain
        :src="require('@/assets/pokeball-header.svg')"
        transition="scale-transition"
        width="40"
      />
      <v-icon v-else>
        mdi-wifi-off
      </v-icon>
    </v-app-bar>
    <v-main>
      <UpdateNotify />
      <div class="pa-2">
        <slot />
      </div>
    </v-main>
    <AppFooter />
  </v-app>
</template>
