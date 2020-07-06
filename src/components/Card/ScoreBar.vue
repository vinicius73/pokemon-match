<script>
const KEY = ':MAX_SCORE'

const setMax = (game, val) => {
  localStorage.setItem(`${game}:${KEY}`, String(val))
}

const getMax = game => {
  const val = localStorage.getItem(`${game}:${KEY}`)
  return Number(val || 0)
}

export default {
  name: 'ScoreBar',
  props: {
    hits: Number,
    name: String,
    title: String
  },
  data () {
    return {
      max: getMax(this.name)
    }
  },
  watch: {
    hits (val) {
      if (val > this.max) {
        this.setMax(val)
      }
    }
  },
  methods: {
    setMax (val) {
      this.max = val
      setMax(this.name, val)
    }
  }
}
</script>

<template>
  <v-system-bar height="25" color="black" dark>
    <v-chip
      class="ma-2"
      :color="hits > 0 ? 'green' : 'red'"
      text-color="white"
      x-small>
      <v-avatar
        left
        color="black">
        {{ hits }}
      </v-avatar>
      Score
    </v-chip>
    <v-spacer></v-spacer>
    {{ title }}
    <v-spacer></v-spacer>
    <v-chip
      class="ma-2"
      color=""
      text-color="white"
      x-small>
      <v-avatar
        left
        color="black">
        {{ max }}
      </v-avatar>
      Max
    </v-chip>
  </v-system-bar>
</template>
