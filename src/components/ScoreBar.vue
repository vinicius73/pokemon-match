<script lang="ts">
import Vue from 'vue'

const KEY = 'IMAGE_MATCH:MAX_SCORE'

const setMax = (val: number) => {
  localStorage.setItem(KEY, String(val))
}

const getMax = (): number => {
  const val = localStorage.getItem(KEY)
  return Number(val || 0)
}

export default Vue.extend({
  name: 'ScoreBar',
  props: {
    hits: Number
  },
  data: () => ({
    max: getMax()
  }),
  watch: {
    hits (val) {
      if (val > this.max) {
        this.setMax(val)
      }
    }
  },
  methods: {
    setMax (val: number) {
      this.max = val
      setMax(val)
    }
  }
})
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
