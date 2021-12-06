<script>
import { get } from 'lodash-es'
import Types from './Types'
const CDN = 'https://images.weserv.nl/?url=media.githubusercontent.com/media/vinicius73/pokemon-image-collection/master/images'

export default {
  name: 'PokemonImage',
  components: { Types },
  props: {
    shake: Boolean,
    pokemon: Object,
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
    name () {
      return get(this.pokemon, ['names', 'en'], this.pokemon.name)
    },
    key () {
      return this.pokemon.name
    },
    id () {
      return this.pokemon.id
    },
    title () {
      return this.visible
        ? this.name
        : 'Who\'s that Pokémon?'
    },
    src () {
      const { artwork, id } = this
      return artwork
        ? `${CDN}/${id}.webp`
        : `${CDN}/${id}.webp`
    }
  }
}
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

        <slot />

        <div class="pokemon-card-content" v-if="visible && !$slots.default">
          <Types :types="pokemon.types" />
        </div>
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
.pokemon-card .v-card__title {
  word-break: keep-all;
}
.pokemon-card.shake {
  animation-name: shake;
}
.pokemon-card-content {
  margin-left: 13px;
}
</style>
