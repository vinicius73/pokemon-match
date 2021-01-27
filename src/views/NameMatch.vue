<script>
import { MatchGame } from '@/components/Game'

export default {
  name: 'NameMatch',
  components: { MatchGame },
  title: 'Name Match'
}
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
          v-text="pokemon.names.en" />
      </v-card>
    </template>
  </MatchGame>
</template>
