<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'Sidebar',
  props: {
    value: Boolean
  },
  computed: {
    ...mapState(['speechSynthesis'])
  },
  methods: {
    ...mapMutations(['setSpeechSynthesis'])
  }
})
</script>

<template>
  <v-navigation-drawer
      :value="value"
      @input="$listeners.input"
      clipped
      fixed
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

    <div slot="append">
      <v-switch
        :value="speechSynthesis"
        @change="setSpeechSynthesis"
        append-icon="mdi-text-to-speech"
        class="ma-2"
        label="Pokémon names?"></v-switch>
    </div>
  </v-navigation-drawer>
</template>
