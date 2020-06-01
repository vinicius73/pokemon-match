<script lang="ts">
import Vue from 'vue'
import Sidebar from './Sidebar.vue'

export default Vue.extend({
  name: 'Layout',
  components: { Sidebar },
  data: () => ({
    sidebar: false
  }),
  methods: {
    showDidebar () {
      this.sidebar = true
    }
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
        alt="Pokémon Match"
        class="shrink mr-2"
        contain
        :src="require('@/assets/pokeball-header.svg')"
        transition="scale-transition"
        width="40"
      />
    </v-app-bar>
    <v-content>
      <div class="pa-2">
        <slot />
      </div>
    </v-content>
  </v-app>
</template>
