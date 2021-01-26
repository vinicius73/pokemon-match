<script>
/* eslint-disable no-console */
import { sampleSize, shuffle, sample, debounce, noop } from 'lodash-es'
import { mapState } from 'vuex'
import { speak } from '@/plugins/speech-synthesis'
import { vibrate } from '@/plugins/vibration'
import { loadPokemonList } from '@/data'
import { onIdle } from '@/plugins/on-idle'
import MainCard from './MainCard.vue'

export default {
  name: 'MatchGame',
  components: { MainCard },
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
      result: null,
      list: [],
      pokemon: {}
    }
  },
  computed: {
    ...mapState(['speechSynthesis', 'vibration', 'generation']),
    hasResult () {
      return this.result !== null
    },
    resultColor () {
      if (this.hasResult) {
        return this.result
          ? 'success'
          : 'error'
      }

      return null
    },
    optionsSize () {
      if (this.size > 0) {
        return this.size
      }

      return this.$vuetify.breakpoint.xs ? 3 : 4
    },
    options () {
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
    },
    generation () {
      this.loadPokemon()
    }
  },
  methods: {
    next: debounce(function () {
      this.result = null
      onIdle(async () => {
        await onIdle(() => {
          this.pokemon = sample(this.list)
        })
          .then(() => {
            this.$vuetify.goTo(0)
          })
          .then(() => {
            this.hideAll = false
          })
      })
    }, 2000),
    select (name) {
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
        this.$vuetify.goTo(0)
        this.next()

        setTimeout(() => {
          this.hideAll = true
        }, 700)
      })
    },
    loadPokemon () {
      this.ready = false
      return onIdle(async () => {
        this.list = await loadPokemonList(this.generation)
      })
        .then(() => {
          this.pokemon = sample(this.list)
        })
        .catch(err => {
          console.warn(err)
        })
        .then(() => {
          this.ready = true
        })
    }
  },
  mounted () {
    this.loadPokemon()
  }
}
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
      <MainCard
        v-bind="{
          color: resultColor,
          pokemon,
          hasResult,
          result,
          title,
          name,
          score
        }"
      />
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
