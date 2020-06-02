/* eslint-disable @typescript-eslint/ban-ts-ignore */
import Vue from 'vue'
import { sampleSize, shuffle, sample, debounce, noop } from 'lodash-es'
import { mapState } from 'vuex'
import { speak } from '@/plugins/speech-synthesis'
import ProgressBar from '@/components/ProgressBar.vue'
import PokemonCard from '@/components/PokemonCard.vue'
import ScoreBar from '@/components/ScoreBar.vue'
import list from '@/assets/pokemon.json'

export default Vue.extend({
  components: { PokemonCard, ScoreBar, ProgressBar },
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
    }, 3500),
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
