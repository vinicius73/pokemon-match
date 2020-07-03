<script lang="ts">
/* eslint-disable no-console */
import Vue from 'vue'
import { sampleSize, shuffle, sample, debounce, noop } from 'lodash-es'
import { mapState } from 'vuex'
import { speak } from '@/plugins/speech-synthesis'
import { vibrate } from '@/plugins/vibration'
import { ProgressBar, PokemonCard, ScoreBar } from '@/components/Card'
import { loadPokemonList, Pokemon } from '@/data'
import { onIdle } from '@/plugins/on-idle'

export default Vue.extend({
  components: { PokemonCard, ScoreBar, ProgressBar },
  props: {
    name: String,
    title: String,
    size: {
      type: Number,
      required: false
    }
  },
  data () {
    return {
      hideAll: true,
      ready: false,
      score: 0,
      result: null as boolean | null,
      list: [] as ReadonlyArray<Pokemon>,
      pokemon: {} as Pokemon
    }
  },
  computed: {
    ...mapState(['speechSynthesis', 'vibration']),
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
      if (this.size > 0) {
        return this.size
      }

      return this.$vuetify.breakpoint.xs ? 3 : 4
    },
    options (): Pokemon[] {
      if (this.hideAll) {
        return []
      }

      return shuffle([
        this.pokemon,
        ...sampleSize(this.list, this.optionsSize - 1)
      ])
    }
  },
  watch: {
    result (val) {
      if (val === null) {
        return
      }

      onIdle(() => {
        this.score = val
          ? this.score + 1
          : 0
      })
    },
    ready (val) {
      if (!val) {
        return
      }

      onIdle(() => {
        this.hideAll = false
      })
    }
  },
  methods: {
    next: debounce(function () {
      // @ts-ignore
      this.result = null
      // @ts-ignore
      onIdle(async () => {
        await onIdle(() => {
          // @ts-ignore
          this.pokemon = sample(this.list)
        })
          .then(() => {
            // @ts-ignore
            this.$vuetify.goTo(0)
          })
          .then(() => {
            // @ts-ignore
            this.hideAll = false
          })
      })
    }, 2000),
    select (name: string) {
      if (this.hasResult) {
        return
      }

      if (this.speechSynthesis) {
        speak(this.pokemon.name)
          .then(noop, console.warn)
      }

      this.result = name === this.pokemon.name

      if (this.vibration) {
        vibrate(this.result ? [300] : [100, 200, 100])
      }

      onIdle(() => {
        // @ts-ignore
        this.$vuetify.goTo(0)
        this.next()

        setTimeout(() => {
          this.hideAll = true
        }, 700)
      })
    }
  },
  async mounted () {
    onIdle(async () => {
      this.list = await loadPokemonList()
    })
      .then(() => {
        this.pokemon = sample(this.list) as Pokemon
      })
      .then(() => {
        this.ready = true
      })
  }
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
            v-bind="{ title, name }"
            :hits="score"
            slot="top" />
          <ProgressBar :active="hasResult" slot="top" />
          <v-card-text v-if="hasResult">
            {{ result ?  'Congratulations!' : 'Try Again ;)' }}
          </v-card-text>
        </PokemonCard>
    </v-col>
    <v-col v-if="ready">
      <slot v-if="$scopedSlots.default" v-bind="{ options, select }"></slot>
      <transition-group tag="div" class="row transition-group-delay" name="fade-in" css>
        <v-col
          cols="12"
          md="6"
          sm="6"
          v-for="(pokemon, index) in options"
          :key="`option-${pokemon.name}-${index}`">
            <slot name="option" v-bind="{ pokemon, select }" />
        </v-col>
      </transition-group>
    </v-col>
  </v-row>
</template>
