<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'Sidebar',
  data: () => ({
    version: process.env.VUE_APP_VERSION,
    model: {
      vibration: true,
      speechSynthesis: false
    }
  }),
  props: {
    value: Boolean
  },
  computed: {
    ...mapState(['speechSynthesis', 'vibration', 'hasSynthesisSupport', 'hasVibrationSupport'])
  },
  watch: {
    'model.vibration': 'setVibration',
    'model.speechSynthesis': 'setSpeechSynthesis'
  },
  methods: {
    ...mapMutations(['setSpeechSynthesis', 'setVibration'])
  },
  mounted () {
    this.model.vibration = this.vibration
    this.model.speechSynthesis = this.speechSynthesis
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
      <v-list-item-avatar :class="{ 'animation-shake': value }">
        <v-img
          :src="require('@/assets/pokeball-sidebar.svg')" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>Pokémon Match</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-list-item-action-text>
          {{ version }}
        </v-list-item-action-text>
      </v-list-item-action>
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

    <v-list-item link :to="{ name: 'NameMatch' }">
      <v-list-item-icon>
        <v-icon>mdi-form-textbox</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Name Match</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item link :to="{ name: 'TypeMatch' }">
      <v-list-item-icon>
        <v-icon>mdi-tag-multiple</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Type Match</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item link :to="{ name: 'About' }">
      <v-list-item-icon>
        <v-icon>mdi-information</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>About</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <div slot="append">
      <v-switch
        v-if="hasVibrationSupport"
        v-model="model.vibration"
        append-icon="mdi-vibrate"
        class="ma-2"
        label="Vibrate?"></v-switch>

      <v-switch
        v-if="hasSynthesisSupport"
        v-model="model.speechSynthesis"
        append-icon="mdi-text-to-speech"
        class="ma-2"
        label="Pokémon names?"></v-switch>
    </div>
  </v-navigation-drawer>
</template>
