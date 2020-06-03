/* eslint-disable @typescript-eslint/ban-ts-ignore */
import Vue from 'vue'
import { sampleSize, shuffle, sample, debounce, noop } from 'lodash-es'
import { mapState } from 'vuex'
import { speak } from '@/plugins/speech-synthesis'
import ProgressBar from '@/components/ProgressBar.vue'
import PokemonCard from '@/components/PokemonCard.vue'
import ScoreBar from '@/components/ScoreBar.vue'
import { loadPokemonList, Pokemon } from '@/data'

export default Vue.extend({
  components: { PokemonCard, ScoreBar, ProgressBar },
  data () {
    return {
      ready: false,
      score: 0,
      result: null as boolean | null,
      list: [] as ReadonlyArray<Pokemon>,
      pokemon: {} as Pokemon
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
    options (): Pokemon[] {
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
        this.pokemon = sample(this.list)
        // @ts-ignore
        this.$vuetify.goTo(0)
      })
    }, 3100),
    select (name: string) {
      if (this.hasResult) {
        return
      }

      if (this.speechSynthesis) {
        speak(this.pokemon.name)
          .then(noop, console.warn)
      }

      this.result = name === this.pokemon.name
      this.$nextTick(() => {
        // @ts-ignore
        this.$vuetify.goTo(0)
        this.next()
      })
    }
  },
  async mounted () {
    this.list = await loadPokemonList()
    this.pokemon = sample(this.list) as Pokemon
    this.$nextTick(() => {
      this.ready = true
    })
  }
})
