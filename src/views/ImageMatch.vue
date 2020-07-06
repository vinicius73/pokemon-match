<script>
import { MatchGame } from '@/components/Game'
import { PokemonCard } from '@/components/Card'

export default {
  name: 'ImageMatch',
  components: { MatchGame, PokemonCard },
  title: 'Image Match'
}
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
