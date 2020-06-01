<script lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-ignore */
import Vue from 'vue'
import { sampleSize, shuffle, sample, debounce, noop } from 'lodash-es'
import { mapState } from 'vuex'
import PokemonCard from '@/components/PokemonCard.vue'
import ScoreBar from '@/components/ScoreBar.vue'
import list from '@/assets/pokemon.json'
import { speak } from '@/plugins/speech-synthesis'

export default Vue.extend({
  name: 'ImageMatch',
  components: { PokemonCard, ScoreBar },
  data () {
    return {
      score: 0,
      result: null as boolean | null,
      pokemon: sample(list) as string
    }
  },
  computed: {
    ...mapState(['speechSynthesis']),
    hasResult (): boolean {
      return this.result !== null
    },
    resultColor (): string | null {
      if (this.hasResult) {
        return this.result
          ? 'success'
          : 'error'
      }

      return null
    },
    optionsSize (): number {
      return this.$vuetify.breakpoint.xs ? 3 : 4
    },
    options (): string[] {
      return shuffle([
        this.pokemon,
        ...sampleSize(list, this.optionsSize - 1)
      ])
    }
  },
  watch: {
    result (val) {
      if (val === null) {
        return
      }

      this.score = val
        ? this.score + 1
        : 0
    }
  },
  methods: {
    next: debounce(function () {
      // @ts-ignore
      this.result = null
      // @ts-ignore
      this.$nextTick(() => {
        // @ts-ignore
        this.pokemon = sample(list) as string
        // @ts-ignore
        this.$vuetify.goTo(0)
      })
    }, 4000),
    select (id: string) {
      if (this.hasResult) {
        return
      }

      if (this.speechSynthesis) {
        speak(this.pokemon)
          .then(noop, console.warn)
      }

      this.result = id === this.pokemon
      this.$nextTick(() => {
        // @ts-ignore
        this.$vuetify.goTo(0)
        this.next()
      })
    }
  }
})
</script>

<template>
  <v-row dense>
    <v-col cols="12">
      <PokemonCard
        ref="currentPokemon"
        :color="resultColor"
        :pokemon="pokemon"
        :shake="hasResult"
        :visible="hasResult">
          <ScoreBar :hits="score" slot="top" />
          <v-card-text v-if="hasResult">
            {{ result ?  'Congratulations!' : 'Try Again ;)' }}
          </v-card-text>
        </PokemonCard>
    </v-col>
    <v-col>
      <v-row>
        <v-col
          cols="12"
          md="6"
          sm="6"
          v-for="(id, index) in options"
          :key="`option-${id}-${index}`">
          <PokemonCard
            @click="select(id)"
            :pokemon="id"
            showName visible />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
