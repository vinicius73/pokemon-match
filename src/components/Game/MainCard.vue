<script lang="ts">
import Vue from 'vue'
import { ProgressBar, PokemonCard, ScoreBar } from '@/components/Card'

export default Vue.extend({
  name: 'MainCard',
  components: { PokemonCard, ScoreBar, ProgressBar },
  props: {
    score: Number,
    color: String,
    pokemon: Object,
    hasResult: Boolean,
    title: String,
    name: String,
    result: {
      type: Boolean,
      required: false
    }
  }
})
</script>

<template>
  <PokemonCard
    :color="color"
    :pokemon="pokemon"
    :shake="hasResult"
    :visible="hasResult">
      <ScoreBar
        v-bind="{ title, name }"
        :hits="score"
        slot="top" />
      <ProgressBar :active="hasResult" slot="top" />
      <v-card-text v-if="hasResult">
        {{ result ?  'Congratulations!' : 'Try Again ;)' }}
      </v-card-text>
    </PokemonCard>
</template>
