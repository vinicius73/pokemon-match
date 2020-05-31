<script lang="ts">
import Vue from 'vue'
const CDN = 'https://images.weserv.nl/?url=img.pokemondb.net'

export default Vue.extend({
  name: 'PokemonImage',
  props: {
    shake: Boolean,
    pokemon: String,
    artwork: Boolean,
    showName: Boolean,
    color: {
      type: String,
      required: false
    },
    size: {
      type: Number,
      default: 160
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cardColor () {
      if (this.color) {
        return this.color
      }

      return this.visible
        ? 'info'
        : 'accent'
    },
    title () {
      return this.visible
        ? this.pokemon
        : 'Who\'s that Pokemon?'
    },
    src (): string {
      const { artwork, pokemon } = this
      return artwork
        ? `${CDN}/artwork/${pokemon}.jpg`
        : `${CDN}/sprites/home/normal/${pokemon}.png`
    }
  }
})
</script>

<template>
  <v-card
      class="pokemon-card"
      v-on="$listeners"
      :class="{ shake }"
      :color="cardColor"
      :dark="visible">
    <div>
      <slot name="top" />
    </div>
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title
          class="headline"
          :class="{'text-red': !visible}"
          v-text="title"
        ></v-card-title>

        <!-- <v-card-subtitle v-text="pokemon"></v-card-subtitle> -->
        <slot />
      </div>

      <v-avatar
        class="ma-3 pokemon-image"
        :class="{ visible }"
        size="100"
        tile
      >
        <v-img :src="src"></v-img>
      </v-avatar>
    </div>
  </v-card>
</template>

<style scoped>
.pokemon-image {
  filter: invert(50%);
}
.pokemon-image.visible {
  filter: invert(0%);
}
.pokemon-card {
  transition: background-color 0.5s ease;
  animation-duration: 1s;
}
.pokemon-card.shake {
  animation-name: shake;
}
</style>
