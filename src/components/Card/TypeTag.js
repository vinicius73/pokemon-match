import { VChip } from 'vuetify/lib'
import { Types as Colors } from '@/data/colors'

export default {
  functional: true,
  props: {
    type: String
  },
  render (h, { props }) {
    const type = props.type

    return h(VChip, {
      staticClass: 'ml-1',
      props: {
        small: true,
        color: Colors[type]
      }
    }, type)
  }
}
