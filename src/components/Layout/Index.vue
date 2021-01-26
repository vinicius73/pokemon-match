<script>
import Sidebar from './Sidebar.vue'
import UpdateNotify from './UpdateNotify.vue'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: { Sidebar, UpdateNotify },
  data: () => ({
    sidebar: false,
    online: navigator.onLine
  }),
  computed: {
    ...mapState(['isOnline', 'cachingImages']),
    title () {
      return this.$route.name === 'Home'
        ? 'Pokémon Match'
        // @ts-ignore
        : this.$title
    }
  },
  methods: {
    showSidebar () {
      this.sidebar = true
    }
  }
}
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
      <v-app-bar-nav-icon aria-label="show menu" @click="showSidebar"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'Home' }">
        <v-icon class="animation-spin" v-if="cachingImages">
          mdi-cached
        </v-icon>
        <v-img
          v-else-if="isOnline"
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
