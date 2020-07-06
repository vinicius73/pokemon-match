<script>
export default {
  name: 'DebugList',
  props: {
    title: String,
    items: Array
  }
}
</script>

<template>
  <v-card tile>
    <v-list dense>
      <v-subheader>{{ title }}</v-subheader>
      <v-list-item
        v-for="(item, index) in items"
        :key="`x-${item.key}-${index}`">
        <v-list-item-content>
          <v-list-item-title v-text="item.key"></v-list-item-title>
          <v-list-item-subtitle v-text="item.value"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>
