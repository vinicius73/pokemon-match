<script lang="ts">
import MatchGame from '@/mixins/match-game'

export default MatchGame.extend({
  name: 'ImageMatch'
})
</script>

<template>
  <v-row dense>
    <div v-if="!ready" class="ma-auto">
        <v-progress-circular
          :size="200"
          :width="10"
          indeterminate
        />
    </div>
    <v-col v-if="ready" cols="12">
      <PokemonCard
        ref="currentPokemon"
        :color="resultColor"
        :pokemon="pokemon"
        :shake="hasResult"
        :visible="hasResult">
          <ScoreBar
            name="IMAGE_MATCH"
            title="Image Match"
            :hits="score" slot="top" />
          <ProgressBar :active="hasResult" slot="top" />
          <v-card-text v-if="hasResult">
            {{ result ?  'Congratulations!' : 'Try Again ;)' }}
          </v-card-text>
        </PokemonCard>
    </v-col>
    <v-col v-if="ready">
      <v-row>
        <v-col
          cols="12"
          md="6"
          sm="6"
          v-for="(pokemon, index) in options"
          :key="`option-${pokemon.name}-${index}`">
          <PokemonCard
            @click="select(pokemon.name)"
            :pokemon="pokemon"
            showName visible />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
