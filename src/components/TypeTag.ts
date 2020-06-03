import Vue from 'vue'
import { VChip } from 'vuetify/lib'
import { Types as Colors } from '@/data/colors'

export default Vue.extend({
  functional: true,
  props: {
    type: String
  },
  render (h, { props }) {
    const type = props.type as keyof typeof Colors

    return h(VChip, {
      staticClass: 'ml-1',
      props: {
        small: true,
        color: Colors[type]
      }
    }, type)
  }
})
