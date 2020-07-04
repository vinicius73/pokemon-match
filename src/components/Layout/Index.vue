<script lang="ts">
import Vue from 'vue'
import { onIdle } from '@/plugins/on-idle'
import Sidebar from './Sidebar.vue'
import UpdateNotify from './UpdateNotify.vue'

export default Vue.extend({
  name: 'Layout',
  components: { Sidebar, UpdateNotify },
  data: () => ({
    sidebar: false,
    online: navigator.onLine
  }),
  computed: {
    title () {
      return this.$route.name === 'Home'
        ? 'Pokémon Match'
        // @ts-ignore
        : this.$title
    }
  },
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

    onIdle(() => {
      // @ts-ignore
      window.addEventListener('online', this.$onOnline)
      // @ts-ignore
      window.addEventListener('offline', this.$onOffline)
    })
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
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'Home' }">
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
      </router-link>
    </v-app-bar>
    <v-main>
      <UpdateNotify />
      <div class="pa-2">
        <slot />
      </div>
    </v-main>
    <!-- <AppFooter /> -->
  </v-app>
</template>
