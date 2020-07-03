<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PageAbout',
  // @ts-ignore
  title: 'About 🖲️'
})
</script>

<template>
  <v-row dense>
    <v-col cols="12" sm="6">
      <v-card dark>
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title>
              <div>
                <h3 class="title">Vinicius Reis</h3>
                <h4 class="subtitle-1">Severino Full-Stack Developer 🤓</h4>
              </div>
            </v-card-title>
            <v-card-text>
              <p>
                Married and father a beautiful daughter. <br>
                I like movies, books, manga, comics, games... <br>
                That is, I like more things than I have time to do them.
              </p>
            </v-card-text>
          </div>
          <v-avatar
            v-if="this.$vuetify.breakpoint.smAndUp"
            class="ma-3"
            size="125">
            <v-img src="https://gravatar.com/avatar/f803c45d62a468e0cb990398c004bd3e?s=400"></v-img>
          </v-avatar>
        </div>
        <v-card-actions>
          <v-btn href="https://vinicius.dev" target="_blank" text>
            <v-icon>mdi-web</v-icon>
            vinicius.dev
          </v-btn>
          <v-btn href="https://twitter.com/luizvinicius73" target="_blank" text>
            <v-icon>mdi-twitter</v-icon>
            LuizVinicius73
          </v-btn>
          <v-btn href="https://github.com/vinicius73" target="_blank" text>
            <v-icon>mdi-github</v-icon>
            vinicius73
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6">
      <v-card color="accent">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline">
              <div>
                <h3 class="title">Pokémon Match</h3>
                <h4 class="subtitle-1">Game Collection</h4>
              </div>
            </v-card-title>
            <v-card-text>
              <p>
                I made this app for my daughter and niece and left his code open and free. <br />
                I hope you have fun.
              </p>
            </v-card-text>
          </div>
          <v-avatar
            v-if="this.$vuetify.breakpoint.smAndUp"
            class="ma-3 animation-shake"
            size="125"
            tile>
            <v-img :src="require('@/assets/pokeball-header.svg')"></v-img>
          </v-avatar>
        </div>
        <v-card-actions>
          <v-btn href="https://github.com/vinicius73/pokemon-match" target="_blank" text>
            <v-icon>mdi-github</v-icon>
            vinicius73/pokemon-match
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
