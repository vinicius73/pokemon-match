<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: Boolean
  }
})
</script>

<template>
  <v-navigation-drawer
      :value="value"
      @input="$listeners.input"
      absolute
      temporary
    >
    <v-list-item>
      <v-list-item-avatar>
        <v-img
          :src="require('@/assets/pokeball-sidebar.svg')" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>Pokémon Match</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item link :to="{ name: 'ImageMatch' }">
      <v-list-item-icon>
        <v-icon>mdi-image-search</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Image Match</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-navigation-drawer>
</template>
