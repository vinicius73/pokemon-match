<script lang="ts">
import Vue from 'vue'
import { MatchGame } from '@/components/Game'

export default Vue.extend({
  name: 'NameMatch',
  components: { MatchGame }
})
</script>

<template>
  <MatchGame
    :size="4"
    name="NAME_MATCH"
    title="Name Match">
    <template v-slot:option="{ pokemon, select }">
      <v-card dark
        @click="select(pokemon.name)"
        color="info">
        <v-card-title
          class="headline"
          v-text="pokemon.name" />
      </v-card>
    </template>
  </MatchGame>
</template>
