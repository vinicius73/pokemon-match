<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'ProgressBar',
  props: {
    active: Boolean
  }
})
</script>

<template>
  <v-progress-linear
      color="black"
      :active="active"
      :indeterminate="true"
      :query="true"
    />
</template>
