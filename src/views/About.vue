<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PageAbout'
})
</script>

<template>
  <v-row dense>
    <v-col cols="12" sm="6">
      <v-card dark>
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline">
              Pokémon Match - Game Collection
            </v-card-title>
            <v-card-text>
              <p>
                I made this app for my daughter and niece and left his code open and free. <br />
                I hope you have fun.
              </p>
            </v-card-text>
          </div>
          <v-avatar
            class="ma-3 animation-shake"
            size="125"
            tile>
            <v-img :src="require('@/assets/pokeball-header.svg')"></v-img>
          </v-avatar>
        </div>
        <v-card-actions>
            <v-btn href="https://github.com/vinicius73/pokemon-match" target="__blank" text>
              <v-icon>mdi-github</v-icon>
              vinicius73/pokemon-match
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
