<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'UpdateNotify',
  data: () => ({
    loading: false
  }),
  computed: {
    ...mapState(['hasUpdate'])
  },
  methods: {
    ...mapMutations(['setHasUpdate']),
    update () {
      this.loading = true
      this.$nextTick(() => {
        window.location.reload()
      })
    },
    close () {
      this.setHasUpdate(false)
    }
  }
})
</script>

<template>
  <v-bottom-sheet dark v-model="hasUpdate" persistent>
      <v-sheet class="text-center" height="150px">
        <div class="py-3">
          There is an update available, update your browser and enjoy the game.
        </div>

        <v-btn
          text
          class="ma-2"
          color="error"
          @click="close">
          <v-icon>mdi-close</v-icon>
          close
        </v-btn>
        <v-btn
          text
          :loading="loading"
          class="ma-2"
          color="yellow"
          @click="update">
          <v-icon>mdi-reload</v-icon>
          update
        </v-btn>
      </v-sheet>
    </v-bottom-sheet>
</template>
