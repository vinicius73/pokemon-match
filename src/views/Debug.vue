<script>
import { keysIn, map, toString, sortBy } from 'lodash-es'
import DebugList from '@/components/DebugList.vue'

const generateList = (original) => {
  const keys = sortBy(keysIn(original))

  return map(keys, (key) => {
    return {
      key,
      value: toString(original[key])
    }
  })
}

export default {
  name: 'DebugPage',
  title: 'Debug 🐛',
  components: {
    DebugList
  },
  computed: {
    speechSynthesis () {
      return generateList(window.speechSynthesis)
    },
    navigator () {
      return generateList(navigator)
    },
    connection () {
      return generateList(
        navigator.connection || navigator.mozConnection || navigator.webkitConnection || navigator.msConnection
      )
    },
    breakpoint () {
      return generateList(this.$vuetify.breakpoint)
    },
    application () {
      return generateList(this.$vuetify.application)
    }
  }
}
</script>

<template>
  <v-row dense>
    <v-col cols="12" md="6">
      <DebugList
        :items="navigator"
        title="navigator" />
    </v-col>
    <v-col cols="12" md="6">
      <DebugList
        :items="connection"
        title="connection" />
    </v-col>
    <v-col cols="12" md="6">
      <DebugList
        :items="breakpoint"
        title="breakpoint" />
    </v-col>
    <v-col cols="12" md="6">
      <DebugList
        :items="application"
        title="application" />
    </v-col>
    <v-col cols="12" md="6">
      <DebugList
        :items="speechSynthesis"
        title="speechSynthesis" />
    </v-col>
  </v-row>
</template>
