import Vue from 'vue'
import { map } from 'lodash-es'
import Tag from './TypeTag'

export default Vue.extend({
  functional: true,
  props: {
    types: Array
  },
  render (h, { props }) {
    return map(props.types, type => {
      return h(Tag, {
        props: { type }
      })
    })
  }
})
