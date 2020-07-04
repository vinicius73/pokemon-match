import Vue, { VNodeData } from 'vue'

export default Vue.extend({
  name: 'Pokeball',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  render (h, { props, data }) {
    const rootClass = 'pokeball-component pokeball-container'

    const inner = h('div', { class: 'pokeball' }, [
      h('div', { class: 'pokeball__button' })
    ])

    const options: VNodeData = {
      staticClass: data.staticClass
        ? `${rootClass} ${data.staticClass}`
        : rootClass
    }

    if (props.tag === 'a') {
      options.domProps = {
        href: 'javascript:;'
      }
    }

    return h(props.tag, options, [inner])
  }
})
