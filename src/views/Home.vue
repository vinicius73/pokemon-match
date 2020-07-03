<script>
export default {
  name: 'Home',
  title: '🎮'
}
</script>

<template>
  <div>
    <v-alert border="top" type="info">
      <p>Welcome to <strong>Pokémon Match Game Collection!</strong></p>
      A small collection of match games for kids and Pokémon's lovers. Enjoy!
    </v-alert>

    <v-row
        align="center"
        justify="center">
      <v-col md="6" cols="12">
        <v-btn :to="{ name: 'ImageMatch' }" block outlined large>
          <v-icon>mdi-image-search</v-icon>
          Image Match
        </v-btn>
      </v-col>

      <v-col md="6" cols="12">
        <v-btn :to="{ name: 'NameMatch' }" block outlined large>
          <v-icon>mdi-form-textbox</v-icon>
          Name Match
        </v-btn>
      </v-col>
    </v-row>

    <a href="javascript:;" class="pokeball-container">
      <div class="pokeball">
        <div class="pokeball__button"></div>
      </div>
    </a>
  </div>
</template>

<style scoped>
.pokeball-container {
  cursor: default;
  position: initial;
  top: initial;
  left: initial;
  transform: initial;
}
</style>
