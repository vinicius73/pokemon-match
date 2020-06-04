<script lang="ts">
import Vue from 'vue'
import { MatchGame } from '@/components/Game'
import { PokemonCard } from '@/components/Card'

export default Vue.extend({
  name: 'ImageMatch',
  components: { MatchGame, PokemonCard }
})
</script>

<template>
  <MatchGame
    name="IMAGE_MATCH"
    title="Image Match">
    <template v-slot:option="{ pokemon, select }">
      <v-card dark
        @click="select(pokemon.name)"
        color="info">
        <PokemonCard
            @click="select(pokemon.name)"
            :pokemon="pokemon"
            showName visible />
      </v-card>
    </template>
  </MatchGame>
</template>
