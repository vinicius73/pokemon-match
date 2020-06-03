<script lang="ts">
import MatchGame from '@/mixins/match-game'

export default MatchGame.extend({
  name: 'NameMatch',
  computed: {
    optionsSize () {
      return 4
    }
  }
})
</script>

<template>
  <v-row dense>
    <v-col v-if="ready" cols="12">
      <PokemonCard
        ref="currentPokemon"
        :color="resultColor"
        :pokemon="pokemon"
        :shake="hasResult"
        :visible="hasResult">
          <ScoreBar
            name="NAME_MATCH"
            title="Name Match"
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
          <v-card dark
            @click="select(pokemon.name)"
            color="info">
            <v-card-title
              class="headline"
              v-text="pokemon.name" />
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
