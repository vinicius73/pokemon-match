<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'UpdateNotify',
  computed: {
    ...mapState(['hasUpdate'])
  },
  methods: {
    update () {
      window.location.reload()
    }
  }
})
</script>

<template>
  <v-snackbar :timeout="0" :value="hasUpdate" top>
    Has an update available
    <v-btn
      @click="update"
      color="yellow"
      text>
      Update
    </v-btn>
  </v-snackbar>
</template>
